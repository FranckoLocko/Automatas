class Dibujo{
    constructor(exp){
        this.exp=exp;
        this.x=100;
        this.y=100;
        this.letra='A';
    }
    //dibujo abajo
    circulo(){        
        var canvas = document.getElementById("lienzo");
        var ctx = canvas.getContext("2d");
        ctx.moveTo(this.x,this.y);
        ctx.strokeStyle = "#6ab150";
        ctx.fillStyle = "#ffffff";
        ctx.lineWidth = 3;
        ctx.arc(this.x-25,this.y,25,0,2*Math.PI,true);
        ctx.stroke();
        var centrox=this.x-31;
        var centroy=this.y+5;
        this.texto(centrox,centroy)
    }
    linea(){
        var canvas = document.getElementById("lienzo");
        var ctx = canvas.getContext("2d");
        ctx.moveTo(this.x,this.y);
        ctx.strokeStyle = "#6ab150";
        ctx.lineWidth = 3;
        ctx.lineTo(this.x+50,this.y);
        this.x+=100;
    }
    texto(x1,y1){
        var txt = document.querySelector("canvas").getContext("2d");
        txt.font="20px arial";
        txt.fillStyle="black";
        txt.fillText(this.letra,x1,y1);
    }
    cerradura(){
        this.linea();
        this.circulo();
        this.linea();
        this.circulo();
        this.linea();
        this.circulo();
        this.linea();
        this.circulo();
    }

}


document.getElementById('Formulario')
    .addEventListener('submit', function(e){
       // alert("1");
        const exp = document.getElementById('exp_reg').value;//Obtiene la expresion regular
        const graf = new Dibujo(exp);
        graf.cerradura();
        
       // alert("3");

        e.preventDefault();
    });

