import cargarTitulos from "./cargarTitulos";
import fetchBusqueda from "./fetchBusqueda";

const btnAnterior =document.querySelector('#pagina-anterior');
const btnSiguiente =document.querySelector('#pagina-siguiente');
btnAnterior.addEventListener('click', async (e) => {
    const paginaActual =  document.querySelector('#populares').dataset.pagina;
    if(paginaActual > 1) {
    try {

    const resultados = await fetchBusqueda(paginaActual - 1);
    document.querySelector('#populares').setAttribute('data-pagina', parseInt(paginaActual) - 1);
    cargarTitulos(resultados)
    window.scrollTo(0, 0);
    }
    catch(e){
        console.log(e);
    }
}
});

btnSiguiente.addEventListener('click', async (e) => {
const paginaActual =  document.querySelector('#populares').dataset.pagina;
try {
const resultados = await fetchBusqueda(paginaActual + 1);
document.querySelector('#populares').setAttribute('data-pagina', parseInt(paginaActual) + 1);
cargarTitulos(resultados)
window.scrollTo(0, 0);
}
catch(e){
    console.log(e);
}
})