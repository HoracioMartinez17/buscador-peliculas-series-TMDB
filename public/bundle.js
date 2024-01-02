'use strict';

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
lo;
};

const obtenerGenero = (id, generos) => {
let nombre;
generos.forEach(element => {
if(id === element.id) {
    nombre = element.name;
}});
return nombre;
};

const fetchPopulares = async (filtro = 'movie') => {
    const tipo = filtro === 'movie' ? 'movie' : 'tv';
    const url = `https://api.themoviedb.org/3/${tipo}/popular?api_key=e2b401769026344e669e804560ba1111&language=en-US&page=1`;
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        const resultados = datos.results;
        const generos = await fetchGeneros();
        resultados.forEach(resultado => {
       resultado.genero = obtenerGenero(resultado.genre_ids[0], generos);
        });

return resultados;
    } catch (err) {
        console.log(err);
    }

};

const cargarTitulos = (resultados) => {
const contenedor = document.querySelector('#populares .main__grid');
contenedor.innerHTML = '';
resultados.forEach(element => {
    const elementDiv = document.createElement("div");
    elementDiv.classList.add('main__media');
    elementDiv.setAttribute('data-id', element.id);
    const links = document.createElement("a");
    links.setAttribute('href', '#');
    links.setAttribute('class', 'main__media-thumb');
    const linksImg = document.createElement('img');
    linksImg.setAttribute('src', 'https://image.tmdb.org/t/p/w500/' + element.poster_path);
    linksImg.setAttribute('alt','img/');
    linksImg.setAttribute('class', 'main__media-img');
    links.appendChild(linksImg);
    elementDiv.appendChild(links);
    const titulo = document.createElement('p');
    titulo.setAttribute('class', 'main__media-titulo');
    titulo.textContent = `${element.title || element.name}`;
    const genero = document.createElement('P');
    genero.setAttribute('class', 'main__media-fecha');
    genero.textContent = `${element.genero}`;
    elementDiv.appendChild(titulo);
    elementDiv.appendChild(genero);
    contenedor.appendChild(elementDiv);
});
};

const contenedorGeneros = document.querySelector('#filtro-generos');

const cargarGeneros = async (filtro = 'movie') => {

const generos = await fetchGeneros(filtro);

contenedorGeneros.innerHTML = '';

generos.forEach(genero => {
const btn = document.createElement('button');
btn.classList.add('btn');
btn.textContent = genero.name;
btn.setAttribute('data-id', genero.id);
contenedorGeneros.appendChild(btn);
});
};

const fetchItemsjs = async(id) => {
const tipo = document.querySelector('.main__filtros .btn--active').id;
const apiKey = 'e2b401769026344e669e804560ba1111';
 try {
const url = `https://api.themoviedb.org/3/${tipo}/${id}?api_key=${apiKey}&language=en-US`;
const respuesta = await fetch(url);
const datos = await respuesta.json();
return datos;
 }catch (e) {
    console.log(e);
}
};

const filtroPelicula = document.querySelector('#movie');
const filtroSeries = document.querySelector('#tv');

filtroPelicula.addEventListener('click', async(e) => {
e.preventDefault();
cargarGeneros('movie');
const resultados = await fetchPopulares('movie');
cargarTitulos(resultados);
filtroPelicula.classList.add('btn--active');
filtroSeries.classList.remove('btn--active');
document.querySelector('#populares .main__titulo').innerText = 'Peliculas populares';
});

filtroSeries.addEventListener('click', async (e) => {
e.preventDefault();
cargarGeneros('tv');
const resultados = await fetchPopulares('tv');
cargarTitulos(resultados);
filtroPelicula.classList.remove('btn--active');
filtroSeries.classList.add('btn--active');
document.querySelector('#populares .main__titulo').innerText = 'Series populares';
});

const contenedor$1 = document.querySelector('#filtro-generos');
 contenedor$1.addEventListener('click', (e) => {
e.preventDefault();
if (e.target.closest('button')) {
    contenedor$1.querySelector('.btn--active') ?.classList.remove('btn--active');
e.target.classList.add('btn--active');
}
 });

const fetchBusqueda = async (pagina = 1) => {
const tipo = document.querySelector('.main__filtros .btn--active').id;
const idGenero = document.querySelector('#filtro-generos .btn--active')?.dataset.id;
const añoInicial = document.querySelector('#años-min').value || 1950 ;
const añofinal = document.querySelector('#años-max').value || 2023;
let url;
const apiKey = 'e2b401769026344e669e804560ba1111';
if (tipo === 'movie') {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&page=${pagina}&release_date.gte=${añoInicial}&release_date.lte=${añofinal}&sort_by=popularity.desc&with_genres=${idGenero}`;
} else if(tipo === 'tv') {
url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&first_air_date.gte=${añoInicial}&first_air_date.lte=${añofinal}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=${pagina}&sort_by=popularity.desc&timezone=America%2FNew%20York&with_genres=${idGenero}`;
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

const btn = document.querySelector('#btn-buscar');
btn.addEventListener('click', async() => {
const resultados = await  fetchBusqueda();
cargarTitulos(resultados);
});

const btnAnterior =document.querySelector('#pagina-anterior');
const btnSiguiente =document.querySelector('#pagina-siguiente');
btnAnterior.addEventListener('click', async (e) => {
    const paginaActual =  document.querySelector('#populares').dataset.pagina;
    if(paginaActual > 1) {
    try {

    const resultados = await fetchBusqueda(paginaActual - 1);
    document.querySelector('#populares').setAttribute('data-pagina', parseInt(paginaActual) - 1);
    cargarTitulos(resultados);
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
cargarTitulos(resultados);
window.scrollTo(0, 0);
}
catch(e){
    console.log(e);
}
});

const contenedor = document.querySelector('#populares');
const popup$1 = document.querySelector('#media');
contenedor.addEventListener('click', async (e) => {
    if (e.target.closest('.main__media')) {
        popup$1.classList.add('media--active');
        const id = e.target.closest('.main__media').dataset.id;
        const resultado = await fetchItemsjs(id);
        const plantilla = `<div class="media__backdrop">
<img
    src="https://image.tmdb.org/t/p/w500/${resultado.backdrop_path}"
    class="media__backdrop-image"
/>
</div>
<div class="media__imagen">
<img
    src="https://image.tmdb.org/t/p/w500/${resultado.poster_path}"
    class="media__poster"
/>
</div>
<div class="media__info">
<h1 class="media__titulo">${resultado.title || resultado.name}</h1>
<p class="media__fecha">${resultado.release_date || resultado.first_air_date}</p>
<p class="media__overview">${resultado.overview}</p>
</div>
<button class="media__btn">
<svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
    class="media__btn-icono"
>
    <path
        d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
    />
</svg>
</button>`;
document.querySelector('#media .media__contenedor').innerHTML = plantilla;
    }
});

const popup = document.querySelector('#media');
popup.addEventListener('click', (e) => {
if(e.target.closest('button')) {
popup.classList.remove('media--active');
}
});

const cargar = async() => {
    const resultados = await fetchPopulares();
    cargarTitulos(resultados);
    cargarGeneros('movie');
    fetchItemsjs();
};
 cargar();
//# sourceMappingURL=bundle.js.map
