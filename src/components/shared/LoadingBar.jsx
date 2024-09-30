

import React, { useEffect, useState } from "react";
import styled from "styled-components";

const LoadingBar = ({ onLoadingComplete }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            if (onLoadingComplete) {
                onLoadingComplete(); // Trigger callback after loading is complete
            }
        }, 5000); // 5 second delay

        return () => clearTimeout(timer); // Clean up on unmount
    }, [onLoadingComplete]);

    if (!loading) return null; // Hide component when loading is complete

    return (
        <Wrapper>
            <div className="progress-bar-container">
                <p className="progress-text">Loading...</p>
                <div className="progress-bar">
                    <div className="progress-bar-fill"></div>
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    .progress-bar-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 2rem;
    }

    .progress-text {
        font-size: 1.5rem;
        color: #1e3a8a; /* Tailwind's blue-800 */
        font-weight: bold;
        margin-bottom: 1rem;
    }

    .progress-bar {
        width: 80%;
        height: 8px;
        background-color: #cbd5e1; /* Tailwind's blue-300 */
        border-radius: 5px;
        overflow: hidden;
        position: relative;
    }

    .progress-bar-fill {
        width: 100%;
        height: 100%;
        background-color: #1e3a8a; /* Tailwind's blue-800 */
        border-radius: 5px;
        animation: progress 1s linear forwards;
    }

    @keyframes progress {
        from {
            width: 0;
        }
        to {
            width: 100%;
        }
    }
`;

export default LoadingBar;







