import React, {useState, useEffect} from 'react';
import {api} from './api';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Router from './Router';
// import { DatePicker } from 'antd';

const App = () => {
    const [successText, setSuccessText] = useState(null);

    useEffect(() => {
        api.get('/test')
            .then(({data}) => setSuccessText(data))
            .catch(err => console.error(err));
    });

    return (
        // <Router/>
        <div>
            <h2>Electron is running! sss</h2>
            <p>Fetched api response from server: {successText}</p>
            {/* <DatePicker /> */}
            <Button variant="text">Text</Button>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
            <TextField/>
            <p>Fetched api response from server: {successText}</p>
        </div>
    );
};

export default App;