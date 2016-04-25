pacman::p_load(shiny)

shinyUI(fluidPage(
  
  HTML(
    '<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
    <span class="sr-only">Toggle navigation</span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
    </button>
    <a class="navbar-brand" href="http://www.genebrown.info">Home</a>
    </div>
    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    <ul class="nav navbar-nav right">
    <li>
    <a href="mailto:efbbrown@gmail.com" title="Email Me"><img class="link-icon" src="imgs/email.png"></a>
    </li>
    <li>
    <a href="https://github.com/efbbrown" title="GitHub"><img class="link-icon" src="imgs/GitHub-Mark-Light-32px.png"></a>
    </li>
    <li>
    <a href="https://www.linkedin.com/in/eugene-brown-a9435773" title="LinkedIn"><img class="link-icon" src="imgs/In-White-34px-R.png"></a>
    </li>
    </ul>
    </div>
    <!-- /.navbar-collapse -->
    </div>
    <!-- /.container -->
    </nav>'
  ),
  
  tags$head(
    tags$title('E. Brown - World Map'),
    HTML('<meta http-equiv="X-UA-Compatible" content="IE=edge">'),
    tags$link(rel="icon", href="imgs/favicon.ico"),
    tags$link(href="css/styles.css", rel="stylesheet"),
    tags$script(src="js/d3/d3.min.js", charset="utf-8"),
    tags$script(src="js/d3/d3.geo.zoom.js", charset="utf-8"),
    tags$script(src="js/d3/d3-queue.v2.min.js", charset="utf-8"),
    tags$script(src="js/d3/topojson.v1.min.js", charset="utf-8"),
    tags$script(src="js/g3/g3.min.js", charset="utf-8"),
    tags$script(src="js/d3-jetpack/d3-jetpack.js", charset="utf-8")
  ),
  
  tags$body(
    tags$script(src="js/functions.js"),
    tags$script(src="js/map.js")
    # tags$script(src="js/legend.js")
  )
  
  ))