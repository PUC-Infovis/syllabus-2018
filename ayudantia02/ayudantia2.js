document.addEventListener('DOMContentLoaded', () => { 
    // Ejemplo 1
    const boton1 = document.getElementById("boton1");
    boton1.onclick = (d) => {
        console.log(d);
        console.log("Hice click en " + boton1.value)
    }

    const boton2 = document.getElementById("boton2");
    boton2.onclick = (d) => {
        console.log("Hice click en " + boton2.value)
    }

    const boton3 = document.getElementById("boton3");
    boton3.onclick = (d) => {
        console.log("Hice click en " + boton3.value)
    }


    // Ejemplo 2
    const botonHide = document.getElementById("botonHide");
    const texto = document.getElementById("ejemplo2");
    botonHide.onclick = (d) => {
        texto.style.display = "none"
    }

    const botonShow = document.getElementById("botonShow");
    botonShow.onclick = (d) => {
        texto.style.display = "block"
    }

    // Ejemplo 3
    const botonEditar = document.getElementById("botonEditar");
    botonEditar.onclick = (d) => {
        document.getElementById("ejemplo3").innerText = document.getElementById("textoEjemplo3").value
    }

    // Ejemplo 4
    const color1 = document.getElementById("color_1");
    const color2 = document.getElementById("color_2");
    color1.onclick = (d) => {
        const body = document.getElementsByTagName("body")[0];
        body.style.backgroundColor = "Magenta";
    }
    color2.onclick = (d) => {
        const body = document.getElementsByTagName("body")[0];
        body.style.backgroundColor = "White";
    }
    
}, false);
