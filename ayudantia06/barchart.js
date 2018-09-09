const margin = {top: 30, right: 20, bottom: 0, left: 20};

const WIDTH = 500;
const HEIGHT = 500;

const width =  WIDTH - margin.left - margin.right;
const height = HEIGHT - margin.top - margin.bottom;

const containerBarchart = d3.select('#bar')
    .append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT)
    .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)


const scale = d3.scaleLinear()
                .range([margin.right, width])
                .domain([0, 70000]);

const xAxis = d3.axisBottom(scale).ticks(7);
const axis = containerBarchart.append('g')
        .attr('class', 'axis axis--x')

axis.call(xAxis)

containerBarchart.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Inmigrantes totales por país");

const lista_final = [];

const actualizarBarchart = (cantidad, label) => {
    lista_final.push({label, cantidad});

    const data = containerBarchart.selectAll('.rect').data(lista_final);

    const enteringBar = data.enter()
        .append('rect')
        .attr('class', 'rect')
        .attr('x', margin.right)
        .attr('y', (_, i) => i*30 + 15)
        .attr('height', 20)

    const enteringtext = data.enter()
        .append('text')
        .attr('class', 'text')
        .attr('x', margin.right)
        .attr('y', (_, i) => i*30 + 30)        

    enteringBar.transition()
        .duration(500)
        .attr('width', d => scale(d.cantidad) - margin.right);
   
    enteringtext.transition()
        .delay(500)
        .text(d => d.label);

    axis.attr('transform', `translate(0,${lista_final.length*30 + 15})`)
}

const clear = () => {
    lista_final.length = 0;
    const dataRect = containerBarchart.selectAll('.rect').data(lista_final);
    const dataText = containerBarchart.selectAll('.text').data(lista_final);

    dataRect.exit()
        .transition()
        .duration(500)
        .attr('width', 0)
        .remove();
    
    dataText.exit()
        .transition()
        .delay(500)
        .text('')
        .remove();
    
    axis.transition().delay(500).attr('transform', `translate(0,${lista_final.length*30 + 15})`)
}


            
