/* jQuery function to highligh social icons on mouse hover */
	$(document).ready(function(){
	    $("#linkedin").mouseover(function(){
			$("#linkedin").css("box-shadow", "3px 3px 1px #888888");
		});
		$("#linkedin").mouseout(function(){
			$("#linkedin").css("box-shadow", "0px 0px 0px #888888");
		});
		$("#xing").mouseover(function(){
			$("#xing").css("box-shadow", "3px 3px 1px #888888");
		});
		$("#xing").mouseout(function(){
			$("#xing").css("box-shadow", "0px 0px 0px #888888");
		});
		$("#github").mouseover(function(){
			$("#github").css("box-shadow", "3px 3px 1px #888888");
		});
		$("#github").mouseout(function(){
			$("#github").css("box-shadow", "0px 0px 0px #888888");
		});
	});
	
/* jQuery function to highligh menu-icon */
	$(document).ready(function(){
	    $(".icon-menu").mouseover(function(){
			$(".icon-menu").css("background-color", "gray");
		});
		$(".icon-menu").mouseout(function(){
			$(".icon-menu").css("background-color", "#121212");
		});
	});
	
/* jQuery function to highligh drop-menu-icon on context window and query results*/
	$(document).ready(function(){
	    $("#drop-menu-icon").mouseover(function(){
			$("#drop-menu-icon").css("background-color", "gray");
		});
		$("#drop-menu-icon").mouseout(function(){
			$("#drop-menu-icon").css("background-color", "#121212");
		});
		$("#drop-menu-icon-results").mouseover(function(){
			$("#drop-menu-icon-results").css("background-color", "gray");
		});
		$("#drop-menu-icon-results").mouseout(function(){
			$("#drop-menu-icon-results").css("background-color", "#121212");
		});
	});
	
/* jQuery function to show main menu */
	$(document).ready(function(){
		$('.icon-menu').click( function () {
			$('.menu').toggle();
		});
	});

/* jQuery function for clicking on drop context menu icon */
	$(document).ready(function() {
		$('#drop-menu-icon').click(function() {
			$("#context-menu").hide();
		});
	});

/* jQuery function for clicking on drop context menu icon */
	$(document).ready(function() {
		$('#drop-menu-icon-results').click(function() {
			$("#query-results").hide();
		});
	});
	
/* jQuery function for clicking on search buttons */
	$(document).ready(function() {
		$('#search-button').click(function() {
			$("#query-results").show();
		});
	});

/* jQuery function to populate dropdown boxes on left map menu */
	/*$(document).ready(function(){
		var $select = $('#drop1'); 
		//$select.find('option').remove();  
		var i=1;
		$.each(json_stops.features,function(key, value){
			geometry = value.geometry;
			properties = value.properties;
			$select.append('<option value=' + properties.stop_id + '>' + properties.stop_name + '</option>');
		});
	});*/

/* jQuery function to filter leaflet layers when changing the value of the drop down box */
/* DROP DOWN 1*/
	var i=1;
	$(document).ready(function(){
		$('#drop1').change(function(){
			map.eachLayer(function (layer) {
				if(layer._leaflet_id != 22){
					//alert(layer._leaflet_id)
					map.removeLayer(layer);
				}
				//alert(layer._leaflet_id)
			});
			if($("#drop1 :selected").text()==="-- Select type of transport --"){
				
			}
			else{
				var GeoJSON_layer = L.geoJson(json_stops, {
					filter: function(feature, layer) {
						return feature.properties.r_type == $("#drop1 :selected").text();
					},
					onEachFeature: onEachFeature,
					pointToLayer: function (feature, latlng) {
						return L.circleMarker(latlng, StyleGTFS(feature));
					}
				});
				GeoJSON_layer.addTo(map);
				layerControl.addOverlay(GeoJSON_layer , "Type of transport search results #" + i);
				map.fitBounds(GeoJSON_layer.getBounds());
				i=i+1;
			}
		});
	});

	/* DROP DOWN 2*/
	$(document).ready(function(){
		$('#drop2').change(function(){
			map.eachLayer(function (layer) {
				if(layer._leaflet_id != 22){
					//alert(layer._leaflet_id)
					map.removeLayer(layer);
				}
				//alert(layer._leaflet_id)
			});
			if($("#drop2 :selected").text()==="-- Select Option --"){
				
			}
			else{
				var GeoJSON_layer = L.geoJson(json_stops, {
					filter: function(feature, layer) {
						return feature.properties.wheelchair == $("#drop2 :selected").text();
					},
					onEachFeature: onEachFeature,
					pointToLayer: function (feature, latlng) {
						return L.circleMarker(latlng, StyleGTFS(feature));
					}
				});
				GeoJSON_layer.addTo(map);
				layerControl.addOverlay(GeoJSON_layer , "Whellchair accessible search results #" + i);
				map.fitBounds(GeoJSON_layer.getBounds());
				i=i+1;
			}
		});
	});	
	/* DROP DOWN 3*/
	$(document).ready(function(){
		$('#drop3').change(function(){
			map.eachLayer(function (layer) {
				if(layer._leaflet_id != 22){
					//alert(layer._leaflet_id)
					map.removeLayer(layer);
				}
				//alert(layer._leaflet_id)
			});
			if($("#drop3 :selected").text()==="-- Select Option --"){
				
			}
			else{
				var GeoJSON_layer = L.geoJson(json_stops, {
					filter: function(feature, layer) {
						return feature.properties.r_bikes_allowed == $("#drop3 :selected").text();
					},
					onEachFeature: onEachFeature,
					pointToLayer: function (feature, latlng) {
						return L.circleMarker(latlng, StyleGTFS(feature));
					}
				});
				GeoJSON_layer.addTo(map);
				layerControl.addOverlay(GeoJSON_layer , "Bikes allowed on route search results #" + i);
				map.fitBounds(GeoJSON_layer.getBounds());
				i=i+1;
			}
		});
	});		

