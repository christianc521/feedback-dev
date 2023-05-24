import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { switchMap, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-test-fetch',
  templateUrl: './test-fetch.component.html',
  styleUrls: ['./test-fetch.component.css']
})
export class TestFetchComponent implements OnInit{
  searchCtrl = new FormControl();
  searchResults$: Observable<any[]>;
  details: string = '';
  artist: string = '';
  songName: string = '';
  albumCover: string = '';
  searchTerm: string = '';
  accessToken: string = '';
  songs: any[] = [];
  clientId = '2ee3e6910a654dac86de2886c9aecde1';
  clientSecret = '78e8b2b04c1e458487260a6063202577';

  constructor(private http: HttpClient) {
    this.getAccessToken();
    this.searchResults$ = this.searchCtrl.valueChanges
      .pipe(
        startWith(''),
        switchMap(term => this.search(term))
      );
  }

  ngOnInit() {
    this.searchResults$ = this.searchCtrl.valueChanges
      .pipe(
        startWith(''),
        switchMap(term => this.search(term))
      );
  }


  getAccessToken() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
    });

    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');

    this.http.post('https://accounts.spotify.com/api/token', body.toString(), { headers: headers }).subscribe((response: any) => {
      this.accessToken = response.access_token;
    });
  }


  
  search(term: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.accessToken
    });

    if (term) {
      return this.http.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(term)}&type=track&limit=5`, { headers: headers })
        .pipe(
          map((response: any) => response.tracks.items)
        );
    } else {
      return of([]);
    }
  }

  fetchSongDetails(song: any) {
    this.artist = song.artists[0].name;
    this.songName = song.name
    this.albumCover = song.album.images.find((img: any) => img.width === 300).url;
  }
  
  displayFn(song: any): string {
    return song && song.name ? `${song.name} by ${song.artists[0].name}` : '';
  }

  trackBySongTitle(index: number, song: any): string {
    return song.songName;
  }

  addSongToList() {
    const song = {
      artist: this.artist,
      albumCover: this.albumCover,
      songName: this.songName
    };
    // We're using the spread operator to create a new array. 
    // This ensures that Angular's change detection will recognize the change and update the view.
    // This will change once Firestore is implemented
    this.songs = [song, ...this.songs];
    console.log(this.songs);
  }
}
