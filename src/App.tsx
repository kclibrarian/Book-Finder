import "./App.css";
import { Button, FormGroup, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from 'react';
import Snippet, { Book } from "./Component/Snippet";

export function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isbnInput, setIsbnInput] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([])


    // fetch
    const apiUrl = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbnInput}&jscmd=details&format=json`
  
    useEffect(() => {
      let controller = new AbortController()

      async function fetchApi() {
        try {
            const response = await fetch(apiUrl, {
                signal: controller.signal,
            })
            const data = await response.json()
            setBooks(data.docs)
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('fetch cancel: caught abort')
            } else {
                throw error
            }
        }
    }

        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        // (error) => {
        //   setIsLoaded(true);
        //   setError(error);
        //   console.log(error);
        // }
  }, []);

  function handleSubmit(event) {
    setIsbnInput(isbnInput)
    event.preventDefault();
    fetch(
          `https://openlibrary.org/api/books?bibkeys=ISBN:${isbnInput}&jscmd=details&format=json`
        )
          .then((res) => {res.json();
            console.log(res.json());
            })
          .then(
            (result) => {
              setIsLoaded(true);
              console.log(result);
            },
    
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              setIsLoaded(true);
              setError(error);
              console.log(error);
            }
          );
    console.log( 'ISBN:', isbnInput); 
}
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h1">Book Finder</Typography>
        <FormGroup onSubmit={handleSubmit} >
        <TextField
          sx={{ backgroundColor: "white" }}
          value={isbnInput}
          onChange={(event) => {
            setIsbnInput(event.target.value);
          }}
        />
        <Typography>{isbnInput}</Typography>
        <Button type="submit" size="large">
                        Submit
         </Button>
         </FormGroup>
      </header>
      if (books) && (
      {books.slice(0).map((book) => {
                return (
                    <Snippet
                        key={book.key}
                        title={book.title ? book.title : 'unknown'}
                        author_name={
                            book.author_name ? book.author_name[0] : 'unknown'
                        }
                        first_publish_year={
                            book.first_publish_year
                                ? book.first_publish_year
                                : 'unknown'
                        }
                        publisher={
                            book.publisher ? book.publisher[0] : 'unknown'
                        }
                        isbn={book.isbn ? book.isbn[0] : 'unknown'}
                        cover={
                            book.isbn
                                ? 'http://covers.openlibrary.org/b/isbn/' +
                                  book.isbn[0] +
                                  '-M.jpg'
                                : ''
                        }
                    />
                )
            })}
      )
    </div>
  );
}

export default App;
