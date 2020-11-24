import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Form,
  Row,
  ToggleButton,
} from "react-bootstrap";
import axios from "axios";

import { Point } from "../App";

interface IProps {
  setStartLocation: (start: [number, number]) => void;
  setEndLocation: (end: [number, number]) => void;
  setResults: (distance: number, elevationGain: number) => void;
  setAddress: (start: string, end: string) => void;
  setRoute: (route: Point[]) => void;
}

let route: Point[] = [];
const elevationOptions = [
  { name: "Minimize", value: "minimize" },
  { name: "Maximize", value: "maximize" },
];
const travelMethodOptions = [
  { name: "Walk", value: "foot" },
  { name: "Bike", value: "bike" },
  { name: "Car", value: "car" },
];

const getRoute = (
  start: String,
  end: String,
  elevation: String,
  setResults: (start: number, end: number) => void
) => {
  // add endpoints here and place into route
  console.log(start);
  console.log(end);
  console.log(elevation);
  console.log(route);
  route = [
    { name: "p1", location: [-71.279296875, 44.933696389694674] },
    { name: "p2", location: [-72.99316406249999, 42.84375132629021] },
    { name: "p3", location: [-78.2666015625, 41.83682786072714] },
    { name: "p4", location: [-83.8916015625, 41.77131167976407] },
    { name: "p5", location: [-87.01171875, 39.842286020743394] },
  ];
  setResults(520, 520);
  return route;
};

const getStartingGeoLocation = (
  address: string,
  setStartLocation: (start: [number, number]) => void
) => {
  let URL = "https://maps.googleapis.com/maps/api/geocode/json";
  let API_KEY = "";

  axios
    .get(URL, {
      params: {
        address: address,
        key: API_KEY,
      },
    })
    .then((response: any) => {
      let formattedAddr = response.data.results[0].formatted_address;
      let lat = response.data.results[0].geometry.location.lat;
      let lng = response.data.results[0].geometry.location.lng;
      console.log(formattedAddr, lat, lng);
      setStartLocation([lat, lng]);
    })
    .catch((error: any) => {
      console.log("error");
    });
};

const getEndingGeoLocation = (
  address: string,
  setEndLocation: (start: [number, number]) => void
) => {
  let URL = "https://maps.googleapis.com/maps/api/geocode/json";
  let API_KEY = "";

  axios
    .get(URL, {
      params: {
        address: address,
        key: API_KEY,
      },
    })
    .then((response: any) => {
      let formattedAddr = response.data.results[0].formatted_address;
      let lat = response.data.results[0].geometry.location.lat;
      let lng = response.data.results[0].geometry.location.lng;
      console.log(formattedAddr, lat, lng);
      setEndLocation([lat, lng]);
    })
    .catch((error: any) => {
      console.log("error");
    });
};

const Query: React.FC<IProps> = (props: IProps) => {
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [elevationValue, setElevationValue] = useState("minimize");
  const [travelMethod, setTravelMethod] = useState("foot");

  return (
    <Form
      onSubmit={(event) => {
        props.setAddress(startPoint, endPoint);
        props.setRoute(
          getRoute(startPoint, endPoint, elevationValue, props.setResults)
        );
        event.preventDefault();
      }}
    >
      <Row>
        <Col sm={7}>
          <Form.Group>
            <Form.Label>
              <strong>Starting Point</strong>
            </Form.Label>
            <Form.Control
              id="startPoint"
              type="text"
              placeholder="Starting Point"
              value={startPoint}
              onChange={(e) => setStartPoint(e.currentTarget.value)}
              onBlur={(e: any) =>
                getStartingGeoLocation(
                  e.currentTarget.value,
                  props.setStartLocation
                )
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <strong>Destination</strong>
            </Form.Label>
            <Form.Control
              id="endPoint"
              type="text"
              placeholder="Destination"
              value={endPoint}
              onChange={(e) => setEndPoint(e.currentTarget.value)}
              onBlur={(e: any) =>
                getEndingGeoLocation(
                  e.currentTarget.value,
                  props.setEndLocation
                )
              }
            />
          </Form.Group>
        </Col>
        <Col sm={3}>
          <Form.Group>
            <Form.Label>
              <strong>Elevation Gain</strong>
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
          <Form.Group>
            <Form.Label>
              <strong>Travel Method</strong>
            </Form.Label>
            <br></br>
            <ButtonGroup toggle>
              {travelMethodOptions.map((option, idx) => (
                <ToggleButton
                  key={idx}
                  type="radio"
                  variant="secondary"
                  name={option.name}
                  value={option.value}
                  checked={travelMethod === option.value}
                  onChange={(e) => setTravelMethod(e.currentTarget.value)}
                >
                  {option.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Form.Group>
        </Col>
      </Row>
      <Button size="lg" block type="submit">
        Search
      </Button>
    </Form>
  );
};

export default Query;
