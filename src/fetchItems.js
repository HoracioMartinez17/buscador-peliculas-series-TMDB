const fetchItemsjs = async(id) => {
const tipo = document.querySelector('.main__filtros .btn--active').id;
const apiKey = 'e2b401769026344e669e804560ba1111'
 try {
const url = `https://api.themoviedb.org/3/${tipo}/${id}?api_key=${apiKey}&language=en-US`;
const respuesta = await fetch(url)
const datos = await respuesta.json();
return datos;
 }catch (e) {
    console.log(e);
}
}
export default fetchItemsjs;