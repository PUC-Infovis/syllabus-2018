
const WIDTH  = 400;
const HEIGHT = 100;

const container = d3.select('body')
                    .append('svg')
                    .attr('width', WIDTH)
                    .attr('height', HEIGHT);

const height = d3.scaleLinear()
                 .domain([0, 10])
                 .range([0, HEIGHT]);
    
const y = d3.scaleLinear()
            .domain([0, 10])
            .range([HEIGHT, 0]);

const data = [3, 1, 4, 1, 5];
console.log(data);

// ////////////////////////////////////////////////////

// let update = container.selectAll('rect')
//                         .data(data);
// let enter = update.enter();
// let exit = update.exit();

// // console.log(update);
// // console.log(enter);
// // console.log(exit);

// enter.append('rect')
//      .attr('width', 15)
//      .attr('height', height)
//      .attr('x', (_, i) => i * 20)
//      .attr('y', y)
//      .attr('fill', 'brown');


// // ////////////////////////////////////////////////////


// data.push(9);
// update = container.selectAll('rect')
//                   .data(data);
// enter = update.enter();
// exit = update.exit();

// // console.log(update);
// // console.log(enter);
// // console.log(exit);

// update.attr('fill', 'blue');
// enter.append('rect')
//      .attr('width', 15)
//      .attr('height', height)
//      .attr('x', (_, i) => i * 20)
//      .attr('y', y)
//      .attr('fill', 'magenta');

// // ////////////////////////////////////////////////////


// data.pop();
// update = container.selectAll('rect')
//                   .data(data);
// enter = update.enter();
// exit = update.exit();

// // console.log(update);
// // console.log(enter);
// // console.log(exit);

// update.attr('fill', 'green');
// enter.append('rect')
//      .attr('width', 15)
//      .attr('height', height)
//      .attr('x', (_, i) => i * 20)
//      .attr('y', y)
//      .attr('fill', 'yellow');
// exit.remove();

// // ////////////////////////////////////////////////////


// data.splice(1,1);
// console.log(data);
// update = container.selectAll('rect')
//                   .data(data);
// enter = update.enter();
// exit = update.exit();

// // console.log(update);
// // console.log(enter);
// // console.log(exit);

// update.attr('y', y)
//       .attr('height', height);
// exit.remove();


// // ////////////////////////////////////////////////////


// const dataWithKey = [
//     {
//         key: 1,
//         name: 'Fernando'
//     },
//     {
//         key: 2,
//         name: 'Hernán'
//     },
//     {
//         key: 3,
//         name: 'Cristóbal'
//     }
// ];

// update = d3.select('svg')
//            .selectAll('text')
//            .data(dataWithKey, (d, i, el) => d ? d.key : el[i].id);
// enter = update.enter();
// exit= update.exit();

// enter.append('text')
//      .attr('id', d => d.key)
//      .attr('y', 50)
//      .attr('x', (_,i) => 100 + i * 100)
//      .text(d => d.name);

// // ////////////////////////////////////////////////////

// dataWithKey.splice(1,1);
// update = d3.select('svg')
//            .selectAll('text')
//            .data(dataWithKey, (d, i, el) => d ? d.key : el[i].id);
// enter = update.enter();
// exit= update.exit();

// exit.remove();
