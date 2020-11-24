package elenaBackend;

import org.json.JSONObject;
import org.json.JSONArray;

import java.net.URL;
import java.net.HttpURLConnection;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Algorithms for finding the best path maximizing/miniming elevation gain via the
 * Open Source Routing Machine API.
 * @author Ke Liu
 * Reference: https://www.youtube.com/watch?v=qzRKa8I36Ww
 * 
 */

public class Algorithm {
    private static HttpURLConnection con;

    /**
     * Method tha queries OSRM API given coordinates and travel mode, returns a JSONObject with all possible paths.
     * @param lng1 longitude of the start point.
     * @param lat1 latitude of the start point.
     * @param lng2 longitude of the end point.
     * @param lat2 latitude of the end point.
     * @param mode Travel mode ("car", "foot", "bike")
     * @return A JSONObject of all possible paths, given by OSRM.
     */
    public static JSONObject getJSON(double lng1, double lat1, double lng2, double lat2, String mode) {
        BufferedReader reader;
        String line;
        StringBuffer responseContent = new StringBuffer();
        JSONObject result = null;
      
        String coords = String.format("%s,%s;%s,%s", Double.toString(lng1), Double.toString(lat1), Double.toString(lng2), Double.toString(lat2));
        String queryURL = String.format("http://router.project-osrm.org/route/v1/%s/%s?alternatives=3&geometries=geojson", mode, coords);
        try {
            URL myURL = new URL(queryURL);
            con = (HttpURLConnection) myURL.openConnection();
            // Request setup
            con.setRequestMethod("GET");
            con.setConnectTimeout(5000);
            con.setReadTimeout(5000);
            
            int status = con.getResponseCode();
            if (status > 299) {          // Display error message when connection has problem
                reader = new BufferedReader(new InputStreamReader(con.getErrorStream())); 
                while ((line = reader.readLine()) != null) {
                    responseContent.append(line);
                }
                reader.close(); 
            }
            else {
                reader = new BufferedReader(new InputStreamReader(con.getInputStream())); 
                while ((line = reader.readLine()) != null) {
                    responseContent.append(line);
                }
                reader.close();
            }
            String response = responseContent.toString();
            result = new JSONObject(response);
        }
        catch (Exception e){
            System.out.println(e.getMessage());
        }
        finally {
            con.disconnect();
        }
        return result;
    }
    // Placeholder for Evan's method
    public static JSONObject EvanMethod(double lng1, double lat1, double lng2, double lat2, String mode) {
        JSONObject Top3Routes = new JSONObject();
        return Top3Routes;
    }
     
    // Front-end: "http://localhost:8080/getRoute?startLat=42.36929969&startLong=-71.10008238&endLat=42.38745864&endLong=-72.52926635&type=car&maximize=true";
    
    /**
     * Helper method to round a random double to 2 decimal places. 
     * @param num input double.
     * @return the same number rounded to 2 decimal places.
     */
    public static double twoDecimalPlaces(double num) {
        String converted = String.format("%.2f", num);
        return Double.parseDouble(converted);
    }

