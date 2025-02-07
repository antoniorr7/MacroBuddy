import { Rest } from "../services/rest.js";

/**
 * Modelo de la aplicación.
 * Se responsabiliza del mantenimiento y gestión de los datos.
 * Utiliza el Servicio de Rest.
 */
export class Modelo {
 

    /**
     * Realiza el proceso de obtener todas las filas de la tabla usuario.
     * @returns {Promise} Devuelve la promesa asociada a la petición.
     */
    obtenerUsuarios() {
       
        return Rest.get("usuarios", [], []);
    }
    /**
     * Realiza el proceso de insertar un nuevo usuario en la tabla usuario.
     * @param {Object} usuario - El objeto usuario a insertar.
     * @returns {Promise} Devuelve la promesa asociada a la petición.
     */
    insertarUsuario(usuario) {
        return Rest.post("usuarios",[], usuario);
    }
  

}