import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import '../imports/startup/accounts-config.js';
import './main.html';
export const Groups = new Mongo.Collection("groups");
if (Meteor.isClient) {
    // Specify which collections from the server the client subscribes to
    Meteor.subscribe("groups");
}
Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
Template.body.helpers({
    groups: function () {
        // Find all groups and list the newest groups first
        return Groups.find({}, {sort: {createdAt: -1}});
    }
});

Template.body.events({
    "submit .new-group": function (event) {
        // Grab group name from text field
        var newGroup = event.target.group.value;
        // Check that text field is not blank before adding group
        if (newGroup !== '') {
            Meteor.call("addGroup", newGroup);
        }
        // Clear the text field for next entry
        event.target.group.value = "";
        // Prevent default form submit
        return false;
    },
    "submit .new-number": function (event) {
        // Grab phone number from text field
        var newNumber = event.target.number.value;
        // Check that text field is not blank before adding number
        if (newNumber !== '') {
            Meteor.call("addNumber", this._id, newNumber);
        }
        // Clear the text field for next entry
        event.target.number.value = "";
        // Prevent default form submit
        return false;
    },
    "submit .new-text": function (event) {
        // Grab text message from text field
        var newMessage = event.target.message.value;
        // Check that message field is not blank before sending texts
        if (newMessage !== '') {
            Meteor.call("sendMessage", newMessage);
        }
        // Clear the text field
        event.target.message.value = "";
        alert('Your message is being sent!');
        // Prevent default form submit
        return false;
    }
});


Template.body.events({
    "submit .new-group": function (event) {
        // Grab group name from text field
        var newGroup = event.target.group.value;
        // Check that text field is not blank before adding group
        if (newGroup !== '') {
            Meteor.call("addGroup", newGroup);
        }
        // Clear the text field for next entry
        event.target.group.value = "";
        // Prevent default form submit
        return false;
    },
    "submit .new-number": function (event) {
        // Grab phone number from text field
        var newNumber = event.target.number.value;
        // Check that text field is not blank before adding number
        if (newNumber !== '') {
            Meteor.call("addNumber", this._id, newNumber);
        }
        // Clear the text field for next entry
        event.target.number.value = "";
        // Prevent default form submit
        return false;
    },
    "submit .new-text": function (event) {
        // Grab text message from text field
        var newMessage = event.target.message.value;
        // Check that message field is not blank before sending texts
        if (newMessage !== '') {
            Meteor.call("sendMessage", newMessage);
        }
        // Clear the text field
        event.target.message.value = "";
        alert('Your message is being sent!');
        // Prevent default form submit
        return false;
    }
});
Template.group.events({
    "click .toggle-group": function () {
        // Set the checked property to the opposite of its current value
        Meteor.call("toggleGroup", this._id, !this.checked);
    },
    "click .toggle-number": function () {
        // Get the number's group data
        var data = Template.instance().data;
        // Set the checked property to the opposite of its current value
        Meteor.call("toggleNumber", data._id, this.number, !this.checked);
    },
    "click .delete-group": function () {
        // Remove a group from our collection
        Meteor.call("deleteGroup", this._id);
    },
    "click .delete-number": function () {
        // Get the number's group data
        var group = Template.instance().data;
        // Remove a number from a particular group
        Meteor.call("deleteNumber", group._id, this.number);
    }
});