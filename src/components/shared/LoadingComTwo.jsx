
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const LoadingComTwo = ({ onLoadingComplete }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            if (onLoadingComplete) {
                onLoadingComplete(); // Trigger callback after loading is complete
            }

        }, 6000); // 5 second delay
 

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

export default LoadingComTwo;






















// import React, { useEffect, useState } from "react";
// import styled from "styled-components";

// const LoadingComTwo = ({ onLoadingComplete }) => {
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setLoading(false);
//             if (onLoadingComplete) {
//                 onLoadingComplete(); // Trigger callback after loading is complete
//             }

//         }, 6000); // 5 second delay
 

//         return () => clearTimeout(timer); // Clean up on unmount
//     }, [onLoadingComplete]);

//     if (!loading) return null; // Hide component when loading is complete

//     return (
//         <Wrapper>
//             <div className="progress-bar-container">
//                 <p className="progress-text">Recommending...</p>
//                 <div className="progress-bar">
//                     <div className="progress-bar-fill"></div>
//                 </div>
//             </div>
//         </Wrapper>
//     );
// };

// const Wrapper = styled.div`
//     .progress-bar-container {
//         display: flex;
//         flex-direction: column;
//         align-items: center;
//         justify-content: center;
//         margin-top: 2rem;
//     }

//     .progress-text {
//         font-size: 1.5rem;
//         color: #1e3a8a; /* Tailwind's blue-800 */
//         font-weight: bold;
//         margin-bottom: 1rem;
//     }

//     .progress-bar {
//         width: 80%;
//         height: 8px;
//         background-color: #cbd5e1; /* Tailwind's blue-300 */
//         border-radius: 5px;
//         overflow: hidden;
//         position: relative;
//     }

//     .progress-bar-fill {
//         width: 100%;
//         height: 100%;
//         background-color: #1e3a8a; /* Tailwind's blue-800 */
//         border-radius: 5px;
//         animation: progress 1s linear forwards;
//     }

//     @keyframes progress {
//         from {
//             width: 0;
//         }
//         to {
//             width: 100%;
//         }
//     }
// `;

// export default LoadingComTwo;




















// import React from "react";
// import styled from "styled-components";

// const LoadingComTwo = () => {
//     return (
//         <Wrapper>
//             <div className="spinner-container">
//                 <div className="dot-spinner">
//                     <div className="dot-spinner__dot"></div>
//                     <div className="dot-spinner__dot"></div>
//                     <div className="dot-spinner__dot"></div>
//                     <div className="dot-spinner__dot"></div>
//                     <div className="dot-spinner__dot"></div>
//                     <div className="dot-spinner__dot"></div>
//                     <div className="dot-spinner__dot"></div>
//                     <div className="dot-spinner__dot"></div>
//                 </div>
//             </div>
//         </Wrapper>
//     );
// };

// const Wrapper = styled.div`
//     .spinner-container {
//         display: grid;
//         place-items: center;
//     }
//     .dot-spinner {
//         --uib-size: 2.8rem;
//         --uib-speed: 0.9s;
//         --uib-color: var(--color-secondary);
//         position: relative;
//         display: flex;
//         align-items: center;
//         justify-content: flex-start;
//         height: var(--uib-size);
//         width: var(--uib-size);
//     }

//     .dot-spinner__dot {
//         position: absolute;
//         top: 0;
//         left: 0;
//         display: flex;
//         align-items: center;
//         justify-content: flex-start;
//         height: 100%;
//         width: 100%;
//     }

//     .dot-spinner__dot::before {
//         content: "";
//         height: 20%;
//         width: 20%;
//         border-radius: 50%;
//         background-color: var(--uib-color);
//         transform: scale(0);
//         opacity: 0.5;
//         animation: pulse0112 calc(var(--uib-speed) * 1.111) ease-in-out infinite;
//         box-shadow: 0 0 20px rgba(18, 31, 53, 0.3);
//     }

//     .dot-spinner__dot:nth-child(2) {
//         transform: rotate(45deg);
//     }

//     .dot-spinner__dot:nth-child(2)::before {
//         animation-delay: calc(var(--uib-speed) * -0.875);
//     }

//     .dot-spinner__dot:nth-child(3) {
//         transform: rotate(90deg);
//     }

//     .dot-spinner__dot:nth-child(3)::before {
//         animation-delay: calc(var(--uib-speed) * -0.75);
//     }

//     .dot-spinner__dot:nth-child(4) {
//         transform: rotate(135deg);
//     }

//     .dot-spinner__dot:nth-child(4)::before {
//         animation-delay: calc(var(--uib-speed) * -0.625);
//     }

//     .dot-spinner__dot:nth-child(5) {
//         transform: rotate(180deg);
//     }

//     .dot-spinner__dot:nth-child(5)::before {
//         animation-delay: calc(var(--uib-speed) * -0.5);
//     }

//     .dot-spinner__dot:nth-child(6) {
//         transform: rotate(225deg);
//     }

//     .dot-spinner__dot:nth-child(6)::before {
//         animation-delay: calc(var(--uib-speed) * -0.375);
//     }

//     .dot-spinner__dot:nth-child(7) {
//         transform: rotate(270deg);
//     }

//     .dot-spinner__dot:nth-child(7)::before {
//         animation-delay: calc(var(--uib-speed) * -0.25);
//     }

//     .dot-spinner__dot:nth-child(8) {
//         transform: rotate(315deg);
//     }

//     .dot-spinner__dot:nth-child(8)::before {
//         animation-delay: calc(var(--uib-speed) * -0.125);
//     }

//     @keyframes pulse0112 {
//         0%,
//         100% {
//             transform: scale(0);
//             opacity: 0.5;
//         }

//         50% {
//             transform: scale(1);
//             opacity: 1;
//         }
//     }
// `;

// export default LoadingComTwo;
