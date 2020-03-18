package com.fullstack.note;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fullstack.userAndRole.User;
import com.fullstack.userAndRole.UserRepository;

@Service
public class NotesService {

	@Autowired
	NoteRepository noteRepository;
	
	@Autowired
	UserRepository userRepository;
	
	public Note deleteById(long id) {
		Note note = findById(id);
		
		if (note == null) {
			return null;
		}
		noteRepository.deleteById(id);
		if (findById(id) == null) {
			return note;
		}
		return null;
	}
	
	public Note findById(long id) {
		Optional<Note> optional = noteRepository.findById(id);
		if(optional.isPresent()) {
			return optional.get();
		}
		return null;
	}
	
	
	public Note save(Note note, String userName) {
		User current = userRepository.findByUsername(userName);
		note.setUser(current);
		noteRepository.save(note);
		
		return note;
	}
	
	public List<Note> findAll() {
		List<Note> notes = new ArrayList<Note>();
		List<User> users = new ArrayList<User>();
		users = userRepository.findAll();
		users.forEach(user -> {
			user.getNotes().forEach(note -> {
				note.setUserName(user.username);
			});
		});
		for(int i=0; i<users.size(); i++) {
			for(int j=0; j<users.get(i).getNotes().size(); j++) {
				notes.add(users.get(i).getNotes().get(j));
			}
		}
		return notes;
	}
}
