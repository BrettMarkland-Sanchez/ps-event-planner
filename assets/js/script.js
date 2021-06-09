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

if(!localStorage.getItem('savedEventNames')){
    localStorage.setItem('savedEventNames','');
}

if(!localStorage.getItem('savedEventDetails')){
    localStorage.setItem('savedEventDetails','');
}

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



/*************************************/
//reset page logic

let resetBtn = $('#resetBtn');


resetBtn.on('click',resetEvent);

function resetEvent() {


    //this code brings the user to the top of the page
    scroll(0,0);

    //the following code clears the food card
    let mealCatCard = $('#meal-categories');
    let mealCard2 = $('#mealCard2');

    mealCatCard.attr('class','section card-action center-align');
    mealCard2.attr('class','section card-action center-align hide');
    if (mealCatSelect) {
        mealCatSelect=[];
    }
    $('.selected').removeClass('selected');
    mealCard2.html(' ');

    mealContBtn.removeClass('disabled');




}


//save button logic
let saveBtn=$('#saveBtn');

saveBtn.on('click',saveEvent);

function saveEvent(){

    let bodyEl = $('body');
    let bodyElToText = bodyEl.html();
    let eventName = $('#eventName').text();

    let eventNamesArr =[];
    let eventDetailsArr=[];
    if(!localStorage.getItem('savedEventNames')){
     eventNamesArr = JSON.parse(localStorage.getItem('savedEventNames'));
     eventDetailsArr = JSON.parse(localStorage.getItem('savedEventDetails'));
    }

    eventNamesArr.push(eventName);
    eventDetailsArr.push(bodyElToText);

    localStorage.setItem('savedEventNames',JSON.stringify(eventNamesArr));
    localStorage.setItem('savedEventDetails',JSON.stringify(eventDetailsArr));


    loadSavePage();
    
}


function loadSavePage(){

    let saveInstr = $('saved-event-instructions');
    if(!localStorage.getItem('savedEventNames')){
        saveInstr.text('There are no saved events!');
        return;
    }

    let eventNamesArr = JSON.parse(localStorage.getItem('savedEventNames'));

    for(let i=0;i<eventNamesArr.length;i++){
        displayEventCard(eventNamesArr[i],i);
    }

}

function displayEventCard(eventName, number){
    
}