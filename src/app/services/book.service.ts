import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient) { }

  lookupIsbn(isbn: string) {
    console.log(`Looking up ISBN ${isbn}...`);

    const objectKey = `ISBN:${isbn}`;
    const lookupUrl = `https://openlibrary.org/api/books?bibkeys=${objectKey}&format=json&jscmd=data`;
    return this.http.get(lookupUrl).pipe(map((data: any) => {
      console.log(data);

      let book;
      if (data && Object.keys(data).length > 0) {
        book = new Book(isbn, data[ objectKey ]);
      }

      return book;
    }));
  }
}
