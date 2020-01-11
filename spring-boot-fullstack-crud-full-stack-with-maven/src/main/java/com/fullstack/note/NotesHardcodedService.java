package com.fullstack.note;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class NotesHardcodedService {

	public Note deleteById(long id) {
		Note note = findById(id);
		
		if (note == null) {
			return null;
		}
		if (notes.remove(note))  {
			return note;
		}
		return null;
	}
	
	public Note findById(long id) {
		return notes.stream().filter(elem -> elem.getId() == id).findFirst().orElse(null);
	}
	
	public Note save(Note note, String user) {
		note.setUsername(user);
		if (note.getId() == -1 || note.getId() == 0) {
			note.setId(++idCounter);
			notes.add(note);
		} else {
			deleteById(note.getId());
			notes.add(note);
		}
		return note;
	}
	
	private static List<Note> notes = new ArrayList<>();
	private static long idCounter = 0;
	
	static {
		notes.add(new Note(++idCounter, "admin", "Learn Full stack with Spring Boot and Angular"));
		notes.add(new Note(++idCounter, "admin", "Learn Full stack with Spring Boot and React"));
		notes.add(new Note(++idCounter, "admin", "Master Microservices with Spring Boot and Spring Cloud"));
		notes.add(new Note(++idCounter, "admin",
	        "Deploy Spring Boot Microservices to Cloud with Docker and Kubernetes"));
	}
	
	public List<Note> findAll() {
		return notes;
	}
}
