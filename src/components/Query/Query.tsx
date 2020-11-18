import React, { useState } from "react";

import {
  Button,
  ButtonGroup,
  Col,
  Form,
  Row,
  ToggleButton,
} from "react-bootstrap";

const route = {};
const elevationOptions = [
  { name: "Minimize", value: "minimize" },
  { name: "Maximize", value: "maximize" },
];

const getRoute = (start: String, end: String, elevation: String) => {
  // add endpoints here and place into route
  console.log(start);
  console.log(end);
  console.log(elevation);
  console.log(route);
};

const Query: React.FC = () => {
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [elevationValue, setElevationValue] = useState("minimize");
  return (
    <Form
      onSubmit={(event) => {
        getRoute(startPoint, endPoint, elevationValue);
        event.preventDefault();
      }}
    >
      <Row>
        <Col sm={8}>
          <Form.Group>
            <Form.Label>
              <strong>Starting Point</strong>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Starting Point"
              onChange={(e) => setStartPoint(e.currentTarget.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <strong>Destination</strong>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Destination"
              onChange={(e) => setEndPoint(e.currentTarget.value)}
            />
          </Form.Group>
        </Col>
        <Col sm={3}>
          <Form.Group>
            <Form.Label>
              <strong>Elevation</strong>
            </Form.Label>
            <br></br>
            <ButtonGroup toggle>
              {elevationOptions.map((option, idx) => (
                <ToggleButton
                  key={idx}
                  type="radio"
                  variant="secondary"
                  name={option.name}
                  value={option.value}
                  checked={elevationValue === option.value}
                  onChange={(e) => setElevationValue(e.currentTarget.value)}
                >
                  {option.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Form.Group>
          <br />
          <Button size="lg" block type="submit">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Query;
