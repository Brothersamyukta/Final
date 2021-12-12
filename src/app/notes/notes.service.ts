import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private notes: Note[] =[]
  public notesChangedEvent = new Subject<Note[]>();

  constructor(private http: HttpClient) { }

  getNote(id:string){
    return this.notes.find(note => note._id == id)
  }

  send(){
    this.notesChangedEvent.next(this.notes.slice())
  }
  getNotes(){
    this.http.get('http://localhost:3000/notes').subscribe(
    (response:any) => {
      console.log(response.notes)
      this.notes = response.notes
      this.send()
    }, (error:any)=> {
      console.log(error)
    }
    )
  }
  
  addNotes(note: Note){
    if(!note){
      return 
    }
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    this.http.post<{ message: string; note: Note }>('http://localhost:3000/notes', note, {headers:headers})
    .subscribe(response=> {
      // this.notes.push(response?.note)
      this.notes.push(response.note)
      this.send();
    })
  }
  updateNotes(originalNote: Note, newNote: Note){
    if(!originalNote || !newNote){
      return
    }

    const pos = this.notes.findIndex(note=> note._id == originalNote._id);

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http
      .put('http://localhost:3000/notes/'+originalNote._id,newNote, {headers: headers} )
      .subscribe(response => {
        this.notes[pos] = newNote;
        this.send();
      })

  }

  deleteNote(note:Note){
    if(!note){
      return 
    }
    const pos = this.notes.findIndex(n=> n._id === note._id)

    if(pos < 0){
      return;
    }

    this.http
      .delete('http://localhost:3000/notes/'+ note._id)
      .subscribe(response=> {
        this.notes.splice(pos,1);
        this.send()
      })
  }


}
