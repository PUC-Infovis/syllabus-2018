
const WIDTH = 720;
const HEIGHT = 600;
const MARGIN = { TOP: 40, BOTTOM: 40, LEFT: 50, RIGHT: 50 };
const PADDING = 30;
const DASHSIZE = 70;

const width = WIDTH - MARGIN.RIGHT - MARGIN.LEFT;
const height = HEIGHT - MARGIN.TOP - MARGIN.BOTTOM;

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

const container = d3.select('#container')
                    .append('svg')
                      .attr('width', WIDTH)
                      .attr('height', HEIGHT)
                    .append('g')
                      .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

const scatterplot = container.append('g')
                               .attr('id', 'scatterplot')
                               .attr('transform', `translate(${2 * DASHSIZE}, 0)`);


scatterplot.append('rect')
             .attr('width', width - 2 * DASHSIZE )
             .attr('height', height - 2 * DASHSIZE)
             .attr('fill', 'none')
             .attr('stroke', '#ccc')
             .attr('stroke-width', 1);

const vDashed = container.append('g')
                           .attr('id', 'vertical-dashed');

vDashed.append('rect')
         .attr('width', DASHSIZE )
         .attr('height', height - 2 * DASHSIZE)
         .attr('fill', 'none')
         .attr('stroke', '#ccc')
         .attr('stroke-width', 1);

const hDashed = container.append('g')
                           .attr('id', 'horizontal-dashed')
                           .attr('transform', 
                                 `translate(${2 * DASHSIZE}, ${height -  DASHSIZE})`);

hDashed.append('rect')
         .attr('width', width - 2 * DASHSIZE )
         .attr('height', DASHSIZE)
         .attr('fill', 'none')
         .attr('stroke', '#ccc')
         .attr('stroke-width', 1);

const xscale = d3.scaleLinear().range([0, width - 2 * DASHSIZE]);
const yscale = d3.scaleLinear().range([height - 2 * DASHSIZE, 0]);

const axisBottom = d3.axisBottom(xscale).ticks(8);
const axisLeft = d3.axisLeft(yscale).ticks(8);

const colorScale = d3.scaleOrdinal().range(['red', 'blue', 'green']);
const dashScale = d3.scaleOrdinal()
                    .range([0, (DASHSIZE - 10) / 3 + 5, 2 * (DASHSIZE - 10) / 3 + 10]);

const xAxisSC = container.append('g')
                          .attr('class', 'axis axis--x')
                          .attr('transform', 
                                `translate(${2 * DASHSIZE}, ${height - 2 * DASHSIZE})`);

const yAxisSC = container.append('g')
                         .attr('class', 'axis axis--y')
                         .attr('transform',
                               `translate(${2 * DASHSIZE}, 0)`);

const xAxisH = container.append('g')
                          .attr('class', 'axis axis--x')
                          .attr('transform', 
                                `translate(${2 * DASHSIZE}, ${height - DASHSIZE})`);

const yAxisV = container.append('g')
                         .attr('class', 'axis axis--y');

xscale.domain([0, d3.max(dataset, d => d.weight) + 20]);
yscale.domain([0, d3.max(dataset, d => d.height) + 20]);

xAxisSC.call(axisBottom)
       .selectAll('.tick')
       .append('line')
       .attr('y2', - (height - 2 * DASHSIZE))
       .attr('stroke', '#aaa')
       .attr('opacity', 0.5);
     
yAxisSC.call(axisLeft)
       .selectAll('.tick')
       .append('line')
       .attr('x2', width - 2 * DASHSIZE)
       .attr('stroke', '#aaa')
       .attr('opacity', 0.5);

xAxisH.call(axisBottom);
xAxisH.selectAll('.tick')
      .select('text').remove();
xAxisH.selectAll('.tick')
      .select('line').remove();
xAxisH.select('.domain').remove();
xAxisH.selectAll('.tick')
      .append('line')
      .attr('y2', DASHSIZE)
      .attr('stroke', '#aaa')
      .attr('opacity', 0.5);

