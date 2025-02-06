//import { Rest } from "../services/rest.js";

class Index {
    
    constructor() {

        document.getElementById('myButton').addEventListener('click', () => {
            window.location.href = 'src/views/home.html';
        });
    }
  
}

new Index();