package com.rassul.simpleWebApplication.Controllers;


import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @RequestMapping("/")
    public String greet(){
        System.out.println("Home Requested");
        return "Welcome to Rassul!";
    }
    @RequestMapping("/about")
        public String about(){
            return "We dont give fuck what u cariing in this page!";
        }
}
