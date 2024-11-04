

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const schoolContext = React.createContext();

const SchoolContext = ({ children }) => {
    const [schoolLoading, setSchoolLoading] = useState(true);
    const [schoolError, setSchoolError] = useState({ status: false, message: "" });
    const [schools, setSchools] = useState({});
    const [hasSearched, setHasSearched] = useState(false); // Default false
    const [isInitialLoad, setIsInitialLoad] = useState(true); // New flag for initial load 


    

    const handleSchoolFetch = async (url) => {
        setSchoolLoading(true);
        try {
            const response = await axios.get(url, { withCredentials: true });
            setSchoolError({ status: false, message: "" });
            setSchools(response?.data);
            
            // Only set `hasSearched` to true for user-initiated searches
            if (!isInitialLoad) {
                setHasSearched(true);
            }
        } catch (error) {
            setSchoolError({ status: true, message: error?.message });
            setSchools({ status: false });
            setHasSearched(true)  // ------------ A NEW ADDITION TO MAKE THE "NO SCHOOL FOUND DISPLAY"----------
        } finally {
            setSchoolLoading(false);
        }
    };


    useEffect(() => {
        handleSchoolFetch(`${import.meta.env.VITE_API_BASE_URL}/schools?page=1`);

        setIsInitialLoad(false); // Mark the initial load as completed
    }, []);

    const passing = {
        schoolLoading,
        schoolError,
        schools,
        setSchools,
        hasSearched,
        setHasSearched,
        handleSchoolFetch,
    };

    return (
        <schoolContext.Provider value={passing}>{children}</schoolContext.Provider>
    );
};

const useSchoolContext = () => useContext(schoolContext);

export { useSchoolContext, SchoolContext };











// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";

// const schoolContext = React.createContext();

// const SchoolContext = ({ children }) => {
//     const [schoolLoading, setSchoolLoading] = useState(true);
//     const [schoolError, setSchoolError] = useState({ status: false, message: "" });
//     const [schools, setSchools] = useState({});
//     const [hasSearched, setHasSearched] = useState(false); // Add this



//     const handleSchoolFetch = async (url) => {
//         setSchoolLoading(true);
//         try {
//             const response = await axios.get(url, { withCredentials: true });
//             setSchoolError({ status: false, message: "" });
//             setSchools(response?.data);
//              setHasSearched(true); // Set this to true after fetching results ----- it was false
//         } catch (error) {
//             setSchoolError({ status: true, message: error?.message });
//             setSchools({ status: false });
//         } finally {
//             setSchoolLoading(false);
//         }
//     };


//     useEffect(() => {
//         handleSchoolFetch(
//             `${import.meta.env.VITE_API_BASE_URL}/schools?page=1`
//         );
//     }, []);

   

//     const passing = {
//         schoolLoading,
//         schoolError,
//         schools,
//         setSchools,
//         hasSearched,
//         setHasSearched, // Pass setHasSearched here
//         handleSchoolFetch,
//     };

//     return (
//         <schoolContext.Provider value={passing}>{children}</schoolContext.Provider>
//     );
// };

// const useSchoolContext = () => useContext(schoolContext);

// export { useSchoolContext, SchoolContext };



