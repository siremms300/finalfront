import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../pages/Footer";
import ApplicationModal from "../components/shared/ApplicationModal"; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeLayout = () => {
    return ( 
        <div>
            <Outlet />
            <Footer/>
            <ApplicationModal /> {/* Render ApplicationModal here */} 
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default HomeLayout;












// import React from "react";
// import { Outlet } from "react-router-dom";
// import Footer from "../pages/Footer";

// const HomeLayout = () => {
//     return (
//         <div>
//             <Outlet />
//             <Footer/>
//         </div>
//     );
// };

// export default HomeLayout;
