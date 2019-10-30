class Dibujo{
    constructor(exp){
        this.exp=exp;
        this.x=100;
        this.y=100;
        this.estados=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","U","V","W","X","Y","Z"];
        this.i=0;
        this.j=0;
        this.new_exp=[];
        this.op_top=0;
        this.op_exp;
        this.front=0;
        this.largo;
        this.des;
        this.top=0;
        this.cola=[];
    }

    //dibujo abajo
    circulo(){        
        var canvas = document.getElementById("lienzo");
        var ctx = canvas.getContext("2d");
        ctx.moveTo(this.x,this.y);
        ctx.arc(this.x-25,this.y,25,0,2*Math.PI,true);
        ctx.stroke();
        var centrox=this.x-33;
        var centroy=this.y+6;
        this.estado(centrox,centroy)
    }
    linea(){
        var canvas = document.getElementById("lienzo");
        var ctx = canvas.getContext("2d");
        ctx.strokeStyle = "#ffffff";
        ctx.fillStyle = "#ffffff";
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(this.x+50,this.y);
        this.x+=100;
    }
    flecha(simb){
        var canvas = document.getElementById("lienzo");
        var ctx = canvas.getContext("2d");
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(this.x+50,this.y);
        this.escribir(simb,this.x,this.y);
        this.x+=100;
        ctx.lineTo(this.x-60,this.y-10);
        ctx.lineTo(this.x-50,this.y);
        ctx.lineTo(this.x-60,this.y+10);
    }
    regresar(x1,x2,y1,y2){
        var canvas = document.getElementById("lienzo");
        var ctx = canvas.getContext("2d");
        ctx.moveTo(x2-25,y2-25);
        ctx.quadraticCurveTo(((x2-50)+x1)/2,this.y-75,x1-25,y1-25);
        ctx.font="20px arial";
        ctx.fillStyle="black";
        ctx.fillText('ε',((x2-50)+x1)/2,this.y-60);
        ctx.stroke();
        ctx.lineTo((x1-25)+5,(y1-25)-20);
        ctx.lineTo((x1-25),(y1-25));
        ctx.lineTo((x1-25)+20,(y1-25)-5);
    }
    linea_eps(x1,x2,y1,y2){
        var canvas = document.getElementById("lienzo");
        var ctx = canvas.getContext("2d");
        ctx.moveTo(x1-25,y1+25);
        ctx.quadraticCurveTo(((x2-50)+x1)/2,this.y+100,x2-25,y2+25);
        ctx.font="20px arial";
        ctx.fillStyle="black";
        ctx.fillText('ε',((x2-50)+x1)/2,this.y+50);
        ctx.lineTo((x2-25)-5,(y2+25)+20);
        ctx.lineTo((x2-25),(y2+25));
        ctx.lineTo((x2-25)-20,(y2+25)+5);
        ctx.stroke();
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
    orr(){

    }
    estado_inicial(){
        this.linea();
        this.circulo();
    }
    estado_final(){
        var canvas = document.getElementById("lienzo");
        var ctx = canvas.getContext("2d");
        ctx.lineWidth = 5;
        ctx.moveTo(this.x,this.y);
        ctx.arc(this.x-25,this.y,25,0,2*Math.PI,true);
        ctx.moveTo(this.x-7,this.y);
        ctx.arc(this.x-25,this.y,18,0,2*Math.PI,true);
        ctx.stroke();
    }
    recorrido(){
        this.estado_inicial();
        switch(this.exp.length){
            case 0:
                break;
            case 1:
                this.concatenacion(this.exp);
                break;
            default:
                for(let i=0;i<this.exp.length;i++){
                    this.analiza(this.exp[i]);
                }
                do{
                    this.pop();
                }while(this.front<this.top);
        }
        this.estado_final();
        alert("fin");

    }
    analiza(dato){
        if(dato=='*'||dato=='|'||dato=='('||dato==')'){
            switch(dato){
                case ')':
                    alert('llegó');
                    break;
                case '(':
                    do{
                        this.pop();
                    }while(this.front<this.top);
                    break;
                case '*':
                    var cerra = this.cola;
                    this.cerradura(cerra);
                    break;
                case '|':
                    break;
            }
        }
        else{
            this.push(dato);
            this.j++;
        }
    }
    push(dato){
       if(this.top<=50){
           this.cola[this.top]=dato;
           this.operador_cola();
           this.top++;
       } 
       else{
           alert("La cola está llena");
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
        else{
            alert("La cola está vacía");
        }
    }
    operador_cola(){
        switch(this.cola[this.top]){
            case '*':
                    this.op_top=3;
                    break;
                case '|':
                    this.op_top=2;
                    break;
                case '(':
                    this.op_top=0;
                    break;
                default:
                    this.op_top=0;
        }
    }
}

class Goma{
    borrar(){
        var canvas = document.getElementById("lienzo");
        var ctx = canvas.getContext("2d");
        ctx.fillStyle="#6DD5FA";
        ctx.fillRect(0,0,3000,500);
        ctx.fill();
    }
}
class Recorre{
    constructor(exp,op_top,top,pila){
        this.exp;

    }

}

document.getElementById('Formulario')
    .addEventListener('submit', function(e){
       // alert("1");
        const exp = document.getElementById('exp_reg').value;
        const graf = new Dibujo(exp);
        const borra = new Goma();
        borra.borrar();
        //graf.estado_inicial();
        //graf.cerradura();
        //graf.concatenacion();
        //graf.estado_final();
        graf.recorrido();

        //graf.analizar_exp();

        
       // alert("3");
        graf.resetearformulario();
        e.preventDefault();
    });

