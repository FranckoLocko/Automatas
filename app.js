class Automata{
    constructor(exp) {
        this.exp = exp;
    }
}

class UI {
    constructor(){
        this.n=0;
        this.col_simb=[];
    }
    definicion(AF) {
        const insertar = document.getElementById('definicion');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class = "card text-center text-white bg-primary mb-3"> 
                <div class="card-body">
                    <strong>Expresión Regular:  </strong> ${AF.exp}
                </div>
            </div>
            <div>
                <table class="table table-bordered table-primary">
                    <tr id="simb_ent">
                        <td>Estados</td>
                    </tr>
                </table><br>
            </div>
        `;
        insertar.appendChild(element);
        for(let i=AF.exp.length-1;i>=0;i--){
            this.analiza_simb(AF.exp[i]);
        }
        //this.resetearformulario();
    }
    analiza_simb(simb){
        var repetido=false;
        for(let j=0;j<this.col_simb.length;j++){
            if(simb==this.col_simb[j]){
                repetido=true;
            }
        }
        if(repetido==false){
            this.columnas(simb);
            this.col_simb[this.n]=simb;
            this.n++;
        }
        else{
            repetido=false;
        }
    }
    columnas(simb){
        var row = document.getElementById("simb_ent");
        var x = row.insertCell(1);
        x.innerHTML = simb;
    }
    resetearformulario(){
        document.getElementById('Formulario').reset();
    }
}

// Eventos del DOM (Cuando el usuario da click en el botón)

document.getElementById('Formulario')
    .addEventListener('submit', function(e){
        const er = document.getElementById('exp_reg').value;
        var exp = er;
        const AF = new Automata(exp.toLowerCase().trim().replace(/ /g, ""));

        const ui = new UI();
        ui.definicion(AF);

        //const dib = new Dibujo();


        e.preventDefault();
    });