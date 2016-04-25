//From http://stackoverflow.com/questions/6921275/is-it-possible-to-chain-settimeout-functions-in-javascript
function delay(fn, t) {
    // private instance variables
    var queue = [], self, timer;
    
    function schedule(fn, t) {
        timer = setTimeout(function() {
            timer = null;
            fn();
            if (queue.length) {
                var item = queue.shift();
                schedule(item.fn, item.t);
            }
        }, t);            
    }
    self = {
        delay: function(fn, t) {
            // if already queuing things or running a timer, 
            //   then just add to the queue
        	  if (queue.length || timer) {
                queue.push({fn: fn, t: t});
            } else {
                // no queue or timer yet, so schedule the timer
                schedule(fn, t);
            }
            return self;
        },
        cancel: function() {
            clearTimeout(timer);
            queue = [];
        }
    };
    return self.delay(fn, t);
};

drawMap = function() {
  
  /*------------------------------------------*/
  /*            Constants                     */
  /*------------------------------------------*/
  
  var parent = mapParent;
  
  var parentDiv, parentWidth, parentHeight, margin, width, height, projection,
      path, svg, chart, graticule, zoom, countries, cicrle;
  
  /*------------------------------------------*/
  /*            Initiate the SVG              */
  /*------------------------------------------*/
  
  parentDiv = d3.select(parent);
    
  parentWidth = g3.elementWidth(parentDiv),
      parentHeight = g3.elementHeight(parentDiv);
  
  margin = {
    top: parentHeight * 0.01, right: parentWidth * 0.01,
    bottom: parentHeight * 0.01, left: parentWidth * 0.01
  };
  
  width = g3.chartLength(parentWidth, margin.left, margin.right);
  height = g3.chartLength(parentHeight, margin.top, margin.bottom);
  
  svg = parentDiv.append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", "0, 0, " + width + ", "  + height);
  
  chart = svg.append("g");
  
  /*------------------------------------------*/
  /*            Projection Variables          */
  /*------------------------------------------*/
  
  var scale = minWidthHeight * 0.4;
  
  projection = d3.geo.orthographic()
  //projection = d3.geo.times()
      .translate([width / 2, height / 2])
      .scale(scale)
      .precision(0.1)
      .rotate([-90, -20])
      .clipAngle(90);
  
  path = d3.geo.path()
      .projection(projection)
      .pointRadius(function(d) { return d.radius; });
  
  circle = d3.geo.circle();
  
  graticule = d3.geo.graticule();
  
  chart.append("path.background")
      .datum({type: "Sphere"})
      .attr("d", path);
  
  chart.append("path.graticule")
      .datum(graticule)
      .attr("d", path);
  
  zoom = d3.geo.zoom()
      .projection(projection)
      .scaleExtent([projection.scale() * 0.7, projection.scale() * 8])
      .on("zoom.redraw", function() {
        d3.event.sourceEvent.preventDefault();
        svg.selectAll("path").attr("d", path);
      });
  
  countries = topojson.feature(world, world.objects.countries).features;
  
  countrySet = drawFeatureSet("country", countries);
  
  d3.selectAll("path").call(zoom);
  
  /*------------------------------------------*/
  /*            Draw elements                 */
  /*------------------------------------------*/
    
  var xvar = "lon", yvar = "lat", rvar = "Population";
  
  chart.selectAll("path.point")
      .data(data)
      .enter().append("path")
      .attr("class", function(d) { return "point r" + d.Rank; })
      .datum(function(d) {
        return circle
            .origin([d[xvar], d[yvar]])
            .angle(d[rvar]/6000000)();
      })
      .attr("d", path);
  
  function drawFeatureSet(className, featureSet) {
    
    var set = chart.selectAll("." + className)
        .data(featureSet)
        .enter()
        .append("g")
        .attr("class", className)
        .attr("data-name", function(d) {
          return d.properties.name;
        })
        .attr("data-id", function(d) {
          return d.id;
        });
    
    set.append("path.land")
        .attr("d", path);
    
    set.append("path.overlay")
    .attr("d", path)
    .on("click", function(d) {
      rotateToFocusOn(d);
    });
    
  }
  
  function rotateToFocusOn(x) {
    
    var coords = d3.geo.centroid(x);
    coords[0] = -coords[0];
    coords[1] = -coords[1];
    
    d3.transition()
        .duration(1250)
        .tween("rotate", function() {
          var r = d3.interpolate(projection.rotate(), coords);
          return function(t) {
            projection.rotate(r(t));
            svg.selectAll("path").attr("d", path);
          };
        })
        .transition();
    
  }
  
};

drawCircles = function() {
  
  /*------------------------------------------*/
  /*            Constants                     */
  /*------------------------------------------*/
  
  var parent = circlesParent;
  
  var parentDiv, parentWidth, parentHeight, margin, width, height, projection,
      path, svg, chart, graticule, zoom, countries, cicrle;
  
  /*------------------------------------------*/
  /*            Initiate the SVG              */
  /*------------------------------------------*/
  
  parentDiv = d3.select(parent);
    
  parentWidth = g3.elementWidth(parentDiv),
      parentHeight = g3.elementHeight(parentDiv);
  
  margin = {
    top: parentHeight * 0.01, right: parentWidth * 0.01,
    bottom: parentHeight * 0.01, left: parentWidth * 0.01
  };
  
  width = g3.chartLength(parentWidth, margin.left, margin.right);
  height = g3.chartLength(parentHeight, margin.top, margin.bottom);
  
  svg = parentDiv.append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", "0, 0, " + width + ", "  + height);
  
  chart = svg.append("g");
  
  var x = g3.scale({type: "linear", "min": 0, "max": width}),
      y = g3.scale({type: "linear", "min": height, "max": 0});
  
  /*------------------------------------------*/
  /*            Draw elements                 */
  /*------------------------------------------*/
    
  var xvar = "lon", yvar = "Population", rvar = "Population";
  
  chart.selectAll("path.point")
      .data(data)
      .enter().append("path")
      .attr("class", function(d) { return "point r" + d.Rank; })
      .datum(function(d) {
        return circle
            .origin([d[xvar], d[yvar]])
            .angle(d[rvar]/6000000)();
      })
      .attr("d", path);
  
}

redrawMap = function() {
  
  d3.select(mapParent + " *").remove();
  
  minWidthHeight = Math.min(window.innerWidth, window.innerHeight - 50);
 
    $(mapParent).css({
        width: minWidthHeight + "px",
        height: minWidthHeight + "px"
    });
  
  drawMap();
  
};