// Setting sizes
var yMargin = 40,
    width = 800,
    height = 400,
    barWidth = width/275;

// tooltip
var tooltip = d3.select(".visHolder").append("div")
  .attr("id", "tooltip")
  .style("opacity", 0); // it will be hidden until user hovers over data

var overlay = d3.select('.visHolder').append('div')
  .attr('class', 'overlay')
  .style('opacity', 0);

var svgContainer =  d3.select('.visHolder')
    .append('svg')
    .attr('width', width + 100)
    .attr('height', height + 60);

d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json', function(err, data) {
  
  svgContainer.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -200)
    .attr('y', 80)
    .style('font-weight', 'bold')
    .text('GDP')
  
  svgContainer.append('text')
    .attr('x', width/2 + 120)
    .attr('y', height + 50)
    .text('Source: http://www.bea.gov/national/pdf/nipaguid.pdf')
    .attr('class', 'info');
  

    // Data inside the JSON is divided by quarters, but only ellicits month (01, 04, 07, 10)
  var years = data.data.map(function(item) {
    var quarter;
    var month = item[0].substring(5, 7); // this is the substring location of the month inside the json
    
    if(month === '01') {
      quarter = '- (Q1)';
    }
    else if (month === '04'){
      quarter = '- (Q2)';
    }
    else if(month === '07') {
      quarter = '- (Q3)';
    }
    else if(month ==='10') {
      quarter = '- (Q4)';
    }

    return item[0].substring(0, 4) + ' ' + quarter
  });
  
  // data is inside "data" property of the object
  var yearsDate = data.data.map(function(item) {
    return new Date(item[0]);
  });

  var xMax = new Date(d3.max(yearsDate));
  xMax.setMonth(xMax.getMonth() + 3);
  var xScale = d3.scaleTime()
    .domain([d3.min(yearsDate), xMax])
    .range([0, width]);
  
  var xAxis = d3.axisBottom()
    .scale(xScale);
  
  var xAxisGroup = svgContainer.append('g')
    .call(xAxis)
    .attr('id', 'x-axis')
    .attr('transform', 'translate(60, 400)');
  
  var GDP = data.data.map(function(item) {
    return item[1]
  });
  
  var scaledGDP = [];
  
  var gdpMin = d3.min(GDP); // not used, will start from 0
  var gdpMax = d3.max(GDP);
  
  var linearScale = d3.scaleLinear()
    .domain([0, gdpMax])
    .range([0, height]);
  
  scaledGDP = GDP.map(function(item) {
    return linearScale(item);
  });
  
  var yAxisScale = d3.scaleLinear()
    .domain([0, gdpMax])
    .range([height, 0]); // reversed for data (0 at the bottom, max on top)
  
  var yAxis = d3.axisLeft(yAxisScale)
    
  var yAxisGroup = svgContainer.append('g')
    .call(yAxis)
    .attr('id', 'y-axis')
    .attr('transform', 'translate(60, 0)'); // positioning of the y axis
    
  d3.select('svg').selectAll('rect')
    .data(scaledGDP)
    .enter()
    .append('rect')
    .attr('data-date', function(d, i) {
      return data.data[i][0]              // first slot in data in the date
    })
    .attr('data-gdp', function(d, i) {
      return data.data[i][1]              // second slot in data in the date
    })
    .attr('class', 'bar')
    .attr('x', function(d, i) {
      return xScale(yearsDate[i]);
    })
    .attr('y', function(d, i) {
      return height - d;
    })
    .attr('width', barWidth)
    .attr('height', function(d) {
      return d;
    })
    .style('fill', '#33adff')
    .attr('transform', 'translate(60, 0)')
    .on('mouseover', function(d, i) {

    overlay
    .transition()
      .duration(0)
      .style('height', d + 'px')
      .style('width', barWidth + 'px')
      .style('opacity', .8)       // how 'white' the bar gets
      .style('left', (i * barWidth) + 0 + 'px')
      .style('top', height - d + 'px')
      .style('transform', 'translateX(60px)');

    tooltip
    .transition()
      .duration(200)
      .style('opacity', 1);

    tooltip
    .html(years[i] + '<br>' + '$' + GDP[i].toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' Billion')
      .attr('data-date', data.data[i][0])
      .style('left', (i * barWidth) + 30 + 'px')
      .style('top', height - 100 + 'px')
      .style('transform', 'translateX(60px)');

  })

  .on('mouseout', function(d) {
    tooltip
    .transition()
      .duration(100) //how long it takes to get back to invisible
      .style('opacity', 0); // back to invisible

    overlay
    .transition()
      .duration(100)
      .style('opacity', 0);
  });

});