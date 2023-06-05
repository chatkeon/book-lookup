import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private isLibraryLoaded: boolean = false;

  currentYear: string = '';

  constructor(private router: Router, private stateService: StateService) {
    this.isLibraryLoaded = this.stateService.isLibraryLoaded();
    this.currentYear = new Date().getFullYear().toString();
  }

  navigateToLibrary() {
    this.router.navigateByUrl('/library');
  }
}
