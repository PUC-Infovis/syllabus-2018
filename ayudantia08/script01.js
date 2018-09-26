
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


// Invocamos el generador de paths para dibujar figuras.
const path = d3.geoPath();

// centered y clicked son utilizados para la funcionalidad de zoom-in y zoom-out
// Recomiendo pasar primero a renderMap y luego volver para entenderlo mejor.

// Variable que indica si estamos centrados sobre algún estado. Inicialmente, no.
let centered = null;
// Función llamada cada vez que se hace click sobre un estado d.
const clicked = d => {
    // Declaramos las posiciones y la escala de zoom a utilizar.
    let x, y, k; 

    // zoom-in.
    if (centered !== d) { // Si no estoy actualmente centrado en d
      [x, y] = path.centroid(d); // extrae el centroide del path correspondiente a d
      k = 3; // fijamos el zoom-in en escala de aumento = 3
      centered = d; // actualizamos el elemento centrado.
    // zoom-out.
    } else {
      x = width / 2;
      y = height / 2;
      k = 1; // escala normal sin zoom.
      centered = null; // no hay elemento centrado
    }

    // Le agregamos una clase distintiva: 'active' al elemento centrado
    container.selectAll('path')
             .classed('active', d => d === centered); 

    // Realizamos una transición para la transformación de zoom realizada
    container.transition()
             .duration(1000)
             // Aplica el zoom necesario.
             // Para entender mejor la lógica de transformación,
             // puedes leer este artículo:
             // https://css-tricks.com/transforms-on-svg-elements/
             .attr('transform',
                   `translate(${width / 2}, ${height / 2})
                    scale(${k})
                    translate(${-x}, ${-y})`);

};


async function renderMap() {

  // Cargamos dos datasets
  // Primero, la topología de E.E.U.U. desde una url. Es decir, un archivo TopoJSON.
  const us = await d3.json('https://d3js.org/us-10m.v1.json');
  // Segundo, nuestro tsv con los nombres de cada estado.
  const states = await d3.tsv('states-names.tsv');

  // Transformación de tsv a objeto de JS con la forma:
  // { id: 'name (code)'}
  // padStart(2, '0') agrega 0s al id de forma que todos tengan dos dígitos: 1-> 01
  const statesNames = Object.assign(...states.map(s =>
    ({ [s.id.padStart(2, '0')]: `${s.name} (${s.code})` })
  ));

  console.log(states);
  console.log(statesNames);
  
  container.append('g') // Agregamos un contenedor especifico para los estados.
             .attr('class', 'states')
             .selectAll('path')
             // Para realizar el data-join-enter. Realizamos la transformación 
             // de TopoJson a GeoJSON usando el método feature de topojson
             // que nos da una serie de figuras a partir de colecciones de topologias.
             // Como queremos representar los estados, estos los extraemos de us
             // y luego pasamos al método de topojson.
             .data(topojson.feature(us, us.objects.states).features)
             .enter()
           .append('path') // Por cada figura resultante, agregamos un path
             // Para definir cada path, le pasamos el generador que recibirá
             // las figuras generadas una por una y definirá el d de cada path.
             .attr('d', path)
             // Agregamos al evento de click sobre cada figura el zoom-in y zoom-out
             .on('click', clicked)
           // Agreamos un título a cada figura para reconocer el estado al pasar sobre el.
           .append('title')
             .text(state => statesNames[state.id]);

  
  // Agregamos bordes para notar mejor las divisiones politicas.
  // Notar que agregamos un solo path para todos los bordes de estados.
  container.append('path')
           .attr('class', 'state-borders')
           // Ahora usamos el método mesh de topojson, que nos entrega
           // el path necesario que hace contorno al rededor de varias figuras.
           .attr('d', path(topojson.mesh(us, us.objects.states, 
                  (a, b) => a !== b)));
          // El último argumento es una función de filtrado, que especifica
          // que arcos incluir. Al poner a !== b, especificamos que solo
          // incluiremos arcos entre objetos distintos. Es decir, no incluyen
          // arcos de los estados que no limiten con ningún otro estado.

  // Ahora de forma similar, agregamos borde para la segunda subdivisión política.
  // Notar que agregamos un solo path para todos los bordes de condados.
  container.append('path')
           .attr('class', 'county-borders')
           // Similar al anterior, pero extraemos counties en vez de states.
           .attr('d', path(topojson.mesh(us, us.objects.counties, 
                  (a, b) => a !== b)));
};

// Ejecutamos nuestra función principal
renderMap();
