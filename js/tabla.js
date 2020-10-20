import cargarFormulario from "./scripts.js";
export let idSeleccionado;

export default function crearTabla(lista) {
    const tabla = document.createElement('table');

    tabla.appendChild(crearCabecera(lista[0]));
    tabla.appendChild(crearCuerpo(lista));

    return tabla;
}

function crearCabecera(item) {

    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    for (const key in item) {
        if (item.hasOwnProperty(key)) {
            const th = document.createElement('th');
            const texto = document.createTextNode(key);
            th.appendChild(texto);
            //th.textContent(key);
            tr.appendChild(th);
        }
    }

    thead.appendChild(tr);

    return thead;
}

function crearCuerpo(lista) {

    const tbody = document.createElement('tbody');

    lista.forEach(element => {

        const tr = document.createElement('tr');

        for (const key in element) {
            if (element.hasOwnProperty(key)) {
                const td = document.createElement('td');
                const texto = document.createTextNode(element[key]);
                td.appendChild(texto);
                tr.appendChild(td);
            }
        }

        if(element.hasOwnProperty('id')){
            //tr.setAttribute('data-id', element['id']);
             tr.dataset.id = element['id'];
        }
  
        agregarManejadorTr(tr);
        tbody.appendChild(tr);
    });

    return tbody;
}

export function agregarManejadorTr(tr) {
    if (tr) {
        tr.addEventListener('click', function (e) {
            idSeleccionado = e.target.parentNode.dataset.id;
            cargarFormulario(idSeleccionado);
            document.getElementById('baja').hidden = false
            document.getElementById('modificacion').hidden = false;
        });
    }
}