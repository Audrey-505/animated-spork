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
    

fetch(GENRE_URL)
.then(function (response){
    return response.json()
})
.then(function (data){
    //console.log(data)
    var genreList = data.genres
    var names = genreList.map(e => e.name)
    //console.log(names)
    genreMovies(names)
})

function genreMovies(a){
$(genreSelect).append(`
    <label for="genreSelec">Pick A Genre</label>
    <select class="form-control" onchange="" id="genreSelec">
    <option>Select A Genre</option>
    ${a.map(e => {
        //console.log(e)
    return `<option>${e}</option>`
    })}
 `)
}



function discoverMovies(f, i, g, p){
    $(movieInfo).append(`
    <thead>
       <tr>
         <th scope="col">Movie Title</th>
       </tr>
     </thead>
     <tbody>
       <tr>
       ${f.map(e => {
           return `<td>${e}</td>`
       })}
    `)
    $(movieInfo).append(`
    <thead>
       <tr>
         <th scope="col">Description</th>
       </tr>
     </thead>
     <tbody>
       <tr>
       ${i.map(e => {
           return `<td>${e}</td>`
       })}
    `)
    $(movieInfo).append(`
   <thead>
       <tr>
         <th scope="col">Release Date</th>
       </tr>
     </thead>
     <tbody>
       <tr>
       ${g.map(e => {
           return `<td>${e}</td>`
       })}
   `)
   $(movieInfo).append(`
   <thead>
       <tr>
         <th scope="col">Poster</th>
       </tr>
     </thead>
     <tbody>
       <tr>
   ${p.map(e => {
       var baseImgURL = `https://image.tmdb.org/t/p/original/${e}`
       return `<td><img src="${baseImgURL}" alt="movie poster"></td>`
   })}
   `)
   }
