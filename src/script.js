const Container = document.querySelector('.container');
const addBtn = document.querySelector('#btn');
export class ObjectBook {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.removeButton = [];
    this.booksList = [];
  }

  createElement(list) {
    let books = '';
    list.forEach((div) => {
      books += `<article class="display-div">
      <h3>'${div.titleBook}' by ${div.authorBook}</h3>
      <button class="rmBtn">Remove</button>
      </article>`;
    });

    Container.innerHTML = books;
    this.removeButton = document.querySelectorAll('button.rmBtn');
    this.removeButton.forEach((btn, index) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.removeBook(index);
      });
    });
  }

  removeBook(id) {
    this.booksList = JSON.parse(localStorage.getItem('storageFormData'));
    const filteredArray = this.booksList.filter((book) => this.booksList.indexOf(book) !== id);
    localStorage.setItem('storageFormData', JSON.stringify(filteredArray));
    this.createElement(filteredArray);
  }

  addBook() {
    addBtn.addEventListener('click', (e) => {
      if (this.author.value === '' || this.title.value === '') return;
      e.preventDefault();
      const localStorageObject = {
        authorBook: this.author.value,
        titleBook: this.title.value,
      };
      const listBooks = JSON.parse(localStorage.getItem('storageFormData')) || [];
      listBooks.push(localStorageObject);
      localStorage.setItem('storageFormData', JSON.stringify(listBooks));
      this.createElement(listBooks);
      const message = document.querySelector('#message');
      message.innerHTML = `Book "${this.title.value}" added succesfully`;
      this.author.value = '';
      this.title.value = '';
    });
  }

  onPageLoad() {
    if (this.booksList.length === 0) {
      if (JSON.parse(localStorage.getItem('storageFormData'))) {
        this.booksList = JSON.parse(localStorage.getItem('storageFormData'));
        this.createElement(this.booksList);
      }
    }
  }
}
