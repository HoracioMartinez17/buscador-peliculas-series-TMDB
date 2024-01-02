import fetchGeneros from "./fetchGeneros";
import obtenerGenero from "./obtenerGenero";
const fetchBusqueda = async (pagina = 1) => {
const tipo = document.querySelector('.main__filtros .btn--active').id;
const idGenero = document.querySelector('#filtro-generos .btn--active')?.dataset.id;
const añoInicial = document.querySelector('#años-min').value || 1950 ;
const añofinal = document.querySelector('#años-max').value || 2023;
let url;
const apiKey = 'e2b401769026344e669e804560ba1111'
if (tipo === 'movie') {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&page=${pagina}&release_date.gte=${añoInicial}&release_date.lte=${añofinal}&sort_by=popularity.desc&with_genres=${idGenero}`;
} else if(tipo === 'tv') {
url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&first_air_date.gte=${añoInicial}&first_air_date.lte=${añofinal}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=${pagina}&sort_by=popularity.desc&timezone=America%2FNew%20York&with_genres=${idGenero}`
}
try{
const respuesta = await fetch(url);
const datos = await respuesta.json();
const resultados =  datos.results;
const generos = await fetchGeneros();
        resultados.forEach(resultado => {
       resultado.genero = obtenerGenero(resultado.genre_ids[0], generos);
        });
return resultados;
} catch(e) {
    console.log(e);
}
};
export default fetchBusqueda;