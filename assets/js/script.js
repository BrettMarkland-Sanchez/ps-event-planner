let newLink = $('#new');
let myEventLink = $('#myEvent');
let savedEventsLink = $('#saved');
let newEvent = $('#newEvent');
let savedEvents = $('#savedEvents');
let planner = $('#planner');
let newEventName = $('#newEventName');
let clearNew = $('#clearNew');
let contNew = $('#contNew');
let eventName = $('#eventName');
let helpText = $('#helpText');
var myEventName;

// Container adjustment logic
$(window).on('resize', function() {
    var win = $(this);
    if (win.width() > 800) {
      $('body').addClass('container');
    } else {
      $('body').removeClass('container');
    }
  });

// Table of Contents Nav Logic
/*************************************/
newLink.click(function(){
    planner.addClass('hide');
    savedEvents.addClass('hide');
    newEvent.removeClass('hide');
})

myEventLink.click(function(){
    newEvent.addClass('hide');
    savedEvents.addClass('hide');
    planner.removeClass('hide');
})

savedEventsLink.click(function(){
    newEvent.addClass('hide');
    planner.addClass('hide');
    savedEvents.removeClass('hide');
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
    eventName.addClass('white-text');
}
/*************************************/