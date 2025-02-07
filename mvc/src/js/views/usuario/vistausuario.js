import { Vista } from '../vista.js';

/**
 * Contiene la vista del inicio
 */
export class VistaUsuario extends Vista {
   
    constructor(controlador, div) {
        super(controlador, div);
        document.getElementById('crearusuario').addEventListener('click', () => this.insertarUsuario());
    }
    cargarUsuarios(usuarios) {
        // Si usuarios no es un array, lo convertimos en uno
        if (!Array.isArray(usuarios)) {
            usuarios = [usuarios];  // Convertir objeto en un array con un solo elemento
        }
        let tabla = '<table border="1" cellspacing="0" cellpadding="5"><tr><th>ID</th><th>Nombre</th></tr>';
        for (const u of usuarios) {
            tabla += `<tr><td>${u.id}</td><td>${u.nombre}</td></tr>`;
        }
        tabla += '</table>';
        this.div.innerHTML += tabla;  // Añadir la tabla al contenido existente del div
    }
insertarUsuario() {
    
    const nombre = document.getElementById('usuario-nombre').value;
    
    const usuario = { nombre };
    
    this.controlador.insertarUsuario(usuario);
}
}