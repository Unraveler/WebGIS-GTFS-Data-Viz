var wkt = null; //initialize wkt variable as null

/* FUNCTION TO HIGHLIGHT LAYER ON MOUSE OVER AND BRING BACK TO NORMAL ON MOUSE OUT. ON CLICK THE ASSOCIATED LINE IS SHOWEND */
function onEachFeature(feature, layer) {	
	layer.on({
		mouseout: function(e) {
					layer.setStyle(StyleGTFS(feature));
				},
		mouseover: highlightFeature,
		click:  	function click(){
						if(wkt) {
							map.removeLayer(wkt);
							wkt = parsemyWKT(feature);
							wkt.addTo(map);
							populate(feature);
						} 	
						else {
							wkt = parsemyWKT(feature);
							wkt.addTo(map);
							populate(feature);
						}
					}
	});
};

/* FUNCTION TO POPULATE CONEXT MENU AND SHOW IT OR HIDE IT ON CLICK */	
function populate(feature) {	
	document.getElementById('drop-menu-info').innerHTML = "<h1>" + feature.properties.stop_name + "</h1>"
														 +"<h2> This is a <b>"+ feature.properties.r_type + "</b> station, part of the <a href=\"" + feature.properties.r_url + "\">" + feature.properties.r_long_name + "</a> route [ route short name: " + feature.properties.r_short_name + " ] </h2>"
														 +"<h3> Service provided by: <a href=\"" + feature.properties.a_url + "\">" + feature.properties.a_name + "</a> (Agency contact: " + feature.properties.a_phone + ")</h3>"
														 +"<p> Station's service time is from : " + feature.properties.start_time + " to "+ feature.properties.end_time + "</p>"
														 +"<p> Station accesible by wheelchair?: " + feature.properties.wheelchair + "</p>"
														 +"<p> Bicycles allowed on this route?: " + feature.properties.r_bikes_allowed + "</p>"
														 +"<p> Station location coordinates (lat,lng): " + feature.properties.stop_lat + " , " + feature.properties.stop_lon + " (WGS84)</p>"
														 //+"<img src=\"Imagens/resize-metro.jpg\" id=\"station_image\" class=\"image\" />"
	$("#context-menu").toggle();
}

/* FUNCTION TO PARSE WKT */
function parsemyWKT(feature){
	wkt = omnivore.wkt.parse(feature.properties.wkt);
	map.addLayer(wkt);
	return wkt;
}

/* FUNCTION FOR HIGHLIGHTING LAYERS */
var highlightLayer;
function highlightFeature(e) {
	highlightLayer = e.target;
	highlightLayer.setStyle({
		fillColor: '#ffff00',
		fillOpacity: 1,
		radius: '15',
		weight: 5
			
	});
	if (!L.Browser.ie && !L.Browser.opera) {
		highlightLayer.bringToFront();
	}
}

/* FUNCTION FOR CONTROLLING THE SEARCH BY LOCATION EVENT*/			
function event(e) {
	var rad = $("#radius :selected").text(); // Filter circle radius in meters
	map.eachLayer(function (layer) {
		if(layer._leaflet_id != 22){
			//alert(layer._leaflet_id)
			map.removeLayer(layer);
		}
	});
	var lat = e.latlng.lat;
	var lng = e.latlng.lng;
	var filterCircle = L.circle(L.latLng(lat,lng), rad, {
		opacity: 1,
		weight: 1,
		fillOpacity: 0.4
	}).addTo(map);
	filterCircle.setLatLng(e.latlng);
	var radSearch = L.geoJson(json_stops, {
				filter: function ShowStationsOnRadius(feature) {
							return e.latlng.distanceTo(L.latLng(feature.geometry.coordinates[1],feature.geometry.coordinates[0])) < rad;
						},
				onEachFeature: onEachFeature,
				pointToLayer: function (feature, latlng) {
					return L.circleMarker(latlng, StyleGTFS(feature));
				}
	});
	radSearch.addTo(map);
	layerControl.addOverlay(radSearch , "Radius based search results #" + i);
	i=i+1;
}				

