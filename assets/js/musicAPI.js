let playlistKeywordsArea = document.getElementById('playlist-keywords');
let musicContinue = document.getElementById('contMusic');

//prep all variables for auth token
let client_id = '76df893ec1954a35913752b0bf902564';
let client_secret = '3f2775f60e934f7eb0fc83f3c7d2f497';
let grant_type = 'client_credentials';
let url = 'https://accounts.spotify.com/api/token';
let encodedClientIdClientSecret = btoa(client_id + ':' + client_secret);
let authorization = 'Basic ' + encodedClientIdClientSecret;
let token_type;
let access_token;

//set headers
let myHeaders = new Headers();
//myHeaders.append('Authorization',authorization);
myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

//set body
let urlencoded = new URLSearchParams();
urlencoded.append('grant_type', grant_type);
urlencoded.append("client_id", client_id);
urlencoded.append("client_secret", client_secret);


//set request options
let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
};

//event listener for click of search button
musicContinue.addEventListener('click', searchKeywords);

//when search is clicked this function runs
function searchKeywords() {
    let keywords = playlistKeywordsArea.value;

    //get auth token and call get playlists function
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => getPlaylists(keywords, result));
}

//this function receives the search keywords and results of auth api
function getPlaylists(keywords, results) {

    //prep search data for playlist API
    let searchQuery = encodeURI(keywords);
    access_token = results.access_token;
    token_type = results.token_type;

    const playlistURL = `https://api.spotify.com/v1/search?q=${searchQuery}&type=playlist&market=US&limit=3`;

    let mySearchHeaders = new Headers();
    mySearchHeaders.append('Content-Type', 'application/json');
    mySearchHeaders.append('Authorization', `${token_type} ${access_token}`);

    let searchRequestOptions = {
        method: 'GET',
        headers: mySearchHeaders,
        redirect: 'follow'
    };

    //call playlist api and send results to diplay playlists function
    fetch(playlistURL, searchRequestOptions)
        .then(response => response.json())
        .then(result => displayPlaylists(result));
}

//this function diplays the playlists on the page
function displayPlaylists(result) {
    console.log(result.playlists.items);
    let playlistNameArr = [];
    let playlistImgArr = [];

    //prep html
    $('#music-card').addClass('hide');
    $('#music-card-content').removeClass('hide');
    $('#music-instructions').text('Here are a few playlists you might enjoy!');
    $('#contMusic').addClass('disabled');

    //for each playlist returned run this loop
    for (let i = 0; i < result.playlists.items.length; i++) {
        playlistNameArr.push(result.playlists.items[i].name);
        playlistImgArr.push(result.playlists.items[i].images[0].url);

        //lines 98-142 are creating the html elements and putting them into the page
        let playlistDiv = document.createElement('div');
        playlistDiv.className = 'col s12 m6 l4';
        document.getElementById('music-card-content').appendChild(playlistDiv);

        let plCard = document.createElement('div');
        plCard.className = 'card hoverable'
        playlistDiv.appendChild(plCard);

        let playlistCardDiv = document.createElement('div');
        playlistCardDiv.className = 'card small';
        plCard.appendChild(playlistCardDiv);

        let playlistImgDiv = document.createElement('div');
        playlistImgDiv.className = 'card-image waves-effect waves-block waves-light';
        playlistCardDiv.appendChild(playlistImgDiv);

        let plImage = document.createElement('img');
        plImage.className = 'activator';
        plImage.src = result.playlists.items[i].images[0].url;
        playlistImgDiv.appendChild(plImage);

        let playlistContentCard = document.createElement('div');
        playlistContentCard.className = 'card-content';
        playlistCardDiv.appendChild(playlistContentCard);

        let titleSpan = document.createElement('span');
        titleSpan.className = 'card-title activator grey-text text-darken-4';
        titleSpan.innerHTML = result.playlists.items[i].name + '<i class=\'material-icons right\'>more_vert</i>';
        playlistContentCard.appendChild(titleSpan);

        let trackDiv = document.createElement('div');
        trackDiv.className = 'card-reveal';
        playlistCardDiv.appendChild(trackDiv);

        let revealSpan = document.createElement('span');
        revealSpan.className = 'card-title grey-text text-darken-4';
        revealSpan.innerHTML = 'Top 5 Tracks<i class =\'material-icons right\'>close</i>';
        trackDiv.appendChild(revealSpan);

        let trackList = document.createElement('ol');
        trackList.id = 'track-list' + i;
        trackDiv.appendChild(trackList);

        //when populating tracks in cards, call getTrackList function
        //getTrackList returns a promise which then needs to be read and
        //passed to createSampleTrackList
        getTrackList(result.playlists.items[i]).then(data => createSampleTrackList(data, i));
    }
}

//this function populates the first five tracks of a playlist in the card
function getTrackList(item) {
    let trackURL = item.tracks.href;
    let mySearchHeaders = new Headers();
    mySearchHeaders.append('Content-Type', 'application/json');
    mySearchHeaders.append('Authorization', `${token_type} ${access_token}`);
    let searchRequestOptions = {
        method: 'GET',
        headers: mySearchHeaders,
        redirect: 'follow'
    };
    return fetch(trackURL, searchRequestOptions).then(response => response.json());
}

//create the sameple track list elements to add to page
function createSampleTrackList(data, playlistNum) {
    let returnArr = [];
    //for the first 5 tracks
    for (let i = 0; i < 5; i++) {
        //add name and artist to array
        returnArr.push('"' + data.items[i].track.name + '" by ' + data.items[i].track.artists[0].name);
        //create html element and add to page
        let listItem = document.createElement('li');
        listItem.setAttribute('style', 'color:black;margin:30px;')
        listItem.innerText = returnArr[i];
        let trackList = document.getElementById('track-list' + playlistNum);
        trackList.appendChild(listItem);
    }
}

//logic to clear search
let musicClearBtn = $('#clearMusic');
musicClearBtn.on('click', clearMusicClick);

//function to run on clear click
function clearMusicClick() {
    $('#music-card').removeClass('hide');
    $('#music-card-content').addClass('hide');
    $('#music-card-content').html('');
    $('#music-instructions').text('For playlist recommendations, please enter a few keywords:');
    playlistKeywordsArea.value = '';
    $('#contMusic').removeClass('disabled');
}