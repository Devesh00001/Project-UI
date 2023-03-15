
//1. Leads Converted 
const api = 'http://localhost:8080/leadsconverted';

d3.json(api)
  .then(function (items) {
    const data = items.map(d => d.CreatedDate);
    //console.log(data);

    const monthNumbers = data.map(date => {
      const dateObj = new Date(date);
      return dateObj.getMonth();
    })
    //console.log(monthNumbers);

    const counts = {};
    monthNumbers.forEach(function (d) {
      counts[d] = counts[d] + 1 || 1;
    });
    //console.log(counts);

    // Set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 30, left: 60 };
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Append the svg object to the body of the page
    const svg = d3
      .select("#bar-chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .attr("align", "bottom");

    // Define the x scale
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(Object.keys(monthNumbers))
      .padding(0.2);

    // Define the y scale
    const y = d3.scaleLinear().domain([0, d3.max(Object.values(counts))]).range([height, 0]);

    // Draw the bars
    svg
      .selectAll("rect")
      .data(Object.entries(counts))
      .enter()
      .append("rect")
      .attr("x", ([month]) => x(month))
      .attr("y", ([, leads]) => y(leads))
      .attr("width", x.bandwidth())
      .attr("height", ([, leads]) => height - y(leads))
      .attr("fill", "#784cfb");

    // Add the x axis
    svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));

    // Add the y axis
    svg.append("g").call(d3.axisLeft(y));

    // // Add a title
    // svg
    // .append("text")
    // .attr("x", width / 2)
    // .attr("y", 0 - margin.top / 2)
    // .attr("text-anchor", "middle")
    // .text("Leads Converted by Month");

    // X Axis Title
    svg.append("text")
      .attr("transform", "translate(" + (width / 2) + "," + (height + margin.bottom) + ")")
      .style("taxt-anchor", "middle")
      .style("font-size", "10.5px")
      .style("font-weight", "bold")
      .text("Months");

    //Y Axis title
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .text("Leads Count");

    // Animate the bars
    svg
      .selectAll("rect")
      .transition()
      .duration(1500)
      .attr("y", ([, leads]) => y(leads))
      .attr("height", ([, leads]) => height - y(leads));


    //Table of the bar-chart
    // Count the occurrence of each data item
    const count = d3.rollup(
      monthNumbers,
      v => v.length,
      d => d + 1
    );

    // Convert count object into an array of objects with key-value pairs
    const countArray = Array.from(count, ([key, value]) => ({ key, value }));

    // Sort the count array in descending order of value
    countArray.sort((a, b) => b.value - a.value);

    // Create a table and append it to the HTML body
    const table = d3.select("#bar-chart-table")
      .append("table")
      .style("font-size", "14px");

    // Append a header row to the table
    const header = table.append("thead")
      .append("tr");
    header.append("th").text("Month Number");
    header.append("th").text("Leads Generated");

    // Append a row for each data item and its count
    const tbody = table.append("tbody");
    countArray.forEach(item => {
      const row = tbody.append("tr");
      row.append("td").text(item.key);
      row.append("td").text(item.value);


    });
  })
  .catch(function (error) {
    console.log(error);
  });



//2. Lead Status
const api2 = 'http://localhost:8080/leadsstatus';

