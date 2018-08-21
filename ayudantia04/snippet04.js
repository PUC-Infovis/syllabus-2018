// Cargar datos desde un directorio no es permitido directamente 
// en algunos navegadores, como Google Chrome, por seguridad.
// Puedes probar este código en Firefox, o correr un servidor local
// que te permita cargar archivos desde el directorio.
// Una forma fácil de montar un servidor local en el directorio usango Python 3.5 o sup:
// Desde terminal:
// cd 'path/a/directorio/con/ejemplos'
// python -m http.server 8000
// Puedes luego acceder a 'localhost:8000' en tu navegador favorito


// d3.csv('./data/file.csv').then(dataset => {

//     dataset.forEach(d => {
//         d.Age = parseFloat(d.Age);
//     });

//     console.log(dataset);
// });


// ///////////////////////////////////////////////
// d3.csv('./data/file.csv', d => {
//     return {
//         name: d.Name,
//         age: parseFloat(d.Age),
//         gender: d.Sex
//     };
// }).then(dataset => {
//     console.log(dataset);
// });


// ///////////////////////////////////////////////
// async function printData() {
//     const dataset = await d3.csv('./data/file.csv', d => {
//         return {
//             name: d.Name,
//             age: parseFloat(d.Age),
//             gender: d.Sex
//         };
//     });
//     console.log(dataset);
// };
// printData();



// ///////////////////////////////////////////////
// const WIDTH  = 800;
// const HEIGHT = 400;

// const container = d3.select('body')
//                     .append('svg')
//                     .attr('width', WIDTH)
//                     .attr('height', HEIGHT);


// async function renderBarChart() {
//     let dataset;
//     try {
//         dataset = await d3.csv('./data/file.csv', d => {
//             return {
//                 name: d.Name,
//                 age: parseFloat(d.Age),
//                 gender: d.Sex
//             };
//         });
//     }
//     catch (error) {
//         console.log('¡Error!');
//         console.log(error.message);
//         dataset = [];
//     }
//     const scale = d3.scaleLinear()
//                     .domain([0, d3.max(dataset, d => d.age)])
//                     .range([0, HEIGHT]);
    
//     const categoryScale = d3.scaleOrdinal()
//                             .domain(['M', 'F'])
//                             .range(['magenta', 'teal']);

//     container.selectAll('rect')
//         .data(dataset).enter()
//         .append('rect')
//         .attr('width', 15)
//         .attr('height', d => scale(d.age))
//         .attr('x', (_, i) =>  (i + 1) * 20)
//         .attr('y', d => HEIGHT - scale(d.age))
//         .attr('fill', d => categoryScale(d.gender));
// }

// renderBarChart();