/* jQuery function to show attribute table from leaflet layers based on dropdown filter */
	$(document).ready(function(){
		$('#drop1').change(function () {
			$('#QueryResults').empty();
			var newRows = "";
			var tableHeader = "<thead><tr><th>Station Name</th><th>Route Name</th><th>Type of transport</th><th>Agency</th><th>Open time</th><th>Close time</th><th>Whellchairs Allowed</th><th>Bicycles Allowed</th></tr></thead><tbody>"
			$('#QueryResults').append(tableHeader);
				
			$.each(json_stops.features,function(key,value) {
				geometry = value.geometry;
				properties = value.properties;
				if (properties.r_type == $("#drop1 :selected").text()) {
					newRows += " <tr><td>" + properties.stop_name + "</td><td>" + properties.r_long_name + "</td><td>" + properties.r_type + "</td><td>" + properties.a_name + "</td><td>" + properties.start_time + "</td><td>" + properties.end_time + "</td><td>" + properties.wheelchair + "</td><td>" + properties.r_bikes_allowed + "</td></tr>";
				}	
			});
			$('#QueryResults').append(newRows);
			$('#QueryResults').append("</tbody>");
		});
	});

	$(document).ready(function(){
		$('#drop2').change(function () {
			$('#QueryResults').empty();
			var newRows = "";
			var tableHeader = "<thead><tr><th>Station Name</th><th>Route Name</th><th>Type of transport</th><th>Agency</th><th>Open time</th><th>Close time</th><th>Whellchairs Allowed</th><th>Bicycles Allowed</th></tr></thead><tbody>"
			$('#QueryResults').append(tableHeader);
			$.each(json_stops.features,function(key,value) {
				geometry = value.geometry;
				properties = value.properties;
				if (properties.wheelchair == $("#drop2 :selected").text()) {
					newRows += " <tr><td>" + properties.stop_name + "</td><td>" + properties.r_long_name + "</td><td>" + properties.r_type + "</td><td>" + properties.a_name + "</td><td>" + properties.start_time + "</td><td>" + properties.end_time + "</td><td>" + properties.wheelchair + "</td><td>" + properties.r_bikes_allowed + "</td></tr>";
				}	
			});
			$('#QueryResults').append(newRows);
			$('#QueryResults').append("</tbody>");
		});
	});
	
	$(document).ready(function(){
		$('#drop3').change(function () {
			$('##QueryResults').empty();
			var newRows = "";
			var tableHeader = "<thead><tr><th>Station Name</th><th>Route Name</th><th>Type of transport</th><th>Agency</th><th>Open time</th><th>Close time</th><th>Whellchairs Allowed</th><th>Bicycles Allowed</th></tr></thead><tbody>"
			$('#QueryResults').append(tableHeader);
			$.each(json_stops.features,function(key,value) {
				geometry = value.geometry;
				properties = value.properties;
				if (properties.r_bikes_allowed == $("#drop3 :selected").text()) {
					newRows += " <tr><td>" + properties.stop_name + "</td><td>" + properties.r_long_name + "</td><td>" + properties.r_type + "</td><td>" + properties.a_name + "</td><td>" + properties.start_time + "</td><td>" + properties.end_time + "</td><td>" + properties.wheelchair + "</td><td>" + properties.r_bikes_allowed + "</td></tr>";
				}	
			});
			$('#QueryResults').append(newRows);
			$('#QueryResults').append("</tbody>");
		});
	});
	
	
	
