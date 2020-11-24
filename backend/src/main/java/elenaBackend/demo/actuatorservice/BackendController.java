package elenaBackend.demo.actuatorservice;

//import java.util.concurrent.atomic.AtomicLong;
import org.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import elenaBackend.Algorithm;

@Controller
public class BackendController {
    private static final String AmherstToBos = "http://localhost:8080/getRoute?startLat=42.38887862&startLong=-72.53009035&endLat=42.36204482&endLong=-71.08557701&type=car&maximize=false";

    @GetMapping("/best-route-found")
    @ResponseBody
    public String returnBestRoute(@RequestParam(name="getRoute", required=false, defaultValue=AmherstToBos) String frontendInput) {
        JSONObject bestRoute = Algorithm.getBestRoute(frontendInput, false);
        return bestRoute.toString();
    }
    
}

