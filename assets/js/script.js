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
    // newEvent.addClass('hide');
    // planner.addClass('hide');
    // savedEvents.removeClass('hide');
    loadSavePage();
})

clearNew.click(function(){
    newEventName.val("");
})

contNew.click(function(){
    resetEvent();
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

    $('#food-instructions').text('Please select up to five categories for your menu suggestions:');

    mealCatCard.attr('class','section card-action center-align');
    mealCard2.attr('class','section card-action center-align hide');
    if (mealCatSelect) {
        mealCatSelect=[];
    }
    $('.selected').removeClass('selected');
    mealCard2.html(' ');

    mealContBtn.removeClass('disabled');

    //the following code clears the drink card
    let drinkCard1 = $('#drinkCard1');
    let drinkCard2 = $('#drinkCard2');
    let drinkRadio = $('input[name="group1"]');
    drinkCard2.html('');
    drinkCard2.addClass('hide');
    drinkRadio[0].checked = false;
    drinkRadio[1].checked = false;
    drinkInstructions.text('Please select a drink preference to receive your menu suggestions:')
    drinkCard1.removeClass('hide');
    contDrink.prop("disabled", false);

    //the following code clears the music card
    $('#music-card').removeClass('hide');
    $('#music-card-content').addClass('hide');

    $('#music-card-content').html('');

    $('#music-instructions').text('For playlist recommendations, please enter a few keywords:');
    $('#playlist-keywords').val('');

    $('#contMusic').removeClass('disabled');



}


//save button logic
let saveBtn=$('#saveBtn');

saveBtn.on('click',saveEvent);

function saveEvent(){

    let mainEl = $('main');


    let mainElToText = mainEl.html();
    let eventName = $('#eventName').text();

    let eventNamesArr =[];
    let eventDetailsArr=[];
    if(localStorage.getItem('savedEventNames')){
     eventNamesArr = JSON.parse(localStorage.getItem('savedEventNames'));
     eventDetailsArr = JSON.parse(localStorage.getItem('savedEventDetails'));
    }

    eventNamesArr.push(eventName);
    eventDetailsArr.push(mainElToText);

    localStorage.setItem('savedEventNames',JSON.stringify(eventNamesArr));
    localStorage.setItem('savedEventDetails',JSON.stringify(eventDetailsArr));


    loadSavePage();
    
}


function loadSavePage(){

    let saveInstr = document.getElementById('saved-event-instructions');
    if(!localStorage.getItem('savedEventNames')){
        newEvent.addClass('hide');
    planner.addClass('hide');
    savedEvents.removeClass('hide');
        saveInstr.innerText='There are no saved events!';
        return;
    }

    saveInstr.innerText='Select a previously saved event and click load to view it!';

    document.getElementById('saved-event-container').innerHTML ='';

    let eventNamesArr = JSON.parse(localStorage.getItem('savedEventNames'));

    for(let i=0;i<eventNamesArr.length;i++){
        displayEventCard(eventNamesArr[i],i);
    }

}

function displayEventCard(eventName, number){
    let cardDiv = document.createElement('div');
    let cardContentDiv = document.createElement('div');
    let eventHeader = document.createElement('h3');
    let loadBtn = document.createElement('btn');

    cardDiv.className='card cyan darken-3';
    cardContentDiv.className='card-content white-text';
    eventHeader.className='center-align';
    loadBtn.className='btn waves-effect waves-light blue load-btn-custom';

    eventHeader.innerText=eventName;
    loadBtn.innerText='Load';
    loadBtn.id=eventName;

    cardContentDiv.appendChild(eventHeader);
    cardContentDiv.appendChild(loadBtn);
    cardDiv.appendChild(cardContentDiv);

    document.getElementById('saved-event-container').appendChild(cardDiv);
    newEvent.addClass('hide');
    planner.addClass('hide');
    savedEvents.removeClass('hide');

}


$(document).on('click','.load-btn-custom',loadEvent);

function loadEvent(){
    let eventName = $(this).attr('id');
    let eventNameArr = JSON.parse(localStorage.getItem('savedEventNames'));
    let eventDetailArr = JSON.parse(localStorage.getItem('savedEventDetails'));
    let eventIndex=eventNameArr.indexOf(eventName);
    let mainText = eventDetailArr[eventIndex];
    let mainEl = $('main');
    mainEl.html('');

    mainEl.html(mainText);

    newEvent = $('#new');
    newEvent.text("Start Over");
    savedEvents = $('#saved');
    planner = $('#planner');
    
    mealClearBtn = $('#clearFood');
    mealContBtn = $('#contFood');

    drinkClearBtn = $('#clearDrink');
    drinkContBtn = $('#contDrink');

    musicClearBtn = $('#clearMusic');
    musicContBtn = $('#contMusic');

    resetBtn = $('#resetBtn');
    saveBtn = $('#saveBtn');

    mealClearBtn.addClass('hide');
    mealContBtn.addClass('hide');
    drinkClearBtn.addClass('hide');
    drinkContBtn.addClass('hide');
    musicClearBtn.addClass('hide');
    musicContBtn.addClass('hide');
    resetBtn.addClass('hide');
    saveBtn.addClass('hide')
    savedEvents.addClass('hide');
    $('#myEvent').addClass('hide');
    


    newLink.click(function(){
        location.reload();
        planner.addClass('hide');
        savedEvents.addClass('hide');
        newEvent.removeClass('hide');
    })
    
    myEventLink.click(function(){
        location.reload();
        newEvent.addClass('hide');
        savedEvents.addClass('hide');
        planner.removeClass('hide');
    })
    
    savedEventsLink.click(function(){
        location.reload();
        // newEvent.addClass('hide');
        // planner.addClass('hide');
        // savedEvents.removeClass('hide');
        loadSavePage();
    })
    
}

// let eventDetails = JSON.parse(localStorage.getItem('savedEventDetails'));
//     let eventDetail = eventDetails[number];
//     $('main').html(eventDetail);