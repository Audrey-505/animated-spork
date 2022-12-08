var movieInfo = document.getElementById('movieInfor')
var nxtPage = document.getElementById('nxtPage')

var apiKey = '8c0c06e88273c64c213af99ab1b69d08'

var results
var title
var overview
var posterImg
var released
var filmid
var dataArray

var genreURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`

fetch(genreURL)
.then(function (response){
    return response.json()
})
.then(function (data){
    console.log(data)
    var genreList = data.genres

    populateGenreDropdown(genreList)
})

var populateGenreDropdown = (genreList) => {
    var select = document.getElementById('genreSelec')

    for (var genre of genreList) {
        var option = document.createElement("option");
        option.value = genre.id;
        option.text = genre.name;
        select.appendChild(option);
    }
};


function getGenre(){
var pickedGenre = document.getElementById('genreSelec').value
return pickedGenre
}

function goMovies(){
var genreChoice = getGenre()
discoverURL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${genreChoice}`

fetch(discoverURL)
.then(function (response){
    return response.json()
})
.then(function (data){
    dataArray = data.results
    filmid = dataArray.map(e => e.id)
    console.log(filmid)
    getMovie(filmid)
    $('#movieInfor').html('')
})

function getMovie(filmId){
   var movieURL = `https://api.themoviedb.org/3/movie/${filmId}?api_key=${apiKey}`
   fetch(movieURL)
   .then(function (response){
    return response.json()
   })
   .then(function (data){
    console.log(data)
    title = data.title
    //console.log(title)
    overview = data.overview
    posterImg = data.poster_path
    released = data.release_date
    indivMovie(title, overview, posterImg, released)
   })
}

function indivMovie(t, o, pI, r){
    var baseImgURL = `https://image.tmdb.org/t/p/original/${pI}`
    $(movieInfo).append(`
    <h3>${t}</h3>
    <h4>${r}</h4>
    <div id="poster">
    <img src="${baseImgURL}" alt="movie poster" width="200px" height="250px">
    </div>
    <div id="description">
    <p>${o}</p>
    </div>
    `)
    $(movieInfo).append(`
    <div id="btnHolder">
    <button id="goodR">Thumbs Up</button> 
    <button id="badR">Thumbs Down</button>
    </div>`)
}

function goodValue(event) {
    var eventEl = event.target
    console.log('event: ', eventEl.innerText)
    console.log('data ', filmid)
    var randomFilm = Math.floor(Math.random()*filmid.length)
    console.log('random film', filmid[randomFilm])
    results = filmid[randomFilm];
    if (eventEl.innerText !== 'Thumbs Up'){
        $(movieInfo).html(' ')
        getMovie(results)
    } else {
        var goodFilm = $('#movieInfor')
        localStorage.setItem(results, goodFilm.html())
        $(movieInfo).html(`Added to List!<br>
        <div id="favFilmList"></div>
        <button onclick="goAgain(event)" id="againBtn">Pick A New Genre</button>`)
        var returnMovies = localStorage.getItem(results)
        console.log(returnMovies)
        $('#favFilmList').html(returnMovies)
        $('#btnHolder').html('')
    }
    return 
    }
    
    movieInfo.onclick = goodValue 

}
function goAgain(event){
    event.preventDefault()
    location.reload(); 
    console.log('hello')
}


const API_KEY = '8c0c06e88273c64c213af99ab1b69d08';
const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=8c0c06e88273c64c213af99ab1b69d08&language=en-US`
const IMG_URL = `https://image.tmdb.org/t/p/w500/`
const GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=8c0c06e88273c64c213af99ab1b69d08&language=en-US`

const main = document.getElementById('main')


getMovies(API_URL)

function getMovies(url) {
    fetch(url).then(res => res.json()).then( data => {
            console.log(data.results);
        showMovies(data.results);
        })
}

function showMovies(data){
    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEL = document.createElement('div');
        movieEL.classList.add('movie');
        movieEL.innerHTML = `<img src="${IMG_URL+poster_path}" alt="${title}">
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
  
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>`

        main.append(movieEL);
    })

}

function getColor(vote) {
    if(vote> 6){
        return 'green'
    }else if (vote<=6 ){
        return 'yellow'
    }else if(vote<= 5) {
        return 'red'
    }
}
    
