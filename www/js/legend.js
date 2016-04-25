/*------------------------------------------*/
/*            Constants                     */
/*------------------------------------------*/

var parent = "#legend";

var rectSize = 15,
    rowHeight = 20,
    leftPadding = 10;

/*------------------------------------------*/
/*            Initiate the SVG              */
/*------------------------------------------*/

var parentDiv = d3.select(parent);
  
var parentWidth = g3.elementWidth(parentDiv),
    parentHeight = g3.elementHeight(parentDiv);

var margin = {
  top: parentHeight * 0.1, right: parentWidth * 0.1,
  bottom: parentHeight * 0.1, left: parentWidth * 0.1
};

var width = g3.chartLength(parentWidth, margin.left, margin.right),
    height = g3.chartLength(parentHeight, margin.top, margin.bottom);

var legend = parentDiv.append("div")
    .attr("class", "top")
    .attr("")

var legend = g3.appendChart(parentDiv, width, height, margin);

/*------------------------------------------*/
/*           Title & explanation chart      */
/*------------------------------------------*/

var title = "Populous Urban Clusters",
    titleSize = 24;

legend.append('text')
  .attr("font-size", titleSize + "px")
  .text(title);

var textPassage = "Visualised on this globe is every urban agglomeration with a population over 1,000,000 people.";

legend.append('text')
  .attr("font-size", "14px")
  .attr("y", titleSize + 10 + "px")
  .tspans(function(d) {
      return d3.wordwrap(textPassage, 40);  // break line after 15 characters
  });

/*------------------------------------------*/
/*           Name the two legend groups     */
/*------------------------------------------*/

var colLegend = legend.append("g#colLegend"),
    sizeLegend = legend.append("g#sizeLegend")
        .translate([0, rowHeight * 5]);

/*------------------------------------------*/
/*           Colour legend                  */
/*------------------------------------------*/
/*
var colourClasses = ["dens4", "dens3", "dens2", "dens1"],
    colourText = ["10,000 or greater", "5,000 - 10,000", "2,500 - 5,000",
                  "1 - 2,500"];

var colourData = [];

for (i = 0; i < colourClasses.length; i++) {
  colourData.push({colClass: colourClasses[i], colText: colourText[i]});
}

var colourTextX = leftPadding + rectSize + 5;

colLegend.selectAll("rect")
    .data(colourData)
    .enter().append("rect")
    .attr("class", function(d) { return d.colClass; })
    .attr("x", leftPadding)
    .attr("y", function(d, i) { return 10 + rowHeight * i; })
    .attr("height", rectSize)
    .attr("width", rectSize);

colLegend.selectAll("text")
    .data(colourData)
    .enter().append("text")
    .translate(function(d, i) { return [colourTextX, 10 + rowHeight * i + rowHeight * (6/10)]; })
    .text(function(d) { return d.colText; });
*/
/*------------------------------------------*/
/*           Size legend                    */
/*------------------------------------------*/

var sizeLevels = [2000000, 8000000, 20000000],
    sizeText = ["2,000,000", "8,000,000", "20,000,000"];

//d[rvar]/6000000

var sizeData = [];

for (i = 0; i < sizeLevels.length; i++) {
  sizeData.push({sizeClass: sizeLevels[i], sizeText: sizeText[i]});
}

var sizeTextX = leftPadding + rectSize + 5;

sizeLegend.selectAll("circle")
    .data(sizeData)
    .enter().append("circle")
    .attr("class", function(d) { return d.sizeClass; })
    .attr("cx", leftPadding)
    .attr("cy", function(d, i) { return 10 + rowHeight * i; })
    .attr("r", function(d) { return d.sizeClass/6000000});

sizeLegend.selectAll("text")
    .data(sizeData)
    .enter().append("text")
    .translate(function(d, i) { return [sizeTextX, 10 + rowHeight * i + rowHeight * (6/10)]; })
    .text(function(d) { return d.sizeText; });
