import { Component } from '@angular/core';
import Quagga from '@ericblade/quagga2';

import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.css']
})
export class LookupComponent {
  isbnNumber: string = '';
  showResults: boolean = false;
  book: Book | undefined;
  viewMoreUrl: string = '';
  errorMessage: string = '';

  constructor(private bookService: BookService) { }

  handleText(input: string) {
    this.startProcessing();
    this.isbnNumber = input;
    this.lookupBook(this.isbnNumber);
  }

  handleImage(event: Event) {
    this.startProcessing();

    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const URL = window.URL || window.webkitURL;
    const dataUrl = URL.createObjectURL(files[0]);
    Quagga.decodeSingle({
      decoder: {
        readers: [ 'ean_reader' ]
      },
      locate: true,
      src: dataUrl
    }, (result) => {
      if (result.codeResult) {
        this.isbnNumber = result.codeResult.code as string;
        console.log('Detected ISBN code: ' + this.isbnNumber);
        this.lookupBook(this.isbnNumber);
      } else {
        this.errorMessage = 'Unable to detect ISBN. Please double-check your input and try again.';
        this.showResults = true;
      }
    });
  }

  private startProcessing() {
    this.book = undefined;
    this.viewMoreUrl = '';
    this.errorMessage = '';
    this.showResults = false;
  }

  private lookupBook(isbn: string) {
    console.log(`Looking up ISBN ${isbn}...`);

    this.bookService.lookupIsbn(isbn).subscribe({
      next: (book: Book | undefined) => {
        if (book) {
          this.book = book;
          this.viewMoreUrl = `https://openlibrary.org/isbn/${isbn}`;
          this.showResults = true;
        } else {
          this.errorMessage = 'No results found. Please double-check your input and try again.';
          this.showResults = true;
        }
      },
      error: (error: any) => {
        console.error(error);
        this.errorMessage = 'An error occurred. Please double-check your input and try again.';
        this.showResults = true;
      }
    });
  }
}
