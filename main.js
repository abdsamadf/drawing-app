let color, stroke;
let activeLine;

const colorElement = document.getElementById('color');
const strokeElement = document.getElementById('stroke');
const clear = document.getElementById('clear');
const eraser = document.getElementById('eraser');
const svg = d3.select('#svg');

dfltColor = colorElement.options[colorElement.selectedIndex].value;
dfltStroke = strokeElement.options[strokeElement.selectedIndex].value;

colorElement.onchange = (event) => {
    color = event.target.value;
}

strokeElement.onchange = (event) => {
    stroke = event.target.value;
}

clear.onclick = () => {
    svg.selectAll("*").remove();
}

eraser.onclick = () => {
    color = 'white';
}

svg.on('click', click);

function click() {
    const coords = d3.mouse(this);

    svg.append('circle')
        .attr('cx', coords[0])
        .attr('cy', coords[1])
        .attr('r', stroke ? (stroke / 2) : (dfltStroke / 2))
        .style('fill', color ? color : dfltColor)
}

const renderPath = d3.line()
    .x(d => d[0])
    .y(d => d[1])
    .curve(d3.curveBasis)


svg.call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended));

function dragstarted() {
    activeLine = svg.append("path").datum([]).attr("class", "line").style('stroke', color ? color : dfltColor).style('stroke-width', stroke ? stroke : dfltStroke);
    activeLine.datum().push(d3.mouse(this));
}

function dragged() {
    activeLine.datum().push(d3.mouse(this));
    activeLine.attr("d", renderPath);
}

function dragended() {
    activeLine = null;
}