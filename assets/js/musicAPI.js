let playlistKeywordsArea = document.getElementById('playlist-keywords');
let musicContinue = document.getElementById('music-continue-btn');

let client_id = '76df893ec1954a35913752b0bf902564';
let client_secret = '3f2775f60e934f7eb0fc83f3c7d2f497';
let grant_type = 'client_credentials';
let url = 'https://accounts.spotify.com/api/token';
let encodedClientIdClientSecret = btoa(client_id+':'+client_secret);
let authorization = 'Basic ' + encodedClientIdClientSecret;

let myHeaders = new Headers();
myHeaders.append('Authorization',authorization);
myHeaders.append('Content-Type','application/x-www-form-urlencoded');

let urlencoded = new URLSearchParams();
urlencoded.append('grant_type',grant_type);

let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
};


musicContinue.addEventListener('click',searchKeywords());

function searchKeywords(){
    let keywords = playlistKeywordsArea.value;

    fetch(url,requestOptions)
        .then(response=>response.json())
        .then(result=>getPlaylists(keywords,result));

}


function getPlaylists(results) {

}