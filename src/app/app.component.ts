import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  text = '';
  encoding = false;
  encodedText = '';

  private readonly apiUrl = 'https://localhost:5001/api/encode';

  constructor(private http: HttpClient) {}

  convert() {
    this.encoding = true;
    this.encodedText = '';

    this.http.post<string>(this.apiUrl, this.text, { responseType: 'text' as 'json' })
      .subscribe({
        next: (character: string) => {
          this.encodedText += character;
        },
        complete: () => {
          this.encoding = false;
        },
        error: (error: any) => {
          console.log(error);
          this.encoding = false;
        }
      });
  }

  cancel() {
    this.http.post<string>(`${this.apiUrl}/cancel`, {}).subscribe();
  }
}
