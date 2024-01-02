const cargarTitulos = (resultados) => {
const contenedor = document.querySelector('#populares .main__grid')
contenedor.innerHTML = '';
resultados.forEach(element => {
    const elementDiv = document.createElement("div");
    elementDiv.classList.add('main__media');
    elementDiv.setAttribute('data-id', element.id)
    const links = document.createElement("a");
    links.setAttribute('href', '#')
    links.setAttribute('class', 'main__media-thumb')
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
}

export default cargarTitulos;