import React from 'react';
import {MapContainer,TileLayer,GeoJSON } from 'react-leaflet';
import {LatLngTuple } from 'leaflet';
import { GeoJsonTypes } from 'geojson';

const defaultLatLng: LatLngTuple = [37.090240,-95.712891];
const myStyle = {
  "color": "#ff7800",
  "weight": 5,
  "opacity": 0.65
};

const LeafletMap:React.FC = () => {
  var map = initMap()
   return (
    map
   )
}

function initMap(){
  var myLines = {
    "type": "LineString" as GeoJsonTypes,
    "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
}
  return (<MapContainer id="mapId"
  center={defaultLatLng}
  minZoom = {1}
  zoom={6}
  scrollWheelZoom = {false}>
        <GeoJSON
          data={myLines}
          style={myStyle}
        />
<TileLayer
attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>
</MapContainer>
  )
}

export default LeafletMap;