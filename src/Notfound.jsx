// NotFound.jsx
import React from 'react';
import '@dotlottie/player-component';

const NotFound = () => {
    return (
        <div className="welcome-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <dotlottie-player
                src="https://lottie.host/1da4b5f1-ad27-4dd7-ac6b-e3b78a8c2948/15oa7MuoG4.lottie"
                background="transparent"
                speed="1"
                style={{ width: '300px', height: '300px' }}
                loop
                autoplay>
            </dotlottie-player>
            <h1>Page Not Found</h1>
        </div>
    );
};

export default NotFound;
