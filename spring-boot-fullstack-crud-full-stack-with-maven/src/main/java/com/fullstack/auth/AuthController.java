package com.fullstack.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.fullstack.note.Note;
import com.fullstack.userAndRole.User;
import com.fullstack.userAndRole.UserService;

@CrossOrigin(origins = { "http://localhost:3000" })
@SessionAttributes({"currentUser"})
@RestController
public class AuthController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping(path = "/login")
	public String authenticate(@RequestHeader("authorization") String authData) {
		return new String("You're cool");
	}
	
	@PostMapping(path = "/register")
	public ResponseEntity<Void> register(@RequestBody String username, @RequestBody String password) {

		User newUser = new User();
		newUser.setPassword(password);
		newUser.setUsername(username);
		userService.saveUser(newUser);
		if (userService.findUserByName(username) != null) {
			return new ResponseEntity<Void>(HttpStatus.OK);
		}
		return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
	}
}