/* FUNCTION TO COVER THE STATIONS LAYER STYLES*/
function StyleGTFS(feature) {
	switch (feature.properties.r_short_name) {
		case '1':
			return {
			radius: '7',
			fillColor: '#e4ac28',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '101':
			return {
			radius: '7',
			fillColor: '#207ecf',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '101-A':
			return {
			radius: '7',
			fillColor: '#b3e223',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '101-B':
			return {
			radius: '7',
			fillColor: '#ef3210',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '101-D':
			return {
			radius: '7',
			fillColor: '#7dedca',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '102':
			return {
			radius: '7',
			fillColor: '#414dce',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '103':
			return {
			radius: '7',
			fillColor: '#4b2cc8',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '104':
			return {
			radius: '7',
			fillColor: '#ec1762',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '107':
			return {
			radius: '7',
			fillColor: '#ef2491',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '107-B':
			return {
			radius: '7',
			fillColor: '#e91cdf',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '107B-X':
			return {
			radius: '7',
			fillColor: '#ca4d7f',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '108':
			return {
			radius: '7',
			fillColor: '#e018ea',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '11':
			return {
			radius: '7',
			fillColor: '#2de32a',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '110':
			return {
			radius: '7',
			fillColor: '#3431e8',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '110-B':
			return {
			radius: '7',
			fillColor: '#db71',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '110-C':
			return {
			radius: '7',
			fillColor: '#a8e25b',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '112':
			return {
			radius: '7',
			fillColor: '#d86549',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '113-B':
			return {
			radius: '7',
			fillColor: '#eac278',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '115':
			return {
			radius: '7',
			fillColor: '#7cdc38',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '115-A':
			return {
			radius: '7',
			fillColor: '#e67e82',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '116':
			return {
			radius: '7',
			fillColor: '#78cc9a',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '116-A':
			return {
			radius: '7',
			fillColor: '#35bcda',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '118':
			return {
			radius: '7',
			fillColor: '#5092d9',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '119':
			return {
			radius: '7',
			fillColor: '#dbda83',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '119-B':
			return {
			radius: '7',
			fillColor: '#d5546a',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '11-A':
			return {
			radius: '7',
			fillColor: '#82ea8b',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '12':
			return {
			radius: '7',
			fillColor: '#6f87dc',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '120':
			return {
			radius: '7',
			fillColor: '#cbe15b',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '123-A':
			return {
			radius: '7',
			fillColor: '#e58c3e',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '124':
			return {
			radius: '7',
			fillColor: '#c637',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '124-A':
			return {
			radius: '7',
			fillColor: '#5361ce',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '125':
			return {
			radius: '7',
			fillColor: '#da80da',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '128':
			return {
			radius: '7',
			fillColor: '#43a1d0',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '12-X':
			return {
			radius: '7',
			fillColor: '#6ad634',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '131':
			return {
			radius: '7',
			fillColor: '#86c9ef',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '134':
			return {
			radius: '7',
			fillColor: '#14e79a',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '134-A':
			return {
			radius: '7',
			fillColor: '#6c64df',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '134-B':
			return {
			radius: '7',
			fillColor: '#2dadd4',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '134-C':
			return {
			radius: '7',
			fillColor: '#c85598',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '134-D':
			return {
			radius: '7',
			fillColor: '#c82b19',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '13-A':
			return {
			radius: '7',
			fillColor: '#7ca2e6',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '141':
			return {
			radius: '7',
			fillColor: '#a6e661',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '142':
			return {
			radius: '7',
			fillColor: '#ceb344',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '143':
			return {
			radius: '7',
			fillColor: '#844bdb',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '144':
			return {
			radius: '7',
			fillColor: '#39d562',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '144-C':
			return {
			radius: '7',
			fillColor: '#9c5ed1',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '145':
			return {
			radius: '7',
			fillColor: '#25c6ce',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '145-A':
			return {
			radius: '7',
			fillColor: '#787bcc',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '146':
			return {
			radius: '7',
			fillColor: '#e0aa64',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '147':
			return {
			radius: '7',
			fillColor: '#c35de1',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '148':
			return {
			radius: '7',
			fillColor: '#cdbf51',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '149':
			return {
			radius: '7',
			fillColor: '#e75115',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '159':
			return {
			radius: '7',
			fillColor: '#67cd28',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '161':
			return {
			radius: '7',
			fillColor: '#6913d1',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '161-C':
			return {
			radius: '7',
			fillColor: '#3ff012',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '161-D':
			return {
			radius: '7',
			fillColor: '#871ef0',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '161-E':
			return {
			radius: '7',
			fillColor: '#6be3a1',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '161-F':
			return {
			radius: '7',
			fillColor: '#3ddb42',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '162':
			return {
			radius: '7',
			fillColor: '#d57dbc',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '162-B':
			return {
			radius: '7',
			fillColor: '#e67977',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '162-D':
			return {
			radius: '7',
			fillColor: '#4f3ec8',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '163':
			return {
			radius: '7',
			fillColor: '#cde76f',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '163-A':
			return {
			radius: '7',
			fillColor: '#ac8bea',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '163-B':
			return {
			radius: '7',
			fillColor: '#d26b2a',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '164':
			return {
			radius: '7',
			fillColor: '#db5d32',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '165-A':
			return {
			radius: '7',
			fillColor: '#22ea86',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '166':
			return {
			radius: '7',
			fillColor: '#e0828f',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '167':
			return {
			radius: '7',
			fillColor: '#d66db0',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '168':
			return {
			radius: '7',
			fillColor: '#c94467',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '17-E':
			return {
			radius: '7',
			fillColor: '#caa379',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '17-F':
			return {
			radius: '7',
			fillColor: '#e9a26c',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '18':
			return {
			radius: '7',
			fillColor: '#aa64ca',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '19':
			return {
			radius: '7',
			fillColor: '#2497e8',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '19-A':
			return {
			radius: '7',
			fillColor: '#29ec43',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '1-D':
			return {
			radius: '7',
			fillColor: '#ee3670',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '2':
			return {
			radius: '7',
			fillColor: '#da926d',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '200':
			return {
			radius: '7',
			fillColor: '#933cd0',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '23':
			return {
			radius: '7',
			fillColor: '#2bdec6',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '23-X':
			return {
			radius: '7',
			fillColor: '#4fd680',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '25':
			return {
			radius: '7',
			fillColor: '#6fca8c',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '27-A':
			return {
			radius: '7',
			fillColor: '#2275f0',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '3':
			return {
			radius: '7',
			fillColor: '#30e7de',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '33':
			return {
			radius: '7',
			fillColor: '#27d9ca',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '34-A':
			return {
			radius: '7',
			fillColor: '#2edd0f',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '34-B':
			return {
			radius: '7',
			fillColor: '#f06bdf',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '37':
			return {
			radius: '7',
			fillColor: '#2979d9',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '39':
			return {
			radius: '7',
			fillColor: '#48db68',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '39-A':
			return {
			radius: '7',
			fillColor: '#4c7bea',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '39-A-X':
			return {
			radius: '7',
			fillColor: '#6fcfb9',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '39-B':
			return {
			radius: '7',
			fillColor: '#e53e92',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '39-X':
			return {
			radius: '7',
			fillColor: '#62dfdf',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '4':
			return {
			radius: '7',
			fillColor: '#4cf0d2',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '43':
			return {
			radius: '7',
			fillColor: '#7cdaea',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '46-C':
			return {
			radius: '7',
			fillColor: '#5034ef',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '46-C-X':
			return {
			radius: '7',
			fillColor: '#845de1',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '47-A':
			return {
			radius: '7',
			fillColor: '#c8cb20',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '47-A-X':
			return {
			radius: '7',
			fillColor: '#d2dd39',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '5':
			return {
			radius: '7',
			fillColor: '#5ae72f',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '52-C':
			return {
			radius: '7',
			fillColor: '#d0ca73',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '57':
			return {
			radius: '7',
			fillColor: '#7b92d1',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '57-X':
			return {
			radius: '7',
			fillColor: '#2fdd4f',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '59':
			return {
			radius: '7',
			fillColor: '#edd34f',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '59-A':
			return {
			radius: '7',
			fillColor: '#84df7a',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '6':
			return {
			radius: '7',
			fillColor: '#5eed25',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '7':
			return {
			radius: '7',
			fillColor: '#34a8d5',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '76':
			return {
			radius: '7',
			fillColor: '#c8dd29',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '76-A':
			return {
			radius: '7',
			fillColor: '#e464c6',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '76-A-X':
			return {
			radius: '7',
			fillColor: '#dd6ed4',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '76-X':
			return {
			radius: '7',
			fillColor: '#b32ae8',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '8':
			return {
			radius: '7',
			fillColor: '#9c80ef',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '9':
			return {
			radius: '7',
			fillColor: '#ee3d8d',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case '9-C':
			return {
			radius: '7',
			fillColor: '#a0d936',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case 'A':
			return {
			radius: '7',
			fillColor: '#afd07e',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case 'ATL':
			return {
			radius: '7',
			fillColor: '#d171df',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case 'B':
			return {
			radius: '7',
			fillColor: '#d11a11',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case 'CCE1/A':
			return {
			radius: '7',
			fillColor: '#e0b32b',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case 'CCE2/S':
			return {
			radius: '7',
			fillColor: '#ac46e7',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case 'CCE3/D':
			return {
			radius: '7',
			fillColor: '#e29d2e',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case 'CEUSA':
			return {
			radius: '7',
			fillColor: '#6ddaad',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case 'CISA':
			return {
			radius: '7',
			fillColor: '#6dcc1a',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case 'COREV':
			return {
			radius: '7',
			fillColor: '#59dfa3',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case 'CP':
			return {
			radius: '7',
			fillColor: '#d229b3',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case 'G':
			return {
			radius: '7',
			fillColor: '#ce2298',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case 'I':
			return {
			radius: '7',
			fillColor: '#28ce1f',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case 'K1':
			return {
			radius: '7',
			fillColor: '#cc1a29',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case 'LL':
			return {
			radius: '7',
			fillColor: '#12daf0',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case 'R-TLH':
			return {
			radius: '7',
			fillColor: '#57dfbb',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case 'SAUSA':
			return {
			radius: '7',
			fillColor: '#c87cd0',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		case 'TL 1':
			return {
			radius: '7',
			fillColor: '#3e5cee',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
		default:
			return {
			radius: '7',
			fillColor: '#99d018',
			color: '#000000',
			weight: 3,
			opacity: 1.0,
			dashArray: '',
			fillOpacity: '1.0',
		};
		break;
	}
}