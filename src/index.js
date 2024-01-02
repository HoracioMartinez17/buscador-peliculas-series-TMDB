import fetchPopulares from './fetchPopulares';
import cargarTitulos from './cargarTitulos';
import cargarGeneros from './cargarGeneros';
import fetchItemsjs from './fetchItems';
import './listenerFiltro';
import'./listenerFiltroGenero';
import './listenerBuscar';
import './fetchBusqueda';
import './paginacio';
import './listenerItems'
import './listenerPopup'
const cargar = async() => {
    const resultados = await fetchPopulares();
    cargarTitulos(resultados);
    cargarGeneros('movie');
    fetchItemsjs();
}
 cargar();