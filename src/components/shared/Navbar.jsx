// /* eslint-disable react/prop-types */


import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Logo from "../Logo";
import { useUserContext } from "../../context/UserContext";

const Navbar = ({ navbarRef }) => {
    const { user, logout } = useUserContext(); // Get user and logout function from context

    return (
        <Wrapper ref={navbarRef}>
            <div className="container"> 
                <Logo />
                <div className="flex justify-end items-center">
                <NavLink className="nav-item" to="/about-us">
                    About
                </NavLink>
                    <NavLink className="nav-item" to="/all-schools">
                        Courses
                    </NavLink>
                    {user ? (
                        <>
                            <NavLink className="nav-item hidden sm:block" to="/dashboard">
                                Dashboard
                            </NavLink>
                            <button
                                className="bg-[#FF0000] text-white px-6 py-2 rounded ml-4"
                                onClick={logout} // Call logout function
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <NavLink className="nav-item" to="/login">
                            <span className="bg-[#247BF7] text-white px-6 py-2 rounded"> Login</span>
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
    top: 0; /* Stick the navbar to the top of the page */
    background-color: white; /* Ensure the background color remains consistent when sticky */
    z-index: 1000; /* Make sure the navbar stays above other content when scrolling */

    .container {
        width: 100%;
        max-width: 1200px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .container .nav-item {
        font-size: 16px;
        font-weight: 500;
        text-transform: capitalize;
        margin-left: 20px;
        color: var(--color-black);
    }
    .container .nav-item.active {
        color: var(--color-primary);
    }
    @media screen and (max-width: 1200px) {
        padding: 1rem 2rem;
    }
    @media screen and (max-width: 600px) {
        padding: 1.2rem 1rem;
        .container {
            display: flex;
            /* justify-content: center; */
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





















// import styled from "styled-components";
// import Logo from "../Logo";
// import { NavLink } from "react-router-dom";

// const Navbar = ({ navbarRef }) => {
//     return (
//         <Wrapper ref={navbarRef}>
//             <div className="container">
//                 <Logo />
//                 <div className="flex justify-end items-center">
//                     <NavLink className="nav-item" to="/all-jobs">
//                         Jobs
//                     </NavLink>
//                     <NavLink className="nav-item hidden sm:block" to="/dashboard">
//                         Dashboard
//                     </NavLink>
//                     <NavLink className="nav-item" to="/login">
//                         <span className="bg-[#247BF7] text-white px-6 py-2 rounded"> Login</span>
//                     </NavLink>
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
