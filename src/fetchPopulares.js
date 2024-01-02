import fetchGeneros from "./fetchGeneros";
import obtenerGenero from "./obtenerGenero";
const fetchPopulares = async (filtro = 'movie') => {
    const tipo = filtro === 'movie' ? 'movie' : 'tv';
    const url = `https://api.themoviedb.org/3/${tipo}/popular?api_key=e2b401769026344e669e804560ba1111&language=en-US&page=1`;
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        const resultados = datos.results;
        const generos = await fetchGeneros();
        resultados.forEach(resultado => {
       resultado.genero = obtenerGenero(resultado.genre_ids[0], generos)
        });

return resultados;
    } catch (err) {
        console.log(err);
    }

};

export default fetchPopulares;