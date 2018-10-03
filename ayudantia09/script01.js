
const getNormalGenerator = (mu, sigma) => () => Math.floor(d3.randomNormal(mu, sigma)());

const weigthGen1 = getNormalGenerator(50, 7);
const weigthGen2 = getNormalGenerator(60, 8);
const weigthGen3 = getNormalGenerator(70, 4);

const heightGen1 = getNormalGenerator(175, 10);
const heightGen2 = getNormalGenerator(150, 30);
const heightGen3 = getNormalGenerator(120, 20);

const dataset = [
    ...d3.range(40).map(d => ({country: 'c1', weight: weigthGen1(), height: heightGen1()})),
    ...d3.range(30).map(d => ({country: 'c2', weight: weigthGen2(), height: heightGen2()})),
    ...d3.range(45).map(d => ({country: 'c3', weight: weigthGen3(), height: heightGen3()}))
];
console.log(dataset);

const WIDTH = 720;
const HEIGHT = 600;
const MARGIN = { TOP: 40, BOTTOM: 40, LEFT: 50, RIGHT: 50 };
const PADDING = 30;
const DASHSIZE = 70;

const width = WIDTH - MARGIN.RIGHT - MARGIN.LEFT;
const height = HEIGHT - MARGIN.TOP - MARGIN.BOTTOM;

const container = d3.select('#container')
                    .append('svg')
                      .attr('width', WIDTH)
                      .attr('height', HEIGHT)
                    .append('g')
                      .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

// const scatterplot = container.append('g')
//                                .attr('id', 'scatterplot')
//                                .attr('transform', `translate(${2 * DASHSIZE}, 0)`);

// scatterplot.append('rect')
//              .attr('width', width - 2 * DASHSIZE )
//              .attr('height', height - 2 * DASHSIZE)
//              .attr('fill', 'none')
//              .attr('stroke', '#ccc')
//              .attr('stroke-width', 1);

// const vDashed = container.append('g')
//                            .attr('id', 'vertical-dashed');

// vDashed.append('rect')
//          .attr('width', DASHSIZE)
//          .attr('height', height - 2 * DASHSIZE)
//          .attr('fill', 'none')
//          .attr('stroke', '#ccc')
//          .attr('stroke-width', 1);

// const hDashed = container.append('g')
//                            .attr('id', 'horizontal-dashed')
//                            .attr('transform', 
//                                  `translate(${2 * DASHSIZE}, ${height -  DASHSIZE})`);

// hDashed.append('rect')
//          .attr('width', width - 2 * DASHSIZE )
//          .attr('height', DASHSIZE)
//          .attr('fill', 'none')
//          .attr('stroke', '#ccc')
//          .attr('stroke-width', 1);

// const xscale = d3.scaleLinear()
//                  .domain([0, d3.max(dataset, d => d.weight) + 20])
//                  .range([0, width - 2 * DASHSIZE]);
// const yscale = d3.scaleLinear()
//                  .domain([0, d3.max(dataset, d => d.height) + 20])
//                  .range([height - 2 * DASHSIZE, 0]);

// const axisBottom = d3.axisBottom(xscale);
// const axisLeft = d3.axisLeft(yscale);

// const colorScale = d3.scaleOrdinal().range(['red', 'blue', 'green']);
// const dashScale = d3.scaleOrdinal()
//                     .range([0, (DASHSIZE - 10) / 3 + 5, 2 * (DASHSIZE - 10) / 3 + 10]);

// const xAxisSP = container.append('g')
//                           .attr('class', 'axis axis--x')
//                           .attr('transform', 
//                                 `translate(${2 * DASHSIZE}, ${height - 2 * DASHSIZE})`);

// const yAxisSP = container.append('g')
//                          .attr('class', 'axis axis--y')
//                          .attr('transform',
//                                `translate(${2 * DASHSIZE}, 0)`);

// const xAxisH = container.append('g')
//                           .attr('class', 'axis axis--x')
//                           .attr('transform', 
//                                 `translate(${2 * DASHSIZE}, ${height - DASHSIZE})`);

// const yAxisV = container.append('g')
//                          .attr('class', 'axis axis--y');


// xAxisSP.call(axisBottom)
//        .selectAll('.tick')
//        .select('line')
//        .attr('class', 'background')
//        .attr('y2', - (height - 2 * DASHSIZE))
//        .attr('stroke', '#aaa')
//        .attr('opacity', 0.5);
     
// yAxisSP.call(axisLeft)
//        .selectAll('.tick')
//        .select('line')
//        .attr('class', 'background')
//        .attr('x2', width - 2 * DASHSIZE)
//        .attr('stroke', '#aaa')
//        .attr('opacity', 0.5);

// xAxisH.call(axisBottom);
// xAxisH.selectAll('.tick').select('text').remove();
// xAxisH.select('.domain').remove();
// xAxisH.selectAll('.tick')
//       .select('line')
//       .attr('y2', DASHSIZE)
//       .attr('stroke', '#aaa')
//       .attr('opacity', 0.5);

