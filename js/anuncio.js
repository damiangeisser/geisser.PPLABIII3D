class Anuncio {
    constructor(id, titulo, transaccion, descripcion, precio) {
        this.id = id;
        this.titulo = titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}

export default class Anuncio_Mascota extends Anuncio {

    constructor(id, titulo, descripcion, animal, precio, raza, fecha, vacunas) {
        super(id, titulo, "venta", descripcion, precio);
        this.animal = animal;
        this.raza = raza;
        this.fecha = fecha;
        this.vacunas = vacunas;
    }

}