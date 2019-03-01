const svg = d3.select('#svg');

let activeLine;

const renderPath = d3.line()
    .x(d => d[0])
    .y(d => d[1])
    .curve(d3.curveBasis)


svg.call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended));

function dragstarted() {
    activeLine = svg.append("path").datum([]).attr("class", "line").style('stroke', '#000').style('stroke-width', 3);
    activeLine.datum().push(d3.mouse(this));
    console.log('====================================');
    console.log("start", activeLine.datum());
    console.log('====================================');
}

function dragged() {
    activeLine.datum().push(d3.mouse(this));
    activeLine.attr("d", renderPath);
    console.log("dragged", activeLine.datum());
}

function dragended() {
    activeLine = null;
}