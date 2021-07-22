const addMovieButton = document.getElementById('add-movie-btn');
const searchMovieButton = document.getElementById('search-btn');
const movieList = document.getElementById('movie-list');
let movies =[];

const addMovieHandler = ()=>{
    const title = document.getElementById('title').value;
    const extraName = document.getElementById('extra-name').value;
    const extraValue = document.getElementById('extra-value').value;

    if(title.trim()==''){
        alert('Title must be filled in!!!!');
        return;
    }
    const movie={
        info: {
            title,
            [extraName]:extraValue
        },
        id: Math.random()
    }

    movies.push(movie);
    document.getElementById('title').value = '';
    document.getElementById('extra-name').value = ''
    document.getElementById('extra-value').value =''
    renderMovieList(movie.info.title)
}

addMovieButton.addEventListener('click', addMovieHandler);

function renderMovieList(filter=''){
    if(movies.length===0)
        movieList.classList.remove('visible');
    else 
        movieList.classList.add('visible');

    const filteredMovie = filter==''?movies:movies.filter(movie=>movie.info.title.includes(filter));

    filteredMovie.forEach(movie=>{
        let newMovie = document.createElement('li');
        const {info} = movie;
        let text = info.title;
        for(let key in info){
            if(key!='title')
                text+=`\n${key}: ${info[key]}`;
        }
        newMovie.innerText=text;
        movieList.append(newMovie);
    })
}

const searchMovieHandler = ()=>{
    const filter = document.getElementById('filter-title').value;
    movieList.innerHTML='';
    renderMovieList(filter);
}

searchMovieButton.addEventListener('click', searchMovieHandler);


