pacman::p_load(data.table, magrittr, ggmap)

pacman::p_load_gh("efbbrown/make")

aggData <- make_once("data/aggData", function() {
  
  aggData <- fread("data/agglomerationData.csv")
  
  aggLocations <- geocode(paste(aggData$Name, aggData$Country, sep = ", "))
  
  aggData <- cbind(aggData, aggLocations)
  
  aggData <- aggData[, ":=" (Status = NULL)]
  
  return(aggData)
  
})

write.csv(aggData, "www/data/aggData.csv")