// yAxisV.call(axisLeft);
// yAxisV.selectAll('.tick').select('text').remove();
// yAxisV.select('.domain').remove();
// yAxisV.selectAll('.tick')
//       .select('line')
//       .attr('x2', DASHSIZE)
//       .attr('stroke', '#aaa')
//       .attr('opacity', 0.5);

    
// const dots = scatterplot.selectAll('circle')
//                         .data(dataset)
//                         .enter()
//                         .append('circle')
//                           .attr('cx', d => xscale(d.weight))
//                           .attr('cy', d => yscale(d.height))
//                           .attr('r', 2)
//                           .attr('stroke', d => colorScale(d.country));

// const hLines = hDashed.selectAll('line')
//                       .data(dataset)
//                       .enter()
//                       .append('line')
//                         .attr('y1', d => dashScale(d.country))
//                         .attr('x1', d => xscale(d.weight))
//                         .attr('y2', d => dashScale(d.country) + (DASHSIZE - 10) / 3)
//                         .attr('x2', d => xscale(d.weight))
//                         .attr('stroke', d => colorScale(d.country))
//                         .attr('stroke-width', 1);

// const vLines = vDashed.selectAll('line')
//                       .data(dataset)
//                       .enter()
//                       .append('line')
//                         .attr('x1', d => dashScale(d.country))
//                         .attr('y1', d => yscale(d.height))
//                         .attr('x2', d => dashScale(d.country) + (DASHSIZE - 10) / 3)
//                         .attr('y2', d => yscale(d.height))
//                         .attr('stroke', d => colorScale(d.country))
//                         .attr('stroke-width', 1);



// let currentTransform = d3.zoomIdentity;
// console.log(currentTransform);

// const zoomed = () => {
//       // console.log(d3.event.transform);
//       currentTransform = d3.event.transform;
//       const xscale2 = currentTransform.rescaleX(xscale);
//       const yscale2 = currentTransform.rescaleY(yscale);

//       scatterplot.selectAll('circle').attr('transform', currentTransform);
//       vDashed.selectAll('line')
//             .attr('y1', d => yscale2(d.height))
//             .attr('y2', d => yscale2(d.height));
//       hDashed.selectAll('line')
//             .attr('x1', d => xscale2(d.weight))
//             .attr('x2', d => xscale2(d.weight));

//       xAxisSP.call(axisBottom.scale(xscale2))
//            .selectAll('.tick')
//             .select('line')
//             .attr('y2', - (height - 2 * DASHSIZE))
//             .attr('stroke', '#aaa')
//             .attr('opacity', 0.5);
//       yAxisSP.call(axisLeft.scale(yscale2))
//             .selectAll('.tick')
//             .select('line')
//             .attr('x2', width - 2 * DASHSIZE)
//             .attr('stroke', '#aaa')
//             .attr('opacity', 0.5);
      
//       xAxisH.call(axisBottom.scale(xscale2));
//       xAxisH.selectAll('.tick').select('text').remove();
//       xAxisH.select('.domain').remove();
//       xAxisH.selectAll('.tick')
//             .select('line')
//             .attr('y2', DASHSIZE)
//             .attr('stroke', '#aaa')
//             .attr('opacity', 0.5);

//       yAxisV.call(axisLeft.scale(yscale2));
//       yAxisV.selectAll('.tick').select('text').remove();
//       yAxisV.select('.domain').remove();
//       yAxisV.selectAll('.tick')
//             .select('line')
//             .attr('x2', DASHSIZE)
//             .attr('stroke', '#aaa')
//             .attr('opacity', 0.5);

// };

// const zoom = d3.zoom()
//                .extent([[0, 0], [width - 2 * DASHSIZE, height - 2 * DASHSIZE]])
//                .translateExtent([[0, 0], [width - 2 * DASHSIZE, height - 2 * DASHSIZE]])
//                .scaleExtent([0.8, 10])
//                .on('zoom', zoomed);

// scatterplot.append('clipPath')
//        .attr('id', 'clipSP')
//        .append('rect')
//        .attr('width', width - 2 * DASHSIZE)
//        .attr('height', height - 2 * DASHSIZE);

// vDashed.append('clipPath')
//        .attr('id', 'clipV')
//        .append('rect')
//        .attr('width', DASHSIZE)
//        .attr('height', height - 2 * DASHSIZE);

// hDashed.append('clipPath')
//        .attr('id', 'clipH')
//        .append('rect')
//        .attr('width', width - 2 * DASHSIZE)
//        .attr('height', DASHSIZE);

// scatterplot.append('rect')
//            .attr('width', width - 2 * DASHSIZE)
//            .attr('height', height - 2 * DASHSIZE)
//            .style('fill', 'none')
//            .style('pointer-events', 'all');

// scatterplot.call(zoom);