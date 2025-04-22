import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const WebinarContext = createContext();

export const WebinarProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 
    const [registrations, setRegistrations] = useState([]);


    const registerForWebinar = async (formData) => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/webinar/register`,
                formData,
                // { withCredentials: true }
            );
            toast.success("Registration successful!");
            return response.data;
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Registration failed";
            toast.error(errorMsg);
            setError(errorMsg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // const value = {
    //     loading,
    //     error,
    //     registerForWebinar
    // };

    const getAllWebinarRegistrations = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/webinar/registrations`
            );
            setRegistrations(response.data);
            return response.data;
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Failed to fetch webinar registrations";
            toast.error(errorMsg);
            setError(errorMsg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        loading,
        error,
        registrations,
        registerForWebinar,
        getAllWebinarRegistrations
    };


    return (
        <WebinarContext.Provider value={value}>
            {children}
        </WebinarContext.Provider>
    );
}; 

export const useWebinar = () => useContext(WebinarContext); 















// import React, { createContext, useContext, useState } from "react";
// import axios from "axios";
// import { toast } from 'react-toastify';

// const WebinarContext = createContext();

// const WebinarProvider = ({ children }) => {
//     const [webinarLoading, setWebinarLoading] = useState(false);
//     const [webinarError, setWebinarError] = useState({ status: false, message: "" });

    
//     // Handle the application submission
//     const handleApply = async (applicationData) => {
//         setWebinarLoading(true);
//         try {
//             const response = await axios.post(
//                 `${import.meta.env.VITE_API_BASE_URL}/webinar/register`,
               
//             );
//             toast.success("Registration successful!");
//             setWebinarError({ status: false, message: "" });
//             return response.data;
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Registration failed");
//             setWebinarError({ 
//                 status: true, 
//                 message: error.response?.data?.message || "Registration failed. Please try again."
//             });
//             throw error;
//         } finally {
//             setWebinarLoading(false);
//         }
//     };
    
 


//     const value = {
//         webinarLoading,
//         webinarError, 
//         handleApply, 
//     };

//     return (
//         <WebinarContext.Provider value={value}>
//             {children}
//         </WebinarContext.Provider>
//     );
// };

// const useWebinarContext = () => useContext(useWebinarContext);

// export { WebinarProvider, useWebinarContext }; 
