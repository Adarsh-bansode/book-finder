import React from 'react';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';

const AdvanceSearch = ({ publisher, setPublisher, publishYear, setPublishYear, type, setType }) => {
    return (
        <div className='container'>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14, padding: 1 }}>
                <TextField
                    label="Publisher"
                    variant="outlined"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                />
            </Typography>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14, padding: 1 }}>
                <TextField
                    label="Publish Year"
                    variant="outlined"
                    value={publishYear}
                    onChange={(e) => setPublishYear(e.target.value)}
                />
            </Typography>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14, padding: 1 }}>
                <TextField
                    label="Type"
                    variant="outlined"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />
            </Typography>
        </div>
    );
};

export default AdvanceSearch;
