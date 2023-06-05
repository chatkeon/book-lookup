import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Book } from '../models/book.model';
import { Library } from '../models/library.model';

declare const S3_URL: string;

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private code!: string;
  private library!: Library;

  constructor(private http: HttpClient) { }

  getLibrary(code: string) {
    this.code = code;
    console.log(`Looking up library ${code}...`);

    const libraryUrl = `${S3_URL}/${code}/library.json`;
    return this.http.get<Library>(libraryUrl).pipe(map((library: Library) => {
      console.log(library);
      this.library = library;
      return this.library;
    }));
  }

  addBook(book: Book) {
    this.library.books.push(book);
    return this.updateLibrary();
  }

  private updateLibrary() {
    const formData = new FormData();
    formData.append('key', `${this.code}/library.json`);
    formData.append('file', JSON.stringify(this.library));
    return this.http.post(`${S3_URL}`, formData);
  }
}
