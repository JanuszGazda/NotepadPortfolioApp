package com.fullstack.note;

public class Note {

	private Long id;
	private String username;
	private String note;
	
	public Note(Long id, String username, String note) {
		this.id = id;
		this.username = username;
		this.note = note;
	}
	
	public Note() {
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	
}
