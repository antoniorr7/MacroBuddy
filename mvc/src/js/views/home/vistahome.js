import { Vista } from '../vista.js';

/**
 * Contiene la vista del inicio
 */
export class VistaHome extends Vista {
   
    constructor(controlador, div) {
        super(controlador, div);
        document.getElementById('index').onclick = () => {
            window.location.href = '/MacroBuddy/mvc/index.html';
        };
        console.log(div);
    }
}