// ///////////////////////////////////////////////
// // v5
// d3.csv('./data/file.csv').then(dataset => {

//     dataset.forEach(d => {
//         d.Age = parseFloat(d.Age);
//     });

//     console.log(dataset);
// });

// // v3 y v4
// d3.csv('./data/file.csv', dataset => {

//     dataset.forEach(d => {
//         d.Age = parseFloat(d.Age);
//     });

//     console.log(dataset);
// });


// ///////////////////////////////////////////////
// // v4 y v5
// const scale = d3.scaleLinear()
//                 .domain([0,1])
//                 .range([0,100]);

// console.log(scale(0.3));

// v3
// const scale = d3.scale.linear()
//                 .domain([0,1])
//                 .range([0,100]);

// console.log(scale(0.3));


// ///////////////////////////////////////////////
// const container = d3.select('body')
//                     .append('svg')
//                     .attr('width', 500)
//                     .attr('height', 500);

// container.selectAll('rect')
//          .data([5]).enter()
//          .append('rect')
//          .attr('x', 50)
//          .attr('y', 50)
//          .attr('width', d => 10 * d)
//          .attr('height', d => 10 * d)
//          .attr('fill', 'teal')
//          .attr('stroke', '#222')
//         //  .attr('stroke-width', function(d, i, elems) { //estilo v3
//         //     console.log(this); //estilo v3
//         //     return 3;
//         //  })
//         //  .attr('stroke-width', (d, i, elems) => { //estilo v4
//         //     console.log(this);
//         //     console.log(elems[i]); //estilo v4
//         //     return 3;
//         //  })
//         ;
