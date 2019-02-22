package hello;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class MvcConfig implements WebMvcConfigurer {
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/login").setViewName("login");
    }

    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Resources without Spring Security. No cache control response headers.
        registry.addResourceHandler("/built/**")
                .addResourceLocations("classpath:/static/built/")
                .setCachePeriod(-1);

        // Resources controlled by Spring Security, which
        // adds "Cache-Control: must-revalidate".
        registry.addResourceHandler("/images/**")
                .addResourceLocations("classpath:/static/images/")
                .setCachePeriod(-1);
    }
}