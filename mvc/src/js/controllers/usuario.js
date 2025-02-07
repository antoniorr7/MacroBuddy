import { VistaUsuario } from "../views/usuario/vistausuario.js";
import { Modelo } from "../models/modelo.js";

class ControladorUsuario {
    constructor() {
        window.onload = () => {
            this.modelo = new Modelo();

            this.obtenerUsuarios();
            this.listado = new VistaUsuario(this, document.getElementById('listado'));
            this.masinfo = new VistaUsuario(this, document.getElementById('masinfo'));
            this.verlistado();

            document.getElementById('listadob').addEventListener('click', this.verlistado.bind(this));
            document.getElementById('masinfob').addEventListener('click', this.vermasinfo.bind(this));
        };

        document.getElementById('index').addEventListener('click', () => {
            window.location.href = '../views/home.html';
        });
    }

    verlistado() {
        this.listado.mostrar(true);
        this.masinfo.mostrar(false);
    }

    vermasinfo() {
        this.listado.mostrar(false);
        this.masinfo.mostrar(true);
    }

     obtenerUsuarios() {
        this.modelo.obtenerUsuarios()
         .then(u => {
             this.listado.cargarUsuarios(u);
         })
         .catch(e => {
             console.error(e);
         })
    }
}

new ControladorUsuario();
