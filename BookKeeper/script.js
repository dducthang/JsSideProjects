const showModal = document.getElementById('show-modal');
const modalContainer = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');
const modal =document.getElementById('modal');
const bookmarkForm =modal.querySelector('.bookmark-form');
const webName = document.getElementById('website-name');
const webUrl = document.getElementById('website-url');
const itemContainer = document.querySelector('.item-container');
const deleteBookmark =document.getElementsByClassName('fa-times-circle');

let bookmarks=[];

showModal.addEventListener('click',()=>{
    modalContainer.classList.add('show-modal');
    webName.focus();
});
closeModal.addEventListener('click', ()=>modalContainer.classList.remove('show-modal'));
window.addEventListener('click', (e)=>e.target==modal?modal.classList.remove('show-modal'):false);

const validateForm = function( nameValue, urlValue){
    const expression =/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g;
    const regex = new RegExp(expression);
    if(!nameValue||!urlValue){
        alert('Please input both fields');
        return false;
    }   
    else if(!urlValue.match(regex)){
        alert('Please input valid url address');
        return false;
    }
    else return true;
}

const storeBookmark = function(e){
    e.preventDefault();
    const nameValue = webName.value;
    let urlValue = webUrl.value;

    if(!urlValue.includes('http://', 'https://'))
        urlValue=`https://${urlValue}`;
    if(!validateForm(nameValue, urlValue))
        return false;
    
    const bookmark = {
        name:nameValue,
        url:urlValue
    }
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));    
    bookmarkForm.reset();

    updateDOM();
}

bookmarkForm.addEventListener('submit', storeBookmark);

const updateDOM = function(){
    itemContainer.innerHTML='';
    bookmarks.forEach(bookmark=>{
        const item = document.createElement('div');
        item.classList.add('item');
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('far','fa-times-circle');
        closeIcon.id='delete-bookmark';
        closeIcon.title='Delete Bookmark';
        closeIcon.setAttribute('onclick',`deleteItem('${bookmark.url}')`);
        const name = document.createElement('div');
        name.classList.add('name');
        const img = document.createElement('img');
        img.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${bookmark.url}`)
        img.setAttribute('alt','Favicon');
        const a= document.createElement('a');
        a.setAttribute('href',`${bookmark.url}`);
        a.setAttribute('target','_blank');
        a.innerText=bookmark.name;
        name.append(img, a);
        item.append(closeIcon, name)
        itemContainer.append(item);
    })
}

const fetchLocalStorage = function(){
    bookmarks= JSON.parse(localStorage.getItem('bookmarks'));
}

const buildBookmark = function(){
    fetchLocalStorage();
    updateDOM();

}

const deleteItem= function(url){
    let index = bookmarks.findIndex(b=>b.url==url);
    console.log(index);
    bookmarks.splice(index, 1);
    localStorage.removeItem('bookmarks');
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    buildBookmark();
}

buildBookmark();
