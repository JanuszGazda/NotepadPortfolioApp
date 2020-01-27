package com.fullstack.userAndRole;

import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;

public class UserService {

	@Autowired
	UserRepository userRepository;
	
	public User findUserByName(String name) {
		return StreamSupport.stream(userRepository.findAll().spliterator(), false)
                .filter(user -> user.username.equals(name)).findFirst().orElse(null);
	}
}
