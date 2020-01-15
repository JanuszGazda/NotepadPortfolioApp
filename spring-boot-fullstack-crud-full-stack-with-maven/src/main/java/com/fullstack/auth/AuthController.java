package com.fullstack.auth;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins= { "http://localhost:3000" })
@RestController
public class AuthController {
	
	@GetMapping(path = "/auth")
	public AuthenticationBean authenticate() {
		return new AuthenticationBean("You're cool");
	}
	
}