    /**
     * Main method to find the best route, given an input string from front-end. 
     * @param  FEinput input string from the front-end. 
     * @param  checkTop3 boolean that indicates whether or not to check the 3 shortest routes.      
     * @return The best route in json format, maximizing/minimizing elevation gain.
     */
    public static JSONObject getBestRoute(String FEinput, boolean checkTop3) {
        JSONObject bestRoute = new JSONObject();
        JSONObject Routes;
        // Extract information from String returned by front-end
        ArrayList<String> inputs = new ArrayList<String> ();
        String[] patterns = {".*Long=(.*)&endLat.*", ".*Lat=(.*)&startLong.*", ".*endLong=(.*)&type.*", ".*endLat=(.*)&endLong.*", ".*type=(.*)&max.*", ".*maximize=(.*)"};
        for (int i = 0; i < patterns.length; i ++) {
            Pattern p = Pattern.compile(patterns[i]);
            Matcher m = p.matcher(FEinput);
            m.matches();
            inputs.add(m.group(1));
        }
        // System.out.println(inputs);
        double lng1 = Double.parseDouble(inputs.get(0));
        double lat1 = Double.parseDouble(inputs.get(1));
        double lng2 = Double.parseDouble(inputs.get(2));
        double lat2 = Double.parseDouble(inputs.get(3));
        String mode = inputs.get(4);
        boolean maximize = Boolean.parseBoolean(inputs.get(5));
        if (checkTop3) {
            Routes = EvanMethod(lng1, lat1, lng2, lat2, mode);
        }
        else {
            Routes = getJSON(lng1, lat1, lng2, lat2, mode);
        }

        try {
            JSONArray array = Routes.getJSONArray("routes");
            HashMap<Double, Integer> map = new HashMap<>();
            double[] elev_gains = new double[array.length()];
            for (int i = 0; i < array.length(); i++) {
                JSONObject curr_geo = array.getJSONObject(i).getJSONObject("geometry");
                JSONArray coordinates = curr_geo.getJSONArray("coordinates");
                //System.out.println("Current path includes points: " +coordinates.toString()+ ".");
                
                double lng = coordinates.getJSONArray(0).getDouble(0);
                double lat = coordinates.getJSONArray(0).getDouble(1);
                double curr_elev = Elevation.getElevation(lng, lat);
                double next_elev;
                
                double elev_gain = 0.0;
                for (int j = 1; j < coordinates.length(); j ++) {
                    lng = coordinates.getJSONArray(j).getDouble(0);
                    lat = coordinates.getJSONArray(j).getDouble(1);
                    next_elev = Elevation.getElevation(lng, lat);
                    if ((next_elev - curr_elev) > 0) {
                        elev_gain += next_elev - curr_elev;
                    }
                    else { continue; }       // Do not count 0 or negative elevation gain.
                    curr_elev = next_elev;
                }
                elev_gain = twoDecimalPlaces(elev_gain);
                //System.out.println("Current path elevation gain is " +elev_gain+ " meters.");
                map.put(elev_gain, i);
                elev_gains[i] = elev_gain;
                //System.out.println(" ");
            }
            Arrays.sort(elev_gains);
            int k;                // Index of the best route
            double elev_gain;     // Elevation gain of the best route
            if (maximize) {
                elev_gain = elev_gains[elev_gains.length-1];  
                k = map.get(elev_gain);
            }
            else 
                {elev_gain = elev_gains[0];
                 k = map.get(elev_gain);}
            bestRoute.put("coordinates", array.getJSONObject(k).getJSONObject("geometry").getJSONArray("coordinates"));
            bestRoute.put("elevation_gain", elev_gain);
            bestRoute.put("distance", twoDecimalPlaces(array.getJSONObject(k).getDouble("distance")/1609.3));
            // System.out.println("The best route is " +bestRoute+ ". ");
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return bestRoute;
    } 
    
    public static void main(String[] args){
        double lngA = -117.66907, latA = 34.05038;
        double lngB = -118.27496, latB = 34.13681;
        String travel_mode = "driving";
        JSONObject queryjson = getJSON(lngA, latA, lngB, latB, travel_mode);
        // try {
        //     System.out.println(queryjson.toString(2));   // pretty printing
        // }
        // catch (Exception e) {
        //     System.out.println(e.getMessage());
        // }
        // parseJSON(queryjson);
        String FEinput = "http://localhost:8080/getRoute?startLat=34.05038&startLong=-117.66907&endLat=34.13681&endLong=-118.27496&type=car&maximize=true";
        // String AmhToBos = "http://localhost:8080/getRoute?startLat=42.38887862&startLong=-72.53009035&endLat=42.36204482&endLong=-71.08557701&type=car&maximize=true";
        JSONObject bestFound = getBestRoute(FEinput, false);
        System.out.println("The best route is " +bestFound+ ". ");
    }
}
