const showModal = document.getElementById('show-modal');
const modalContainer = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');
const modal =document.getElementById('modal');

showModal.addEventListener('click',()=>modalContainer.classList.add('show-modal'));
closeModal.addEventListener('click', ()=>modalContainer.classList.remove('show-modal'));
window.addEventListener('click', (e)=>e.target==modal?modal.classList.remove('show-modal'):false);