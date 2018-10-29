const React = require("react");
const ReactDOM = require("react-dom");
const D3Component = require("idyll-d3-component");
const d3 = require("d3");

class D3Graph extends D3Component {
  initialize(node, props) {
    const svg = (this.svg = d3.select(node).append("svg"));

    const WIDTH = 600;
    const HEIGHT = 600;
    const MARGIN = { TOP: 40, BOTTOM: 40, LEFT: 50, RIGHT: 50 };
    const MAX_RADIUS = 20;

    const width = WIDTH - MARGIN.RIGHT - MARGIN.LEFT;
    const height = HEIGHT - MARGIN.TOP - MARGIN.BOTTOM;

    const container = svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("width", width)
      .style("height", height);

    const ticked = () => {
      // Cada tick aumenta el alpha en (alphaTarget - alpha) × alphaDecay
      // alpha = alpha + (alphaTarget - alpha) × alphaDecay
      // alphaTarget parte como 0, alpha como 1 y alphaDecay como 0.0228
      // Los ticks acaban cuando alpha es menor a una cota. Por defecto esa cota es  0.001
      container
        .selectAll(".node")
        .attr("cx", function(d) {
          return (d.x = Math.max(
            MAX_RADIUS,
            Math.min(width - MAX_RADIUS, d.x)
          ));
        })
        .attr("cy", function(d) {
          return (d.y = Math.max(
            MAX_RADIUS,
            Math.min(height - MAX_RADIUS, d.y)
          ));
        })
        .attr("transform", node => `translate(${node.x}, ${node.y})`);

      container
        .selectAll("line")
        .attr("x1", link => link.source.x)
        .attr("y1", link => link.source.y)
        .attr("x2", link => link.target.x)
        .attr("y2", link => link.target.y);
    };

    const dragstarted = (node, i, nodes) => {
      // d3.event.active es usado para detectar el primer evento y el último;
      // Esto es cero cuando el primer drag empieza y cero cuando el último drag termina.
      if (!d3.event.active) {
        // Cambiar el alphaTarget hace que el alpha aumente y la simulación vuelva a tomar accción
        // .restart para que se vuelvan a ejecutar los ticks.
        simulation.alphaTarget(0.3).restart();
      }
      node.fx = node.x;
      node.fy = node.y;
      // fx y fy se pueden considerar como las posiciones absolutas. Cuando no son nulas
      // obliga a que la posicion X, Y sea igual a fx, fy y la velocidad para moverse
      // en la simulación sea 0
      d3.select(nodes[i]).classed("node_fixed", true);
    };

    const dragged = node => {
      node.fx = d3.event.x;
      node.fy = d3.event.y;
    };

    const dragended = node => {
      if (!d3.event.active) {
        // Cambiar el alphaTarget a 0 hace que el alpha comience a dominuir y así la simulación puede acabar
        simulation.alphaTarget(0.0);
      }
      // Indicamos que las posiciones absolutas sean nulas para que la simulación pueda alterar las velocidades
      // y posiciones X, Y
    };

    this.tick = ticked;

    const simulation = d3
      .forceSimulation()
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide(props.forceCollide))
      .force("charge", d3.forceManyBody().strength(props.charge))
      .force("link", d3.forceLink().id(node => node.id));

    const dataset = props.data;
    simulation
      .nodes(dataset.nodes)
      .on("tick", ticked)
      .force("link")
      .links(dataset.links)
      .distance(props.links);

    container
      .selectAll("line")
      .data(dataset.links)
      .enter()
      .append("line")
      .attr("x1", link => link.source.x)
      .attr("y1", link => link.source.y)
      .attr("x2", link => link.target.x)
      .attr("y2", link => link.target.y);

    const nodes = container
      .selectAll(".node")
      .data(dataset.nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      )
      .on("click", (node, i, nodes) => {
        node.fx = null;
        node.fy = null;
        d3.select(nodes[i]).classed("node_fixed", false);
      });

    nodes.append("circle").attr("r", MAX_RADIUS);
    nodes
      .append("text")
      .text(node => node.id)
      .attr("dy", 5);

    this.simulation = simulation;
  }

  update(props, oldProps) {
    this.simulation
      .force("collision", d3.forceCollide(props.forceCollide))
      .force("charge", d3.forceManyBody().strength(props.charge))
      .force("link")
      .distance(props.links);

    this.simulation.alphaTarget(0.3).restart();
  }
}

module.exports = D3Graph;
