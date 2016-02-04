/* CREATE MAIN MAP */

var map = L.map('map', {
						zoomControl:true, maxZoom:28, minZoom:1
						}).fitBounds([[19.1197686672,-99.587320407],[19.6833672027,-98.700452723]]);

/* BASE MAP */
var OSM = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
	
var Basemaps = {'OpenStreetMap': OSM};

/* STOPS LAYER */
var geojsonLayer_main = L.geoJson(json_stops,{
	onEachFeature: onEachFeature,
	pointToLayer: function (feature, latlng) {
		return L.circleMarker(latlng, StyleGTFS(feature));
	}
});

var cluster_groupstopsJSON = new L.MarkerClusterGroup({showCoverageOnHover: false});
cluster_groupstopsJSON.addLayer(geojsonLayer_main);
cluster_groupstopsJSON.addTo(map);
var Overlays = {'All Stations': cluster_groupstopsJSON};

/* LOAD CONTROLS */
/* LAYER CONTROL*/
var layerControl =L.control.layers(Basemaps,Overlays);
layerControl.addTo(map);

/* SCALE BAR */
L.control.scale({options: {position: 'bottomleft', maxWidth: 100, metric: true, imperial: false, updateWhenIdle: false}}).addTo(map);

/* MINI MAP */
var OSM2 = new L.TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {minZoom: 0, maxZoom: 28, attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' });
var miniMap = new L.Control.MiniMap(OSM2,{toggleDisplay:true}).addTo(map);

/* MOUSE POSTION */
L.control.mousePosition({position: 'topright',prefix:"Coordinates in WGS84 (lat, lng): "}).addTo(map);