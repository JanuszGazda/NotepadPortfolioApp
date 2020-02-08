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

import com.fullstack.userAndRole.UserService;

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
public class NotesController {

	@Autowired
	private NotesService notesService;
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/{username}/notes")
	public List<Note> getAllNotes(@PathVariable String username) {
		return userService.getAllUserNotes(username);
	}
	
	@GetMapping("/{username}/note/{id}")
	public Note getNote(@PathVariable String username, @PathVariable long id) {
		return notesService.findById(id);
	}
	
	@PutMapping("{userName}/note/{id}")
	public ResponseEntity<Note> updateNote(@PathVariable String userName, @PathVariable long id,
			@RequestBody Note note) {
		Note noteUpdated = notesService.save(note, userName);
		return new ResponseEntity<Note>(noteUpdated, HttpStatus.OK);
	}
	
	@PostMapping("{username}/notes")
	public ResponseEntity<Void> createNote(@PathVariable String userName, @RequestBody Note note) {
		Note createdNote = notesService.save(note, userName);
		//send response status
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdNote.getId())
				.toUri();
		return ResponseEntity.created(uri).build();
	}
	
	@DeleteMapping("/{username}/note/{id}")
	public ResponseEntity<Void> deleteNote(@PathVariable String username, @PathVariable long id) {
		Note note = notesService.deleteById(id);
		
		if (note != null) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}
}
