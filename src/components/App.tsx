import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import "./App.css";
import Query from "./Query/Query";
import Results from "./Results/Results";
import LeafletMap from "./Map/LeafletMap";

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
      </Container>
    </div>
  );
};

export default App;
