pacman::p_load(data.table, magrittr, ggmap)

pacman::p_load_gh("efbbrown/make")

locations <- make_once("data/locations", function() {
  
  aggData <- fread("data/agglomerationData.csv")
  
  aggLocations <- geocode(paste(aggData$Name, aggData$Country, sep = ", "))
  
  return(aggLocations)
  
})