/* jQuery function to enable dropdown boxes by selecting the correspondent radio button */
	$(document).ready(function(){
		$('#drop1').attr('disabled', true);
		$('#radio1').click(function(){
			if ($('#radio1').is(':checked')) {
				$('#drop1').attr('disabled', false);
				$('#drop2').attr('disabled', true);
				$('#drop3').attr('disabled', true);
			}
		});
	});
	
	$(document).ready(function(){
		$('#drop2').attr('disabled', true);
		$('#radio2').click(function(){
			if ($('#radio2').is(':checked')) {
				$('#drop2').attr('disabled', false);
				$('#drop1').attr('disabled', true);
				$('#drop3').attr('disabled', true);
			}
		});
	});
	
	$(document).ready(function(){
		$('#drop3').attr('disabled', true);
		$('#radio3').click(function(){
			if ($('#radio3').is(':checked')) {
				$('#drop3').attr('disabled', false);
				$('#drop1').attr('disabled', true);
				$('#drop2').attr('disabled', true);
			}
		});
	});
	
/* jQuery function to unlock "Show Attributes" button if an option is selected */
	$(document).ready(function(){
		$('#search-button').attr('disabled', true);
		$('#clear-query-button').attr('disabled', true);
		$("#drop1").change(function(){
				if($("#drop1").val() === "0"){
					$('#search-button').attr('disabled', true);
					$('#clear-query-button').attr('disabled', true);
				}
				else{
					$('#search-button').attr('disabled', false);
					$('#clear-query-button').attr('disabled', false);
				}
		});
	});
	
	$(document).ready(function(){
		$('#search-button').attr('disabled', true);
		$("#drop2").change(function(){
			if($("#drop2").val() === "0"){
				$('#search-button').attr('disabled', true);
				$('#clear-query-button').attr('disabled', true);
			}
			else{
				$('#search-button').attr('disabled', false);
				$('#clear-query-button').attr('disabled', false);
			}
		});
	});
	
	$(document).ready(function(){
		$("#drop3").change(function(){
			if($("#drop3").val() === "0"){
				$('#search-button').attr('disabled', true);
				$('#clear-query-button').attr('disabled', true);
			}
			else{
				$('#search-button').attr('disabled', false);
				$('#clear-query-button').attr('disabled', false);
			}
		});
	});
	
/* jQuery function to reset search reset search dropbox when "Clear Selections" button is clicked */
	$(document).ready(function(){
		$("#clear-query-button").click(function () {
			map.eachLayer(function (layer) {
				if(layer._leaflet_id != 22){
					map.removeLayer(layer);
				}
			});
			$('#drop1').get(0).selectedIndex = 0;
			$('#drop2').get(0).selectedIndex = 0;
			$('#drop3').get(0).selectedIndex = 0;
			$('#drop1').attr('disabled', true);
			$('#drop2').attr('disabled', true);
			$('#drop3').attr('disabled', true);
			$("#radio1").prop( "checked", false);
			$("#radio2").prop( "checked", false);
			$("#radio3").prop( "checked", false);
			$('#search-button').attr('disabled', true);
			$('#clear-query-button').attr('disabled', true);
			$("#query-results").hide();
		});
	});
	
/* jQuery function to search elements within a circle when clicking the button "Select a location on the map" */
	$(document).ready(function(){
		$("#select-point-on-map").click(function() {
			$("#select-point-on-map").css('visibility','hidden');
			$("#stop-search-location").css('visibility','visible');
			$('#radius').attr('disabled', true);
			map.eachLayer(function (layer) {
							if(layer._leaflet_id != 22){
								//alert(layer._leaflet_id)
								map.removeLayer(layer);
							}
						});
			map.on('click', event);
		});
		$("#stop-search-location").click(function() {
			$("#select-point-on-map").css('visibility','visible');
			$("#stop-search-location").css('visibility','hidden');
			$('#radius').attr('disabled', false);
			map.eachLayer(function (layer) {
							if(layer._leaflet_id != 22){
								//alert(layer._leaflet_id)
								map.removeLayer(layer);
							}
						});
			map.off('click', event);
		});
	});