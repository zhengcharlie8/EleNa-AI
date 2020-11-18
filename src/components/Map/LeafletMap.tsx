import React from "react";
import { useMapEvents, MapContainer, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import { LatLngTuple, Icon } from "leaflet";
import { GeoJsonTypes } from "geojson";
import icon from './assets/pin24.png';

const defaultLatLng: LatLngTuple = [37.09024, -95.712891];
const myStyle = {
  color: "#ff7800",
  weight: 5,
  opacity: 0.65,
};

var markers: Array<[number, number]> = [[37.09024, -95.712891], [38.09024, -95.712891]];

function MyComponent(props: any) {
  const map = useMapEvents({
    click: () => {
      map.locate()
    },
    locationfound: (location) => {
      markers.push([location.latlng.lat, location.latlng.lng]);
      console.log('location found:', location)
    },
  })
  return null
}

interface IMapProps {

}

class LeafletMap extends React.Component<{}, { markers: Array<[number, number]> }> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      markers: markers
    };
  }

  addMarker = (e: { latlng: [number, number]; }) => {
    const { markers } = this.state
    markers.push(e.latlng)
    this.setState({ markers })
  }

  render() {
    const myIcon = new Icon({
      iconUrl: icon,
    });

    let myLines = {
      type: "LineString" as GeoJsonTypes,
      coordinates: [
        [-100, 40],
        [-105, 45],
        [-110, 55],
      ],
    };
    return (
      <MapContainer
        id="mapId"
        center={defaultLatLng}
        minZoom={1}
        zoom={6}
        scrollWheelZoom={false}
      >
        <MyComponent markers={markers} />
        <GeoJSON data={myLines} style={myStyle} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((position, idx) =>
          <Marker key={`marker-${idx}`}
            position={position}
            icon={myIcon}
            draggable={true}>
            {/* <Popup>
            <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
          </Popup> */}
          </Marker>
        )}
      </MapContainer>
    );
  }
};

export default LeafletMap;
