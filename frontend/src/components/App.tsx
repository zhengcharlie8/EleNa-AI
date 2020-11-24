import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import "./App.css";
import Query from "./Query/Query";
import Results from "./Results/Results";
import LeafletMap from "./Map/LeafletMap";

export interface Point {
  name: string;
  location: number[];
}

const App: React.FC = () => {
  let [startPoint, setStartPoint] = useState<[number, number]>([0, 0]);
  let [endPoint, setEndPoint] = useState<[number, number]>([0, 0]);
  let [distance, setDistance] = useState(0);
  let [elevationGain, setElevationGain] = useState(0);
  let [startAddress, setStartAddress] = useState("");
  let [endAddress, setEndAddress] = useState("");
  let [route, setRoute] = useState<Point[]>([]);

  const setResults = (distance: number, elevationGain: number) => {
    setDistance(distance);
    setElevationGain(elevationGain);
  };

  const setAddress = (start: string, end: string) => {
    setStartAddress(start);
    setEndAddress(end);
  };

  const setStartLocation = (start: [number, number]) => {
    setStartPoint(start);
  };

  const setEndLocation = (end: [number, number]) => {
    setEndPoint(end);
  };

  const setRouting = (route: Point[]) => {
    setRoute(route);
  };

  const fakeRoute = [[-72.530041, 42.388772], [-72.534281, 42.394861], [-72.515657, 42.398497], [-72.504411, 42.424534], [-72.468476, 42.448294], [-72.387923, 42.449182], [-72.35574, 42.469355], [-72.318428, 42.53478], [-72.304037, 42.537598], [-72.286343, 42.558164], [-72.174447, 42.576997], [-72.072883, 42.56962], [-72.0371, 42.554693], [-71.988109, 42.567332], [-71.927659, 42.557709], [-71.889957, 42.541074], [-71.854045, 42.550106], [-71.771082, 42.552265], [-71.725633, 42.523383], [-71.668504, 42.51627], [-71.525286, 42.528129], [-71.463164, 42.493586], [-71.444598, 42.473558], [-71.39102, 42.465689], [-71.357672, 42.446521], [-71.318742, 42.449109], [-71.248122, 42.42275], [-71.173243, 42.408936], [-71.141262, 42.39717], [-71.139645, 42.375297], [-71.085533, 42.362354]];

  return (
    <div>
      <h1>EleNa</h1>
      <Container>
        <Row>
          <Col>
            <Query
              setStartLocation={setStartLocation}
              setEndLocation={setEndLocation}
              setResults={setResults}
              setAddress={setAddress}
              setRoute={setRouting}
            />
            <br />
          </Col>
        </Row>
        <Row>
          <Col sm={10}>
            <LeafletMap start={startPoint} end={endPoint} route={fakeRoute} />
          </Col>
          <Col sm={2}>
            <Results
              distance={distance}
              elevationGain={elevationGain}
              startAddress={startAddress}
              endAddress={endAddress}
              route={route}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
