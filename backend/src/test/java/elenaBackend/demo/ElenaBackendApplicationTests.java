package elenaBackend.demo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import elenaBackend.Elevation;
import elenaBackend.Algorithm;

import static org.junit.jupiter.api.Assertions.*;
import org.json.JSONObject;

@SpringBootTest
class ElenaBackendApplicationTests {
    // To test: run ./mvnw test in the terminal
	@Test
	public void testAmherstElevation() {
		final double lng1 = -72.50090789;
		final double lat1 = 42.37924209;
		assertEquals(59.65, Elevation.getElevation(lng1, lat1));
		final double lng2 = -72.5289402;
		final double lat2 = 42.38830809;
        assertEquals(70.35, Elevation.getElevation(lng2, lat2));
	}

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
		JSONObject queryjson = Algorithm.getJSON(lngA, latA, lngB, latB);
		JSONObject anotherjson = new JSONObject();
		assertEquals(anotherjson.getClass(), queryjson.getClass());
	}

}
