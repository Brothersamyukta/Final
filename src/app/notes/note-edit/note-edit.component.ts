import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotesService } from '../notes.service';
import { Note } from './../../models/note'

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit {

  originalNote: Note;
  editMode: boolean = false;
  id_Note: string;
  note: Note;
  constructor(private noteService: NotesService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params)=> {
      this.id_Note = params['id'];
      this.originalNote = this.noteService.getNote(this.id_Note);
      if(!params['id']){
        this.editMode = false;
      }
      if(!this.originalNote){
        return 
      }
      this.editMode = true;
      this.note = JSON.parse(JSON.stringify(this.originalNote))

    })
  }

  onCancel(){
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit(form:NgForm){
    let value = form.value
    let newNote = new Note(
      null, value.title, value.description
    )
  

    if(this.editMode){
      let updatedNote = new Note(this.originalNote._id, value.title, value.description)
      this.noteService.updateNotes(this.originalNote, updatedNote);
    } else{
      this.noteService.addNotes(newNote);
    }
    this.onCancel();

  }




}
