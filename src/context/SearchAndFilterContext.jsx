
import React, { useContext, useState } from "react";
import axios from "axios";

const searchAndFilterContext = React.createContext();

const SearchAndFilterContext = ({ children }) => {
    const [searchLoading, setSearchLoading] = useState(false); // Initially not loading
    const [searchError, setSearchError] = useState({ status: false, message: "" });
    const [searchResults, setSearchResults] = useState({});
    const [hasSearched, setHasSearched] = useState(false); // Default false to track searches

    const handleSearchAndFilter = async (searchParams) => {
        setSearchLoading(true); // Indicate loading state
        try {
            const query = new URLSearchParams(searchParams).toString();

            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/schools/search?${query}`, 

                // { withCredentials: true }
            );
            setSearchError({ status: false, message: "" });
            setSearchResults(response?.data);
            setHasSearched(true); // Search was made
        } catch (error) {
            setSearchError({ status: true, message: error?.message });
            setSearchResults({ status: false });
            setHasSearched(true);  // Still mark that a search attempt was made
        } finally {
            setSearchLoading(false); // Reset loading state
        }
    };


    

    const contextValue = {
        searchLoading,
        searchError,
        searchResults,
        hasSearched,
        handleSearchAndFilter,
    };

    return (
        <searchAndFilterContext.Provider value={contextValue}>
            {children}
        </searchAndFilterContext.Provider>
    );
};

// Custom hook for using the context 
const useSearchAndFilterContext = () => useContext(searchAndFilterContext);

export { useSearchAndFilterContext, SearchAndFilterContext };















// import React, { useContext, useState } from "react";
// import axios from "axios";

// const searchAndFilterContext = React.createContext();

// const SearchAndFilterContext = ({ children }) => {
//     const [searchLoading, setSearchLoading] = useState(false); // Initially not loading
//     const [searchError, setSearchError] = useState({ status: false, message: "" });
//     const [searchResults, setSearchResults] = useState({});
//     const [hasSearched, setHasSearched] = useState(false); // Default false to track searches

//     const handleSearchAndFilter = async (searchParams) => {
//         setSearchLoading(true); // Indicate loading state
//         try {
//             const query = new URLSearchParams(searchParams).toString();
//             const response = await axios.get(
//                 `${import.meta.env.VITE_API_BASE_URL}/schools/search?${query}`, 
//                 { withCredentials: true }
//             );
//             setSearchError({ status: false, message: "" });
//             setSearchResults(response?.data);
//             setHasSearched(true); // Search was made
//         } catch (error) {
//             setSearchError({ status: true, message: error?.message });
//             setSearchResults({ status: false });
//             setHasSearched(true);  // Still mark that a search attempt was made
//         } finally {
//             setSearchLoading(false); // Reset loading state
//         }
//     };

//     const contextValue = {
//         searchLoading,
//         searchError,
//         searchResults,
//         hasSearched,
//         handleSearchAndFilter,
//     };

//     return (
//         <searchAndFilterContext.Provider value={contextValue}>
//             {children}
//         </searchAndFilterContext.Provider>
//     );
// };

// // Custom hook for using the context 
// const useSearchAndFilterContext = () => useContext(searchAndFilterContext);

// export { useSearchAndFilterContext, SearchAndFilterContext };







