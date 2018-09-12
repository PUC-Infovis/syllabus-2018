// Para más referencia respecto a los métodos utilizados:
// https://github.com/d3/d3-force#simulation_alpha

const WIDTH = 1500;
const HEIGHT = 700;
const MARGIN = { TOP: 40, BOTTOM: 40, LEFT: 50, RIGHT: 50 };

const width = WIDTH - MARGIN.RIGHT - MARGIN.LEFT;
const height = HEIGHT - MARGIN.TOP - MARGIN.BOTTOM;

const FILEPATH = 'dataset.json';

const container = d3.select('#container')
  .append('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT)
  .append('g')
    .attr('transform',
        `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

const ticked = () => {
// Cada tick aumenta el alpha en (alphaTarget - alpha) × alphaDecay
// alpha = alpha + (alphaTarget - alpha) × alphaDecay
// alphaTarget parte como 0, alpha como 1 y alphaDecay como 0.0228
// Los ticks acaban cuando alpha es menor a una cota. Por defecto esa cota es  0.001

container.selectAll('.node')
    .attr('transform', node => `translate(${node.x}, ${node.y})`);

    container.selectAll('line')
             .attr('x1', link => link.source.x)
             .attr('y1', link => link.source.y)
             .attr('x2', link => link.target.x)
             .attr('y2', link => link.target.y);
};

const simulation = d3.forceSimulation()
                     .force('center', d3.forceCenter(width/2, height/2))
                     .force('collision', d3.forceCollide(20))
                     .force('charge', d3.forceManyBody().strength(-500))
                     .force('link', d3.forceLink().id(node => node.id));


d3.json(FILEPATH).then(dataset => {
    simulation.nodes(dataset.nodes)
              .on('tick', ticked)
              .force('link')
              .links(dataset.links)
              .distance(80);

    container.selectAll('line')
             .data(dataset.links)
             .enter()
             .append('line')
             .attr('x1', link => link.source.x)
             .attr('y1', link => link.source.y)
             .attr('x2', link => link.target.x)
             .attr('y2', link => link.target.y);

    const nodes = container.selectAll('.node')
                           .data(dataset.nodes)
                           .enter()
                           .append('g')
                           .attr('class', 'node')
                           .call(d3.drag()
                            .on("start", dragstarted)
                            .on("drag", dragged)
                            .on("end", dragended));

    nodes.append('circle').attr('r', 20);
    nodes.append('text').text(node => node.id).attr('dy', 5);
});

const dragstarted = (node) => {
  // d3.event.active es usado para detectar el primer evento y el último;
  // Esto es cero cuando el primer drag empieza y cero cuando el último drag termina.
  if (!d3.event.active) {
    // Cambiar el alphaTarget hace que el alpha aumente y la simulación vuelva a tomar accción
    // .restart para que se vuelvan a ejecutar los ticks.
    simulation.alphaTarget(0.3).restart();
  };
  node.fx = node.x;
  node.fy = node.y;
  // fx y fy se pueden considerar como las posiciones absolutas. Cuando no son nulas
  // obliga a que la posicion X, Y sea igual a fx, fy y la velocidad para moverse
  // en la simulación sea 0
}

const dragged = (node) => {
  node.fx = d3.event.x;
  node.fy = d3.event.y;
}

const dragended = (node) => {
  if (!d3.event.active) {
    // Cambiar el alphaTarget a 0 hace que el alpha comience a disminuir y así la simulación puede acabar
    simulation.alphaTarget(0.0);
  }
  node.fx = null;
  node.fy = null;
  // Indicamos que las posiciones absolutas sean nulas para que la simulación pueda alterar las velocidades
  // y posiciones X, Y
}