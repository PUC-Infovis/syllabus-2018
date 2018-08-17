const dataset = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5,
                 8, 9, 7, 9, 3, 2, 3, 8, 4, 6,
                 2, 6, 4, 3, 3, 8, 3, 2, 7, 9,
                 5, 10, 2, 8, 8, 4, 1, 9, 7, 1];

const WIDTH  = 800;
const HEIGHT = 500;

const container = d3.select('body')
                    .append('svg')           // Añade elemento SVG,
                    .attr('width', WIDTH)    // le ajusta su ancho,
                    .attr('height', HEIGHT); // y también su altura.


// ///////////////////////////////////////////////
// container.selectAll('rect')      // Los elementos del documento -- DOM.
//          .data(dataset).enter()  // Los elementos de los datos.
//        .append('rect')           // Añade un <rect> por cada dato entrante.
//          .attr('width', 15)
//          .attr('height', d => d * 50)
//          .attr('x', (_, i) => i * 20)
//          .attr('y', 0)
//          .attr('fill', 'brown');



// ///////////////////////////////////////////////
// const scale = d3.scaleLinear()                 // Forma una escala lineal.
//                 .domain([0, d3.max(dataset)])  // En este caso: 0 -->  10
//                 .range([0, HEIGHT]);           //               0 --> 500

// console.log(scale(10));  // 10 * 50 = 500
// console.log(scale(2));   //  2 * 50 = 100
// console.log(scale(7));   //  7 * 50 = 350

// container.selectAll('rect')
//          .attr('width', 15)
//          .attr('height', scale)
//          .attr('x', (_, i) => i * 20)
//          .attr('y', d => HEIGHT - scale(d))
//          .attr('fill', 'brown');


// ///////////////////////////////////////////////
// const numberColor = digit => {
//     if (digit <= 3) {
//         return 'red';
//     }
//     else if (digit <= 6) {
//         return 'yellow';
//     }
//     else {
//         return 'green';
//     }
// };

// container.selectAll('rect')
//          .attr('fill', numberColor);


// ///////////////////////////////////////////////
// const bicolor = d3.scaleLinear()
//                   .domain([0, d3.max(dataset)])
//                   .range(['red', 'blue']);

// console.log(bicolor(0));   // '#FF0000' (rojo)
// console.log(bicolor(5));   // '#800080' (púrpura)
// console.log(bicolor(10));  // '#0000FF' (azul)

// container.selectAll('rect')
//          .attr('fill', bicolor);


// ///////////////////////////////////////////////
// const tricolor = d3.scaleLinear()
//                    .domain([0, d3.max(dataset)/2, d3.max(dataset)])
//                    .range(['red', 'yellow', 'green']);

// container.selectAll('rect')
//          .attr('fill', tricolor);
