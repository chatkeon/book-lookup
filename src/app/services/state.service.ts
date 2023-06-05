import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private libraryCode: string = '';

  constructor() { }

  setLibraryCode(code: string) {
    this.libraryCode = code;
  }

  getLibraryCode(): string {
    return this.libraryCode;
  }

  isLibraryLoaded(): boolean {
    return !!this.libraryCode;
  }
}
