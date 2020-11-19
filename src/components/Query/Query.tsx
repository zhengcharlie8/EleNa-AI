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

interface IProps {
  setStartLocation: (start: [number, number]) => void;
  setEndLocation: (end: [number, number]) => void;
  setResults: (distance: number, elevationGain: number) => void;
  setAddress: (start: string, end: string) => void;
}

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

const getStartingGeoLocation = (address: string, setStartLocation: (start: [number, number]) => void) => {
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
      setStartLocation([lat, lng]);
    })
    .catch((error: any) => {
      console.log("error")
    });
}

const getEndingGeoLocation = (address: string, setEndLocation: (start: [number, number]) => void) => {
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
      setEndLocation([lat, lng]);
    })
    .catch((error: any) => {
      console.log("error")
    });
}

function test(e: any) {
  alert(e);
}

const Query: React.FC<IProps> = (props: IProps) => {
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  // const [startLatLng, setStartLatLng] = useState<[number, number]>([0, 0]);
  // const [endLatLng, setEndLatLng] = useState<[number, number]>([0, 0]);
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
              id="startPoint"
              type="text"
              placeholder="Starting Point"
              value={startPoint}
              onChange={(e) => setStartPoint(e.currentTarget.value)}
              onBlur={(e: any) => getStartingGeoLocation(e.currentTarget.value, props.setStartLocation)}
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
              onBlur={(e: any) => getEndingGeoLocation(e.currentTarget.value, props.setEndLocation)}
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
