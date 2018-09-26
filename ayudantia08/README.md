# Ayudantía 08 (virtual): Datos espaciales

En esta demo, se muestran dos ejemplos básicos de visualización estática con datos espaciales utilizando `D3.js`. 

El contenido es lo siguiente:

- `README.md` : Descripción general de demo e introducción a datos espaciales en `D3.js`.
- `index.html` : Archivo principal que carga ambos ejemplos. Solo se puede visualizar uno a la vez, comentando y descomentando la línea correspondiente que cargan los siguientes scripts.
- `script01.js` : Primer ejemplo de visualización de datos geograficos. Se muestra el mapa de E.E.U.U. separado por estados y condados, y se incluye la capacidad *zoom-in* y *zoom-out* por estado.
- `script02.js` : Segundo ejemplo. De manera similar se muestra el mapa de E.E.U.U., pero esta vez como un *choropleth* para visualizar tendencias del desempleo en el país.
- `states-names.tsv` : Archivo que contiene los nombres y códigos de los estados de E.E.U.U. a partir de un `id`.
- `unemployment.tsv` : Archivo que contiene la tasa de desempleo por `id` de condado de E.E.U.U. 

## Prerequisitos

- **Conexión a internet**, para la carga de `D3.js`, `topoJSON` y archivo con información topológica de E.E.U.U.
- **Levantar servidor local**, ya que es necesario acceder a archivos locales, o **utilizar un navegador que permita leer** como [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/new/).

# Introducción
Para la carga y representación de figuras geograficas, hay dos problema principales asociados:

- El sistema de coordenadas geográficas se basa en una esfera y es necesario transformarlo al plano para visualizarlo en una pantalla, de la misma forma que es necesario para crear un mapa. Existen varias transformaciones, cada una con distintas propiedades.
- Una figura geográfica es lejos de ser una figura regular, por lo que necesita infinitos puntos para representarse completamente. Los computadores no tienen infinita memoria, por lo que hay que aproximar de forma discreta estas figuras.

El primer problema lo mencionaremos más adelante. El segundo, `D3` lo ataca utilizando una especificación en formato JSON llamada GeoJSON para representar figuras discretas geográficas. Especifica distintos tipos de figuras o conjuntos de figuras, y especifica sus puntos utilizando coordenadas geográficas:
```
{
       "type": "FeatureCollection",
       "features": [{
           "type": "Feature",
           "geometry": {
               "type": "Point",
               "coordinates": [102.0, 0.5]
           },
           "properties": {
               "prop0": "value0"
           }
       }, {
           "type": "Feature",
           "geometry": {
               "type": "LineString",
               "coordinates": [
                   [102.0, 0.0],
                   [103.0, 1.0],
                   [104.0, 0.0],
                   [105.0, 1.0]
               ]
           },
           "properties": {
               "prop0": "value0",
               "prop1": 0.0
           }
       }, {
           "type": "Feature",
           "geometry": {
               "type": "Polygon",
               "coordinates": [
                   [
                       [100.0, 0.0],
                       [101.0, 0.0],
                       [101.0, 1.0],
                       [100.0, 1.0],
                       [100.0, 0.0]
                   ]
               ]
           },
           "properties": {
               "prop0": "value0",
               "prop1": {
                   "this": "that"
               }
           }
       }]
   }
```

Puedes encontrar la especificación completa de GeoJSON completa [aquí](https://tools.ietf.org/html/rfc7946).

Un detalle de GeoJSON, es que puede ser bastante redundante y por lo tanto utiliza más memoria de lo que necesita. Por esto, el autor de `D3` también creo utilidades para trabajar con una extensión de GeoJSON, llamada **TopoJSON**, que códifica topología y permite representar datos geográficos de forma más compacta. En este ejemplo, importamos topologías y luego las tranformamos para ser usadas en `D3`. Puedes ver la documentación de herramientas con TopoJSON [aquí](https://github.com/topojson/topojson).

La idea básica que utilizaremos para dibujar figuras geográficas es simplemente dibujarlos con una línea, es decir, con un elemento SVG: `<path>`. Para lograr esto, `D3` en su submódulo `d3-geo` provee un generador de *paths* que se invoca con el siguiente método:

`const path = d3.geoPath()`

Aquí, `path` funciona como una función que al recibir una figura especificada en GeoJSON, retorna el atributo `d` que recibiría un elemento `<path>` que representa ese camino.

Al cargar el primer ejemplo (`script01.js`) podemos ver un primer ejemplo de esto. En este, se carga la topología de E.E.U.U. y se visualiza en dos niveles de subdivisiones politicas: estados y condados.

El segundo ejemplo (`script02.js`) carga de la misma forma las figuras geograficas que el primer ejemplo, pero mostramos un idiom específico llamado *choropleth*. Este usa el canal del color de cada estado para representar un atributo cuantitativo secuencial, en este caso, el desempleo de cada estado.

Sobre el primer problema mencionado al comienzo, el elegir que transformaciones utilizar es más apropiado para extensiones más grandes, como mapas mundiales. Estas transformaciones se llaman **proyecciones**, y `D3` provee varias distintas. Además, uno tras escoger la proyección, se la puede dar como argumento a `d3.geoPath`, que luego dibujará siguiendo tal proyección. Esto se sale del alcanze de esta demo, pero puede seguir leyendo al respecto [aquí](https://github.com/d3/d3-geo#projections).