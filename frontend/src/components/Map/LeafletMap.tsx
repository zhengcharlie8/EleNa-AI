import React from "react";
import { useMapEvents, MapContainer, Marker, Popup, TileLayer, GeoJSON, MapConsumer } from "react-leaflet";
import { LatLngTuple, Icon } from "leaflet";
import { GeoJsonTypes, GeoJsonObject } from "geojson";
import icon from './assets/pin24.png';
import blueIcon from './assets/MapMarker_Ball_Right_Blue.png';
import redIcon from './assets/MapMarker_Ball_Right_Red.png'

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
  end?: [number, number];
  route?: number[][];
}

interface IMapState {
  start: [number, number] | undefined;
  end: [number, number] | undefined;
}
function degrees(value: number) {
  return value * (180 / Math.PI);
}

function radians(value: number) {
  return value * Math.PI / 180;
}

function midPoint(start: [number, number], end: [number, number]): [number, number] {
  let diffLng = radians(end[1] - start[1])

  let startLat = radians(start[0]);
  let endLat = radians(end[0]);
  let startLng = radians(start[1])

  let bX = Math.cos(endLat) * Math.cos(diffLng);
  let bY = Math.cos(endLat) * Math.sin(diffLng);
  let midLat = Math.atan2(Math.sin(startLat) + Math.sin(endLat), Math.sqrt((Math.cos(startLat) + bX) * (Math.cos(startLat) + bX) + bY * bY));
  let midLng = startLng + Math.atan2(bY, Math.cos(startLat) + bX);

  return [degrees(midLat), degrees(midLng)];
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
      coordinates: this.props.route
    };
    return (
      <MapContainer
        id="mapId"
        center={defaultLatLng}
        minZoom={1}
        zoom={12}
        scrollWheelZoom={false}

      >
        {/* <MyComponent markers={markers} /> */}
        {}
        {(this.props.route != undefined)
          ? <GeoJSON data={myLines}
            style={myStyle} />
          : ""}
        {/* <GeoJSON data={myLines} style={myStyle} /> */}
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

        {(this.props.end != undefined && JSON.stringify(this.props.end) !== JSON.stringify([0, 0]) && this.props.start != undefined && JSON.stringify(this.props.start) !== JSON.stringify([0, 0]))
          ? <MapConsumer>
            {(map) => {
              map.flyTo(midPoint(this.props.start!, this.props.end!), 10)
              return null
            }}
          </MapConsumer>
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
