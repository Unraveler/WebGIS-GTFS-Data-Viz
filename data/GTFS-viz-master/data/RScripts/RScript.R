################# LOAD LIBRARIES #####################
library(jsonlite)
library(data.table)
library(BBmisc)
library(sqldf)

############## SET WORKING DIRECTORY #################
setwd("c:\\Users\\Rui\\Desktop\\AllyTest2\\data\\GTFS-viz-master\\data\\CSV\\")

############# Read data from GTFS files ##############
agency <- read.csv(file="agency.csv", header=TRUE, sep=";")
calendar <- read.csv(file="calendar.csv", header=TRUE, sep=";")
calendar_dates <- read.csv(file="calendar_dates.csv", header=TRUE, sep=";")
feed_info <- read.csv(file="feed_info.csv", header=TRUE, sep=";")
frequencies <- read.csv(file="frequencies.csv", header=TRUE, sep=";")
routes <- read.csv(file="routes.csv", header=TRUE, sep=";")
shapes <- read.csv(file="shapes_wkt.csv", header=TRUE, sep=";")
stop_times <- read.csv(file="stop_times.csv", header=TRUE, sep=";")
stops <- read.csv(file="stops.csv", header=TRUE, sep=";")
transfers <- read.csv(file="transfers.csv", header=TRUE, sep=";")
trips <- read.csv(file="trips.csv", header=TRUE, sep=";")

############ Check dimensions of each table########## 
dim(agency)
dim(calendar)
dim(calendar_dates)
dim(feed_info)
dim(frequencies)
dim(routes)
dim(shapes)
dim(stop_times)
dim(stops)
dim(transfers)
dim(trips)

################### Join tables ######################

	# Join AGENCY (7) and ROUTES (136) --> [AgencyRoutes] 
	AgencyRoutes <- merge(routes, agency, by.x = c("agency_id"), by.y = c("agency_id"), all.x = TRUE)
	dim(AgencyRoutes)

	# Join [AgencyRoutes] (136) and TRIPS (1681) --> [TripsAgencyRoutes]
	TripsAgencyRoutes <- merge(trips, AgencyRoutes, by.x = c("route_id"), by.y = c("route_id"), all.x = TRUE)
	dim(TripsAgencyRoutes)	

	# Join [TripsAgencyRoutes] (1681) and CALENDAR(54) --> [CalendarTripsAgencyRoutes]
	CalendarTripsAgencyRoutes <- merge(TripsAgencyRoutes, calendar, by.x = c("service_id"), by.y = c("service_id"), all.x = TRUE)
	dim(CalendarTripsAgencyRoutes)

	# Join [CalendarTripsAgencyRoutes] (1681) and CALENDAR_DATES (24) --> [CalendarDatesCalendarTripsAgencyRoutes]
	CalendarDatesCalendarTripsAgencyRoutes <- merge(CalendarTripsAgencyRoutes, calendar_dates, by.x = c("service_id"), by.y = c("service_id"), all.x = TRUE)
	dim(CalendarDatesCalendarTripsAgencyRoutes)

	# Join [CalendarDatesCalendarTripsAgencyRoutes] (1681) and FREQUENCIES (1681) --> [FrequenciesCalendarDatesCalendarTripsAgencyRoutes]	
	FrequenciesCalendarDatesCalendarTripsAgencyRoutes <- merge(CalendarDatesCalendarTripsAgencyRoutes, frequencies, by.x = c("trip_id"), by.y = c("trip_id"), all.x = TRUE)
	dim(FrequenciesCalendarDatesCalendarTripsAgencyRoutes)
	
	# Join [CalendarDatesCalendarTripsAgencyRoutes] (1681) and SHAPES (322) --> [ShapesFrequenciesCalendarDatesCalendarTripsAgencyRoutes]	
	ShapesFrequenciesCalendarDatesCalendarTripsAgencyRoutes <- merge(FrequenciesCalendarDatesCalendarTripsAgencyRoutes, shapes, by.x = c("shape_id"), by.y = c("shape_id"), all.x = TRUE)
	dim(ShapesFrequenciesCalendarDatesCalendarTripsAgencyRoutes)
	
	# Join [ShapesFrequenciesCalendarDatesCalendarTripsAgencyRoutes] (1681) and STOP_TIMES (68565) --> [StopTimesShapesFrequenciesCalendarDatesCalendarTripsAgencyRoutes]
	StopTimesShapesFrequenciesCalendarDatesCalendarTripsAgencyRoutes <- merge(stop_times, ShapesFrequenciesCalendarDatesCalendarTripsAgencyRoutes, by.x = c("trip_id"), by.y = c("trip_id"), all.x = TRUE)
	dim(StopTimesShapesFrequenciesCalendarDatesCalendarTripsAgencyRoutes)
	

	Attributes <- StopTimesShapesFrequenciesCalendarDatesCalendarTripsAgencyRoutes

	########## Join ATTRIBUTES(68565) to STOPS(5763) #####################
	Attributes <- merge(Attributes, stops, by.x = c("stop_id"), by.y = c("stop_id"), all.x = TRUE)
	dim(Attributes)
	colnames(Attributes)


######### CHANGE VALUES IN SOME COLUMNS FOR READABILITY ################
Attributes <- cbind(Attributes,route_type_decoded = ifelse(Attributes$route_type==0,"Tram, Streetcar, Lightrail",
							  ifelse(Attributes$route_type==1,"Subway, Metro",
							  ifelse(Attributes$route_type==2,"Rail",
							  ifelse(Attributes$route_type==3,"BUS",
							  ifelse(Attributes$route_type==4,"Ferry",
							  ifelse(Attributes$route_type==5,"Cablecar",
							  ifelse(Attributes$route_type==6,"Gondola",
							  ifelse(Attributes$route_type==7,"Fonicular",
							  Attributes$route_type))))))))) 

