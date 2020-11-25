package elenaBackend.demo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import elenaBackend.Elevation;
import elenaBackend.Algorithm;

import static org.junit.jupiter.api.Assertions.*;
import org.json.JSONObject;


@SpringBootTest
class ElenaBackendApplicationTests {

	@Test
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
	public void testgetBestRouteMax() {
		String lngA = "-117.66907", latA = "34.05038";
        String lngB = "-118.27496", latB = "34.13681";
        String type = "car";
		JSONObject bestRoute_max = Algorithm.getBestRoute(latA, lngA, latB, lngB, type, true, false);
		try {
			assertEquals(291.06, bestRoute_max.getDouble("elevation_gain"));
			assertEquals(41.71, bestRoute_max.getDouble("distance"));
		}
		catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}

	@Test
	public void testgetBestRouteMin() {
		String lng1 = "-117.66907", lat1 = "34.05038";
		String lng2 = "-118.27496", lat2 = "34.13681";
		String type = "car";
		JSONObject bestRoute_min = Algorithm.getBestRoute(lat1, lng1, lat2, lng2, type, false, false);
		try {
			assertEquals(126.41, bestRoute_min.getDouble("elevation_gain"));
			assertEquals(44.41, bestRoute_min.getDouble("distance"));
		}
		catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}
	
	@Test
	public void testInvalidRoute() {
		String lng1 = "-517.66907", lat1 = "34.05038";
		String lng2 = "-118.27496", lat2 = "34.13681";
		String type = "car";
		JSONObject bestRoute_min = Algorithm.getBestRoute(lat1, lng1, lat2, lng2, type, false, false);
		JSONObject bestRoute_max = Algorithm.getBestRoute(lat1, lng1, lat2, lng2, type, true, false);
		try {
			assertEquals("{}", bestRoute_min.toString());
			assertEquals("{}", bestRoute_max.toString());
		} 
		catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}
}
