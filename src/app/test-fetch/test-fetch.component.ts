import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-test-fetch',
  templateUrl: './test-fetch.component.html',
  styleUrls: ['./test-fetch.component.css']
})
export class TestFetchComponent implements OnInit{
  details: string = '';
  artist: string = '';
  songName: string = '';
  albumCover: string = '';
  searchTerm: string = '';
  accessToken: string = '';
  clientId = '2ee3e6910a654dac86de2886c9aecde1';
  clientSecret = '78e8b2b04c1e458487260a6063202577';

  constructor(private http: HttpClient) {
    this.getAccessToken();
  }

  ngOnInit(): void {}

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


  fetchSongDetails(searchTerm: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.accessToken
    });

    this.http.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=track&limit=1`, { headers: headers }).subscribe((response: any) => {
      const track = response.tracks.items[0];
      this.artist = track.artists[0].name;
      this.songName = track.name
      this.albumCover = track.album.images.find((img: any) => img.width === 300).url;
    });
  }
}
