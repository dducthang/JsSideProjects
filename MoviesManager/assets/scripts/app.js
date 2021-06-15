const startAddMovieButton=document.querySelector('header button');
const addMovieModal = document.getElementById('add-modal');
const backDrop = document.getElementById('backdrop');
const cancelAddMovieModalButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton =  cancelAddMovieModalButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection=document.querySelector('#entry-text');
const movieListElement = document.querySelector('#movie-list');
const deleteMovieModal = document.getElementById('delete-modal');

const movies=[];

const clearInputValue = ()=>{
    for(const input of userInputs)
    {
        input.value='';
    }
}

const showDeleteMovieModal=()=>{
    deleteMovieModal.classList.add('visible');
}
const closeDeleteMovieModal=()=>{
    deleteMovieModal.classList.remove('visible');
}

const confirmDeteleMovie=(movieId)=>{
    deleteMovie(movieId);
    closeDeleteMovieModal();
    toggleBackDrop();
    updateUI();
}

const rejectDeleteMovie =()=>{
    closeDeleteMovieModal();
    toggleBackDrop();
}
const deleteMovieHandler = (movieId)=>{
    showDeleteMovieModal();
    toggleBackDrop();
    const confirmDeleteMovieButton = deleteMovieModal.querySelector('.btn--danger');
    const rejectDeleteMovieButton = confirmDeleteMovieButton.previousElementSibling;

    confirmDeleteMovieButton.addEventListener('click', confirmDeteleMovie.bind(null, movieId));
    rejectDeleteMovieButton.addEventListener('click', rejectDeleteMovie);
    //deleteMovie(movieId);
}



const deleteMovie = id=>{
    let movieIndex =0;
    for(let movie of movies )
    {
        if(movie.id==id){
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    movieListElement.children[movieIndex].remove();
    //movieListElement.removeChild(movieListElement.children[movieIndex]);
}

const updateUI = () =>{
    if(movies.length===0){
        entryTextSection.style.display='block';
    }
    else{
        entryTextSection.style.display='none';
    }
}

const renderMovies= (id, movieTitle, imageUrl, rating)=>{
    const newMovieElement = document.createElement('li');
    newMovieElement.className='movie-element';
    newMovieElement.innerHTML= `
    <div class='movie-element__image '>
        <image src='${imageUrl} alt='${title}>
    </div>
    <div class='movie-element__info'>
        <h2>${movieTitle}</h2>
        <p>${rating}/5 stars</p>
    </div>`
    newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id))
    movieListElement.append(newMovieElement);
}
const addMovieHandler = ()=>{
    let movieTitleValue = userInputs[0].value;
    let imageUrlValue = userInputs[1].value;
    let userRatingValue = userInputs[2].value;

    if( movieTitleValue.trim() ===''|| 
        imageUrlValue.trim() ==='' ||
        userRatingValue.trim() ==='' ||
        +userRatingValue>5 || 
        +userRatingValue<1)
    {
      alert('Please reenter the valid values (movie rating is between 1 and 5)');  
    }
    else{
        let movie={
            id:Math.random().toString(),
            title: movieTitleValue,
            imageUrl:imageUrlValue,
            userRating:userRatingValue
        };
        movies.push(movie);
        cancelAddMovieHandler();
        renderMovies(movie.id, movie.title,movie.imageUrl, movie.userRating);
        updateUI();
    }
}

const toggleBackDrop= ()=>{
    backDrop.classList.toggle('visible');
}

const backDropCLickHandler=()=>{
    closeAddMovieModal();
    closeDeleteMovieModal();
    clearInputValue();
    toggleBackDrop();
}

const removeBackDrop=()=>{
    backDrop.classList.remove('visible');
    
}

const popUpBackDrop=()=>{
    backDrop.classList.add('visible');
}

const showAddMovieModal = ()=>{
    addMovieModal.classList.add('visible');
}
const closeAddMovieModal=()=>{
    addMovieModal.classList.remove('visible');
}
const cancelAddMovieHandler = () =>{
    closeAddMovieModal();
    toggleBackDrop();
    clearInputValue();
}
const showAddMovieModalHandler =()=>{
    showAddMovieModal();
    toggleBackDrop();
}
cancelAddMovieModalButton.addEventListener('click', cancelAddMovieHandler);
backDrop.addEventListener('click', backDropCLickHandler);
startAddMovieButton.addEventListener('click', showAddMovieModalHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);
