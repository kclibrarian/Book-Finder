import React, { useState } from "react";
import Modal from "./Modal";

export interface Book {
  key?: string;
  title: string;
  author_name: string;
  first_publish_year: string;
  publisher: string;
  isbn: string;
  cover: string;
}
const Snippet = (book: Book): JSX.Element =>  {
  const [modalActive, setModalActive] = useState(false);

  return (
    <div>
      <div className="snippet" onClick={() => setModalActive(true)}>
        <div className="snippet__title">
          <p className="snippet__book-title">{book.title}</p>
          <p className="snippet__book-author">{book.author_name}</p>
        </div>
        <div className="snippet__cover">
          <img
            className="snippet__image"
            src={book.cover}
            alt="no cover available"
          />
        </div>
      </div>
      <Modal
        active={modalActive}
        setActive={setModalActive}
        title={book.title}
        author={book.author_name}
        firstPublished={book.first_publish_year}
        publisher={book.publisher}
        isbn={book.isbn}
        cover={book.cover}
      />
    </div>
  );
}

export default Snippet;