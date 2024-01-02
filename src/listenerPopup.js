const popup = document.querySelector('#media');
popup.addEventListener('click', (e) => {
if(e.target.closest('button')) {
popup.classList.remove('media--active');
}
})