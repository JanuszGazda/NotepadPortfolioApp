package com.fullstack.userAndRole;

import java.util.Arrays;
import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	@Autowired
	UserRepository userRepository;
	
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
	
	public User findUserByName(String name) {
		return userRepository.findByUsername(name);
	}
	
	public User saveUser(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        Role userRole = new Role(RoleType.ROLE_USER);
        user.setRoles(new HashSet<Role>(Arrays.asList(userRole)));
        return userRepository.save(user);
    }
}
