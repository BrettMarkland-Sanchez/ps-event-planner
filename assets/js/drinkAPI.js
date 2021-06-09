//Drink API
let chosenIngredient;
let alcoholIngredients = ['rum', 'vodka', 'bourbon', 'gin', 'tequila'];
let clearDrink = $('#clearDrink');
let contDrink = $('#contDrink');
let drinkCard1 = $('#drinkCard1');
let drinkCard2 = $('#drinkCard2');
let drinkRadio = $('input[name="group1"]');
let drinkCatCard = $('#drink-categories');
//set api endpoint url as variable
let drinkCatURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=`;

// Radio buttons are used to collect user input for drink selection
// API then returns full set of results that get randomly selected for the user

// Progresses the view for the drink card
contDrink.click(function(){
    drinkCard1.addClass('hide');
    let drinkPreference = $('input[name="group1"]:checked').val();

    drinkCard2.removeClass('hide');
})

// Clears user input and resets card view
clearDrink.click(function(){
    drinkCard2.addClass('hide');
    drinkRadio[0].checked = false;
    drinkRadio[1].checked = false;
    drinkCard1.removeClass('hide');
})

function getAPI(drinkPreference){
    if(drinkPreference == 'alcoholic'){
        alcoholIngredients.forEach(element => {
            fetch(drinkCatURL+element)
                .then(response => response.json())
                    .then(data => filldrinkCatArrayAlcoholic(data))
        });
    }else if (drinkPreference == 'non-alocoholic'){

    }
}

// This function reads thru the api data and creates an array of categories
// and an array of the photo links for each category
function filldrinkCatArrayAlocoholic(data){
    
    //create array for category names and image links
    let drinkCatArray = [];
    let drinkCatPhotoLinkArray = [];
    
    //manages IDs for drinks found in API query
    let drinkCatIdDrinkArray = [];
    
    //for each category returned from the API, store the name in drinkCatArray
    //and store the photo link in drinkCatPhotoLinkArray
    for(let i=0;i<=5;i++){
        
        // Drink Name
        drinkCatArray.push(data.categories[i].strDrink);
        
        // Drink Image
        drinkCatPhotoLinkArray.push(data.categories[i].strDrinkThumb);
        
        // Drink ID that can be pushed to the 'lookup details' for the api ----we can push to www.thecocktaildb.com/api/json/v1/1/lookup.php?i=[]
        drinkCatIdDrinkArray.push(data.categories[i].idDrink);
    }
    //pass the name array and the photo link array to the display function
    displaydrinkCatButtons(drinkCatArray,drinkCatPhotoLinkArray);
}

//this function displays the categories by creating elements, filling them
//with the array data, and then appending them to the drink-categories card
function displaydrinkCatButtons(drinkCatArray, drinkCatPhotoLinkArray){
    for(let i=0; i<drinkCatArray.length;i++){
        
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
        drinkCatCard.append(catBtnParent);

        // Inserts a row at the end to complete card section
        if(i == drinkCatArray.length-1){
            drinkCatCard.append(`<div class='row'></div>`);
        }
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