d3.json(api2)
  .then(function (items) {
    // Extract one item from each object
    //console.log(items);
    const data = items.map(d => d.Status);
    //console.log(data);

    const total = data.length;
    // Count the occurrence of each unique value in the array
    const counts = {};
    data.forEach(function (d) {
      counts[d] = counts[d] + 1 || 1;
    });

    // Convert data into key-value pairs of objects
    const chartData = [];
    for (const key in counts) {
      chartData.push({
        label: key,
        value: counts[key]
      });
    }

    // Set up chart dimensions
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    // Set up color scale
    const color = d3.scaleOrdinal()
      .range(d3.schemeCategory10);

    // Set up arc generator
    const arc = d3.arc()
      .outerRadius(radius - 30)
      .innerRadius(radius - 130);

    // Set up pie generator
    const pie = d3.pie()
      .sort(null)
      .value(function (d) { return d.value; })
      .padAngle(.03);

    // Append SVG element to the DOM
    //'#f6f7fb'
    const svg = d3.select("#chart")
      .append("svg")
      //.style("background-color", "#2a6592")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    //Total number of leads
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "24px")
      .attr("font-weight", "bold")
      .text(total);

    // Generate chart
    const g = svg.selectAll(".arc")
      .data(pie(chartData))
      .enter()
      .append("g")
      .attr("class", "arc");

    g.append("path")
      .attr("d", arc)
      .style("fill", function (d) { return color(d.data.label); });

    g.append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("dy", "0.35em")
      .text(function (d) { return d.data.value; })
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "black")
      .style("font-weight", "bold");


    //Table of the chart


    // Count the occurrence of each data item
    const count = d3.rollup(
      data,
      v => v.length,
      d => d
    );

    // Convert count object into an array of objects with key-value pairs
    const countArray = Array.from(count, ([key, value]) => ({ key, value }));

    // Sort the count array in descending order of value
    countArray.sort((a, b) => b.value - a.value);

    // Create a table and append it to the HTML body
    const table = d3.select("#table")
      .append("table")
      .style("font-size", "14px");

    // Append a header row to the table
    const header = table.append("thead")
      .append("tr");
    header.append("th").text("Status");
    header.append("th").text("Count");

    // Append a row for each data item and its count
    const tbody = table.append("tbody");
    countArray.forEach(item => {
      const row = tbody.append("tr");
      row.append("td").text(item.key);
      row.append("td").text(item.value);
    });
  })
  .catch(function (error) {
    console.log(error);
  });



//3. Sales agent currently working on leads
const api3 = 'http://localhost:8080/leadsagentcurrent';

//Create a table element
const table = d3.select('#requirement3').append('table');



//Fetch data from the API
d3.json(api3).then(function (data) {
  // Create table headers
  const headers = Object.keys(data[1]).slice(1);
  const headerRow = table.append('thead').append('tr');
  headers.forEach(function (header) {
    headerRow.append('th').text(header);
  });

  //Create table Rows
  const rows = table.append('tbody').selectAll('tr')
    .data(data)
    .enter()
    .append('tr');

  //Create table cells
  const cells = rows.selectAll('td')
    .data(function (row) {
      return headers.map(function (header) {
        return { column: header, value: row[header] };
      });
    })
    .enter()
    .append('td')
    .text(function (d) { return d.value; })
    .style("font-size", "12px");

});


//4. Leads converted
const api4 = "http://localhost:8080/leadsagentcoverted";

