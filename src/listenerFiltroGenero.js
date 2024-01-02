const contenedor = document.querySelector('#filtro-generos')
 contenedor.addEventListener('click', (e) => {
e.preventDefault();
if (e.target.closest('button')) {
    contenedor.querySelector('.btn--active') ?.classList.remove('btn--active');
e.target.classList.add('btn--active');
}
 })