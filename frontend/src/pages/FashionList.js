import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SERVER_URL = 'http://localhost:8081/api/fashion';

function FashionList() {
    const [fashionList, setFashionList] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(SERVER_URL);
            setFashionList(response.data);
        } catch (error) {
            console.error('Error fetching fashion data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return fashionList;
}

export default FashionList;
