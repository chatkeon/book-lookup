import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Quagga from '@ericblade/quagga2';

import { BookService } from '../../services/book.service';
import { LibraryService } from '../../services/library.service';
import { StateService } from '../../services/state.service';

import { Book } from '../../models/book.model';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.css']
})
export class LookupComponent {
  isLibraryLoaded: boolean = false;
  isbnNumber: string = '';
  showResults: boolean = false;
  book: Book | undefined;
  viewMoreUrl: string = '';
  errorMessage: string = '';

  constructor(private stateService: StateService, private bookService: BookService,
      private libraryService: LibraryService, public snackBar: MatSnackBar) {
    this.isLibraryLoaded = this.stateService.isLibraryLoaded();
  }

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

  addToLibrary() {
    this.libraryService.addBook(this.book!).subscribe({
      next: () => {
        this.snackBar.open(`"${this.book!.title}" added to library`, 'OK', {
          duration: 5000
        });
      },
      error: (error: any) => {
        console.error(error);
        this.snackBar.open('An error occurred. Unable to add to library', 'OK', {
          duration: 5000
        });
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
