
// const paragraphs = document.getElementsByTagName('p');
// for (let paragraph of paragraphs) {
//     paragraph.style.setProperty('color', 'green');
// } // Estilo imperativo


// ///////////////////////////////////////////////
// d3.selectAll('p').style('color', 'green'); // Estilo declarativo

// d3.select('p').style('color', 'red'); // selectAll selecciona todos, select el primero que encuentre

// ///////////////////////////////////////////////
// const header = d3.select('#d3-header');           // Seleccionamos por 'id'.
// header.style('color', 'blue');                    // Cambia el color a azul.
// header.text(`Mi versión de D3: v${d3.version}`);  // Cambia el texto.

// ///////////////////////////////////////////////
// Cuando realizamos una acción como ".style()", este retorna el mismo objeto
// Por lo tanto, podemos concatenar las acciones
// const header = d3.select('#d3-header')
//                .style('color', 'blue')
//                .text(`Mi versión de D3: v${d3.version}`);

// ///////////////////////////////////////////////
// const WIDTH  = 800;
// const HEIGHT = 500;

// const container = d3.select('body')
//                   .append('svg')                 // Añade elemento SVG,
//                   .attr('width', WIDTH)          // le ajusta su ancho,
//                   .attr('height', HEIGHT);       // y también su altura.


// container.append('rect')                         // Añade un rectángulo,
//          .attr('width', 80)                      // le ajusta su ancho,
//          .attr('height', 50)                     // también su altura,
//          .attr('fill', 'teal')                   // también su color,
//          .attr('stroke', '#222')                 // también su borde,
//          .attr('stroke-width', 3)                // también su grosor,
//          .attr('x', 30)                          // también su 'x',
//          .attr('y', 50);                         // también su 'y'.
