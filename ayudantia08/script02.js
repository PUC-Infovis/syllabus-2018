
// Primero, seteamos nuestro clásico recuadro inicial con dimensiones fijas.

const WIDTH = 1000;
const HEIGHT = 700;
const MARGIN = { TOP: 40, BOTTOM: 40, LEFT: 20, RIGHT: 20 };

const width = WIDTH - MARGIN.RIGHT - MARGIN.LEFT;
const height = HEIGHT - MARGIN.TOP - MARGIN.BOTTOM;

const container = d3.select('#container')
                    .append('svg')
                      .attr('width', WIDTH)
                      .attr('height', HEIGHT)
                    .append('g')
                      .attr('transform',
                            `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

// Invocamos el generador de caminos

const path = d3.geoPath();

// Generamos la escala de color para el desempleo.
// Usamos scaleThreshold para especificar que cualquier valor que
// se salga del dominio, se quede con el valor más cercano.
// Aquí, fijamos el color más oscuro en 10% de desempleo o más
// y el color más claro en 2% o menos.

const color = d3.scaleThreshold()
                .domain(d3.range(2, 10))
                .range(d3.schemeBlues[9]);

async function render() {
    // Cargamos la misma topología de antes.
    const us = await d3.json('https://d3js.org/us-10m.v1.json');
    // Cargamos los datos de desempleo.
    const unemploymentArray = await d3.tsv('unemployment.tsv');
    // Los transformamos a un objeto de JS para acceder mediante el id.
    const unemployment = Object.assign(
      ...unemploymentArray.map(u =>({ [u.id]: u.rate }))
    );
    
    // Agregamos las formas de la misma manera que script01.js
    container.append('g')
               .attr('class', 'counties')
               .selectAll('path')
               .data(topojson.feature(us, us.objects.counties).features)
               .enter()
             .append('path')
               // Usamos la escala de color para representar el desempleo.
               .attr('fill', d => color(unemployment[d.id]))
               .attr('d', path)
             .append('title')
               // Agregamos título con valor específico.
               .text( d => `${unemployment[d.id]}%`);
    
    // Agregamos los bordes de condados de la misma manera que script01.js
    container.append('path')
             .attr('class', 'state-borders')
             .attr('d', path(topojson.mesh(us, us.objects.states, (a, b) => a !== b)));
}

// Llamamos a la función principal.
render();


// Luego, queda generar la leyenda de la visualzación.

// Usamos una escala para posicionar los elementos de la leyenda.
const x = d3.scaleLinear()
            .domain([1, 10])
            .rangeRound([600, 860]);

const legendContainer = container.append('g') // Agregas un contenedor para la leyenda.
                                 .attr('class', 'key')
                                 .attr('transform', 'translate(0,40)');

legendContainer.selectAll('rect')
               // Como datos, queremos los rangos numéricos que
               // definen cada tramos de color distinto.
               // Luego, para cada color en el rango de la escala de color,
               // extraemos el dominio que es mapeado a tal color.
               // Para eso, utilizamos invertExtent que retorna un rango
               // en forma de arreglo [inicio, fin]
               .data(color.range().map( d => {
                    d = color.invertExtent(d);
                    // Como usamos scaleThreshold, valores en los rangos
                    // devuelven indefinido para el primer y último color.
                    if (d[0] == null) d[0] = x.domain()[0]; // Reemplazamos con el valor mínimo
                    if (d[1] == null) d[1] = x.domain()[1];// Reemplazamos con el valor máximo
                    return d;
                }))
                .enter()
                .append('rect') // Agregamos un rectangulo para cada rango
                  .attr('height', 8) // Altura fija
                  .attr('x', d => x(d[0])) // Posición en x depende del inicio de su rango (d[0])
                  .attr('width', d => x(d[1]) - x(d[0])) // Ancho depende del inicio  y fin de su rango
                  .attr('fill', d => color(d[0])); // Rellenamos con el color correspondinte al rango.

// Agregamos título a la leyenda.
legendContainer.append('text')
               .attr('class', 'caption')
               .attr('x', x.range()[0])
               .attr('y', -6)
               .attr('fill', '#000')
               .attr('text-anchor', 'start')
               .attr('font-weight', 'bold')
               .text('Tasa de desempleo');

// Agregamos un eje númerico con los valores correspodientes usando la escala horizontal
legendContainer.call(
    d3.axisBottom(x)
      .tickSize(13)
      .tickFormat( (x, i) =>  `${i ? x : x}%`)
      .tickValues(color.domain()))