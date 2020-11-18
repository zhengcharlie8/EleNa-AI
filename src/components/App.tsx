import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import "./App.css";
import Query from "./Query/Query";
import Results from "./Results/Results";
import LeafletMap from "./Map/LeafletMap";

const App: React.FC = () => {
  let [startPoint, setStartPoint] = useState({});
  let [endPoint, setEndPoint] = useState({});
  let [distance, setDistance] = useState(0);
  let [elevationGain, setElevationGain] = useState(0);
  const handleResults = setResults.bind(this);
  const handleQueryPoints = setQueryPoints.bind(this);

  function setResults(distance: number, elevationGain: number) {
    setDistance(distance);
    setElevationGain(elevationGain);
  }

  function setQueryPoints(start: Object, end: Object) {
    setStartPoint(start);
    setEndPoint(end);
  }

  return (
    <div>
      <h1>EleNa</h1>
      <Container>
        <Row>
          <Col>
            <Query handleQueryPoints={handleQueryPoints} handleResults={handleResults}/>
          </Col>
        </Row>
        <Row>
          <Col sm={10}>
            <LeafletMap />
          </Col>
          <Col sm={2}>
            <Results distance={distance} elevationGain={elevationGain} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
