const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

//NASA API
const count = 2;
const apiKey='DEMO_KEY';
const apiUrl= `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;
let resultArray = [];
let favorites = {};

function setLoader(state){
    if(state==='hidden')
        loader.classList.add('hidden');
    else 
        loader.classList.remove('hidden');
}

function createDOM(page){
    array = page==='results'?resultArray:Object.values(JSON.parse(localStorage.getItem('nasaFavorite')));
    array.forEach(result=>{
        //Card container
        const card = document.createElement('div');
        card.classList.add('card');
        //Link
        const link = document.createElement('a');
        link.href = result.hdurl;
        link.title = 'View Full Image';
        link.target = '_blank';
        //Image
        const image = document.createElement('img');
        image.src = result.hdurl;
        image.alt= 'NASA Picture of the day';
        image.classList.add('card-img-top');
        image.loading = 'lazy';
        //Card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        //Card Title
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.innerText=result.title;
        //Add Favorites
        const addFavorite = document.createElement('p');
        addFavorite.classList.add('clickable');
        if(page === 'results'){
            addFavorite.innerText= 'Add to Favorites';
            addFavorite.setAttribute('onclick', `saveFavorite('${result.url}')`); 
        }
        else{
            addFavorite.innerText= 'Remove from Favorites';
            addFavorite.setAttribute('onclick', `removeFavorite('${result.url}')`); 
        }
        
        //Card text
        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.innerText=result.explanation;
        //Footer container
        const footer = document.createElement('small');
        footer.classList.add('text-muted');
        //Date 
        const date = document.createElement('strong');
        date.innerText = result.date;
        //Copyright
        const copyright = document.createElement('span');
        copyright.innerText = result.copyright?result.copyright:'';
        //Append
        footer.append(date, copyright);
        cardBody.append(cardTitle, addFavorite, cardText, footer);
        link.append(image);
        card.append(link, cardBody)
        imagesContainer.append(card);
    });
}

function updateDOM(page){
    if(page ==='results'){
        resultsNav.classList.remove('hidden');
        favoritesNav.classList.add('hidden');
    }
    else {
        resultsNav.classList.add('hidden');
        favoritesNav.classList.remove('hidden');
    }
    imagesContainer.innerHTML='';
    setLoader('show')
    createDOM(page);
    setLoader('hidden');
}


//get 10 picture from NASA api
async function getNasaPictures(){
    try{
        const response = await fetch(apiUrl);
        resultArray = await response.json();
        if(localStorage.getItem('nasaFavorites'))
            favorites= JSON.stringify(localStorage.getItem('nasaFavorite'));
        updateDOM('results');
    }
    catch(error){

    }
}

//Add resutlt to Favorites 
function saveFavorite(itemUrl){
    resultArray.forEach(item=>{
        if(item.url.includes(itemUrl) && !favorites[itemUrl]){
            favorites[itemUrl] = item;
            console.log(favorites);
            saveConfirmed.classList.remove('hidden');
            setTimeout(()=>{
                saveConfirmed.classList.add('hidden');
            }, 1500);
            localStorage.setItem('nasaFavorite', JSON.stringify(favorites));
        }
    })
}

function removeFavorite(itemUrl){
    if(favorites[itemUrl]){
        delete favorites[itemUrl];
    }
    localStorage.setItem('nasaFavorite', JSON.stringify(favorites));
    updateDOM('favorites');
}

//Onload
getNasaPictures();



