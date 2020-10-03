import React from "react";
import {useQuery} from '@apollo/client';
import {getBookQuery} from "../queries/queries";

const BookDetails = ({bookId}) => {

    const {loading, error, data} = useQuery(getBookQuery, {
        variables: {
            id: bookId
        }
    });

    const displayBooksDetails = () => {
        const {book} = data;
        return(
            <div>
                <h2>Name: {book.name}</h2>
                <h3>Genre: {book.genre}</h3>
                <h3>Author: {book.author.name}</h3>
                <p>All books:</p>
                <ul className="other-books">
                    {
                        book.author.books.map(book=><li key={book.id}>{book.name}</li>)
                    }
                </ul>
            </div>
        )
    };

    return (
        <div id="book-details">
            {
                data === undefined || data.book === null
                    ?
                    <h2>Select book...</h2>
                    :
                    displayBooksDetails()
            }
        </div>
    )
};

export default BookDetails;