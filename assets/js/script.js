let newLink = $('#new');
let myLink = $('#myEvent');
let newEvent = $('#newEvent');
let saved = $('#saved');
let planner = $('#planner');
let newEventName = $('#newEventName');
let clearNew = $('#clearNew');
let contNew = $('#contNew');

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