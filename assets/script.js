var movieInfo = document.getElementById('movieInfor')
var nxtPage = document.getElementById('nxtPage')
//var movieList = JSON.parse(localStorage.getItem('movieList'))|| []

var apiKey = '8c0c06e88273c64c213af99ab1b69d08'

var genreURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`

var results

var title;
var overview;
var posterImg;
var released;

var filmid;

var dataArray;
var currentData = 0

fetch(genreURL)
.then(function (response){
    return response.json()
})
.then(function (data){
    console.log(data)
    var genreList = data.genres
    //console.log(genreList)
    // let array = [
    //     {foo: 1, bar: 2},
    //     {foo: 3, bar: 4}
    // ]
    //   console.log(array.map( e => e.foo ))
    //console.log((genreList.map(e => e.name)))
    var names = genreList.map(e => e.name)
    var id = genreList.map(r => r.id)
    //console.log(names)
    //console.log(ids)
    //genreMovies(names) WORKING
    //return genreList
    //genreMovies(genreList)
    //genreId(ids)
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

function eraseGenre(){
    $('#genreSelect').addClass('genreHide')
}

function getGenre(){
var pickedGenre = document.getElementById('genreSelec').value
return pickedGenre
}

// https://api.themoviedb.org/3/discover/movie?api_key=8c0c06e88273c64c213af99ab1b69d08&language=en-US&page=10
function goMovies(){
var genreChoice = getGenre()
discoverURL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${genreChoice}`

fetch(discoverURL)
.then(function (response){
    return response.json()
})
.then(function (data){
    //console.log(data)
    dataArray = data.results
    var titles = dataArray.map(e => e.title)
    var overview = dataArray.map(e => e.overview)
    var releaseDate = dataArray.map(e => e.release_date)
    var poster = dataArray.map(e => e.poster_path)
    filmid = dataArray.map(e => e.id)
    console.log(filmid)
    //getMovie(filmid)
    getMovie(filmid)
    //discoverMovies(titles, overview, releaseDate, poster)
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
    <img src="${baseImgURL}" alt="movie poster">
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
    //var targetFilm = getMovie() 
    if (eventEl.innerText !== 'Thumbs Up'){
        $(movieInfo).html(' ')
        getMovie(results)
    } else {
        var goodFilm = $('#movieInfor')
        //console.log(goodFilm.html())
        //movieList.push(JSON.stringify(goodFilm.html()))
        //localStorage.setItem('movieList', movieList)
        localStorage.setItem(results, goodFilm.html())
        $(movieInfo).html(`Added to List!<br>
        <div id="favFilmList"></div>
        <button onclick="goAgain(event)" id="againBtn">Pick A New Genre</button>`)
        //console.log(results)
        var returnMovies = localStorage.getItem(results)
        console.log(returnMovies)
        $('#favFilmList').html(returnMovies)
        $('#btnHolder').html('')
        // var returnMovies = JSON.parse(localStorage.getItem('movieList'))
        // for (var i=0; i < returnMovies.length; i++){
        //     $('#favFilmList').append(returnMovies[i])
        // }
        //localStorage.setItem(results, getMovie(results))
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
// const GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=8c0c06e88273c64c213af99ab1b69d08&language=en-US`

const main = document.getElementById('main')


getMovies(API_URL)

function getMovies(url) {
    fetch(url).then(res => res.json()).then( data => {
            console.log(data.results, "here");
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
          <span class="${getColor(vote_average)}" >${vote_average}</span>
        </div>
  
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>`

        main.append(movieEL);
     
    })

}

function getColor(vote) {
    
    if(vote > 6){
        return "green"
    }else if (vote <= 6 ){
        return "yellow"
    }else {
        return "red"
        
    }
}
    

// fetch(GENRE_URL)
// .then(function (response){
//     return response.json()
// })
// .then(function (data){
//     //console.log(data)
//     var genreList = data.genres
//     var names = genreList.map(e => e.name)
//     //console.log(names)
//     genreMovies(names)
// })

// function genreMovies(a){
// $(genreSelect).append(`
//     <label for="genreSelec">Pick A Genre</label>
//     <select class="form-control" onchange="" id="genreSelec">
//     <option>Select A Genre</option>
//     ${a.map(e => {
//         //console.log(e)
//     return `<option>${e}</option>`
//     })}
//  `)
// }
