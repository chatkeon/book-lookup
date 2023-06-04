import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Library } from '../models/library.model';

declare const S3_URL: string;

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  constructor(private http: HttpClient) { }

  getLibrary(code: string) {
    console.log(`Looking up library ${code}...`);

    const libraryUrl = `${S3_URL}/${code}/library.json`;
    return this.http.get<Library>(libraryUrl).pipe(map((library: Library) => {
      console.log(library);

      return library;
    }));
  }
}
