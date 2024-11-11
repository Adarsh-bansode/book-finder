import * as React from 'react';
import '../App.css'
import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Link from '@mui/material/Link';
import AdvanceSearch from './AdvanceSearch';
import useFetch from '../utils/useFetch';


const BookSearch = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [language, setLanguage] = useState('');
    const [publisher, setPublisher] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [type, setType] = useState('');
    const [advanceSearch, setAdvanceSearch] = useState(false);
    const [searchUrl, setSearchUrl] = useState('');

    // Fetch data based on the dynamically updated URL
    const { data, loading } = useFetch(searchUrl);

    // Update URL and trigger fetch when Search is clicked
    const handleSearch = () => {
        console.log('data is', data)
        let url = 'https://openlibrary.org/search.json?';
        if (title) url += `title=${title}&`;
        if (author) url += `author=${author}&`;
        if (isbn) url += `isbn=${isbn}&`;
        if (language) url += `language=${language}&`;
        if (advanceSearch) {
            if (publisher) url += `publisher=${publisher}&`;
            if (publishYear) url += `publish_year=${publishYear}&`;
            if (type) url += `type=${type}&`;
        }

        setSearchUrl(url);
    };

    return (
        <div>
            <h3>Book Search</h3>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', minWidth: 275 }}>
                <Card variant="outlined">
                    <CardContent>
                    <div className='container'>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14, padding: 1 }}>
                            <TextField
                                label="Author Name"
                                variant="outlined"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </Typography>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14, padding: 1 }}>
                            <TextField
                                label="Title"
                                variant="outlined"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Typography>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14, padding: 1 }}>
                            <TextField
                                label="ISBN"
                                variant="outlined"
                                value={isbn}
                                onChange={(e) => setIsbn(e.target.value)}
                            />
                        </Typography>
                        </div>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14, padding: 1 }}>
                        <FormControl fullWidth>
                            <InputLabel>Language</InputLabel>
                            <Select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            >
                                <MenuItem value="eng">English</MenuItem>
                                <MenuItem value="fre">French</MenuItem>
                                <MenuItem value="hin">Hindi</MenuItem>
                            </Select>
                        </FormControl>
                        </Typography>

                    </CardContent>
                    {advanceSearch && (
                        <AdvanceSearch
                            publisher={publisher}
                            setPublisher={setPublisher}
                            publishYear={publishYear}
                            setPublishYear={setPublishYear}
                            type={type}
                            setType={setType}
                        />
                    )}
                    <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" onClick={handleSearch}>Search</Button>
                        <Button variant="outlined" onClick={() => { setTitle(''); setAuthor(''); setIsbn(''); setLanguage(''); }}>Clear</Button>
                    </CardActions>
                    <div style={{marginBottom: 10}} onClick={() => setAdvanceSearch(!advanceSearch)}>
                        <Link style={{ cursor: 'pointer' }}>Advance Search</Link>
                    </div>

                </Card>
            </Box>

            {/* Display search results */}
            {loading && <p>Loading...</p>}
            
            {data && (
                <div>
                    <h3>Results:</h3>
                    {data.numFound === 0 ? <div>Book not found please search again...</div> : null}
                    {data.docs.map((book, index) => (
                        <div key={index}>
                            <h4>{book.title}</h4>
                            <p>Author: {book.author_name?.join(', ')}</p>
                            <p>ISBN: {book.isbn?.join(', ')}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BookSearch;