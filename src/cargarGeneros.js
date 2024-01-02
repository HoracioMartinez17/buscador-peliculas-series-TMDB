import fetchGeneros from "./fetchGeneros";
const contenedorGeneros = document.querySelector('#filtro-generos')

const cargarGeneros = async (filtro = 'movie') => {

const generos = await fetchGeneros(filtro);

contenedorGeneros.innerHTML = ''

generos.forEach(genero => {
const btn = document.createElement('button');
btn.classList.add('btn')
btn.textContent = genero.name;
btn.setAttribute('data-id', genero.id);
contenedorGeneros.appendChild(btn);
});
}

export default cargarGeneros;