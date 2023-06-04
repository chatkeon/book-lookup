import { Book } from './book.model';

export class Library {
  name: string = '';
  books: Book[] = [];

  constructor(name: string, books: Book[]) {
    this.name = name;
    this.books = books;
  }
}
