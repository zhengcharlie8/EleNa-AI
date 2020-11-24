package elenaBackend;

import java.net.URL;
import java.net.HttpURLConnection;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Elevation {

    private static HttpURLConnection con;

    public static double getElevationData(double x, double y) { // Used this tutorial for help: https://www.youtube.com/watch?v=qzRKa8I36Ww

        try {

        	StringBuffer response = new StringBuffer();

            String elevationURL = "https://nationalmap.gov/epqs/pqs.php?x=" + String.valueOf(x) + "&y=" + String.valueOf(y) + "&units=Meters&output=json";
            URL finalURL = new URL(elevationURL);
            con = (HttpURLConnection) finalURL.openConnection();

            String line;
            BufferedReader rdr = new BufferedReader(new InputStreamReader(con.getInputStream()));

            while (null != (line = rdr.readLine())) {
                response.append(line);
            }

            String tmpResponse = response.toString();
            //System.out.println(tmpResponse);

            Pattern p = Pattern.compile(".*\\\"Elevation\\\":\\\"(.*)\\\",.*");
            Matcher m = p.matcher(tmpResponse);
            m.matches();

            return Double.parseDouble(m.group(1));

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            con.disconnect();
        }

        return 0.0; // Return 0 if elevation not found

    }
    
    /**
     * Helper method for getting elevation from nationalmap.gov.
     * @param  lng longitude of the query point. 
     * @param  lat latitude of the query point.       
     * @return Elevation of the query point.
     */
    public static double getElevation(double lng, double lat) {
        BufferedReader reader;
        String line;
        StringBuffer responseContent = new StringBuffer();
        try {
            String queryURL = "https://nationalmap.gov/epqs/pqs.php?x=" + String.valueOf(lng) + "&y=" + String.valueOf(lat) + "&units=Meters&output=json";
            URL myURL = new URL(queryURL);
            con = (HttpURLConnection) myURL.openConnection();

            // Request setup
            con.setRequestMethod("GET");
            con.setConnectTimeout(5000);
            con.setReadTimeout(8000);

            int status = con.getResponseCode();
            if (status > 299) {
                // Display error message when connection has problem
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
            String responseStr = responseContent.toString();
            Pattern p = Pattern.compile(".*Elevation\":(.*),.*");
            Matcher m = p.matcher(responseStr);
            m.matches();

            if (!m.group(1).equals("\"-1000000\"")) {     // return valid elevation value only 
                return Double.parseDouble(m.group(1));
            }
            else {                                        // return 0.0 if elevation is invalid
                return 0.0;           
            }            
        }

        catch (MalformedURLException e) {
            System.out.println(e.getMessage());
        }
        catch (IOException e) {
            System.out.println(e.getMessage());
        }
        finally {
            con.disconnect();
        }

        return 0.0;     // Return 0 if elevation not found
    } 
    
    public static void main(String[] args) {
        final double lng = -118.2749634;
        final double lat = 34.13681506;
        double query_elev = Elevation.getElevation(lng, lat);
        System.out.println("The returned elevation for longitude " +lng+ " and latitude " +lat+ " is " +query_elev+ " meters.");   
    }

}
