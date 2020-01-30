package com.fullstack.auth;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;

@CrossOrigin(origins= { "http://localhost:3000" })
@SessionAttributes({"currentUser"})
@RestController
public class AuthController {
	
	@GetMapping(path = "/login")
	public String authenticate(@RequestHeader("authorization") String authData) {
		return new String("You're cool");
	}
	
}
