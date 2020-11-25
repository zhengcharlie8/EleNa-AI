import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import "./App.css";
import Query from "./Query/Query";
import Results from "./Results/Results";
import LeafletMap from "./Map/LeafletMap";

const App: React.FC = () => {
  let [startPoint, setStartPoint] = useState<[number, number]>([0, 0]);
  let [endPoint, setEndPoint] = useState<[number, number]>([0, 0]);
  let [distance, setDistance] = useState(0);
  let [elevationGain, setElevationGain] = useState(0);
  let [startAddress, setStartAddress] = useState("");
  let [endAddress, setEndAddress] = useState("");
  let [route, setRoute] = useState<number[][]>([]);

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

  const setRouting = (route: number[][]) => {
    setRoute(route);
  };

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
            <LeafletMap start={startPoint} end={endPoint} route={route} startAddress={startAddress} endAddress={endAddress} />
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
