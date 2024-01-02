import cargarGeneros from "./cargarGeneros";
import cargarTitulos from "./cargarTitulos";
import fetchPopulares from "./fetchPopulares";

const filtroPelicula = document.querySelector('#movie');
const filtroSeries = document.querySelector('#tv');

filtroPelicula.addEventListener('click', async(e) => {
e.preventDefault();
cargarGeneros('movie')
const resultados = await fetchPopulares('movie');
cargarTitulos(resultados)
filtroPelicula.classList.add('btn--active')
filtroSeries.classList.remove('btn--active')
document.querySelector('#populares .main__titulo').innerText = 'Peliculas populares'
})

filtroSeries.addEventListener('click', async (e) => {
e.preventDefault();
cargarGeneros('tv')
const resultados = await fetchPopulares('tv');
cargarTitulos(resultados)
filtroPelicula.classList.remove('btn--active')
filtroSeries.classList.add('btn--active')
document.querySelector('#populares .main__titulo').innerText = 'Series populares'
})