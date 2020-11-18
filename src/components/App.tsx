import React from "react";

import "./App.css";
import Query from "./Query/Query";
import LeafletMap from "./LeafletMap";
import { Col, Container, Row } from "react-bootstrap";

const App: React.FC = () => {
  return (
    <div>
      <h1>EleNa</h1>
      <Container>
        <Row>
          <Col>
            <Query />
          </Col>
        </Row>
        <Row>
          <Col sm={10}>
            <LeafletMap />
          </Col>
          <Col sm={2}>hello</Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