Attributes <- cbind(Attributes,wheelchair_accessible_decoded = ifelse(Attributes$wheelchair_accessible==0,"No",
							  		 ifelse(Attributes$wheelchair_accessible==1,"Yes",
							  		 Attributes$wheelchair_accessible))) 

Attributes <- cbind(Attributes,trip_bikes_allowed_decoded = ifelse(Attributes$trip_bikes_allowed==0,"No",
							  	    ifelse(Attributes$trip_bikes_allowed==1,"Yes",
							  	    Attributes$trip_bikes_allowed))) 

Attributes <- cbind(Attributes,route_bikes_allowed_decoded = ifelse(Attributes$route_bikes_allowed==0,"No",
							  	     ifelse(Attributes$route_bikes_allowed==1,"Yes",
							  	     Attributes$route_bikes_allowed)))

Attributes <- cbind(Attributes,monday_decoded = ifelse(Attributes$monday==0,"",
							  	     ifelse(Attributes$monday==1,"Monday",
							  	     Attributes$monday)))

Attributes <- cbind(Attributes,tuesday_decoded = ifelse(Attributes$tuesday==0,"",
							  	     ifelse(Attributes$tuesday==1,"Tuesday",
							  	     Attributes$tuesday)))

Attributes <- cbind(Attributes,wednesday_decoded = ifelse(Attributes$wednesday==0,"",
							  	     ifelse(Attributes$wednesday==1,"Wednesday",
							  	     Attributes$wednesday)))

Attributes <- cbind(Attributes,thursday_decoded = ifelse(Attributes$thursday==0,"",
							  	     ifelse(Attributes$thursday==1,"Thursday",
							  	     Attributes$thursday)))

Attributes <- cbind(Attributes,friday_decoded = ifelse(Attributes$friday==0,"",
							  	     ifelse(Attributes$friday==1,"Friday",
							  	     Attributes$friday)))

Attributes <- cbind(Attributes,saturday_decoded = ifelse(Attributes$saturday==0,"",
							  	     ifelse(Attributes$saturday==1,"Saturday",
							  	     Attributes$saturday)))

Attributes <- cbind(Attributes,sunday_decoded = ifelse(Attributes$sunday==0,"",
							  	     ifelse(Attributes$sunday==1,"Sunday",
							  	     Attributes$sunday))) 


################# Get Attributes table column names ###################
colnames(Attributes)

########################## Join columns ###############################
Attributes <- within(Attributes, time_schedule <- paste(arrival_time, departure_time, sep='->'))

Attributes <- within(Attributes, day_schedule <- paste(monday_decoded, tuesday_decoded, wednesday_decoded, thursday_decoded, friday_decoded, saturday_decoded,sunday_decoded, sep=' '))

Attributes <- within(Attributes, schedule <- paste(time_schedule, day_schedule, sep=' on '))

########################## Change column names ########################

Attributes <- setnames(Attributes, old=c("route_short_name.x","route_short_name.y"), new=c("route_short_name_1","route_short_name_2"))
						  

########### Only keep columns that matter for this project ############
Attributes <- subset(Attributes, select=c("stop_id",
							"stop_name",
							"stop_lat",
							"stop_lon",        
							"trip_desc",            
							"trip_headsign",         
							"wheelchair_accessible_decoded", 
							"trip_bikes_allowed_decoded",
							"route_short_name_1",   
							"route_long_name",      
							"route_type_decoded",            
							"route_url",           
							"route_bikes_allowed_decoded",  
							"agency_name",           
							"agency_url",            
							"agency_phone",                      
							"start_time",            
							"end_time",             
							"WKT"))

###################### Change columns names ###########################
Attributes <- setnames(Attributes, old=c("stop_id",
							"stop_name",
							"stop_lat",
							"stop_lon",        
							"trip_desc",            
							"trip_headsign",         
							"wheelchair_accessible_decoded", 
							"trip_bikes_allowed_decoded",
							"route_short_name_1",   
							"route_long_name",      
							"route_type_decoded",            
							"route_url",           
							"route_bikes_allowed_decoded",  
							"agency_name",           
							"agency_url",            
							"agency_phone",                      
							"start_time",            
							"end_time",             
							"WKT"), 
					     new=c("stop_id",
							"stop_name",
							"stop_lat",
							"stop_lon",       
							"t_description",            
							"t_headsign",         
							"wheelchair", 
							"t_bikes_allowed",
							"r_short_name",   
							"r_long_name",      
							"r_type",            
							"r_url",           
							"r_bikes_allowed",  
							"a_name",           
							"a_url",            
							"a_phone",                      
							"start_time",            
							"end_time",             
							"wkt"))

############### SORT ELEMENTS BY STOP_ID ###############################
Attributes <- sortByCol(Attributes, c("stop_id"), asc = c(TRUE))

############### Group elements by STOP_ID ##############################
Attributes <-  sqldf("select * from Attributes group by stop_id")


######################### SAVE ATTRIBUTES FILE #########################
write.table(Attributes, file = "c:\\users\\rui\\desktop\\AllyTest2\\data\\GTFS-viz-master\\data\\CSV\\attributes.csv",row.names=FALSE, na="NULL",col.names=TRUE, sep=";")
