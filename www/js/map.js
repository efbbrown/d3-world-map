/*------------------------------------------*/
/*            Variables                     */
/*------------------------------------------*/

// constant variables
var data, world,
    mapParent = "#chart",
    circlesParent = "#circles",
    aspectRatio = 1,
    minLandscapeRatio = 1.3,
    maxLandscapeRatio = 1.5,
    navbarHeight = 52;

// vars that need to be recalculated on resize
var windowWidth, windowHeight, windowRatio, minWidthHeight, containerWidth,
    windowOrientation;

/*------------------------------------------*/
/*            Append Containers             */
/*------------------------------------------*/

function appendContainers() {
  
  windowWidth = window.innerWidth,
  windowHeight = window.innerHeight - navbarHeight,
  windowRatio = windowWidth/windowHeight,
  minWidthHeight = Math.min(windowWidth, windowHeight),
  containerWidth, windowOrientation;
  
  if (windowRatio > minLandscapeRatio) {
    windowOrientation = "landscape";
    containerWidth = Math.min(windowWidth, minWidthHeight * maxLandscapeRatio);
  } else if (windowRatio <= minLandscapeRatio) {
    windowOrientation = "portrait";
    containerWidth = windowWidth;
  }
  
  var containerStyles = {
    "width": containerWidth + "px",
    "min-height": windowHeight + "px",
    "margin": "auto",
    "left": (windowWidth - containerWidth)/2 + "px"
  };
  
  var chartStyles = {"width": minWidthHeight - 50 + "px", "height": minWidthHeight + "px"};
  
  var circlesStyles = {"width": "50px", "height": minWidthHeight + "px"};
  
  var legendStyles = {"font-size": 14 + "px", padding: "2em 2em"};//, "border": "1px solid #fff"};
  
  var titleStyles = {"font-size": 28 + "px", "padding": "20px 0", "border-bottom": "1px solid #fff"},
      titleText = "Populous Urban Clusters";
  
  var paragraphStyles = {"padding": "20px 0", "border-bottom": "1px solid #fff"},
      paragraphText = "Visualised on this globe is every urban agglomeration with a population over 1,000,000 people.<br><br>Circles are sized by population.<br><br>Hover for information, click on a country to focus it in the globe, scroll to zoom, drag to pan.";
  
  var sourceStyles = {"margin-top": "20px"},
      sourceText = "<h4>Sources</h4><ul><li>Population data from <a href='http://www.citypopulation.de' target='_blank'>Thomas Brinkhoff: Major Agglomerations of the World</a>.</li><li>Data geocoded using the <a href='https://developers.google.com/maps/documentation/geocoding/intro' target='_blank'>google maps API</a> via <a href='https://github.com/dkahle/ggmap' target='_blank'>ggmap</a></li><li><a href='http://bl.ocks.org/mbostock/4180634' target='_blank'>Country borders topojson</a> by Mike Bostock</li></ul>";
  
  if (windowOrientation == "landscape") {
    legendStyles.width = (containerWidth - minWidthHeight - 10) + "px";
    legendStyles["min-height"] = containerStyles["min-height"];
  } else {
    legendStyles.width = containerWidth + "px";
    legendStyles["min-height"] = windowHeight - minWidthHeight;
  }
  
  var container = $("<div/>").attr("id", "container").css(containerStyles);

  var chartContainer = $("<div/>").attr("id", "chart").css(chartStyles);
  
  var circlesContainer = $("<div/>").attr("id", "circles").css(circlesStyles);
  
  var legendContainer = $("<div/>").attr("id", "legend").css(legendStyles);
  
  var title = $("<h3/>").attr("id", "title").html(titleText).css(titleStyles);
  
  var paragraphs = $("<p/>").attr("id", "paragraphs").html(paragraphText).css(paragraphStyles);
  
  var sources = $("<p/>").attr("id", "paragraphs").html(sourceText).css(sourceStyles);
  
  d3.select("#container").remove();
  $("body").append(container);
  container.append(chartContainer);
  container.append(circlesContainer);
  container.append(legendContainer);
  legendContainer.append(title);
  legendContainer.append(paragraphs);
  legendContainer.append(sources);
  
}

appendContainers();

/*------------------------------------------*/
/*            Read data, render elements    */
/*------------------------------------------*/

var q = d3_queue.queue()
  .defer(function(url, callback) {
    d3.csv(url, function(error, table) {
      data = table;
      callback(error, table);
    });
  }, "data/aggData.csv")
  .defer(function(url, callback) {
    d3.json(url, function(error, json) {
      world = json;
      callback(error, json);
    });
  }, "data/world-110m.json");

q.await(drawCharts);
//q.await(drawCircles);

/*------------------------------------------*/
/*            On resize, recalc & redraw    */
/*------------------------------------------*/

$(window).on("resize orientationchange", function () {
    
    appendContainers();
 
    redrawMap();
    
    redrawCircles();
 
});