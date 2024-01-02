import cargarTitulos from "./cargarTitulos";
import fetchBusqueda from "./fetchBusqueda";
const btn = document.querySelector('#btn-buscar');
btn.addEventListener('click', async() => {
const resultados = await  fetchBusqueda();
cargarTitulos(resultados);
})