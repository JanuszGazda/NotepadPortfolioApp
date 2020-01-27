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
public class NotesController {

	@Autowired
	private NotesService notesService;
	
	@GetMapping("/{userId}/notes")
	public List<Note> getAllNotes(@PathVariable String username) {
		return notesService.findAll();
	}
	
	@GetMapping("/{userId}/note/{id}")
	public Note getNote(@PathVariable String username, @PathVariable long id) {
		return notesService.findById(id);
	}
	
	@PutMapping("{userId}/note/{id}")
	public ResponseEntity<Note> updateNote(@PathVariable int userId, @PathVariable long id,
			@RequestBody Note note) {
		Note noteUpdated = notesService.save(note, userId);
		return new ResponseEntity<Note>(noteUpdated, HttpStatus.OK);
	}
	
	@PostMapping("{userId}/notes")
	public ResponseEntity<Void> createNote(@PathVariable int userId, @RequestBody Note note) {
		Note createdNote = notesService.save(note, userId);
		//send response status
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdNote.getId())
				.toUri();
		return ResponseEntity.created(uri).build();
	}
	
	@DeleteMapping("/{userId}/note/{id}")
	public ResponseEntity<Void> deleteNote(@PathVariable String username, @PathVariable long id) {
		Note note = notesService.deleteById(id);
		
		if (note != null) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}
}
