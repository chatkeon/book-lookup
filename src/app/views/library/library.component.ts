import { Component } from '@angular/core';

import { LibraryService } from '../../services/library.service';

import { Book } from '../../models/book.model';
import { Library } from '../../models/library.model';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {
  constructor(private libraryService: LibraryService) {
    this.libraryService.getLibrary('testcode').subscribe({
      next: (library: Library) => {
        console.log('Successfully retrieved library!');
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
}
