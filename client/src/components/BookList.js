import React, {useState} from "react";
import {useMutation, useQuery} from '@apollo/client';
import {deleteBookMutation, getBooksQuery} from "../queries/queries";
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import BookDetails from "./BookDeails";

const BookList = () => {

    const {loading, error, data} = useQuery(getBooksQuery);
    const [deleteBook] = useMutation(deleteBookMutation);
    const [selectedBook, setSelectedBook] = useState(null);

    const deleteMovie = (id) => {
        deleteBook({
            variables: {
                bookId: id,
            },
            refetchQueries: [{query: getBooksQuery}]
        })
            .then(() => {
                console.log('deleted!')
            });
    };

    return (
        <div>
            {
                loading
                    ?
                    <span>Loading...</span>
                    :
                    <ul id="book-list">
                        {
                            !error && data.books.map(
                                book => <li
                                    id={book.id}
                                    onClick={(e) => {
                                        setSelectedBook(book.id)
                                    }}
                                    key={book.id}>
                                    {book.name}
                                    <IconButton aria-label="delete"
                                        onClick={
                                            () => deleteMovie(book.id)
                                        }
                                        >
                                        <DeleteForeverIcon/>
                                    </IconButton>
                                </li>
                            )
                        }
                    </ul>
            }
            <BookDetails bookId={selectedBook}/>
        </div>
    )
};

export default BookList;