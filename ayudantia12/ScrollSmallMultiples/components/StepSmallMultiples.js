const React = require("react");
const ReactDOM = require("react-dom");
const D3Component = require("idyll-d3-component");
const d3 = require("d3");

class StepSmallMultiples extends D3Component {
  initialize(node, props) {
    // Definir variables estandar
    const WIDTH = 500;
    const HEIGHT = 400;
    const MARGIN = { TOP: 40, BOTTOM: 40, LEFT: 50, RIGHT: 50 };

    const width = WIDTH - MARGIN.RIGHT - MARGIN.LEFT;
    const height = HEIGHT - MARGIN.TOP - MARGIN.BOTTOM;

    this.build = () => {
      // método incial que construye el SVG
      const svg = d3.select(node).append("svg");
      this.container = svg
        .style("width", WIDTH)
        .style("height", HEIGHT)
        .append("g");
    };

    this.bigLineChart = count => {
      // Método que construye el gráfico de línea normal
      let container = this.container
        .append("g")
        .attr("id", "graph")
        .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

      // Definimos la escala del eje X  
      let xScale = d3
        .scaleLinear()
        .domain([2004, 2014])
        .range([0, width]);

      // Definimos la escala del eje Y  
      let yScale = d3
        .scaleLinear()
        .domain([0, 3500])
        .range([height, 0]);

      // Definimos la función a cargo de realizar las líneas
      let line = d3
        .line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.n));

      // Definimos los ejes
      const axisBottom = d3.axisBottom(xScale).tickPadding(10);
      const axisLeft = d3.axisLeft(yScale).tickPadding(10);

      // Agregamos los ejes al gráfico
      container
        .append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(axisBottom);

      container
        .append("g")
        .attr("class", "y axis")
        .call(axisLeft);

      // Si solo muestro un dato, selecciono
      this.nested_data.slice(0, count).forEach(dataSeries => {
        container
          .append("path")
          .datum(dataSeries.values)
          .attr("class", "line")
          .attr("d", line);
      });
    };

    this.smallMultiple = (count, hover) => {
      let new_width = 80;
      let new_heigh = 80;
      let axes_size = 30;

      let container = this.container
        .append("g")
        .attr("id", "graph")
        .attr("transform", `translate(30,30)`);

      let xScale = d3
        .scaleTime()
        .domain([new Date(2004, 0, 1), new Date(2014, 0, 1)])
        .range([0, new_width]);

      let yScale = d3
        .scaleLinear()
        .domain([0, 3500])
        .range([new_heigh, 0]);

      const axisBottom = d3
        .axisBottom(xScale)
        .tickPadding(10)
        .ticks(2);

      const axisLeft = d3
        .axisLeft(yScale)
        .tickPadding(10)
        .ticks(4);

      let line = d3
        .line()
        .x(d => xScale(new Date(d.year, 0, 1)))
        .y(d => yScale(d.n));

      let MAX_ITEM_PER_COLUMN = 3;

      this.nested_data.slice(0, count).forEach((dataSeries, i) => {
        let row = i % MAX_ITEM_PER_COLUMN;
        let column = Math.floor(i / MAX_ITEM_PER_COLUMN);

        // 30 por el margen que agregamos el cual tapará nuestras letras,
        let translate_x = 30 + (new_width + axes_size) * column;
        let translate_y = (new_heigh + axes_size) * row;

        let littleSvg = container
          .append("svg")
          .style("width", new_width)
          .style("height", new_heigh)
          .append("g")
          .attr("transform", `translate(${translate_x}, ${translate_y})`);

        littleSvg
          .append("g")
          .attr("class", "x axis")
          .attr("transform", `translate(0,${new_heigh} )`)
          .call(axisBottom);

        littleSvg
          .append("g")
          .attr("class", "y axis")
          .call(axisLeft);

        littleSvg
          .append("path")
          .datum(dataSeries.values)
          .attr("class", "line")
          .attr("d", line);

        if (hover != undefined) {
          let circle = littleSvg
            .selectAll("circle")
            .data(dataSeries.values)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(new Date(d.year, 0, 1)))
            .attr("cy", e => yScale(e.n))
            .attr("r", 2);

          if (hover != 0) {
            circle.attr("class", d => "year-" + d.year).attr("opacity", 0);
          }

          if (hover == 1) {
            circle
              .on("mouseover", d =>
                d3.selectAll(`.year-${d.year}`).attr("opacity", 1)
              )
              .on("mouseout", d =>
                d3.selectAll(`.year-${d.year}`).attr("opacity", 0)
              );
          } else if (hover == 2) {
            littleSvg
              .append("rect")
              .attr("fill", "none")
              .style("pointer-events", "all")
              .attr("width", width)
              .attr("height", height)
              .on("mouseover", (_, i, nodes) => {
                let year = xScale.invert(d3.mouse(nodes[i])[0]).getFullYear();
                d3.selectAll(`.year-${year}`).attr("opacity", 1);
              })
              .on("mouseout", () => {
                d3.selectAll("circle").attr("opacity", 0);
              })
              .on("mousemove", (_, i, nodes) => {
                d3.selectAll("circle").attr("opacity", 0);
                let year = xScale.invert(d3.mouse(nodes[i])[0]).getFullYear();
                d3.selectAll(`.year-${year}`).attr("opacity", 1);
              });
          }
        }
      });
    };

    this.nested_data = d3
      .nest()
      .key(function(d) {
        return d.category;
      })
      .entries(props.data);
  }

  clear() {
    d3.selectAll("#graph").remove();
  }


  update(props, oldProps) {
    if (oldProps.state == "null" && props.state != "Introducción") {
      this.build();
    }
    let state = props.state;
    if (state == "Inicializar") {
      d3.selectAll("svg").remove();
      this.build();
    } else if (state == "Construir ejes") {
      this.clear();
      this.bigLineChart(0);
    } else if (state == "Grafico de línea") {
      this.clear();
      this.bigLineChart(props.count);
    } else if (state == "Un gráfico small multiple") {
      this.clear();
      this.smallMultiple(1);
    } else if (state == "Varios gráficos small multiple") {
      this.clear();
      this.smallMultiple(props.count);
    } else if (state == "Small multiple con puntos") {
      this.clear();
      this.smallMultiple(props.count, 0);
    } else if (state == "Small multiple con hover") {
      this.clear();
      this.smallMultiple(props.count, 1);
    } else if (state == "Small multiple con hover mejorado") {
      this.clear();
      this.smallMultiple(props.count, 2);
    } else if (state == "Introducción") {
      this.build();
      d3.selectAll("svg").remove();
    }  }
}

module.exports = StepSmallMultiples;
