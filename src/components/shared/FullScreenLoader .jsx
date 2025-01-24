
import React from 'react';
import styled from 'styled-components';

const FullScreenLoader = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 9999;
    text-align: center;

    .loader-text {
        font-size: 1.5rem;
        color: #1a73e8;
    }

    .spinner {
        margin-top: 1rem;
        border: 5px solid rgba(0, 0, 0, 0.1);
        border-top: 5px solid #1a73e8;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

const Loader = () => (
    <FullScreenLoader>
        <div>
            <div className="loader-text">Scovers is finding the most suitable school for you</div>
            <div className="spinner"></div>
        </div>
    </FullScreenLoader>
);

export default Loader;
