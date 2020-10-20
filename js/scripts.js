import crearTabla from "./tabla.js";
import Anuncio from "./anuncio.js";

import {idSeleccionado} from './tabla.js';

let listaAnuncios;
let frmAnuncio;
let proximoId;
let divTabla;
//let alta;
let baja;
let modificacion;
let index;

window.addEventListener('load', inicializarManejadores);

function inicializarManejadores() {

    listaAnuncios = obtenerAnuncios();
    proximoId = obtenerId();

    divTabla = document.getElementById('divTabla');

    alta = document.getElementById('alta');
    baja = document.getElementById('baja');
    modificacion = document.getElementById('modificacion');

    actualizarLista();

    document.getElementById('baja').hidden = true;

    document.getElementById('modificacion').hidden = true;

    frmAnuncio = document.forms[0];

    frmAnuncio.reset();

    frmAnuncio.addEventListener('submit', e => {
        e.preventDefault();

        const nuevoAviso = obtenerAnuncio();

        if (nuevoAviso) {
            listaAnuncios.push(nuevoAviso);
            proximoId++;
            guardarDatos();
            actualizarLista();
            resetearFormulario();     
        }
    })

    baja.addEventListener('click', function(){

        index = encontrarIndexAnuncio(idSeleccionado);

        if (index > -1) {

            listaAnuncios.splice(index, 1);

            resetearFormulario();

            console.log("borrando index " + index);
        }

        actualizarLista();
    })

    modificacion.addEventListener('click', function(){

        index = encontrarIndexAnuncio(idSeleccionado);

        console.log(index);

        if(index > -1){

            listaAnuncios[index] = new Anuncio(idSeleccionado,
            frmAnuncio.titulo.value,
            frmAnuncio.descripcion.value,
            frmAnuncio.animal.value,
            frmAnuncio.precio.value,
            frmAnuncio.raza.value,
            frmAnuncio.fecha.value,
            frmAnuncio.vacunas.value);

   

            resetearFormulario();
        }

        actualizarLista(); 
    })
}

function obtenerAnuncios() {

    return JSON.parse(localStorage.getItem('gente')) || [];
}

function obtenerId() {

    return JSON.parse(localStorage.getItem('nextId')) || 100;
}

function obtenerAnuncio() {
    const nuevoAviso = new Anuncio(proximoId,
        frmAnuncio.titulo.value,
        frmAnuncio.descripcion.value,
        frmAnuncio.animal.value,
        frmAnuncio.precio.value,
        frmAnuncio.raza.value,
        frmAnuncio.fecha.value,
        frmAnuncio.vacunas.value);

    return nuevoAviso;
}

function guardarDatos() {

    localStorage.setItem('gente', JSON.stringify(listaAnuncios));
    localStorage.setItem('nextId', proximoId);
}

function actualizarLista() {
    divTabla.innerHTML = "";
    divTabla.appendChild(crearTabla(listaAnuncios));
}

function encontrarIndexAnuncio(id) {
    return listaAnuncios.findIndex(anuncio => anuncio.id == id);
}

function encontrarAnuncio(index) {
    return listaAnuncios[index];
}

export default function cargarFormulario(id) {
    
    if(id){
        const anuncioSeleccionado = encontrarAnuncio(encontrarIndexAnuncio(id));

                 // this.id = id;
            // this.titulo = titulo;
            // this.descripcion = descripcion;
            // this.animal = animal;
            // this.precio = precio;
            // this.raza = raza;
            // this.fecha = fecha;
            // this.vacunas = vacunas;

        frmAnuncio.titulo.value = anuncioSeleccionado.titulo;
        frmAnuncio.descripcion.value = anuncioSeleccionado.descripcion;

        const idAnimal = document.querySelector("input[value="+ CSS.escape(anuncioSeleccionado.animal) + "]").id;

        document.getElementById(idAnimal).checked = true;

        frmAnuncio.precio.value = anuncioSeleccionado.precio;
        frmAnuncio.raza.value = anuncioSeleccionado.raza;
        frmAnuncio.fecha.value = anuncioSeleccionado.fecha;
        frmAnuncio.vacunas.value = anuncioSeleccionado.vacunas;


    }
}

function resetearFormulario() {
    frmAnuncio.reset();

    document.getElementById('baja').hidden = true;

    document.getElementById('modificacion').hidden = true;
}