package com.fullstack.auth;

import java.util.Base64;

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
import com.fullstack.userAndRole.RoleType;
import com.fullstack.userAndRole.User;
import com.fullstack.userAndRole.UserService;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@SessionAttributes({"currentUser"})
@RestController
public class AuthController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping(path = "/login")
	public String authenticate(@RequestHeader("authorization") String authData) {
		String extract = authData.substring(authData.indexOf(" ")+1);
		String userName = new String(Base64.getDecoder().decode(extract));
		userName = userName.substring(0, userName.indexOf(":"));
		RoleType usersRole = userService.findUserByName(userName).getRoles().iterator().next().getName();
		return usersRole.toString().equalsIgnoreCase("role_admin") ? "admin" : "user";
	}
	
	@PostMapping(path = "/register")
	public ResponseEntity<Void> register(@RequestBody CredentialsDTO cred) {

		User newUser = new User();
		newUser.setPassword(cred.password);
		newUser.setUsername(cred.username);
		userService.saveUser(newUser);
		if (userService.findUserByName(cred.username) != null) {
			return new ResponseEntity<Void>(HttpStatus.OK);
		}
		return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
	}
}
