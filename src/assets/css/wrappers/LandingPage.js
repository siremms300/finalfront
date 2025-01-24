// import styled from "styled-components";

// export const Wrapper = styled.section`
//     background: linear-gradient(135deg, #6a11cb, #2575fc);
//     padding: 2rem 1rem;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     min-height: calc(100vh - 80px); /* Adjust based on navbar height */
//     font-family: 'Poppins', sans-serif;

//     .hero-content {
//         max-width: 1200px;
//         width: 100%;
//         display: flex;
//         align-items: center;
//         justify-content: space-between;
//         gap: 2rem;
//         color: white;

//         @media (max-width: 768px) {
//             flex-direction: column;
//             text-align: center;
//         }
//     }

//     .text-content {
//         max-width: 600px;

//         h1 {
//             font-size: calc(24px + 2vw);
//             font-weight: 700;
//             margin-bottom: 1.5rem;
//             line-height: 1.2;

//             .fancy {
//                 color: #ffd700; /* Gold color for emphasis */
//             }
//         }

//         p {
//             font-size: calc(14px + 0.5vw);
//             line-height: 1.6;
//             opacity: 0.9;
//             margin-bottom: 2rem;
//         }

//         .btn-grp {
//             display: flex;
//             gap: 1rem;

//             .btn {
//                 padding: 0.75rem 1.5rem;
//                 background: #ffd700;
//                 color: #333;
//                 text-decoration: none;
//                 border-radius: 8px;
//                 font-weight: 600;
//                 transition: transform 0.2s, box-shadow 0.2s;

//                 &:hover {
//                     transform: translateY(-2px);
//                     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//                 }
//             }
//         }
//     }

//     .placeholder {
//         max-width: 500px;
//         width: 100%;

//         img {
//             width: 100%;
//             height: auto;
//             border-radius: 12px;
//             box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//         }

//         @media (max-width: 768px) {
//             margin-top: 2rem;
//         }
//     }
// `;











import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* min-height: 100vh; */
    width: 100%;
    max-width: 1250px;
    margin: 0 auto;
    padding: calc(1.5rem + 1.5vh) calc(1.2rem + 1.75vw);

    .hero-content {
        width: 100%;
        display: grid;
        grid-template-columns: minmax(auto, 600px) minmax(auto, 450px);
        justify-content: space-between;
        align-items: center;
    }

    h1 {
        font-size: calc(1.2rem + 1.75vw);
        font-weight: 700;
        letter-spacing: 1.5px;
    }
    h1 .fancy {
        color: var(--color-primary);
    }
    p {
        font-size: calc(0.8rem + 0.2vw);
        font-weight: 300;
        line-height: 24px;
        text-align: justify;
        margin-top: 2rem;
        margin-bottom: 2.2rem;
    }
    .btn-grp {
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;
        gap: 1rem;
    }

    .btn {
        text-decoration: none;
        text-transform: capitalize;
        font-weight: 400;
        font-size: calc(1rem + 0.2vw);
        color: var(--color-white);
        background-color: var(--color-primary);
        border: 1px solid var(--color-primary);
        padding: calc(5px + 0.15vw) calc(15px + 0.3vw);
        border-radius: 6px;
        transition: all 0.3s ease-in;
    }
    .btn:hover {
        background-color: var(--color-secondary);
        box-shadow: var(--shadow-1);
    }
    .placeholder {
        display: flex;
        justify-content: end;
    }
    .placeholder img {
        width: 100%;
        object-fit: cover;
    }

    @media screen and (max-width: 768px) {
        .hero-content {
            display: flex;
            flex-direction: column-reverse;
        }
        .text-content {
            margin-top: 1.75rem;
        }
        .placeholder {
            justify-content: center;
        }
        .placeholder img {
            width: 100%;
            max-width: 400px;
            object-fit: cover;
        }
        p {
            margin-top: 1.5rem;
            margin-bottom: 2.2rem;
        }
    }
`;

export default Wrapper;


 
