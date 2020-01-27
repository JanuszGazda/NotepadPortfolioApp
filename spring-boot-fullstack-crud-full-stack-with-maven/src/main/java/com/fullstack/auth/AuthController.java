package com.fullstack.auth;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins= { "http://localhost:3000" })
@RestController
public class AuthController {
	
	@GetMapping(path = "/auth")
	public AuthenticationBean authenticate(@RequestHeader("authorization") String authData) {
		return new AuthenticationBean("You're cool");
	}
	
}
