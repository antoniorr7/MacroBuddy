import { Vista } from '../vista.js';

/**
 * Contiene la vista del inicio
 */
export class VistaUsuario extends Vista {
   
    constructor(controlador, div) {
        super(controlador, div);
       
    }
   
cargarUsuarios(usuarios) {
            let tabla = '<table><tr><th>ID</th><th>Nombre</th></tr>';
            for(let u of usuarios) {
                    tabla += `<tr><td>${u.id}</td><td>${u.nombre}</td></tr>`;
            }
            tabla += '</table>';
            console.log(this.div, "asdkfñlasdkf")
            this.div.innerHTML = tabla;
    }
}