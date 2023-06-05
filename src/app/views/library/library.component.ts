import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LibraryService } from '../../services/library.service';
import { StateService } from '../../services/state.service';

import { Book } from '../../models/book.model';
import { Library } from '../../models/library.model';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {
  isLibraryLoaded: boolean = false;
  library?: Library;

  constructor(private stateService: StateService, private libraryService: LibraryService,
      public snackBar: MatSnackBar) {
    this.isLibraryLoaded = this.stateService.isLibraryLoaded();
  }

  loadLibrary(code: string) {
    this.libraryService.getLibrary(code).subscribe({
      next: (library: Library) => {
        this.stateService.setLibraryCode(code);
        this.isLibraryLoaded = true;
        this.library = library;
        this.showMessage(`${library.name} loaded`);
      },
      error: (error: any) => {
        console.error(error);
        if (error.status === 404) {
          this.showMessage(`No library found for code ${code}`);
        } else {
          this.showMessage('An error occurred. Unable to load library.');
        }
      }
    });
  }

  showMessage(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 5000
    });
  }
}
