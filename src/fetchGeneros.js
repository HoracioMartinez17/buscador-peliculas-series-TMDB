const fetchGeneros = async (filtro = 'movie') => {
    const tipo = filtro === 'movie' ? 'movie' : 'tv';
    const url = `https://api.themoviedb.org/3/genre/${tipo}/list?api_key=e2b401769026344e669e804560ba1111&language=en-US`;
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
return datos.genres;
    } catch (err) {
        console.log(err);
    }
lo
}
export default fetchGeneros;