package elenaBackend.demo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ElenaBackendApplicationTests {

	@Test
<<<<<<< Updated upstream
	void contextLoads() {
=======
	public void testLAElevation() {
		final double lng3 = -118.35406495;
		final double lat3 = 34.06255774;
		final double lng4 = -118.05125428;
		final double lat4 = 34.19703723;
		assertEquals(57.87, Elevation.getElevation(lng3, lat3));
		assertEquals(907.01, Elevation.getElevation(lng4, lat4));	
	}

	@Test 
	public void testInvalidElevation() {
		final double lng5 = 720.5;
		final double lat5 = 42.38830809;
		final double lng6 = -72.5289402;
		final double lat6 = 423.8830809;
		assertEquals(0.0, Elevation.getElevation(lng5, lat5));
		assertEquals(0.0, Elevation.getElevation(lng6, lat6));
	}

	@Test
	public void testgetJSON() {
		double lngA = -117.66907, latA = 34.05038;
        double lngB = -118.27496, latB = 34.13681;
		JSONObject queryjson = Algorithm.getJSON(lngA, latA, lngB, latB, "driving");
		JSONObject anotherjson = new JSONObject();
		assertEquals(anotherjson.getClass(), queryjson.getClass());
	}

	@Test
	public void testgetBestRoute() {
		// String Input1_max = "http://localhost:8080/getRoute?startLat=42.38887862&startLong=-72.53009035&endLat=42.36204482&endLong=-71.08557701&type=car&maximize=true";
		// String Input1_min = "http://localhost:8080/getRoute?startLat=42.38887862&startLong=-72.53009035&endLat=42.36204482&endLong=-71.08557701&type=car&maximize=false";
		// JSONObject bestRoute1_max = Algorithm.getBestRoute(Input1_max, false);
		// JSONObject bestRoute1_min = Algorithm.getBestRoute(Input1_min, false);
		// String Input2_max = "http://localhost:8080/getRoute?startLat=34.05038&startLong=-117.66907&endLat=34.13681&endLong=-118.27496&type=car&maximize=true";

		// JSONObject bestRoute2_max = Algorithm.getBestRoute(Input2_max, false);
		// try {
		// 	assertEquals(281.35, bestRoute1_max.getDouble("elevation_gain"));
		// 	assertEquals(90.16, bestRoute1_max.getDouble("distance"));
		// 	assertEquals(179.05, bestRoute1_min.getDouble("elevation_gain"));
		// 	assertEquals(104.35, bestRoute1_min.getDouble("distance"));
		// 	assertEquals(71.56, bestRoute2_max.getDouble("elevation_gain"));
		// 	assertEquals(41.71, bestRoute2_max.getDouble("distance"));
		// }
		// catch (Exception e) {
		// 	System.out.println(e.getMessage());
		// }
		
>>>>>>> Stashed changes
	}

}
