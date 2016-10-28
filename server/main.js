import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';



Meteor.startup(() => {
  // code to run on server at startup
});

export const Groups = new Mongo.Collection("groups");
if (Meteor.isServer) {
    var config = require('./config');
    var TwilioClient = require('twilio')(config.accountSid, config.authToken);
    // Specify which collections are sent to the client
    Meteor.publish("groups", function () {
        return Groups.find({
            owner: this.userId
        });
    });
    
    
    Meteor.methods({
    addGroup: function (name) {
        Groups.insert({
            name: name,
            createdAt: new Date(),
            owner: Meteor.userId(),
            checked: false,
            numbers: []
        });
    },
    addNumber: function (groupId, number) {
        Groups.update(
            {_id: groupId},
            {$addToSet: {numbers: {"number": number, "checked": true }}}
        );
    },
    deleteGroup: function (groupId) {
    Groups.remove(
        {_id: groupId}
    );
},
deleteNumber: function (groupId, number) {
    Groups.update(
        {_id: groupId},
        { $pull: { numbers: {"number": number}}}
    );
},
toggleGroup: function (groupId, toggle) {
    Groups.update(
        {_id: groupId},
        { $set: { checked: toggle}}
    );
    // Find every number that differs from Group's "checked" boolean
    var numbers =
        Groups.find(
            {numbers: { $elemMatch: {"checked": !toggle}}}
        );
    // Set all numbers to match Group's "checked" boolean
    numbers.forEach(function (setter) {
        for (var index in setter.numbers) {
            Groups.update(
                { _id: groupId, "numbers.number": setter.numbers[index].number },
                { $set: {"numbers.$.checked": toggle} }
            );
        }
    });
},
toggleNumber: function (groupId, number, toggle) {
    Groups.update(
        { _id: groupId, "numbers.number": number },
        { $set: {"numbers.$.checked": toggle} }
    );
},

sendMessage: function (outgoingMessage) {
    var phonebook = [];
    // Find all checked numbers across all groups
    var recipients =
        Groups.find(
            {numbers: { $elemMatch: {"checked": true}}}
        );
    // Add each number from our query to our phonebook
    recipients.forEach(function (recipient) {
        for (var index in recipient.numbers) {
            phonebook.push(recipient.numbers[index].number);
        }
    });
    // Place all numbers in a Set so no number is texted more than once
    var uniquePhoneBook = new Set(phonebook);
    // Use Twilio REST API to text each number in the unique phonebook
    uniquePhoneBook.forEach(function (number) {
        console.log("Sending " + outgoingMessage + " to " + number + " from: " + process.env.TWILIO_NUMBER);
        TwilioClient.messages.post({
            to: number, // Any number Twilio can deliver to
            from: process.env.TWILIO_NUMBER, // A number you bought from Twilio and can use for outbound communication
            body: outgoingMessage,
            mediaUrl: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
        }, function (err, responseData) {
            if (!err) {
                console.log(responseData); 
            } else {
              console.log("Error sending multimedia message");
              console.log(err);
          }
        });
        
        /*
        HTTP.call(
            "POST",
            'https://api.twilio.com/2010-04-01/Accounts/' +
            process.env.TWILIO_ACCOUNT_SID + '/SMS/Messages.json', {
                params: {
                    From: process.env.TWILIO_NUMBER,
                    To: number,
                    Body: outgoingMessage
                },
                // Set your credentials as environment variables
                // so that they are not loaded on the client
                auth:
                    process.env.TWILIO_ACCOUNT_SID + ':' +
                    process.env.TWILIO_AUTH_TOKEN
            },
            // Print error or success to console
            function (error) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('SMS sent successfully.');
                }
            }
        );
        */
    });
}
    
});
}




