import { Component, Input, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css']
})
export class NoteItemComponent implements OnInit {
   @Input() note: Note;
  constructor() { }

  ngOnInit(): void {
  }

}
