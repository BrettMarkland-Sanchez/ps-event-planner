let playlistKeywordsArea = document.getElementById('playlist-keywords');
let musicContinue = document.getElementById('music-continue-btn');

let client_id = '76df893ec1954a35913752b0bf902564';
let client_secret = '3f2775f60e934f7eb0fc83f3c7d2f497';
let grant_type = 'client_credentials';
let url = 'https://accounts.spotify.com/api/token';
let encodedClientIdClientSecret = btoa(client_id+':'+client_secret);
let authorization = 'Basic ' + encodedClientIdClientSecret;

let myHeaders = new Headers();
//myHeaders.append('Authorization',authorization);
myHeaders.append('Content-Type','application/x-www-form-urlencoded');

let urlencoded = new URLSearchParams();
urlencoded.append('grant_type',grant_type);
urlencoded.append("client_id",client_id);
urlencoded.append("client_secret",client_secret);

let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
};


musicContinue.addEventListener('click',searchKeywords);

function searchKeywords(){
    let keywords = playlistKeywordsArea.value;

    fetch(url,requestOptions)
        .then(response=>response.json())
        .then(result=>getPlaylists(keywords,result));

}


function getPlaylists(keywords,results) {
    let searchQuery = encodeURI(keywords);
    let access_token = results.access_token;
    let token_type = results.token_type;

    const playlistURL = `https://api.spotify.com/v1/search?q=${searchQuery}&type=playlist&market=US&limit=6`;


    let mySearchHeaders = new Headers();

    mySearchHeaders.append('Content-Type','application/json');
    mySearchHeaders.append('Authorization',`${token_type} ${access_token}`);

    let searchRequestOptions={
        method:'GET',
        headers:mySearchHeaders,
        redirect:'follow'
    };

    fetch(playlistURL,searchRequestOptions)
        .then(response=>response.json())
        .then(result=>displayPlaylists(result));



}

function displayPlaylists(result){
    console.log(result.playlists.items);
    document.getElementById('music-card').innerText='';

    for(let i=0; i<result.playlists.items.length;i++){
        let plBtn = document.createElement('input');
        plBtn.type = 'image';
        plBtn.src = result.playlists.items[i].images[0].url;
        plBtn.setAttribute('style',`background:${result.playlists.items[i].images[0].url}; width:150px;height:150px;`);


        document.getElementById('music-card').appendChild(plBtn);
    }
}