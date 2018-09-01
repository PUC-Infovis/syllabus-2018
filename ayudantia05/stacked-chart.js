// Toda la información utilizada se genero aleatoriamente, no hay ninguna
// referencia con la realidad. 

const margin = {top: 20, right: 165, bottom: 20, left: 70};

const WIDTH = 960,
    HEIGHT = 500;

const width =  WIDTH - margin.left - margin.right,
    height = HEIGHT - margin.top - margin.bottom;

const countries = ['Venezuela', 'Peru', 'Argentina', 'Colombia'];

// Polyfill para poder hacer flatten de la data y poder calcular el máximo facilmente. Obviamente
// hay otras formas de hacerlo, esta es solo una propuesta.
const flatten = arr => {
    return arr.reduce( (flat, toFlatten) => {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
      }, []);
    }

// Creación del contenedor svg, se agrega un elemento g y se traslada siguiendo la convención de margenes utilizada en d3
// Para más información el siguiente bl.ock puede ser útil: https://bl.ocks.org/mbostock/3019563/0a647e163b8e86eb043621fe1208c81396dea407
const svg = d3.select('body')
    .append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT)
    .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

d3.json('./stacked-data.json').then(data => {    

        // Retorna un objeto Stack en d3, todavia no se realiza la transformación
        // de la data. 
        const stack = d3.stack()
                    .keys(countries)
                    .order(d3.stackOrderNone)
                    .offset(d3.stackOffsetNone);

        console.log(stack);

        const series = stack(data);
        
        console.log(series);
        
        // Definimos la escala para el eje X para los años considerados
        const xScale = d3.scaleBand()
                    .rangeRound([0, width])
                    .domain(data.map(d => d.year))
                    .paddingInner(0.1);

        console.log(xScale('2011'));
        console.log(xScale('2014'));

        const maxPopulation = flatten(series);

        // Definimos escala para eje y que representa la cantidad de inmigrantes
        const yScale = d3.scaleLinear()
                        .range([height, 0])
                        .domain([0, maxPopulation * 1.1]);

        // Definimos la escala de colores para representar cada país
        const colorScale = d3.scaleOrdinal()
                            .domain(countries)
                            // .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b'])
                            .range(d3.schemeCategory10.slice(1,6));
        
        svg.selectAll('.serie')
            .data(series)
            .enter().append('g') // Agrupamos cada país dentro de un mismo elemento g
                .attr('class', 'serie')
                .attr('fill', d => colorScale(d.key))
            .selectAll('rect')
                .data(d => d) 
                .enter().append('rect')
                    .attr('x', d => xScale(d.data.year))
                    .attr('y', d => yScale(d[1]))
                    .attr('height', d => yScale(d[0]) - yScale(d[1]))
                    .attr('width', xScale.bandwidth());

        // Definicion de ejes inferior e izquierdo
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale).ticks(10, 's');

        // Agregamos el eje X al gráfico cuando se llama a .call()
        svg.append('g')
                .attr('class', 'axis axis--x')
                .attr('transform', `translate(0,${height})`)
                .call(xAxis)

        // Agregamos el eje Y al gráfico cuando se llama a .call()
        svg.append('g')
                .attr('class', 'axis axis--y')
                .call(yAxis)
            .append('text')
                .attr('x', 0)
                .attr('y', yScale)
                .attr('dy', '0.35em')
                .attr('text-anchor', 'start')
                .attr('fill', '#000')
                .attr('text', 'Población')

        // Finalmente, necesitamos darle sentido a los colores mediante la codificación de estos y su país correspondiente
        const legend = svg.selectAll('.legend')
            .data(countries)
            .enter().append('g')
                .attr('class', 'legend')
                .attr('transform', (d,i) => `translate(0,${i * 20})`)  // Realizamos la traslación para que las leyendas no se sobrepongan
                .style('font', '10px sans-serif');
        
        // Definicion de los tamaños y colores de cada cuadrado de leyenda
        legend.append('rect')
            .attr('x', width + 18)
            .attr('width', 18)
            .attr('height', 18)
            .attr('fill', colorScale);

        // Como los cuadrados por si solos siguen sin darnos información, agregamos el pais correspondiente a cada lado.
        legend.append('text')
            .attr('x', width + 44)
            .attr('y', 9)
            .attr('dy', '.35em')
            .attr('text-anchor', 'start')
            .text(d => d);
    });
