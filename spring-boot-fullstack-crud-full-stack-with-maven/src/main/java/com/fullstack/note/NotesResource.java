package com.fullstack.note;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
public class NotesResource {

	@Autowired
	private NotesHardcodedService notesHardcodedService;
	
	@GetMapping("/{username}/notes")
	public List<Note> getAllNotes(@PathVariable String username) {
		return notesHardcodedService.findAll();
	}
	
	@GetMapping("/{username}/note/{id}")
	public Note getNote(@PathVariable String username, @PathVariable long id) {
		return notesHardcodedService.findById(id);
	}
	
	@PutMapping("{username}/note/{id}")
	public ResponseEntity<Note> updateNote(@PathVariable String username, @PathVariable long id,
			@RequestBody Note note) {
		Note noteUpdated = notesHardcodedService.save(note, username);
		return new ResponseEntity<Note>(noteUpdated, HttpStatus.OK);
	}
	
	@PostMapping("{username}/notes")
	public ResponseEntity<Void> createNote(@PathVariable String username, @RequestBody Note note) {
		Note createdNote = notesHardcodedService.save(note, username);
		//send response status
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdNote.getId())
				.toUri();
		return ResponseEntity.created(uri).build();
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
