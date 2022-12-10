var movieInfo = document.getElementById('movieInfor')
var nxtPage = document.getElementById('nxtPage')

var apiKey = '8c0c06e88273c64c213af99ab1b69d08'

var genreURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
var movieProviders = `https://api.themoviedb.org/3/movie/403/watch/providers?api_key=${apiKey}`
var trendingMovies = `https://api.themoviedb.org/3/movie/403?api_key=${apiKey}`

var results;
var title;
var overview;
var posterImg;
var released;
var filmid;
var dataArray;


var returnMovies = localStorage.getItem(results)
if (!returnMovies) {
    returnMovies = []
} else {
    for (i = 0; i < returnMovies.title.length; i++) {
        $('#favFilmList').html(title[i])
    }
}


fetch(genreURL)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
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

function eraseGenre() {
    $('#genreSelect').addClass('genreHide')
}

function getGenre() {
    var pickedGenre = document.getElementById('genreSelec').value
    return pickedGenre
}

function goMovies() {
    var genreChoice = getGenre()
    discoverURL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${genreChoice}`

    fetch(discoverURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            dataArray = data.results
            filmid = dataArray.map(e => e.id)
            console.log(filmid)
            getMovie(filmid)
            $('#movieInfor').html('')
            $('#start').html('')

        })

    function getMovie(filmId) {
        var movieURL = `https://api.themoviedb.org/3/movie/${filmId}?api_key=${apiKey}`
        fetch(movieURL)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                console.log(data)
                title = data.title
                overview = data.overview
                posterImg = data.poster_path
                released = data.release_date
                indivMovie(title, overview, posterImg, released)
            })
    }

    function indivMovie(t, o, pI, r) {
        var baseImgURL = `https://image.tmdb.org/t/p/original/${pI}`
        $(movieInfo).append(`<div id="minder-sec">
    <div id="poster">
    <img id="minder-img" src="${baseImgURL}" alt="movie poster" width="300px" height="400px">
    </div>
    <div id="description">
    <h3 id="minder-title">${t}</h3>
    <h4 id="minder-date">${moment(`${r}`).format("YYYY")}</h4>
    <p id="minder-desc">${o}</p>
    </div>
    `)
        $(movieInfo).append(`
    <div id="btnHolder">
    <button id="goodR" class="btn btn-success">Thumbs Up <i class="fa-solid fa-thumbs-up"></i></button>
    <button id="badR" class="btn btn-danger">Thumbs Down <i class="fa-solid fa-thumbs-down"></i></button>
    </div>`)
    }

    function goodValue(event) {
        var eventEl = event.target
        console.log('event: ', eventEl.innerText)
        console.log('data ', filmid)
        var randomFilm = Math.floor(Math.random() * filmid.length)
        console.log('random film', filmid[randomFilm])
        results = filmid[randomFilm];
        if (eventEl.innerText !== 'Thumbs Up ') {
            $(movieInfo).html(' ')
            getMovie(results)
        } else {
            var goodFilm = $('#movieInfor')
            if (returnMovies.includes(title) == false) {
                returnMovies.push(title)
                localStorage.setItem(results, goodFilm.html())
                $(movieInfo).html(`
        <div id="favFilmList"></div>
        <div class="d-flex justify-content-center">
        <button onclick="goAgain(event)" id="againBtn">Find New Matches</button>
        </div>
        <div class="d-flex justify-content-center"><h5>Your Top Matches!<br>${returnMovies}</h5></div>`)
            }
            console.log(returnMovies)
            $('#btnHolder').html('')
        }
        return
    }
    movieInfo.onclick = goodValue
}

function goAgain(event) {
    event.preventDefault()
    location.reload();
    console.log('hello')
}

const API_KEY = '8c0c06e88273c64c213af99ab1b69d08';
const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=8c0c06e88273c64c213af99ab1b69d08&language=en-US`
const IMG_URL = `https://image.tmdb.org/t/p/w500/`
const GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=8c0c06e88273c64c213af99ab1b69d08&language=en-US`
var searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=8c0c06e88273c64c213af99ab1b69d08&query=`
var main = document.getElementById('main')
var form = document.getElementById('form')
var search = document.getElementById('search')

getMovies(API_URL)

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showMovies(data.results);
    })
}

function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieEL = document.createElement('div');
        movieEL.classList.add('movie');
        movieEL.innerHTML = `<img src="${IMG_URL + poster_path}" alt="${title}">
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

form.addEventListener('submit', (e) => {
    e.preventDefault()
    var searchValue = search.value
    if (searchValue && searchValue !== '') {
        getMovies(searchUrl + searchValue)
        searchValue = ''
    } else {
        window.location.reload()
    }
})

function getColor(vote_average) {
    if (vote_average > 7) {
        return 'green'
    } else if (vote_average <= 6) {
        return 'red'
    } else if (vote_average <= 7) {
        return 'yellow'
    }
}

