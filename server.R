pacman::p_load(shiny, jsonlite)

source("R/make_data.R")

shinyServer(function(input, output, session) {
  
  observe({
    
    data <- toJSON(data)
    
    session$sendCustomMessage(type = "data", data)
    
  })
  
})