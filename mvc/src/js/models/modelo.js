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
        return Rest.get("usuario", [], []);
    }

  

}