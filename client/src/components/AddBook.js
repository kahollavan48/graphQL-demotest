import React, {useState} from "react";
import {useMutation, useQuery} from '@apollo/client';
import {addBookMutation, getAuthorsQuery, getBooksQuery} from "../queries/queries";

const AddBook = () => {

    const [state,setState] = useState({
        name: '',
        genre: '',
        authorId: ''
    });

    const [addBook] = useMutation(addBookMutation);

    const {name,genre,authorId} = state;

    const {loading, error, data} = useQuery(getAuthorsQuery);

    const updateState = (e,key) => {
        setState({...state,[key]:e.target.value})
    };

    const submitForm = (e) => {
        e.preventDefault();
        addBook({
            variables: {
                name:name,
                genre:genre,
                authorId:authorId
            },
            refetchQueries: [{query: getBooksQuery}]
        }).then(()=>{
            setState({
                name: '',
                genre: '',
                authorId: ''
            });
        });
    };

    const validateForm = () => {
      if(name !== '' && genre !== '' && authorId !== '')  {
          return true;
      }else{
          return false;
      }
    };

    return (
        <div className="form" id="add-book">
            <div className="field">
                <label>Book name:</label>
                <input onChange={e => updateState(e,'name')} value={name} type="text"/>
            </div>
            <div className="field">
                <label>Genre:</label>
                <input onChange={e => updateState(e,'genre')} value={genre} type="text"/>
            </div>
            <div className="field">
                <label>Author:</label>
                {
                    loading
                        ?
                        <select>
                            <option>Loading...</option>
                        </select>
                        :
                        <select
                            onChange={e => updateState(e,'authorId')}
                            value={authorId}
                        >
                            <option>Select author</option>
                            {!error && data.authors.map(author => <option
                                key={author.id}
                                value={author.id}
                            >
                                {author.name}
                            </option>)}
                        </select>
                }

            </div>
            <button
                disabled={!validateForm()}
                onClick={e=>submitForm(e)}
            >
                +
            </button>

        </div>
    )
};

export default AddBook;