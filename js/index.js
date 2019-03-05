var btn_calcular = document.querySelector('#calcular');
var btn_eliminar = document.querySelector('#eliminar');
var form = document.querySelector('#form');
var opciones = document.querySelector('#opciones');
var padre = document.querySelector('#contenedorGrupal');
var pResultado = document.querySelector("#resultado");
var veces;


btn_calcular.addEventListener('click', calcularInterpolacionErrores);
btn_eliminar.addEventListener('click', eliminar);
opciones.addEventListener('change', opcionesInterpolacion);

function opcionesInterpolacion() {

    padre.innerHTML = "";
    pResultado.innerHTML = "";

    let opcion = opciones.value;

    if (opcion === 'lineal') {
        veces = 2;

    } else if (opcion === 'cuadratica') {
        veces = 3;

    } else {
        console.log('Escoger una opción');
                
    }

    //Agregamos contenedores, inputs y párrafos dependiendo de la opción

    for (var i = 0; i < veces + 1; i++) {

        //Para valores que se estimarán

        if (i == 0) {

            var contenedorDeX = document.createElement("div");
            var contenedorDeF = document.createElement("div");
            var valorDeX = document.createElement("input");
            var valorDeF = document.createElement("input");
            var indicacionesDeX = document.createElement("label");
            var indicacionesDeF = document.createElement("label");
            indicacionesDeX.innerHTML = "Colocar el valor de X: ";
            indicacionesDeF.innerHTML = "Colocar que desea estimar f(x): ";
            
            

            valorDeX.id = "x";
            valorDeX.type = "number";
            valorDeF.id = "fx";
            valorDeF.type = "number";
            contenedorDeX.id = "contenedor_x";
            contenedorDeF.id = "contenedor_fx";
            contenedorDeX.appendChild(indicacionesDeX);
            contenedorDeF.appendChild(indicacionesDeF);
            contenedorDeX.appendChild(valorDeX);
            contenedorDeF.appendChild(valorDeF);
            padre.appendChild(contenedorDeX);
            padre.appendChild(contenedorDeF);

            //Para valores de los puntos

        } else {

            var contenedorDeX = document.createElement("div");
            var contenedorDeF = document.createElement("div");
            var valorDeX = document.createElement("input");
            var valorDeF = document.createElement("input");
            var indicacionesDeX = document.createElement("label");
            var indicacionesDeF = document.createElement("label");
            indicacionesDeX.innerHTML = "Colocar el valor de X<sub>" + (i - 1) + "</sub>: ";
            indicacionesDeF.innerHTML = "Colocar el valor de F(x<sub>" + (i - 1) + "</sub>): ";
            valorDeX.id = "x" + (i - 1);
            valorDeF.id = "fx" + (i - 1);
            contenedorDeX.id = "contenedor_x" + (i - 1);
            contenedorDeF.id = "contenedor_fx" + (i - 1);
            contenedorDeX.appendChild(indicacionesDeX);
            contenedorDeF.appendChild(indicacionesDeF);
            contenedorDeX.appendChild(valorDeX);
            contenedorDeF.appendChild(valorDeF);
            padre.appendChild(contenedorDeX);
            padre.appendChild(contenedorDeF);
        }

    }

}


function calcularInterpolacionErrores() {

    let x = [];
    let fx = [];
    let m2 = 0;
    let fxR = 0;
    let errorVerdadero = 0;
    let errorPorcentual = 0;
    let valorDeX = Number(document.querySelector('#x').value);
    let valorDeF = Number(document.querySelector('#fx').value);
    pResultado.innerHTML = "";

    for (let i = 0; i < veces; i++) {
        x.push(Number(document.querySelector('#x' + i).value));
        fx.push(Number(document.querySelector('#fx' + i).value));
    }

    if (veces == 2) {

        //Aplicar fórmula

        m2 = (fx[1] - fx[0]) / (x[1] - x[0]);
        fxR = fx[0] + (m2 * (valorDeX - x[0]));

        //Calcular errores

        errorVerdadero = valorDeF - fxR;
        errorPorcentual = (errorVerdadero / valorDeF) * 100;

        //Imprimir resultados

        pResultado.innerHTML = "La aproximación es de: " + fxR.toFixed(6) +
            "<br> El error verdadero es de: " + errorVerdadero.toFixed(6) +
            "<br> Y el error porcentual es de: " + errorPorcentual.toFixed(2) + "%";

    } else if (veces == 3) {

        //Aplicar fórmula

        let b0 = fx[0];
        let b1 = (fx[1] - fx[0]) / (x[1] - x[0]);
        let b2 = (((fx[2] - fx[0]) / (x[2] - x[0])) - b1) / (x[2] - x[1]);
        fxR = b0 + (b1 * (valorDeX - x[0])) + (b2 * (valorDeX - x[0]) * (valorDeX - x[1]));

        //Calcular errores

        errorVerdadero = valorDeF - fxR;
        errorPorcentual = (errorVerdadero / valorDeF) * 100;

        //Imprimir resultados

        pResultado.innerHTML = "La aproximación es de: " + fxR.toFixed(6) +
            "<br> El error verdadero es de: " + errorVerdadero.toFixed(6) +
            "<br> Y el error porcentual es de: " + errorPorcentual.toFixed(2) + "%";

    } else {
        alert('Favor de introducir todos los datos');

    }

}

function eliminar() {

    form.reset();

}