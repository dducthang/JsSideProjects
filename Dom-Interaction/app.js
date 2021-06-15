const button = document.querySelector('button');
const title= document.querySelector('#main-title');
title.className='pink-bg visible';
button.addEventListener("click", ()=>{
    title.classList.toggle('invisible');
    const h2 = document.body.querySelector('h2');
    if(title.classList.contains('invisible'))
    {
        title.insertAdjacentHTML('afterend','<h2 >Oops something has just disappeared??</h2>');
    }
   
})