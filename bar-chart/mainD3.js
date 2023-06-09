export const d3Code = (data) => { 

    const w = 500;
    const h = 500;

    const dataTest = [12, 31, 22, 17, 25, 18, 29, 14, 9]

    const svg = d3.select('#app')
    .append('svg')
    .attr('width', w)
    .attr('height', h)

    console.log(data)

    svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * 3)
    .attr('y', (d, i) => h - d[1])
    .attr('width', 25)
    .attr('height', (d, i) => d[1])
    .style('fill', 'navy')
    .style('margin', '2px')

}
