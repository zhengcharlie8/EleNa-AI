# EleNa

Built by Team ***520 Blaze It!***

## Overview

### Frontend Overview

The frontend is set up using React and TypeScript. There are four primary components that make up the User Interface, which include the following:

- Query - contains the interactive inputs that users can use to query for a viable route from start point to destination
- Map - displays the leaflet map that provides users with a visual of the planned route
- Results - displays the points along each route, the distance traveled, and the elevation gain
- App - container for other three components, configures the states between the different components

The frontend also uses the GeoCode Endpoint from Google Maps API for converting address strings into coordinates.

### Backend Overview

The backend is set up using Springboot, Maven, and Java. It contains the `getRoute` endpoint used for finding the best route between two points with specified parameters for querying. The endpoint set up by Springboot uses a MVC architecture and contains an algorithm that finds the shortest routes between two points and then returns the ones with maximal or minimal (depending on the parameters given) elevation gain. Notable services used for the backend include OSRM (for finding viable routes between two points) and USGS (for finding the elevation of each point along a route).

Open Source Routing Machine: <http://project-osrm.org/>

United States Geo-Services Query: <https://nationalmap.gov/epqs/>

### Setting Up and Running

## Setting up and Running the Frontend

1. Go to the `frontend` directory and run `npm i` in the terminal to install the node dependencies.
2. Add the required `.env` file to the frontend directory containing the Google Maps API key. It should have the following format `REACT_APP_GOOGLE_MAPS_API_KEY=<API KEY>`
3. Run `npm start` in the terminal to start the application.
4. The application should open on `https://localhost:3000` automatically, but if not navigate to it in browser.

## Setting up and Running the Backend

1. Install Apache Maven by following the instructions at <https://maven.apache.org/install.html>
2. Make sure that your current version of Java is identical the one specified in the `pom.xml` file located in the `backend` directory (currently is set to Java version 8). If not, download the required Java version and set it to `JAVA_HOME` or you can change the java version required for maven by changing the version number in  
`<properties>`
    `<java.version>8</java.version>`
`</properties>`
3. In the `backend` directory, run `mvn spring-boot:run` to start the backend server.
4. You can then navigate the to the server on the browser at `http://localhost:8080/<endpoint>` with the necessary endpoint and parameters for the specified endpoint.
5. To test the endpoint, you can run an example query such as `http://localhost:8080/getRoute?startLat=39.636111&startLong=-105.044410&endLat=40.665955&endLong=-74.115622&type=car&max=false` which will return a JSON object with the route, elevation gain, and distance.