// Fetch data from API
fetch(api4)
  .then(response => response.json())
  .then(data => {
    // Prepare data for pie chart
    const counts = {};
    data.forEach(item => {
      if (counts[item.Agent]) {
        counts[item.Agent]++;
      } else {
        counts[item.Agent] = 1;
      }
    });
    const pieData = Object.keys(counts).map(key => ({
      label: key,
      value: counts[key]
    }));

    // Create pie chart
    const svg = d3.select('#pie-chart');
    const width = svg.attr('width');
    const height = svg.attr('height');
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie()
      .value(d => d.value);

    const arc = d3.arc()
      .outerRadius(radius * 0.8)
      .innerRadius(radius * 0);

    const arcs = svg.selectAll('arc')
      .data(pie(pieData))
      .enter()
      .append('g')
      .attr('class', 'arc')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.label))
      .transition()
      .duration(3000)
      .attrTween('d', function (d) {
        const i = d3.interpolate(d.startAngle, d.endAngle);
        return function (t) {
          d.endAngle = i(t);
          return arc(d);
        }
      });

    const legend = svg.selectAll('.legend')
      .data(pieData)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(0, ${i * 20})`);

    legend.append('rect')
      .attr('x', width - 18)
      .attr('width', 18)
      .attr('height', 18)
      .attr('fill', d => color(d.label));

    legend.append('text')
      .attr('x', width - 24)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'end')
      .text(d => d.label);

    //Table of the chart

    const tableData = data.map(d => d.Agent);
    // Count the occurrence of each data item
    const count = d3.rollup(
      tableData,
      v => v.length,
      d => d
    );

    // Convert count object into an array of objects with key-value pairs
    const countArray = Array.from(count, ([key, value]) => ({ key, value }));

    // Sort the count array in descending order of value
    countArray.sort((a, b) => b.value - a.value);

    // Create a table and append it to the HTML body
    const table = d3.select("#pie-table")
      .append("table")
      .style("font-size", "14px");

    // Append a header row to the table
    const header = table.append("thead")
      .append("tr");
    header.append("th").text("Sales Agent");
    header.append("th").text("Count");

    // Append a row for each data item and its count
    const tbody = table.append("tbody");
    countArray.forEach(item => {
      const row = tbody.append("tr");
      row.append("td").text(item.key);
      row.append("td").text(item.value);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });






//5. Conversion Rate more than 70%
const api5 = "http://localhost:8080/OpportunityConversionRate";


// Set the dimensions and margins of the graph
var margin = { top: 20, right: 30, bottom: 30, left: 40 },
  width = 600 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// Append the svg object to the body of the page
var svg = d3.select("#funnel-chart").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

// Define the scales
var xScale = d3.scaleBand()
  .range([0, width])
  .padding(0.1);

var yScale = d3.scaleLinear()
  .range([height, 0]);

// Load the data from the API
d3.json(api5)
  .then(function (data) {

    // Format the data
    data.forEach(function (d) {
      d.StageName = d.StageName;
      d.Probability = +d.Probability;
    });

    // Sort the data by probability in descending order
    data.sort(function (a, b) {
      return b.Probability - a.Probability;
    });

    // Update the domain of the scales
    xScale.domain(data.map(function (d) { return d.StageName; }));
    yScale.domain([0, d3.max(data, function (d) { return d.Probability; })]);

    // Add the bars
    var bars = svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function (d) { return xScale(d.StageName); })
      .attr("y", height)
      .attr("width", xScale.bandwidth())
      .attr("height", 0)
      .attr("fill", "#784cfb");

    // Add the x-axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));

    // Add the y-axis
    svg.append("g")
      .call(d3.axisLeft(yScale));

    // X Axis Title
    svg.append("text")
      .attr("transform", "translate(" + (width / 2) + "," + (height + margin.bottom) + ")")
      .style("taxt-anchor", "middle")
      .style("font-size", "10.5px")
      .style("font-weight", "bold")
      .text("Stage Name");

    //Y Axis title
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .text("Probability (%)");


    // // Select the bars you want to apply the transition to
    // var rect = d3.selectAll("rect");

    // // Add a mouseover event listener to each bar
    // rect.on("mouseover", function (d) {
    //   // Select the current bar and transition its attributes
    //   d3.select(this)
    //     .transition()
    //     .duration(3000)
    //     .attr("y", function (d) { return yScale(d.Probability); })
    //     .attr("height", function (d) { return height - yScale(d.Probability); });
    // });

    // Add the animation
    bars.transition()
      .duration(3000)
      .attr("y", function (d) { return yScale(d.Probability); })
      .attr("height", function (d) { return height - yScale(d.Probability); });

    //Table  

    // Group the data by StageName and calculate the maximum Probability
    var groupedData = d3.rollups(data,
      v => ({
        Probability: d3.max(v, d => d.Probability),
        Count: v.length
      }),
      d => d.StageName);

    // Create the HTML table element
    var table = d3.select("#funnel-table").append("table");

    // Append the header row
    table.append("thead").append("tr")
      .selectAll("th")
      .data(["StageName", "Probability", "Count"])
      .enter().append("th")
      .text(function (d) { return d; });

    // Append the data rows
    var rows = table.append("tbody")
      .selectAll("tr")
      .data(groupedData)
      .enter().append("tr");

    // Add the StageName cell
    rows.append("td")
      .text(function (d) { return d[0]; })
      .style("font-size", "14px");

    // Add the Probability cell
    rows.append("td")
      .text(function (d) { return d[1].Probability; })
      .style("font-size", "14px");

    // Add the Count cell
    rows.append("td")
      .text(function (d) { return d[1].Count; })
      .style("font-size", "14px");

    // Sort the table by Probability in descending order
    rows.sort(function (a, b) {
      return d3.descending(a[1].Probability, b[1].Probability);
    });
  })
  .catch(function (error) {
    console.log(error);
  });









