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
}
