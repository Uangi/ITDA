import React from 'react';
import './Loading.css'

const Loading = () => {
    return (
        <div className='overlay'>
            <div id='loader'>
                <div id='shadow'></div>
                <div id='box'></div>
            </div>
        </div>
    );
};

export default Loading;