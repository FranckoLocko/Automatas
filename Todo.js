class UI{
    constructor(exp){
        this.exp=exp;
        this.x=100;
        this.y=100;
        this.estados=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","U","V","W","X","Y","Z"];
        this.i=0;//Contador de posicion para el arreglo estados.
        this.j=0;//Contador general para funciones del grafo.
        this.front=0;
        this.top=0;
        this.cola=[];
        this.xi;
        this.yi;
        this.xf;
        this.yf;
        this.canvas = document.getElementById("lienzo");
        this.ctx = this.canvas.getContext("2d");
        this.valid=true;
        this.n=0;
        this.col_simb=[];//arreglo para verificar simbolos repetidos en la expresión regular.
    }
    //Tabla para Definicion AF
    crear_tabla(){
        const insertar = document.getElementById('definicion');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class = "card text-center text-white bg-primary mb-3"> 
                <div class="card-body">
                    <strong>Expresión Regular:  </strong> ${this.exp}
                </div>
            </div>
            <div>
                <table id="tabla" class="table table-bordered table-primary">
                    <tr id="simb_ent">
                        <td>Estados</td>
                    </tr>
                </table><br>
            </div>
        `;
        insertar.appendChild(element);
        this.formato_tabla();
    }
    formato_tabla(){
        //Agregar simbolos a la tabla
        this.columnas('F')
        this.columnas('ε');
        for(let i=this.exp.length-1;i>=0;i--){
            this.analiza_simb(this.exp[i]);
        }
        //Agregar estados a la tabla
        for(let i=this.i-1;i>=0;i--){
            this.filas(this.estados[i]);
        }
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
    filas(simb){
        var table = document.getElementById("tabla");
        var row = table.insertRow(1);
        var x = row.insertCell(0);
        x.innerHTML = simb;
    }
    //Grafo AFN-epsilon
    circulo(){        
        this.ctx.moveTo(this.x,this.y);
        this.ctx.arc(this.x-25,this.y,25,0,2*Math.PI,true);
        this.ctx.stroke();
        var centrox=this.x-33;
        var centroy=this.y+6;
        this.estado(centrox,centroy)
    }
    linea(){
        this.ctx.strokeStyle = "#ffffff";
        this.ctx.fillStyle = "#ffffff";
        this.ctx.moveTo(this.x,this.y);
        this.ctx.lineTo(this.x+50,this.y);
        this.x+=100;
    }
    flecha(simb){
        this.ctx.strokeStyle = "#ffffff";
        this.ctx.fillStyle = "#ffffff";
        this.ctx.moveTo(this.x,this.y);
        this.ctx.lineTo(this.x+50,this.y);
        this.escribir(simb,this.x,this.y);
        this.x+=100;
        this.ctx.lineTo(this.x-60,this.y-10);
        this.ctx.lineTo(this.x-50,this.y);
        this.ctx.lineTo(this.x-60,this.y+10);
    }
    regresar(x1,x2,y1,y2){
        this.ctx.moveTo(x2-25,y2-25);
        this.ctx.quadraticCurveTo(((x2-50)+x1)/2,this.y-75,x1-25,y1-25);
        this.ctx.font="20px arial";
        this.ctx.fillStyle="black";
        this.ctx.fillText('ε',((x2-50)+x1)/2,this.y-60);
        this.ctx.stroke();
        this.ctx.lineTo((x1-25)+5,(y1-25)-20);
        this.ctx.lineTo((x1-25),(y1-25));
        this.ctx.lineTo((x1-25)+20,(y1-25)-5);
    }
    linea_eps(x1,x2,y1,y2){
        this.ctx.moveTo(x1-25,y1+25);
        this.ctx.quadraticCurveTo(((x2-50)+x1)/2,this.y+100,x2-25,y2+25);
        this.ctx.font="20px arial";
        this.ctx.fillStyle="black";
        this.ctx.fillText('ε',((x2-50)+x1)/2,this.y+50);
        this.ctx.lineTo((x2-25)-5,(y2+25)+20);
        this. ctx.lineTo((x2-25),(y2+25));
        this.ctx.lineTo((x2-25)-20,(y2+25)+5);
        this.ctx.stroke();
    }
    flecha_or(simb){
        this.ctx.moveTo(this.xi,this.yi);
        this.ctx.quadraticCurveTo(((this.xf-50)+this.xi)/2,this.y+100,this.xf-25,this.yf+25);
        this.ctx.font="20px arial";
        this.ctx.fillStyle="black";
        this.ctx.fillText(simb,((this.x2)+this.x1)/2,this.y+100);
        this.ctx.lineTo((this.xf-25)-5,(this.yf+25)+20);
        this.ctx.lineTo((this.xf-25),(this.yf+25));
        this.ctx.lineTo((this.xf-25)-20,(this.yf+25)+5);
        this.ctx.stroke();
    }
    estado(x1,y1){
        var txt = document.querySelector("canvas").getContext("2d");
        txt.font="20px arial";
        txt.fillStyle="black";
        txt.fillText(this.estados[this.i],x1,y1);
        this.i+=1;
    }
    escribir(simb,x1,y1){
        var txt = document.querySelector("canvas").getContext("2d");
        txt.font="20px arial";
        txt.fillStyle="black";
        txt.fillText(simb,x1+20,y1-10);
    }
    cerradura(simbolos){
        var xei=this.x;
        var yei=this.y;
        this.flecha('ε');
        this.circulo();
        var x_inicial=this.x;
        var y_inicial=this.y;
        for(let i=0;i<simbolos.length;i++){
            this.flecha(simbolos[i]);
            this.circulo();
        }
        
        var x_final=this.x;
        var y_final=this.y;
        this.regresar(x_inicial,x_final,y_inicial,y_final)
        this.flecha('ε');
        this.circulo();
        var xef=this.x;
        var yef=this.y;
        this.linea_eps(xei,xef,yei,yef);
    }
    resetearformulario(){
        document.getElementById('Formulario').reset();
    }
    concatenacion(simb){
        this.flecha(simb);
        this.circulo();
    }
    concatenacion_or(simb){
        this.flecha_or(simb);
        this.circulo();
    }
    orr(){
        this.x=this.xi;
        this.y=this.yi;
        //this.i-=this.top;
        this.y+=100;
        this.flecha_or('z');
    }
    estado_inicial(){
        this.linea();
        this.circulo();
        this.xi=this.x-25;
        this.yi=this.y+25;
        this.ctx.save();
    }
    estado_final(){
        this.ctx.restore();
        this.ctx.save();
        //this.ctx.strokeStyle='red';
        //this.ctx.fillStyle='red';
        this.ctx.lineWidth = 5;
        this.ctx.moveTo(this.x,this.y);
        this.ctx.arc(this.x-25,this.y,25,0,2*Math.PI,true);
        this. ctx.moveTo(this.x-7,this.y);
        this.ctx.arc(this.x-25,this.y,18,0,2*Math.PI,true);
        this.ctx.stroke();
        this.ctx.restore();

    }
    //Recorrido de expresion para el grafo
    recorrido(){
        this.estado_inicial();
        switch(this.exp.length){
            case 0:
                break;
            case 1:
                this.validar(this.exp[0]);
                if(this.valid){
                    this.concatenacion(this.exp);
                    break;
                }
                else{
                    break;
                }
            default:
                this.validar(this.exp[0]);
                if(this.valid){
                    for(this.j=0;this.j<this.exp.length;this.j++){
                        this.analiza(this.exp[this.j]);
                    }
                    do{
                        this.pop();
                    }while(this.front<this.top);
                    break;
                }
                else{
                    break;
                }

        }
        if(this.valid){
            this.estado_final();
        }
        else{
            this.borrar();
        }
    }
    validar(dato){
        if(dato=='*'||dato=='|'){
            switch(dato){
                case '*':
                    alert('El símbolo " * " está reservado.');
                    break;
                case '|':
                    alert('El símbolo " | " está reservado.');
                    break;
            }
            this.valid=false;
        }
    }
    analiza(dato){
        if(dato=='*'||dato=='|'||dato=='('||dato==')'){
            switch(dato){
                case ')':
                    if(this.exp[this.j+1]!='*'){

                    }
                    break;
                case '(':
                    do{
                        this.pop();
                    }while(this.front<this.top);
                    this.limpiar_cola();
                    break;
                case '*':
                    if(this.exp[this.j-1]==')'){
                        var cerra = this.cola;
                        this.cerradura(cerra);
                        this.limpiar_cola();
                    }
                    else{
                        if(this.front==this.top-1){
                            this.cerradura(this.exp[this.j-1]);
                            this.limpiar_cola();
                        }
                        else{
                            do{
                                this.pop();
                            }while(this.front<this.top-1);
                            this.limpiar_cola();
                            this.cerradura(this.exp[this.j-1]);
                        }
                    }
                    break;
                    
                case '|':
                    do{
                        this.pop();
                    }while(this.front<this.top);
                    this.limpiar_cola();
                    this.xf=this.x;
                    this.yf=this.y;
                    this.orr();
                    break;
            }
        }
        else{
            this.push(dato);
        }
    }
    push(dato){
       if(this.top<=50){
           this.cola[this.top]=dato;
           this.top++;
       }
    }
    pop(){
        if(this.front<this.top){
            this.top--;
            switch(this.cola[this.top]){
                default:
                    this.top++;
                    this.concatenacion(this.cola[this.front]);
                    this.front++;
            }
            
        }
    }
    limpiar_cola(){
        this.cola=0;
        this.cola=[];
        this.front=0;
        this.top=0;
    }
    borrar(){
        var canvas = document.getElementById("lienzo");
        canvas.width = canvas.width;
    }
    resetearformulario(){
        document.getElementById('Formulario').reset();
    }
}

document.getElementById('Formulario')
    .addEventListener('submit', function(e){
       // alert("1");
        const er = document.getElementById('exp_reg').value;
        var exp = er;
        const ui = new UI(exp.toLowerCase().trim().replace(/ /g, ""));
        ui.borrar();
        ui.recorrido();
        ui.crear_tabla();


        ui.resetearformulario();
        e.preventDefault();
    });

