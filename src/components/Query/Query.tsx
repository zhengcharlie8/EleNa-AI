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
import Results from "../Results/Results";
import LeafletMap from "../Map/LeafletMap";

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

const getStartingGeoLocation = (address: string, setStartLatLng: React.Dispatch<React.SetStateAction<number[]>>) => {
  let URL = "https://maps.googleapis.com/maps/api/geocode/json";
  let API_KEY = "";

  axios.get(URL, {
    params: {
      address: address,
      key: API_KEY
    }
  })
    .then((response: any) => {
      let formattedAddr = response.data.results[0].formatted_address;
      let lat = response.data.results[0].geometry.location.lat;
      let lng = response.data.results[0].geometry.location.lng;
      console.log(formattedAddr, lat, lng);
      setStartLatLng([lat, lng]);
    })
    .catch((error: any) => {
      console.log("error")
    });
}

const getEndingGeoLocation = (address: string, setEndLatLng: React.Dispatch<React.SetStateAction<number[]>>) => {
  let URL = "https://maps.googleapis.com/maps/api/geocode/json";
  let API_KEY = "";

  axios.get(URL, {
    params: {
      address: address,
      key: API_KEY
    }
  })
    .then((response: any) => {
      let formattedAddr = response.data.results[0].formatted_address;
      let lat = response.data.results[0].geometry.location.lat;
      let lng = response.data.results[0].geometry.location.lng;
      console.log(formattedAddr, lat, lng);
      setEndLatLng([lat, lng]);
    })
    .catch((error: any) => {
      console.log("error")
    });
}

function test(e: any) {
  alert(e);
}

const Query: React.FC = () => {
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [startLatLng, setStartLatLng] = useState([0, 0]);
  const [endLatLng, setEndLatLng] = useState([0, 0]);
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
              onBlur={(e: any) => getStartingGeoLocation(e.currentTarget.value, setStartLatLng)}
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
              onBlur={(e: any) => getEndingGeoLocation(e.currentTarget.value, setEndLatLng)}
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
      <Row>
        <Col sm={10}>
          <LeafletMap />
        </Col>
        <Col sm={2}>
          <Results />
        </Col>
      </Row>
    </Form>
  );
};

export default Query;
