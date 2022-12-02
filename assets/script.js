var genreSelect = document.getElementById('genreSelect')

var apiKey = '8c0c06e88273c64c213af99ab1b69d08'

var genreURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`

fetch(genreURL)
.then(function (response){
    return response.json()
})
.then(function (data){
    //console.log(data)
    var genreList = data.genres
    console.log(genreList)
    // let array = [
    //     {foo: 1, bar: 2},
    //     {foo: 3, bar: 4}
    // ]
    //   console.log(array.map( e => e.foo ))
    console.log((genreList.map(e => e.name)))
    var names = genreList.map(e => e.name)
    console.log(names)
    genreMovies(names)
})

function genreMovies(a){
    $(genreSelect).append(`
        <label for="genreSelec">Pick A Genre</label>
        <select class="form-control" onchange="" id="genreSelec">
        <option>Select A Genre</option>
        ${a.map(e => {
            console.log(e)
        return `<option>${e}</option>`
        })}
     `)
    }

    discoverURL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US`

fetch(discoverURL)
.then(function (response){
    return response.json()
})
.then(function (data){
    console.log(data)
    var dataArray = data.results
    var titles = dataArray.map(e => e.title)
    var overview = dataArray.map(e => e.overview)
    discoverMovies(titles, overview)
})

function discoverMovies(f, i){
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
}