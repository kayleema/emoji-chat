package hello;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
    @RequestMapping(value = {
            "/",
            "/register",
            "/home",
            "/signin",
            "/friend",
            "/message",
            "/message/**",
            "/user/**",
            "/chat/**"
    })
    public String index() {
        return "index";
    }
}
