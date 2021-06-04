//Meal API
let mealCatURL = 'https://www.themealdb.com/api/json/v1/1/categories.php';
let mealCatCard = $('#meal-categories');

fetch(mealCatURL)
    .then(response => response.json())
    .then(data => fillMealCatArray(data));


    function fillMealCatArray(data){
    let mealCatArray = [];
    let mealCatPhotoLinkArray =[]
    for(let i=0;i<data.categories.length;i++){
        mealCatArray.push(data.categories[i].strCategory);
        mealCatPhotoLinkArray.push(data.categories[i].strCategoryThumb);
    }

    displayMealCatButtons(mealCatArray,mealCatPhotoLinkArray);
}

function displayMealCatButtons(mealCatArray, mealCatPhotoLinkArray){
    for(let i=0; i<mealCatArray.length;i++){
        let catBtn = document.createElement('input');
        catBtn.type = 'image';
        catBtn.src = mealCatPhotoLinkArray[i]
        catBtn.setAttribute('style',`background:${mealCatPhotoLinkArray[i]}`);

        mealCatCard.append(catBtn);

    }
}
