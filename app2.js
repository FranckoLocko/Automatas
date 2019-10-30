let estado = 65;
let x = 5,
    y = 6;
let cont = 0; //contador de posicion para el vector c_estados.
let c_estados = [];

class Automata{
    constructor(exp) {
        this.exp = exp;
    }
}

class UI {
    metodo_prueba(AF) {
        const insertar = document.getElementById('definicion');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class = "card text-center mb-4"> 
                <div class="card-body">
                    <strong>Expresión Regular</strong>: ${AF.exp}
                </div>
            </div>
        `;
        insertar.appendChild(element);
        //this.resetearformulario();
    }
    resetearformulario(){
        document.getElementById('Formulario').reset();
    }
}

// Eventos del DOM (Cuando el usuario da click en el botón)

document.getElementById('Formulario')
    .addEventListener('submit', function(e){
        const exp = document.getElementById('exp_reg').value;
       
        
        const AF = new Automata(exp);

        const ui = new UI();
        ui.metodo_prueba(AF);
        
        //const dib = new Dibujo();


        e.preventDefault();
    });