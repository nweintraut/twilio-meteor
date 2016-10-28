/*
var config = require('../config');
var client = require('twilio')(config.accountSid, config.authToken);

// Map routes to controller functions
module.exports = function(router) {
  router.get('/text', function(req, res) {
    //require the Twilio module and create a REST client
// var client = require('twilio')('ACCOUNT_SID', 'AUTH_TOKEN');


    //Send an text message
    client.sendMessage({
    
        to: '+16503946345', // Any number Twilio can deliver to
        from: '+16505294021', // A number you bought from Twilio and can use for outbound communication
        body: 'Hello Anthony, this is from Twilio. Basic message' // body of the SMS message
    
    }, function(err, responseData) { //this function is executed when a response is received from Twilio
    
        if (!err) { // "err" is an error received during the request, if any
    
            // "responseData" is a JavaScript object containing data received from Twilio.
            // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
            // http://www.twilio.com/docs/api/rest/sending-sms#example-1
    
        console.log("Destination #" + responseData.from); // outputs "+14506667788"
        console.log("Body: " + responseData.body); // outputs "word to your mother."
        console.log("Date_Sent: " + responseData.dateSent);
        console.log("Messaging_Service_SID: " + responseData.messagingServiceSid);
    
        } else {
            console.log("Error sending message");
            console.log(err);
        }
    
    });
  });
  router.get('/message', function(req, res){
          //Send a message with content (MMS)
      client.messages.post({
      
          to: '+16503872823', // Any number Twilio can deliver to
          from: '+16505294021', // A number you bought from Twilio and can use for outbound communication
          body: 'Hello Anthony, this is from Twilio. Message with mediaURL',
        mediaUrl: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
      
      }, function (err, responseData) {
          if (!err) {
                       console.log(responseData); 
          } else {
              console.log("Error sending multimedia message");
              console.log(err);
          }
      

      
      });
  });
  
  router.get('/call', function(req, res){
  //Place a phone call, and respond with TwiML instructions from the given URL
client.makeCall({

    to: '+16503872823', // Any number Twilio can deliver to
    from: '+16505294021', // A number you bought from Twilio and can use for outbound communication
    url: 'http://www.example.com/twiml.php' // A URL that produces an XML document (TwiML) which contains instructions for the call

}, function(err, responseData) {
    if (!err) {
                   //executed when the call has been initiated.
    console.log(responseData.from); // outputs "+14506667788" 
    } else {
    console.log("Error sending voice message");
    console.log(err);
    }
});
});
  
  
  router.get('/error', function(req, resp) {
    throw new Error('Derp. An error occurred.');
  });
};
*/