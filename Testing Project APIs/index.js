
//1. Leads Converted 
const api = 'http://localhost:8080/leadsconverted';

//Data of leads converted by month
const table1 = d3.select("#table1").append('table');

//Fetch data from the API
d3.json(api).then(function(data){
  //Table headers
  const headers = Object.keys(data[1]).slice(1);
  const headerRow = table1.append('thead').append('tr');
  headers.forEach(function (header) {
    headerRow.append('th').text(header);
  });

  //Table rows
  const rows = table1.append('tbody').selectAll('tr')
    .data(data)
    .enter()
    .append('tr')

  //Table cells
  const cells = rows.selectAll('td')
    .data(function (row) {
      return headers.map(function (header){
        return { column: header, value: row[header]};
      });
    })  
    .enter()
    .append('td')
    .text(function(d) { return d.value; })
})


//2. Lead Status
const api2 = 'http://localhost:8080/leadsstatus';

//Data of leads Staus
const table2 = d3.select("#table2").append('table');

//Fetch data from the API
d3.json(api2).then(function(data){
  //Table headers
  const headers = Object.keys(data[1]).slice(1);
  const headerRow = table2.append('thead').append('tr');
  headers.forEach(function (header) {
    headerRow.append('th').text(header);
  });

  //Table rows
  const rows = table2.append('tbody').selectAll('tr')
    .data(data)
    .enter()
    .append('tr')

  //Table cells
  const cells = rows.selectAll('td')
    .data(function (row) {
      return headers.map(function (header){
        return { column: header, value: row[header]};
      });
    })  
    .enter()
    .append('td')
    .text(function(d) { return d.value; })
})



//3. Sales agent currently working on leads data
const api3 = 'http://localhost:8080/leadsagentcurrent';

//Create a table element
const table3 = d3.select('#table3').append('table');

d3.json(api3).then(function(data) {
  // Create table headers
  const headers = Object.keys(data[1]).slice(1);
  const headerRow = table3.append('thead').append('tr');
  headers.forEach(function(header){
    headerRow.append('th').text(header);
});

//Create table Rows
const rows = table3.append('tbody').selectAll('tr')
  .data(data)
  .enter()
  .append('tr');

//Create table cells
const cells = rows.selectAll('td')
  .data(function(row){
    return headers.map(function(header){
      return { column: header, value: row[header] };
    });
  })
  .enter()
  .append('td')
  .text(function(d) { return d.value; });  

});


//4. Leads converted
const api4 = "http://localhost:8080/leadsagentcoverted";

//Create a table element
const table4 = d3.select('#table4').append('table');

d3.json(api4).then(function(data) {
  // Create table headers
  const headers = Object.keys(data[1]).slice(1);
  const headerRow = table4.append('thead').append('tr');
  headers.forEach(function(header){
    headerRow.append('th').text(header);
});

//Create table Rows
const rows = table4.append('tbody').selectAll('tr')
  .data(data)
  .enter()
  .append('tr');

//Create table cells
const cells = rows.selectAll('td')
  .data(function(row){
    return headers.map(function(header){
      return { column: header, value: row[header] };
    });
  })
  .enter()
  .append('td')
  .text(function(d) { return d.value; });  

});


//5. Conversion Rate more than 70%
const api5 = "http://localhost:8080/OpportunityConversionRate";

//Create a table element
const table5 = d3.select('#table5').append('table');

d3.json(api5).then(function(data) {
  // Create table headers
  const headers = Object.keys(data[1]);
  const headerRow = table5.append('thead').append('tr');
  headers.forEach(function(header){
    headerRow.append('th').text(header);
});

//Create table Rows
const rows = table5.append('tbody').selectAll('tr')
  .data(data)
  .enter()
  .append('tr');

//Create table cells
const cells = rows.selectAll('td')
  .data(function(row){
    return headers.map(function(header){
      return { column: header, value: row[header] };
    });
  })
  .enter()
  .append('td')
  .text(function(d) { return d.value; });  

});