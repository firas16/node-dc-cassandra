//convertir data en array
 /*$.ajax({ 
        type: 'GET', 
        url: 'http://localhost:3000/page', 
        data: { get_param: 'value' }, 
        success: function (data) { 
            var names = data
           // $('#cand').html(data);
        }
    });
*/

// Set the dimensions of the canvas / graph
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 700 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// Set the ranges
var x = d3.time.scale()
	.range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

// Parse the date / time
var formatDate = d3.time.format("%Y-%m-%dT%H:%M:%S.%LZ");

var color = d3.scale.ordinal()
    .range(["#FF0000", "#FF0000", "#0000FF", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
	
// Define the axes
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
	
// Define the line
var line = d3.svg.line()
	.interpolate("basis")
    .x(function(d) { return x(d.datemessage); })
    .y(function(d) { return y(d.nblikes); });


// Adds the svg canvas
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	


// sort data
function sortByDateAscending(a, b) {
    // Dates will be cast to numbers automagically:
    return a.datemessage - b.datemessage;
}

// Get the data
queue()
.defer(d3.json, "/post")
.await(makeGraphs);	
function makeGraphs(error, apiData) {

	var dataSet = apiData;

	// parse date 
	dataSet.forEach(function(d) {
		d.datemessage = formatDate.parse(d.datemessage);
	})

	// sort vakues by date
	dataSet = dataSet.sort(sortByDateAscending);
	//dataClinton = data.filter(function(d){return d.idpage === '889307941125736'});

	//filter null values
	dataSet = dataSet.filter(function(d){return d.nblikes !== null && d.idpage !== null});

	// Scale the range of the data
	x.domain(d3.extent(dataSet, function(d) { return d.datemessage; }));
	y.domain(d3.extent(dataSet, function(d) { return d.nblikes; }));


	var dataNest = d3.nest()
        .key(function(d) {return d.idpage;})
        .entries(dataSet);

	var color = d3.scale.category10();  // set the colour scale

	// Add the valueline path
	dataNest.forEach(function(d) {
		svg.append("path")
            .attr("class", "line")
            .style("stroke", function() { // Add dynamically
                return d.color = color(d.key); })
            .attr("d", line(d.values));
    });

	data = dataSet;

	// Add the X Axis
	svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
	  
	// Add the Y Axis
	svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Nombre Likes");
	 
	 
	 //second chart theme economy
	
	var dataSet1 = apiData;
	//filter by theme 
	dataSetEconomy = dataSet1.filter(function(d){return   d.nblikes !== null && d.idpage !== null && (d.theme == null || d.theme == '[Economy]' || d.theme == '[Environment]' || d.theme == '[Politics]')})
	dataSetPolitics = dataSet1.filter(function(d){return d.nblikes !== null && d.idpage !== null })
	dataSetEnvironment = dataSet1.filter(function(d){return d.nblikes !== null && d.idpage !== null && d.theme == '[Environment]'})
	dataSetHealth = dataSet1.filter(function(d){return d.nblikes !== null && d.idpage !== null && d.theme == null})

	
	var EconomyChart = d3.select("body").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		x.domain(d3.extent(dataSetEconomy, function(d) { return d.datemessage; }));
		y.domain(d3.extent(dataSetEconomy, function(d) { return d.nblikes; }));
	
	var dataNest = d3.nest()
        .key(function(d) {return d.idpage;})
        .entries(dataSetEconomy);

	var color = d3.scale.category10();  // set the colour scale

	// Add the valueline path
	dataNest.forEach(function(d) {
		EconomyChart.append("path")
            .attr("class", "line")
            .style("stroke", function() { // Add dynamically
                return d.color = color(d.key); })
            .attr("d", line(d.values));
    });
	
	// Add the X Axis
	EconomyChart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
	  
	// Add the Y Axis
	EconomyChart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Nombre Likes");
		
	//health Chart	
	var HealthChart = d3.select("body").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		x.domain(d3.extent(dataSetHealth, function(d) { return d.datemessage; }));
		y.domain(d3.extent(dataSetHealth, function(d) { return d.nblikes; }));
	
	var dataNest = d3.nest()
        .key(function(d) {return d.idpage;})
        .entries(dataSetHealth);

	var color = d3.scale.category10();  // set the colour scale

	// Add the valueline path
	dataNest.forEach(function(d) {
		HealthChart.append("path")
            .attr("class", "line")
            .style("stroke", function() { // Add dynamically
                return d.color = color(d.key); })
            .attr("d", line(d.values));
    });
	
	// Add the X Axis
	HealthChart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
	  
	// Add the Y Axis
	HealthChart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Nombre Likes");
		
 /* svg.append("path")
      .datum(dataTrump)
      .attr("class", "line")
	  .style("stroke", color)
      .attr("d", lineTrump);
  svg.append("path")
      .datum(dataClinton)
      .attr("class", "line")
      .attr("d", lineClinton)
	  .style("stroke", color);*/


};