import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Note } from 'src/app/models/note';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {

  note: Note;
  id: string;

  constructor(private noteService: NotesService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.note = this.noteService.getNote(this.id);
    });
  }

  onEdit(){
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  onDelete(){
    this.noteService.deleteNote(this.note);
    this.router.navigate(['/'], { relativeTo: this.route });
  }

}
