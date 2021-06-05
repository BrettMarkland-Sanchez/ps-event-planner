//Drink API
//set api endpoint url as variable
let drinkCatURL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail';
//set DOM element for drink category cards as variable
let drinkCatCard = $('#drink-categories');
//fetch data from api endpoint
fetch(drinkCatURL)
    //transform response into JSON via .then
    .then(response => response.json())
    //pass JSON data into filldrinkCatArray function
    .then(data => filldrinkCatArray(data));
    
    //this function reads thru the api data and creates an array of categories and an array
    //of the photo links for each category
    function filldrinkCatArray(data){
    //create array for category names and image links
    let drinkCatArray = [];
    let drinkCatPhotoLinkArray =[]
    //for each category returned from the API, store the name in drinkCatArray
    //and store the photo link in drinkCatPhotoLinkArray
    for(let i=0;i<data.categories.length;i++){
        drinkCatArray.push(data.categories[i].strDrink);
        drinkCatPhotoLinkArray.push(data.categories[i].strDrinkThumb);
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
