let newLink = $('#new');
let myLink = $('#myEvent');
let newEvent = $('#newEvent');
let saved = $('#saved');
let planner = $('#planner');
let newEventName = $('#newEventName');
let clearNew = $('#clearNew');
let contNew = $('#contNew');
let eventName = $('#eventName');
let helpText = $('#helpText');
var myEventName;

// Table of Contents Nav Logic

newLink.click(function(){
    planner.addClass('hide');
    newEvent.removeClass('hide');
})

myLink.click(function(){
    newEvent.addClass('hide');
    planner.removeClass('hide');
})

clearNew.click(function(){
    newEventName.val("");
})

contNew.click(function(){
    myEventName = newEventName.val();
    nameMyEvent(myEventName);
})

function nameMyEvent(myEventName){
    eventName.text(`${myEventName}`);
    helpText.hide();
    newEvent.addClass('hide');
    planner.removeClass('hide');
}