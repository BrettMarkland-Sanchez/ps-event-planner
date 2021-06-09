//Meal API Using MealDB API
//set api endpoint url as variable
let mealCatURL = 'https://www.themealdb.com/api/json/v1/1/categories.php';

    //set DOM element for meal category cards as variable
    let mealCatCard = $('#meal-categories');
    let mealCard2 = $('#mealCard2');

//fetch data from api endpoint
fetch(mealCatURL)

//transform response into JSON
    .then(response => response.json())

//pass JSON data into fillMealCatArray function
    .then(data => fillMealCatArray(data));

/*this function reads thru the api data and creates an array of categories and an array
of the photo links for each category*/
    function fillMealCatArray(data){

//create array for category names and image links
    let mealCatArray = [];
    let mealCatPhotoLinkArray =[];

/*for each category returned from the API, store the name in mealCatArray
and store the photo link in mealCatPhotoLinkArray*/
    for(let i=0;i<data.categories.length;i++){
        if(data.categories[i].strCategory==='Goat'){
        } else if(data.categories[i].strCategory==='Vegan'){
        } else {
        mealCatArray.push(data.categories[i].strCategory);
        if(data.categories[i].strCategory == 'Chicken'){
            mealCatPhotoLinkArray.push('https://www.themealdb.com/images/ingredients/Chicken.png');
        }
        else mealCatPhotoLinkArray.push(data.categories[i].strCategoryThumb);
    }
}
//PASS the name array and the photo link array to the display function
    displayMealCatButtons(mealCatArray,mealCatPhotoLinkArray);
}

//this FUNCTION displays the categories by CREATING elements, filling them
//with the array data, and then appending them to the meal category card
    function displayMealCatButtons(mealCatArray, mealCatPhotoLinkArray){
    for(let i=0; i<mealCatArray.length;i++){
        
// Create parent div for formatting images with text to display correctly
        let catBtnParent = document.createElement('div');
        catBtnParent.setAttribute('class','mealCat col s6 m4 l3');
        catBtnParent.setAttribute('id',`${mealCatArray[i]}`);
        catBtnParent.setAttribute('style',`padding-bottom:.5em`);

// Create/add image to parent
        let catBtn = document.createElement('img');
        catBtn.src = mealCatPhotoLinkArray[i];
        catBtn.setAttribute('style',`background:${mealCatPhotoLinkArray[i]}; width:120px; height:100px`);
        catBtnParent.append(catBtn);

// Create/add text to parent
        let catBtnText = document.createElement('p');
        catBtnText.innerText = `${mealCatArray[i]}`;
        catBtnParent.append(catBtnText);

// Add parent to card
        mealCatCard.append(catBtnParent);

// Inserts a row at the end to complete card section
        if(i == mealCatArray.length-1){
            mealCatCard.append(`<div class='row'></div>`);
        }
    }
}

let mealCatSelect = [];

// Event listeners based on the mealCat class that process user input
$(document).on('click','.mealCat',function(){
    
    // 'this' represents only the element that triggered the event, used here to save the ID
    let elementID = $(this).attr('id');
    // selected class adds a border for visibility
    if(mealCatSelect.length<5 || $(this).attr('class').includes('selected')){
    $(this).toggleClass('selected','');
    // determines whether the id is already in the mealCatSelect array and if so, splice, if not, push
    if(mealCatSelect.find(element => element == `${elementID}`)){
        mealCatSelect.splice((mealCatSelect.findIndex(element => element == `${elementID}`)), 1);
    } else mealCatSelect.push(`${elementID}`);
}
});

// Page 2 logic

let mealClearBtn = $('#clearFood');
let mealContBtn = $('#contFood');

mealContBtn.on('click',contClick);
mealClearBtn.on('click',clearClick);


function contClick(){
    if(mealCatSelect.length){
        let totalCat = mealCatSelect.length;
        let mealsPerCat = 4;
   
        for(let i=0;i<mealCatSelect.length;i++){

        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealCatSelect[i]}`)
            .then(response=>response.json())
            .then(data=>getAndDisplayMeals(data,mealsPerCat));
    }
    mealContBtn.addClass('disabled');
    }
}

function clearClick(){
    mealCatCard.attr('class','section card-action center-align');
    mealCard2.attr('class','section card-action center-align hide');
    mealCatSelect =[];
    $('.selected').removeClass('selected');
    mealCard2.html(' ');

    mealContBtn.removeClass('disabled');

    $('#food-instructions').text('Please select up to five categories for your menu suggestions:');


}

function getAndDisplayMeals(data,mealsPerCat){
    let totalMeals = data.meals.length;
    if(totalMeals<mealsPerCat){
        mealsPerCat = totalMeals;
    }
    let mealArr =[];
    for(let i=0;i<mealsPerCat;i++){
        let randMeal = Math.floor(Math.random()*totalMeals);
        if(mealArr.includes(data.meals[randMeal])){
            i--;
        } else {
        mealArr.push(data.meals[randMeal]);
        }
    }

    for(let i=0; i<mealArr.length;i++){
        
        // Create parent div for formatting images with text to display correctly
        let mealCardParent = document.createElement('div');
        mealCardParent.setAttribute('class','mealCard col s6 m4 l3');
        mealCardParent.setAttribute('id',`${mealArr[i].strMeal}`);
        mealCardParent.setAttribute('style',`padding-bottom:.5em`);

        // Create/add image to parent
        let mealImg = document.createElement('img');
        mealImg.src = mealArr[i].strMealThumb;
        mealImg.setAttribute('style',`background:${mealArr[i].strMealThumb}; width:120px; height:100px`);
        mealCardParent.append(mealImg);

        // Create/add text to parent
        let mealText = document.createElement('p');
        mealText.innerText = `${mealArr[i].strMeal}`;
        mealCardParent.append(mealText);

        // Add parent to card
        mealCard2.append(mealCardParent);

        if(mealCatSelect.length===1){
            $('#food-instructions').text('Here are a few ideas for the category you selected!')

        } else {
        $('#food-instructions').text('Here are a few ideas for each of the categories you selected!')
        }
        mealCatCard.attr('class','section card-action center-align hide');
        mealCard2.attr('class','row section card-action center-align');

    }
}

