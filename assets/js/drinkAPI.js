//Drink API
let clearDrink = $('#clearDrink');
let contDrink = $('#contDrink');
let drinkCard1 = $('#drinkCard1');
let drinkCard2 = $('#drinkCard2');
let drinkRadio = $('input[name="group1"]');
let drinkInstructions = $('#drink-instructions');
//set api endpoint url as variable
let drinkCatURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=`;

let drinkPreference;

// Radio buttons are used to collect user input for drink selection
// API then returns full set of results that get randomly selected for the user

// Progresses the view for the drink card
contDrink.click(function(){
    drinkPreference = $('input[name="group1"]:checked').val();
    if(drinkPreference){
        getAPI(drinkPreference);
        drinkCard1.addClass('hide');
        drinkCard2.removeClass('hide');
        contDrink.prop("disabled", true);
    }
})

// Clears user input and resets card view
clearDrink.click(function(){
    drinkCard2.html('');
    drinkCard2.addClass('hide');
    drinkRadio[0].checked = false;
    drinkRadio[1].checked = false;
    drinkInstructions.text('Please select a drink preference to receive your menu suggestions:')
    drinkCard1.removeClass('hide');
    contDrink.prop("disabled", false);
})

// Create arrays for drink names and image links
let drinkArr = [];
let drinkArrPhotos = [];

function getAPI(drinkPreference){
    fetch(drinkCatURL+drinkPreference)
        .then(response => response.json())
            .then(data => fillDrinkArr(data))
                .then(function(){
                    //pass the name array and the photo link array to the display function
                    displayDrinks(drinkArr,drinkArrPhotos);
                })
};

// This function reads thru the api data and creates an array of categories
// and an array of the photo links for each category
function fillDrinkArr(data){
   
    // Create arrays for drink names and image links
    drinkArr = [];
    drinkArrPhotos = [];

    //for each drink returned from the API, store the name in drinkArr
    //and store the photo link in drinkArrPhotos
    // Gets a random number from the total number of drinks once
    var totalDrinks = data.drinks.length;

    for(let i=0;i<20;i++){
        let randDrink = Math.floor(Math.random()*totalDrinks);
        if(drinkArr.includes(data.drinks[randDrink].strDrink)){
            i--;
        }else if(data.drinks[randDrink].strDrink.length > 20){
            i--;
        }else{
            // Drink Name
            drinkArr.push(data.drinks[randDrink].strDrink);
            // Drink Image
            drinkArrPhotos.push(data.drinks[randDrink].strDrinkThumb);
        }
    }

    drinkInstructions.text('Here are your drink ideas for the drink preference you selected!')
}
    


//this function displays the categories by creating elements, filling them
//with the array data, and then appending them to the drink-categories card
function displayDrinks(drinkCatArray, drinkCatPhotoLinkArray){
    for(let i=0; i<drinkCatArray.length;i++){
        debugger
        // Create parent div for formatting images with text to display correctly
        let catBtnParent = document.createElement('div');
        catBtnParent.setAttribute('class','col s6 m4 l3');
        catBtnParent.setAttribute('id',`${drinkCatArray[i]}`);
        catBtnParent.setAttribute('style',`padding-bottom:.5em`);

        // Create/add image to parent
        let catBtn = document.createElement('img');
        catBtn.src = drinkCatPhotoLinkArray[i];
        catBtn.setAttribute('style',`background:${drinkCatPhotoLinkArray[i]}; width:120px; height:100px`);
        catBtnParent.append(catBtn);

        // Create/add text to parent
        let catBtnText = document.createElement('p');
        catBtnText.innerText = `${drinkCatArray[i]}`;
        catBtnParent.append(catBtnText);

        // Add parent to card
        drinkCard2.append(catBtnParent);

    }
}

////////////////////////////////////////////////////////////////////////////////////
// First Prompt: Alcoholic(Continue the prompt to pre selected ingredients) or
// Non-Alcoholic(End questions and pull 4-6 drinks from "www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic")
//Use [Math.floor(Math.random() * arr.length)] to return a random drink from the provided array

// This code can take care of our random 5 or so drink recommendations for the user

//const originalArray = $[Have this be the returned api array];

// The value of n will be the amount of items returned from the array

//const randomSelection = (n) => {
//    let newArr = [];
//    if (n >= originalArray.length) {
//      return originalArray;
//    }
//    for (let i = 0; i < n; i++) {
//      let newElem = originalArray[Math.floor(Math.random() * originalArray.length)];
//      while (newArr.includes(newElem)) {
//        newElem = originalArray[Math.floor(Math.random() * originalArray.length)];
//      }
//      newArr.push(newElem);
//    }
//    return newArr;
//  }
//  console.log(randomSelection(5));