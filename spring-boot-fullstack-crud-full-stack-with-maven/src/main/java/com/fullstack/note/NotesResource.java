package com.fullstack.note;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
public class NotesResource {

	@Autowired
	private NotesHardcodedService notesHardcodedService;
	
	@GetMapping("/{username}/notes")
	public List<Note> getAllNotes(@PathVariable String username) {
		return notesHardcodedService.findAll();
	}
	
	@DeleteMapping("/{username}/note/{id}")
	public ResponseEntity<Void> deleteNote(@PathVariable String username, @PathVariable long id) {
		Note note = notesHardcodedService.deleteById(id);
		
		if (note != null) {
			return ResponseEntity.noContent().build();
		}
		
		return ResponseEntity.notFound().build();
	}
}
