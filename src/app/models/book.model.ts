declare interface LinkObj {
  name: string;
  url: string;
}

export class Book {
  isbn: string;
  lccn: string = '';
  title: string = '';
  author: string = '';
  dewey: string = '';
  loc: string = '';
  subjects: string = '';

  constructor(isbn: string, bookData?: any) {
    this.isbn = isbn;

    if (bookData) {
      this.title = bookData.title;

      if (bookData.authors && bookData.authors.length > 0) {
        this.author = bookData.authors.map((author: LinkObj) => author.name).join(', ');
      }

      if (bookData.subjects && bookData.subjects.length > 0) {
        this.subjects = bookData.subjects.map((subject: LinkObj) => subject.name).join(', ');
      }

      const identifierData = bookData.identifiers;
      if (identifierData.lccn && identifierData.lccn.length > 0) {
        this.lccn = identifierData.lccn[0];
      }

      const classificationData = bookData.classifications;
      if (classificationData.dewey && classificationData.dewey.length > 0) {
        this.dewey = classificationData.dewey.join(', ');
      }
      if (classificationData.lc_classifications && classificationData.lc_classifications.length > 0) {
        this.loc = classificationData.lc_classifications.join(', ');
      }
    }
  }
}