yAxisV.call(axisLeft);
yAxisV.selectAll('.tick')
      .select('text').remove();
yAxisV.selectAll('.tick')
      .select('line').remove();
yAxisV.select('.domain').remove();
yAxisV.selectAll('.tick')
      .append('line')
      .attr('x2', DASHSIZE)
      .attr('stroke', '#aaa')
      .attr('opacity', 0.5);

console.log(axisBottom);
console.log(axisLeft);
    
const dots = scatterplot.selectAll('circle')
                        .data(dataset)
                        .enter()
                        .append('circle')
                          .attr('cx', d => xscale(d.weight))
                          .attr('cy', d => yscale(d.height))
                          .attr('r', 2)
                          .attr('stroke', d => colorScale(d.country));

const vLines = vDashed.selectAll('line')
                      .data(dataset)
                      .enter()
                      .append('line')
                        .attr('x1', d => dashScale(d.country))
                        .attr('y1', d => yscale(d.height))
                        .attr('x2', d => dashScale(d.country) + (DASHSIZE - 10) / 3)
                        .attr('y2', d => yscale(d.height))
                        .attr('stroke', d => colorScale(d.country))
                        .attr('stroke-width', 1);

const hLines = hDashed.selectAll('line')
                      .data(dataset)
                      .enter()
                      .append('line')
                        .attr('y1', d => dashScale(d.country))
                        .attr('x1', d => xscale(d.weight))
                        .attr('y2', d => dashScale(d.country) + (DASHSIZE - 10) / 3)
                        .attr('x2', d => xscale(d.weight))
                        .attr('stroke', d => colorScale(d.country))
                        .attr('stroke-width', 1);

const isInSelection = (d, selection, orientation = 'XY') => {
    if (orientation === 'X') {
        const x1 = selection[0],
              x2 = selection[1];
        return x1 <= xscale(d.weight) && xscale(d.weight) <= x2;
    } else if (orientation === 'Y') {
        const y1 = selection[0],
              y2 = selection[1];
        return y1 <= yscale(d.height) && yscale(d.height) <= y2;
    } else {
        const x1 = selection[0][0],
              y1 = selection[0][1],
              x2 = selection[1][0],
              y2 = selection[1][1];
        return x1 <= xscale(d.weight) && xscale(d.weight) <= x2 
            && y1 <= yscale(d.height) && yscale(d.height) <= y2;
    }
};

const brushed = (orientation = 'XY') => () => {
    const selection = d3.event.selection;
//     console.log(d3.event);
    dots.classed('not-selected', d => !isInSelection(d, selection, orientation));
    vLines.classed('not-selected', d => !isInSelection(d, selection, orientation));
    hLines.classed('not-selected', d => !isInSelection(d, selection, orientation));
};
const brushended = () => {
    if (!d3.event.selection) {
        dots.classed('not-selected', false);
        vLines.classed('not-selected', false);
        hLines.classed('not-selected', false);
    }
};

const brushSC = d3.brush()
                  .extent([[0, 0], [width - 2 * DASHSIZE, height - 2 * DASHSIZE]])
                  .on('start brush', brushed())
                  .on('end', brushended);

container.append("g")
         .attr('transform', `translate(${2 * DASHSIZE}, 0)`)
         .call(brushSC);

const brushV = d3.brushY()
                 .extent([[0, 0], [DASHSIZE, height - 2 * DASHSIZE]])
                 .on('start brush', brushed('Y'))
                 .on('end', brushended);

container.append("g")
         .call(brushV);

const brushH = d3.brushX()
                 .extent([[0, 0], [width - 2 * DASHSIZE, DASHSIZE]])
                 .on('start brush', brushed('X'))
                 .on('end', brushended);

container.append("g")
         .attr('transform', `translate(${2 * DASHSIZE}, ${height - DASHSIZE})`)
         .call(brushH);