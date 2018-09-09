const marginBubble = {top: 40, right: 20, bottom: 70, left: 60};

const WIDTHBUBBLE = 500
const HEIGHTBUBBLE = 500

const widthBubble =  WIDTHBUBBLE - marginBubble.left - marginBubble.right;
const heightBubble = HEIGHTBUBBLE - marginBubble.top - marginBubble.bottom;

const containerBubblechart = d3.select('#bubble')
    .append('svg')
        .attr('width', WIDTHBUBBLE)
        .attr('height', HEIGHTBUBBLE)
    .append('g')
        .attr('transform', `translate(${marginBubble.left},${marginBubble.top})`)

// Definimos ls circulos de la lista data
d3.csv("data.csv").then(data => {
    const circle = containerBubblechart.selectAll('circle').data(data);

    // Creamos una escala lineal cuyo dominio será de 0 y max*0.1. Donde máx es el máximo de los datos
    // y devolverá un número entre 0 y widthBubble
    var xscale = d3.scaleLinear()
                    .range([0, widthBubble])
                    .domain([0, d3.max(data, d => +d.women) * 1.1]);

    // Creamos una escala lineal cuyo dominio será de 0 y 70 y devolverá un número entre heightBubble y 0.
    // Notar que está inverso porque el 0 está arriba y nosotros queremos que mientras más bajo sea el valor
    // más abajo esté.
    var yscale = d3.scaleLinear()
                    .range([heightBubble, 0])
                    .domain([0, d3.max(data, d => +d.men) * 1.1]);

    // Agregamos cada circulo
    var enterCircle = circle.enter().append('circle')
        .attr('cx', d => xscale(+d.women))
        .attr('cy', d => yscale(+d.men))
        .attr('r', 10)
        .attr('class', 'inactive ball');

    // Definimos una interacción con el 'click' para que hacer click en la burbuja, esta se agregue al barchart.    
    enterCircle.on('click', (d) =>{
        var cir = d3.selectAll('.inactive').filter(circle => circle == d);

        if (cir.size()){
            cir.attr('class', 'active');
            let total = parseInt(d.men) + parseInt(d.women)
            actualizarBarchart(total, d.country)
        }
    });

    // Generemos los ejes
    var axisBottom = d3.axisBottom(xscale).tickPadding(10).ticks(7, 's');
    var axisLeft = d3.axisLeft(yscale).tickPadding(10).ticks(10, 's');

    // Agregamos un 'g' al gráfico para cada eje
    const xAxisBubble = containerBubblechart
            .append('g')
            .attr('transform', `translate(0, ${heightBubble})`);
    const yAxisBubbles = containerBubblechart.append('g')

    // Utilizamos el método call para que se generen los ejes según la escala asociada en cada 'g'
    xAxisBubble.call(axisBottom);
    yAxisBubbles.call(axisLeft);

    // Agregamos nombre al eje x para determinar que estamos considerando la cantidad de mujeres
    containerBubblechart.append("text")             
            .attr("transform",
                  "translate(" + (widthBubble/2) + " ," + 
                                 (heightBubble + marginBubble.top + 20) + ")")
            .style("text-anchor", "middle")
            .attr("class", "axisname")
            .text("Mujeres");

    // Agregamos nombre al eje y para determinar que estamos considerando la cantidad de hombres
    containerBubblechart.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - marginBubble.left)
            .attr("x",0 - (heightBubble / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .attr("class", "axisname")
            .text("Hombres"); 

    // Finalmente agregamos un titulo al gráfico. ¿Por qué a quien no le gustan los titulos?
    containerBubblechart.append("text")
            .attr("x", (WIDTHBUBBLE / 2))             
            .attr("y", 0 - (marginBubble.top / 2))
            .attr("text-anchor", "middle")  
            .style("font-size", "16px") 
            .style("text-decoration", "underline")  
            .text("Llegada de inmigrantes en 2016");

    d3.select('#clear').on('click', (_) =>{
        clear();
        d3.selectAll('circle').attr('class', 'inactive ball');
    });

    // Bonus: Interactuar con el Hover y seleccionar elemento en particular.
    enterCircle.on('mouseover', (d, i , all) =>{
        // Buscamos todos los circulos que no son el donde está el mouse
        d3.selectAll('circle').filter(circle => circle != d).style("opacity", 0.1)

        // Seleccionamos nuestro circulo y le cambiamos el radio.
        d3.select(all[i]).transition().attr('r', 20);

    });

    enterCircle.on('mouseout', (_, i, all) =>{
        d3.select(all[i]).transition().attr('r', 10);
        d3.selectAll('circle').style("opacity", 1)
    });
})
