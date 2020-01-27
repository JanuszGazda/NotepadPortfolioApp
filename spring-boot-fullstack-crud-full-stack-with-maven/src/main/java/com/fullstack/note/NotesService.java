package com.fullstack.note;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotesService {

	@Autowired
	NoteRepository noteRepository;
	
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
	
	public Note save(Note note, int userId) {
		//note.setUserId(userId);
		noteRepository.save(note);
		
		return note;
	}
	
	public List<Note> findAll() {
		return (List<Note>) noteRepository.findAll();
	}
}
