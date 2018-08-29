
const data1 = [3, 4];
const data2 = [4, 3, 6];
const data3 = [1];

const WIDTH  = 100;
const HEIGHT = 100;

const height = d3.scaleLinear()
                .domain([0, 10])
                .range([0, HEIGHT]);

const y = d3.scaleLinear()
            .domain([0, 10])
            .range([HEIGHT, 0]);


const container = d3.select('body')
                    .append('svg')
                    .attr('width', WIDTH)
                    .attr('height', HEIGHT);

container.append('rect');
container.append('rect');
container.append('rect');

console.log(
container.selectAll('rect')
         .data(data1)
        //  .enter()
        //  .append('rect')
        //  .attr('width', 15)
        //  .attr('height', height)
        //  .attr('x', (_, i) => i * 20)
        //  .attr('y', y)
        //  .attr('fill', 'brown')
);
console.log(
container.selectAll('rect')
         .data(data2)
         .enter()
         .append('rect')
         .attr('width', 15)
         .attr('height', height)
         .attr('x', (_, i) => i * 20)
         .attr('y', y)
         .attr('fill', 'blue')
);

console.log(
    container.selectAll('rect')
             .data(data3)
             .exit()
             .remove()
    );


const multiData = [[1,2], [3,4]];

console.log(
container.selectAll('circ')
    .data(multiData)
);

