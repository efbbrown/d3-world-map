pacman::p_load(data.table, magrittr, ggmap)

pacman::p_load_gh("efbbrown/make")

aggData <- make_once("data/aggData", function() {
  
  options(scipen = 12)
  
  aggData <- fread("data/agglomerationData.csv")
  
  setnames(aggData, "English Name", "EnglishName")
  
  source("R/geocode_data.R")
  
  aggData <- cbind(aggData, locations)
  
  rank_convert <- function(rank) {
    unit <- rank %% 100
    st_nums <- c(1, seq(from = 21, to = 99, by = 10))
    nd_nums <- c(2, seq(from = 22, to = 99, by = 10))
    rd_nums <- c(3, seq(from = 23, to = 99, by = 10))
    th_nums <- c(0, 4:9, 10:19, c(sapply(c(20, 24:29), seq, to = 99, by = 10)))
    if (unit %in% st_nums) { return(paste0(rank, "st"))}
    if (unit %in% nd_nums) { return(paste0(rank, "nd"))}
    if (unit %in% rd_nums) { return(paste0(rank, "rd"))}
    if (unit %in% th_nums) { return(paste0(rank, "th"))}
  }
  
  aggData <- aggData[, ":=" (Status = NULL,
                             PrettyPop = prettyNum(Population, big.mark = ","),
                             PrettyRank = sapply(Rank, rank_convert),
                             id = 1:nrow(aggData),
                             PrettyRemark = tstrsplit(Remark, split = "incl. ")[[2]]
                             )]
  
  aggData[Name == "Taibei", ":=" (lat = 25.0855451, lon = 121.4932093)]
  aggData[Name == "Gaoxiong", ":=" (lat = 22.9740475, lon = 120.332213)]
  aggData[EnglishName == "Kathmandu", ":=" (lat = 27.7090319, lon = 85.2911134)]
  aggData[Name == "Tainan", ":=" (lat = 23.1508776, lon = 120.2057851)]
  
  return(aggData)
  
})

write.csv(aggData, "www/data/aggData.csv")
