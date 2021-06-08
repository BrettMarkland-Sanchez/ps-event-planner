//Drink API
let chosenIngredient;
let alcoholIngredients = ['rum', 'vodka', 'bourbon', 'gin', 'tequila'];
let clearDrink = $('#clearDrink');
let contDrink = $('#contDrink');
let drinkCard1 = $('#drinkCard1');
let drinkCard2 = $('#drinkCard2');
let drinkRadio = $('input[name="group1"]');

//set api endpoint url as variable
let drinkCatURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=`;

//set DOM element for drink category cards as variable
let drinkCatCard = $('#drink-categories');
//fetch data from api endpoint

// Radio buttons are used to collect user input for drink selection
// API then returns full set of results that get randomly selected for the user
clearDrink.click(function(){
    drinkCard2.addClass('hide');
    drinkRadio[0].checked = false;
    drinkRadio[1].checked = false;
    drinkCard1.removeClass('hide');
})

$('input[name="group1"]:checked').val();

/***********************Code Ideas***************************
 * 
fetch(drinkCatURL+`${chosenIngredient}`)
    //transform response into JSON via .then
    .then(response => response.json())
    //pass JSON data into filldrinkCatArray function
    .then(data => filldrinkCatArray(data));

    //this function reads thru the api data and creates an array of categories and an array
    //of the photo links for each category
    function filldrinkCatArray(data){
    //create array for category names and image links
    let drinkCatArray = [];
    let drinkCatPhotoLinkArray = [];

    //manages IDs for drinks found in API query
    let drinkCatIdDrinkArray = [];
    //for each category returned from the API, store the name in drinkCatArray
    //and store the photo link in drinkCatPhotoLinkArray
    for(let i=0;i<data.categories.length;i++){
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
//with the array data, and then appending them to the drink category card
function displaydrinkCatButtons(drinkCatArray, drinkCatPhotoLinkArray){
    for(let i=0; i<drinkCatArray.length;i++){
        let catBtn = document.createElement('input');
        catBtn.type = 'image';
        catBtn.src = drinkCatPhotoLinkArray[i]
        catBtn.setAttribute('style',`background:${drinkCatPhotoLinkArray[i]}`);

        drinkCatCard.append(catBtn);
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
*
********************************************************/