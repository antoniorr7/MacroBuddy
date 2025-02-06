// import { Modelo } from "../models/modelo.js";
// import { VistaInicioPadres } from "../views/padres/vistainicio.js";
// import { Vista } from "../views/vista.js";
// import { VistaMenuPadres } from "../views/padres/vistamenu.js";
// import { VistaGestionHijos } from "../views/padres/vistagestionhijos.js";
//import { VistaModificarPadres } from "../views/padres/vistamodificar.js";
//import { VistaCalendario } from "../views/padres/vistacalendario.js";
//import { Rest } from "../services/rest.js";

import { VistaHome } from "../views/home/vistahome.js";

class ControladorHome {


    constructor() {
        window.onload = this.iniciar.bind(this);
       
    
    }

    /**
     * Inicia la aplicación.
     */
    iniciar() {

        //this.modelo = new Modelo();
    
        this.parte1 = new VistaHome(this, document.getElementById('parte1'));
        this.parte2 = new VistaHome(this, document.getElementById('parte2'));
        this.parte3 = new VistaHome(this, document.getElementById('parte3'));
        this.verParte1();

        document.getElementById('parte1b').addEventListener('click', this.verParte1.bind(this));
        document.getElementById('parte2b').addEventListener('click', this.verParte2.bind(this));
        document.getElementById('parte3b').addEventListener('click', this.verParte3.bind(this));
    }

  
    /**
     * Cambia a la vista de inicio.
     */
    verParte1() {
        this.parte1.mostrar(true);
        this.parte2.mostrar(false);
        this.parte3.mostrar(false);
    }

    verParte2() {
        this.parte1.mostrar(false);
        this.parte2.mostrar(true);
        this.parte3.mostrar(false);
    }

    verParte3() {
        this.parte1.mostrar(false);
        this.parte2.mostrar(false);
        this.parte3.mostrar(true);
    }

}

new ControladorHome();