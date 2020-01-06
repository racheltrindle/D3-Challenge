// @TODO: YOUR CODE HERE!

var svgWidth = 960;
var svgHeight = 500;

var margin = { 
    top: 20,
    right: 40,
    bottom: 80,
    left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
    .select(".chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    console.log(chartGroup)

d3.csv("stateData.csv").then(function(stateData) {

     stateData.forEach(function(data){
         data.obesity= +data.obesity;
         data.poverty= +data.poverty;
         
     })
    // var xLinearScale=xScale(stateData,chosenXAxis)
    var xLinearScale = d3.scaleLinear()
        .domain([18, d3.max(stateData, d=> d.obesity)+2])
        .range([0,width])

    var yLinearScale = d3.scaleLinear()
        .domain([5,d3.max(stateData, d=> d.poverty)+2])
        .range([height,50])

    var bottomAxis = d3.axisBottom(xLinearScale)
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(bottomAxis)
    
        chartGroup.append("g")
        .call(leftAxis);

    var circlesGroup = chartGroup.selectAll("circle")
     .data(stateData)
     .enter()
     .append("circle")
     .attr("cx", d=> xLinearScale(d.obesity))  
     .attr("cy", d=> yLinearScale(d.poverty))
     .attr("r","13")
     .attr("fill", "teal")
     .attr("opacity", "0.5")
     
    var circleLabels = chartGroup.selectAll(null).data(stateData).enter().append("text")
     
    circleLabels
    .attr("x", d=> {
        return xLinearScale(d.obesity);
      })
      .attr("y", function(d) {
        return yLinearScale(d.poverty);
      })
      .text(function(d) {
        return d.abbr;
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "8px")
      .attr("text-anchor", "middle")
      .attr("fill", "white");
    
     
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 15 - margin.left)
        .attr("x", 0 - (height/2))
        .attr("class", "axisText")
        .text("Poverty Rate (%)")

    chartGroup.append("text")
        .attr("transform", `translate(${width/2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Obesity Rate (%)")

}).catch(function(error) {
console.log(error)
}) 