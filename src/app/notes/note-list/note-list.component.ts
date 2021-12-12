import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Note } from 'src/app/models/note';
import { NotesService } from '../notes.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit, OnDestroy {
  notes: Note[]
  private noteChangedSubscription: Subscription
  constructor(private noteService: NotesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.noteService.getNotes();
    this.noteChangedSubscription = this.noteService.notesChangedEvent.subscribe(
      ((note: Note[]) => {
        this.notes = note
      })
    )
  }
  ngOnDestroy(){
    this.noteChangedSubscription.unsubscribe();
  }

  onNewNote(){
    this.router.navigate(['new'], {relativeTo: this.route})
  }

}
