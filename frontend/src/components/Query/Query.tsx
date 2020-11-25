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
import logo from './assets/loading.gif'

interface IProps {
  setStartLocation: (start: [number, number]) => void;
  setEndLocation: (end: [number, number]) => void;
  setResults: (distance: number, elevationGain: number) => void;
  setAddress: (start: string, end: string) => void;
  setRoute: (route: number[][]) => void;
}

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
  start: number[],
  end: number[],
  maximizeElevation: boolean,
  travel: String,
  setResults: (distance: number, elevationGain: number) => void,
  setRoute: (route: number[][]) => void,
  setLoading: (value: boolean) => void
) => {
  setLoading(true);
  let url = `http://localhost:8080/getRoute?startLat=${start[0]}&startLong=${start[1]}&endLat=${end[0]}&endLong=${end[1]}&max=${maximizeElevation}&type=${travel}`;
  axios.get(url).then((response: any) => {
    setResults(response.data.distance, response.data.elevation_gain);
    setRoute(response.data.coordinates);
    setLoading(false);
  });
};

const getGeoLocation = (
  address: string,
  setLocation: (coordinates: [number, number]) => void,
  setCoordinates: (value: React.SetStateAction<number[]>) => void
) => {
  let URL = "https://maps.googleapis.com/maps/api/geocode/json";
  let API_KEY = "AIzaSyDJzSs06U_9wW6f28SS8LZR_L8wuoqWlE8";

  axios
    .get(URL, {
      params: {
        address: address,
        key: API_KEY,
      },
    })
    .then((response: any) => {
      let lat = response.data.results[0].geometry.location.lat;
      let lng = response.data.results[0].geometry.location.lng;
      setLocation([lat, lng]);
      setCoordinates([lat, lng]);
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
  const [startCoordinates, setStartCoordinates] = useState([0, 0]);
  const [endCoordinates, setEndCoordinates] = useState([0, 0]);
  const [loading, setLoading] = useState(false);

  return (
    <Form
      onSubmit={(event) => {
        props.setAddress(startPoint, endPoint);
        getRoute(startCoordinates, endCoordinates, elevationValue === "maximize", travelMethod, props.setResults, props.setRoute, setLoading)
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
                getGeoLocation(
                  e.currentTarget.value,
                  props.setStartLocation,
                  setStartCoordinates
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
                getGeoLocation(
                  e.currentTarget.value,
                  props.setEndLocation,
                  setEndCoordinates
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
        <Col sm={2}>
          {(loading)
            ? <img src={logo} alt="loading..." height="120" width="120" />
            : ""
          }
        </Col>
      </Row>
      <Button size="lg" block type="submit">
        Search
      </Button>
    </Form>
  );
};

export default Query;
