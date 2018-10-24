
let value = 5000;
const randomData = d3.range(value);
console.log(randomData);

const width = 800, height = 2000;
const groupSpacing = 5; 
const cellSpacing = 2;
const offsetTop = height / 5;
const cellSize = Math.floor((width - 11 * groupSpacing) / 100) - cellSpacing;

const canvas = d3.select('#container')
                 .append('canvas')
                    .attr('width', width)
                    .attr('height', height);

const context = canvas.node().getContext('2d');
console.log(context);

// const customBase = document.createElement('custom');
// const custom = d3.select(customBase);

// const dataBind = (data) => {

//     const colourScale = d3.scaleSequential(d3.interpolateSpectral)      
//                           .domain(d3.extent(data, function(d) { return d; }));

//     const dataJoin = custom.selectAll('custom.rect')
//                            .data(data);
    
//     const enter = dataJoin.enter()
//                           .append('custom')
//                           .attr('class', 'rect')
//                           .attr('x', (_, i) => {
//                             const x0 = Math.floor(i / 100) % 10, 
//                                   x1 = Math.floor(i % 10);     
//                             return groupSpacing * x0 + (cellSpacing + cellSize) * (x1 + x0 * 10); 
//                           })
//                           .attr('y', (_, i) => {
//                             const y0 = Math.floor(i / 1000), 
//                                   y1 = Math.floor(i % 100 / 10); 
//                             return groupSpacing * y0 + (cellSpacing + cellSize) * (y1 + y0 * 10);
//                           })
//                           .attr('width', 0)
//                           .attr('height', 0);
    
//     dataJoin.merge(enter)
//             // .transition()
//             // .duration(1000)
//             .attr('width', cellSize)
//             .attr('height', cellSize)
//             .attr('fill', colourScale);

//     const exit = dataJoin.exit()
//                          .transition()
//                          .duration(1000)
//                          .attr('width', 0)
//                          .attr('height', 0)
//                          .remove();

// };

// const draw = () => {
//     context.clearRect(0, 0, width, height);
//     const elements = custom.selectAll('custom.rect');
//     elements.each((d, i, elems) => {
//         const node = d3.select(elems[i]); 
//         context.fillStyle = node.attr('fill');
//         context.fillRect(node.attr('x'), node.attr('y'), node.attr('width'), node.attr('height'));
//     });
// };


// dataBind(randomData);
// draw();

// let t = d3.timer((elapsed) => {
//     draw();
//     if (elapsed > 1000) t.stop();
// });

// d3.select('#text-input').on('keydown', function() {
//     if (d3.event.keyCode === 13) { 
//         if (+this.value >= 1 && +this.value < 10001) { 
//             value = +this.value;
//             dataBind(d3.range(value));
//             t = d3.timer((elapsed) => {
//                 draw();
//                 if (elapsed > 1000) t.stop();
//             });
//         }
//     }
// });