package elenaBackend.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import org.json.simple.JSONobject;
import org.json.simple.parser.JSONParser;

@SpringBootApplication
public class ElenaBackendApplication {
    
	// Query routes between two points on OSRM, given the coordinates
	public static void saveOsrmJSON(String lat1, String long1, String lat2, String long2){
		String coord1 = lat1 + "," + long1 + ";";
		String coord2 = lat2 + "," + long2;
		String query = "http://router.project-osrm.org/route/v1/driving/" +coord1+coord2+ "?alternatives=3&geometries=geojson";

		ProcessBuilder pb = new ProcessBuilder(
            "curl",
            "-s",
            "Accept: application/json",
            query
            );

    	pb.directory(new File("/candidate_paths"));
    	pb.redirectErrorStream(true);
    	Process p = pb.start();
    	InputStream is = p.getInputStream();

    	FileOutputStream outputStream = new FileOutputStream("/candidate_paths/paths.json");

    	BufferedInputStream bis = new BufferedInputStream(is);
    	byte[] bytes = new byte[100];
    	int numberByteReaded;
    	while ((numberByteReaded = bis.read(bytes, 0, 100)) != -1) 
    	    {outputStream.write(bytes, 0, numberByteReaded);
    	     Arrays.fill(bytes, (byte) 0);
    	    }
    	outputStream.flush();
    	outputStream.close();
		}
    

	public static void findBestPath(String lat1, String long1, String lat2, String long2, boolean min_elev){
		
	}

	public static void main(String[] args) {
		SpringApplication.run(ElenaBackendApplication.class, args);
	}

}
