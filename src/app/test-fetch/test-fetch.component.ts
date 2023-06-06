import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable, from, of } from 'rxjs';
import { switchMap, map, startWith } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-test-fetch',
  templateUrl: './test-fetch.component.html',
  styleUrls: ['./test-fetch.component.css'],
})
export class TestFetchComponent implements OnInit {
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
  description: any;
  userId: string;

  constructor(private http: HttpClient, private firestore: AngularFirestore) {
    this.getAccessToken();
    this.searchResults$ = this.searchCtrl.valueChanges.pipe(
      startWith(''),
      switchMap((term) => this.search(term))
    );
  }

  ngOnInit() {
    this.searchResults$ = this.searchCtrl.valueChanges.pipe(
      startWith(''),
      switchMap((term) => this.search(term))
    );

    this.userId = localStorage.getItem('userId');
    this.retrieveAnthems();
  }

  getAccessToken() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(this.clientId + ':' + this.clientSecret),
    });

    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');

    this.http
      .post('https://accounts.spotify.com/api/token', body.toString(), {
        headers: headers,
      })
      .subscribe((response: any) => {
        this.accessToken = response.access_token;
      });
  }

  search(term: string): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.accessToken,
    });

    if (term) {
      return this.http
        .get(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(
            term
          )}&type=track&limit=5`,
          { headers: headers }
        )
        .pipe(map((response: any) => response.tracks.items));
    } else {
      return of([]);
    }
  }

  fetchSongDetails(song: any) {
    this.artist = song.artists[0].name;
    this.songName = song.name;
    this.albumCover = song.album.images.find(
      (img: any) => img.width === 300
    ).url;
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
      songName: this.songName,
      description: this.description,
    };

    const anthem = {
      songId: '',
      userId: this.userId,
      description: this.description,
    };

    this.firestore
      .collection('songs')
      .add(song)
      .then((songRef) => {
        const songId = songRef.id;
        anthem.songId = songId;

        this.firestore
          .collection('anthems')
          .add(anthem)
          .then(() => {
            this.songs = [song, ...this.songs];
            console.log(this.songs);
            this.description = '';
          })
          .catch((error) => {
            console.error('Error creating anthem:', error);
          });
      })
      .catch((error) => {
        console.error('Error creating song:', error);
      });
  }

  retrieveAnthems() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found');
      return;
    }

    this.firestore
      .collection('anthems', (ref) => ref.where('userId', '==', userId))
      .snapshotChanges()
      .pipe(
        switchMap((snaps) =>
          from(
            Promise.all(
              snaps.map(async (snap) => {
                const anthem: any = snap.payload.doc.data();
                const id = snap.payload.doc.id;
                const songId = anthem.songId;

                if (!songId) {
                  return null;
                }

                const songSnap = await this.firestore
                  .collection('songs')
                  .doc(songId)
                  .get()
                  .toPromise();
                const songData = songSnap.data();

                if (!songData) {
                  return null;
                }

                const mergedAnthem = Object.assign({}, anthem, { songData });
                return { id, ...mergedAnthem };
              })
            )
          )
        )
      )
      .subscribe((songs) => {
        this.songs = songs
          .filter((song) => song !== null)
          .map((song) => ({
            artist: song.songData.artist,
            albumCover: song.songData.albumCover,
            songName: song.songData.songName,
            description: song.description,
          }));
      });
  }
}
