
import { VistaUsuario } from "../views/home/vistausuario.js";

class ControladorUsuario {


    constructor() {
        window.onload = this.iniciar.bind(this);
        document.getElementById('index').addEventListener('click', () => {
            window.location.href = '../views/home.html';
        });
    }

    /**
     * Inicia la aplicación.
     */
    iniciar() {

        this.listado = new VistaUsuario(this, document.getElementById('listado'));
        this.masinfo = new VistaUsuario(this, document.getElementById('masinfo'));
        this.verlistado();

        document.getElementById('listadob').addEventListener('click', this.verlistado.bind(this));
        document.getElementById('masinfob').addEventListener('click', this.vermasinfo.bind(this));
       
    }

  

 
    verlistado() {
        this.listado.mostrar(true);
        this.masinfo.mostrar(false);
    }
    vermasinfo() {
        this.listado.mostrar(false);
        this.masinfo.mostrar(true);
    }
}

new ControladorUsuario();