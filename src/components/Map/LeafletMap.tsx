import React from "react";
import { useMapEvents, MapContainer, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import { LatLngTuple, Icon } from "leaflet";
import { GeoJsonTypes } from "geojson";
import icon from './assets/pin24.png';
import blueIcon from './assets/marker-icon-2x-blue.png';
import redIcon from './assets/marker-icon-2x-red.png'

const defaultLatLng: LatLngTuple = [42.407211, -71.382439];
const myStyle = {
  color: "#ff7800",
  weight: 5,
  opacity: 0.65,
};

// var markers: Array<[number, number]> = [[37.09024, -95.712891], [38.09024, -95.712891]];

function MyComponent(props: any) {
  const map = useMapEvents({
    click: () => {
      map.locate()
    },
    locationfound: (location) => {
      // markers.push([location.latlng.lat, location.latlng.lng]);
      console.log('location found:', location)
    },
  })
  return null
}

interface IMapProps {
  start?: [number, number];
  end?: [number, number]
}

interface IMapState {
  start: [number, number] | undefined;
  end: [number, number] | undefined;
}

class LeafletMap extends React.Component<IMapProps> {
  constructor(props: IMapProps) {
    super(props);
    // this.state = {
    //   start: this.props.start,
    //   end: this.props.end
    // };
  }

  // addMarker = (e: { latlng: [number, number]; }) => {
  //   const { markers } = this.state
  //   markers.push(e.latlng)
  //   this.setState({ markers })
  // }

  render() {
    const myIcon = new Icon({
      iconUrl: icon,
    });

    const startIcon = new Icon({
      iconUrl: blueIcon,
    });

    const endIcon = new Icon({
      iconUrl: redIcon,
    });

    let myLines = {
      type: "LineString" as GeoJsonTypes,
      coordinates: [
        [-100, 40],
        [-105, 45],
        [-110, 55],
      ],
    };

    console.log(this.props.start);
    return (
      <MapContainer
        id="mapId"
        center={defaultLatLng}
        minZoom={1}
        zoom={12}
        scrollWheelZoom={false}
      >
        {/* <MyComponent markers={markers} /> */}
        <GeoJSON data={myLines} style={myStyle} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {(this.props.start != undefined && JSON.stringify(this.props.start) !== JSON.stringify([0, 0]))
          ? <Marker key="start" position={this.props.start} icon={startIcon}></Marker>
          : ""}

        {(this.props.end != undefined && JSON.stringify(this.props.end) !== JSON.stringify([0, 0]))
          ? <Marker key="end" position={this.props.end} icon={endIcon}></Marker>
          : ""}

        {/* <Marker key={`marker-${idx}`}
         position={position}
             icon={myIcon}
             draggable={true}>
             <Popup>
             <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
           </Popup>
           </Marker> */}

      </MapContainer>
    );
  }
};

export default LeafletMap;
