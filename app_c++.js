//Variable global
let estado = 65;
let x = 5,
    y = 6;
let cont = 0; //contador de posicion para el vector c_estados.
let c_estados = [];

//Prototipos
function imprimir();

function circulo();

function linea();

function arriba();

function abajo();

function regresar();

function otro(let x1,
    let y1);

function linea_epsilon(let x1,
    let y1);

function estado_final();

//Funcion para graficar
void gotoxy(int x, int y) {
    HANDLE hcon = GetStdHandle(STD_OUTPUT_HANDLE);
    COORD dwPos;
    dwPos.X = x;
    dwPos.Y = y;
    SetConsoleCursorPosition(hcon, dwPos);
}

class Axiomas {
    private: //Atributos
        string simbolo;
        string exp_reg;
    public: //Metodos
        Axiomas(string exp);
    void cerradura();
    void concatenacion();
    void orr();
    void definicion_AF();

};

Axiomas::Axiomas(string exp) {
    c_estados[0] = estado;
    exp_reg = exp;
    linea(' ');
    x--;
    circulo();

}

void Axiomas::cerradura() {
    int x1 = x - 2, y1 = y + 2;
    linea(156);
    circulo();
    linea('a');
    circulo();
    regresar();
    linea(156);
    circulo();
    linea_epsilon(x1, y1);
}

void Axiomas::concatenacion() {
    linea('a');
    circulo();
    linea('b');
    circulo();
}

void Axiomas::orr() {
    int x1 = x - 2, y1 = y + 2;
    linea('a');
    circulo();
    otro(x1, y1);

}

void Axiomas::definicion_AF() {
    gotoxy(0, 20);
    printf("Definicion AF = (Q,Z,d,q0,F)\n");
    printf("Donde: \n");
    printf("Q={");
    for (int i = 0; i < cont; i++) {
        printf("'%c',", c_estados[i]);
    }
    printf("}");
}

void imprimir() {
    circulo();
}

void circulo() {
    gotoxy(x, y);
    printf("%c", 179);
    y += 1;
    gotoxy(x, y);
    printf("%c", 192);
    x += 1;
    gotoxy(x, y);
    printf("%c", 196);
    x += 1;
    gotoxy(x, y);
    printf("%c", 217);
    y -= 1;
    gotoxy(x, y);
    printf("%c", 179);
    y -= 1;
    gotoxy(x, y);
    printf("%c", 191);
    x -= 1;
    gotoxy(x, y);
    printf("%c", 196);
    x -= 1;
    gotoxy(x, y);
    printf("%c", 218);
    x += 1, y += 1;
    gotoxy(x, y);
    printf("%c", estado);
    x += 2;
    c_estados[cont] = estado;
    estado++;
    cont++;
}

void linea(char simb) {

    gotoxy(x, y);
    printf("%c", 196);
    x += 1;
    gotoxy(x, y);
    printf("%c", 196);
    x += 1;
    gotoxy(x, y);
    printf("%c", 196);
    y -= 2;
    gotoxy(x, y);
    printf("%c", simb);
    y += 2, x += 1;
    gotoxy(x, y);
    printf("%c", 196);
    x += 1;
    gotoxy(x, y);
    printf("%c", 62);
    x += 1;
}

void arriba() {

}

void abajo() {

}

void regresar() {
    int x1 = x - 2, y1 = y - 2;
    gotoxy(x1, y1);
    printf("%c", 179);
    y1--;
    gotoxy(x1, y1);
    printf("%c", 179);
    y1--;
    gotoxy(x1, y1);
    printf("%c", 191);
    x1--;
    for (int i = 0; i < 6; i++) {
        gotoxy(x1, y1);
        printf("%c", 196);
        x1--;
        if (i == 3) {
            y1--, x1++;
            gotoxy(x1, y1);
            printf("%c", 156);
            x1--, y1++;
        }
    }
    gotoxy(x1, y1);
    printf("%c", 218);
    y1++;
    gotoxy(x1, y1);
    printf("%c", 179);
    y1++;
    gotoxy(x1, y1);
    printf("%c", 'V');
}

void otro(int x1, int y1) {
    int x2 = x - 2, y2 = y + 2, x3;
    gotoxy(x2, y2);
    printf("^");
    y2++;
    gotoxy(x2, y2);
    printf("%c", 217);
    x2--;
    x3 = x2;
    for (int i = x2; i > x1; i--) {
        gotoxy(x2, y2);
        printf("%c", 196);
        x2--;
        if (i == (x3 + x1) / 2) {
            y2--;
            gotoxy(x2, y2);
            printf("b");
            y2++;
        }
    }
    gotoxy(x2, y2);
    printf("%c", 192);
    y2--;
    gotoxy(x2, y2);
    printf("%c", 179);
}


void linea_epsilon(int x1, int y1) {
    int x2 = x - 2, y2 = y + 2, x3;
    gotoxy(x2, y2);
    printf("^");
    y2++;
    gotoxy(x2, y2);
    printf("%c", 217);
    x2--;
    x3 = x2;
    for (int i = x2; i > x1; i--) {
        gotoxy(x2, y2);
        printf("%c", 196);
        x2--;
        if (i == (x3 + x1) / 2) {
            y2--;
            gotoxy(x2, y2);
            printf("%c", 156);
            y2++;
        }
    }
    gotoxy(x2, y2);
    printf("%c", 192);
    y2--;
    gotoxy(x2, y2);
    printf("%c", 179);
}

void estado_final() {
    estado--;
    x -= 3;
    gotoxy(x, y);
    printf("%c", 186);
    y += 1;
    gotoxy(x, y);
    printf("%c", 200);
    x += 1;
    gotoxy(x, y);
    printf("%c", 205);
    x += 1;
    gotoxy(x, y);
    printf("%c", 188);
    y -= 1;
    gotoxy(x, y);
    printf("%c", 186);
    y -= 1;
    gotoxy(x, y);
    printf("%c", 187);
    x -= 1;
    gotoxy(x, y);
    printf("%c", 205);
    x -= 1;
    gotoxy(x, y);
    printf("%c", 201);
    x += 1, y += 1;
    gotoxy(x, y);
    printf("%c", estado);
    x += 2;
}