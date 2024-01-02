const obtenerGenero = (id, generos) => {
let nombre;
generos.forEach(element => {
if(id === element.id) {
    nombre = element.name;
};
});
return nombre;
}
 export default obtenerGenero;