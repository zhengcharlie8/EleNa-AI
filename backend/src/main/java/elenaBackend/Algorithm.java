package elenaBackend;

import org.json.JSONObject;

import java.net.URL;
import java.net.HttpURLConnection;
import java.io.BufferedReader;
import java.io.InputStreamReader;

/**
 * Algorithms for finding the best path maximizing/miniming elevation gain via the
 * Open Source Routing Machine API.
 * @author Ke Liu
 * Reference: https://github.com/ATran31/osrm-java-client/blob/master/src/com/osrm/services/Route.java
 * 
 */

public class Algorithm {
    private static HttpURLConnection con;

    public static JSONObject getJSON(double lng1, double lat1, double lng2, double lat2) {
        BufferedReader reader;
        String line;
        StringBuffer responseContent = new StringBuffer();
        JSONObject result = null;
      
        String coords = String.format("%s,%s;%s,%s", Double.toString(lng1), Double.toString(lat1), Double.toString(lng2), Double.toString(lat2));
        String queryURL = String.format("http://router.project-osrm.org/route/v1/driving/%s?alternatives=3&geometries=geojson", coords);
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
    
    public static void main(String[] args){
        double lngA = -117.66907, latA = 34.05038;
        double lngB = -118.27496, latB = 34.13681;
        JSONObject queryjson = getJSON(lngA, latA, lngB, latB);
        System.out.println(queryjson);
        System.out.println(queryjson.getClass());
    }
}
