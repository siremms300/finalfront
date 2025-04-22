 



import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Logo from "../Logo";
import { useUserContext } from "../../context/UserContext";

const Navbar = ({ navbarRef }) => {
    const { user, logout } = useUserContext();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <Wrapper ref={navbarRef}>
            <div className="container">
                <Logo />
                <button className={`hamburger ${isSidebarOpen ? "open" : ""}`} onClick={toggleSidebar}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div className={`nav-links ${isSidebarOpen ? "open" : ""}`}>
                    <button className="close-btn" onClick={toggleSidebar}>
                        ✕
                    </button>
                    <NavLink className="nav-item" to="/about-us" onClick={toggleSidebar}>
                        About
                    </NavLink>
                    <NavLink className="nav-item" to="/all-schools" onClick={toggleSidebar}>
                        Courses
                    </NavLink>
                    {user ? (
                        <>
                            <NavLink className="nav-item" to="/dashboard" onClick={toggleSidebar}>
                                Dashboard
                            </NavLink>
                            <button
                                className="logout-btn"
                                onClick={() => {
                                    logout();
                                    toggleSidebar();
                                }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <NavLink className="nav-item" to="/login" onClick={toggleSidebar}>
                            <span className="login-btn">Login</span>
                        </NavLink>
                    )}
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    box-shadow: 0 5px 5px var(--shadow-light);
    padding: 1rem 0;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1000;

    .container {
        width: 100%;
        max-width: 1200px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
    }

    .hamburger {
        display: none;
        flex-direction: column;
        justify-content: space-between;
        width: 30px;
        height: 20px;
        background: none;
        border: none;
        cursor: pointer;
        z-index: 1001;
        padding: 0;
    }

    .hamburger span {
        width: 100%;
        height: 3px;
        background-color: var(--color-black);
        transition: all 0.3s ease;
    }

    .hamburger.open span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .hamburger.open span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.open span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }

    .nav-links {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .nav-item {
        font-size: 16px;
        font-weight: 500;
        text-transform: capitalize;
        margin-left: 20px;
        color: var(--color-black);
        text-decoration: none;
    }

    .nav-item.active {
        color: var(--color-primary);
    }

    .login-btn {
        background: #247bf7;
        color: white;
        padding: 8px 24px;
        border-radius: 4px;
        display: inline-block;
    }

    .logout-btn {
        background: #ff0000;
        color: white;
        padding: 8px 24px;
        border-radius: 4px;
        border: none;
        margin-left: 20px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 500;
        text-transform: capitalize;
    }

    .close-btn {
        display: none;
        background: none;
        border: none;
        font-size: 24px;
        color: var(--color-black);
        cursor: pointer;
        position: absolute;
        top: 20px;
        right: 20px;
    }

    @media screen and (max-width: 1200px) {
        padding: 1rem 2rem;
    }

    @media screen and (max-width: 600px) {
        padding: 1.2rem 1rem;

        .hamburger {
            display: flex;
        }

        .nav-links {
            position: fixed;
            top: 0;
            right: 0;
            height: 100vh;
            width: 250px;
            background-color: white;
            flex-direction: column;
            align-items: flex-start;
            padding: 300px 20px;
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
            box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
            z-index: 1100;
        }

        .nav-links.open {
            transform: translateX(0);
        }

        .nav-item {
            margin: 15px 0;
            margin-left: 0;
            font-size: 18px;
        }

        .logout-btn {
            margin: 15px 0;
            margin-left: 0;
        }

        .close-btn {
            display: block;
        }
    }
`;

export default Navbar;





















// // /* eslint-disable react/prop-types */


// import React from "react";
// import styled from "styled-components";
// import { NavLink } from "react-router-dom";
// import Logo from "../Logo";
// import { useUserContext } from "../../context/UserContext";

// const Navbar = ({ navbarRef }) => {
//     const { user, logout } = useUserContext(); // Get user and logout function from context

//     return (
//         <Wrapper ref={navbarRef}>
//             <div className="container"> 
//                 <Logo />
//                 <div className="flex justify-end items-center">
//                 <NavLink className="nav-item" to="/about-us">
//                     About
//                 </NavLink>
//                     <NavLink className="nav-item" to="/all-schools">
//                         Courses
//                     </NavLink>
//                     {user ? (
//                         <>
//                             <NavLink className="nav-item hidden sm:block" to="/dashboard">
//                                 Dashboard
//                             </NavLink>
//                             <button
//                                 className="bg-[#FF0000] text-white px-6 py-2 rounded ml-4"
//                                 onClick={logout} // Call logout function
//                             >
//                                 Logout
//                             </button>
//                         </>
//                     ) : (
//                         <NavLink className="nav-item" to="/login">
//                             <span className="bg-[#247BF7] text-white px-6 py-2 rounded"> Login</span>
//                         </NavLink>
//                     )}
//                 </div>
//             </div>
//         </Wrapper>
//     );
// };

// const Wrapper = styled.div`
//     width: 100%;
//     display: flex;
//     justify-content: center;
//     box-shadow: 0 5px 5px var(--shadow-light);
//     padding: 1rem 0;

//     position: sticky;
//     top: 0; /* Stick the navbar to the top of the page */
//     background-color: white; /* Ensure the background color remains consistent when sticky */
//     z-index: 1000; /* Make sure the navbar stays above other content when scrolling */

//     .container {
//         width: 100%;
//         max-width: 1200px;
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//     }
//     .container .nav-item {
//         font-size: 16px;
//         font-weight: 500;
//         text-transform: capitalize;
//         margin-left: 20px;
//         color: var(--color-black);
//     }
//     .container .nav-item.active {
//         color: var(--color-primary);
//     }
//     @media screen and (max-width: 1200px) {
//         padding: 1rem 2rem;
//     }
//     @media screen and (max-width: 600px) {
//         padding: 1.2rem 1rem;
//         .container {
//             display: flex;
//             /* justify-content: center; */
//         }
//     }
// `;

// export default Navbar;




