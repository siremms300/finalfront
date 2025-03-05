 

import React, { useState } from "react";
import styled from "styled-components";
import { School_Status, Course_Type, School_Sort_By } from "../../utils/SchoolData";
import { CiFilter, CiSearch } from "react-icons/ci";
import { useSearchAndFilterContext } from "../../context/SearchAndFilterContext"; // Updated context
// import {useUserContext} from "../../context/UserContext"   //NEW CONTEXT 

const SearchAndFilter = () => {
    const { handleSearchAndFilter, hasSearched } = useSearchAndFilterContext(); // Updated
    // const { user, userLoading } = useUserContext(); // Get user and loading state from UserContext

    const [courseTypeFilter, setCourseTypeFilter] = useState("");
    const [schoolStatusFilter, setSchoolStatusFilter] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [minTuition, setMinTuition] = useState("");
    const [maxTuition, setMaxTuition] = useState("");
    const [hasScholarship, setHasScholarship] = useState("");

    const [email, setEmail] = useState(""); // New field
    const [phone, setPhone] = useState(""); // New field

    const handleSearch = () => {
// //////////////// USER LOGIN CHECK
        // if (userLoading) {
        //     setErrorMessage("Checking authentication status...");
        //     return;
        // }

        // if (!user) {
        //     setErrorMessage("Please login to find courses.");
        //     return;
        // }
// ////////////// END OF USER LOGIN CHECK 

        const searchParams = {};

        if (searchQuery.trim()) searchParams.search = searchQuery;
        if (courseTypeFilter) searchParams.courseType = courseTypeFilter;
        if (schoolStatusFilter) searchParams.schoolStatus = schoolStatusFilter;
        if (sortBy) searchParams.sort = sortBy;
        if (minTuition) searchParams.minTuition = minTuition;
        if (maxTuition) searchParams.maxTuition = maxTuition;

        if (hasScholarship === "true") searchParams.scholarship = true;
        else if (hasScholarship === "false") searchParams.scholarship = false;

        // logggggggggg
        const additionalData = { email, phone }; // Log data

        if (Object.keys(searchParams).length > 0) {
            handleSearchAndFilter(searchParams, additionalData);
        } else {
            alert("Please provide at least one search query or filter.");
        }
    };

    return (
        <Wrapper>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
                <h2 className="form-title">Fill Program Form</h2> 

                 {/* Email Field */}
                 <div className="form-group">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="form-input"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Phone Field */}
                <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        className="form-input"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>


                {/* Search Bar */}
                <div className="form-group">
                    <label htmlFor="search" className="form-label">
                        Search by Course Title
                    </label>
                    <div className="input-icon">
                        <input
                            type="text"
                            id="search"
                            className="form-input"
                            placeholder="Enter course title"
                            onChange={(e) => setSearchQuery(e.target.value)}
                            value={searchQuery}
                        />
                        {/* <span className="icon">
                            <CiSearch />
                        </span> */}
                    </div>
                </div>

                {/* Filters */}
                <div className="form-group">
                    <label htmlFor="courseType" className="form-label">
                        Course Type
                    </label>
                    <select
                        id="courseType"
                        className="form-select"
                        onChange={(e) => setCourseTypeFilter(e.target.value)}
                        value={courseTypeFilter}
                    >
                        <option value="">Select</option>
                        {Course_Type.map((type, i) => (
                            <option key={i + type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="degreeType" className="form-label">
                        Degree Type
                    </label>
                    <select
                        id="degreeType"
                        className="form-select"
                        onChange={(e) => setSchoolStatusFilter(e.target.value)}
                        value={schoolStatusFilter}
                    >
                        <option value="">Select</option>
                        {School_Status.map((status, i) => (
                            <option key={i + status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="sortBy" className="form-label">
                        Sort By
                    </label>
                    <select
                        id="sortBy"
                        className="form-select"
                        onChange={(e) => setSortBy(e.target.value)}
                        value={sortBy}
                    >
                        <option value="">Select</option>
                        {School_Sort_By.map((sort, i) => (
                            <option key={i + sort} value={sort}>
                                {sort}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="minTuition" className="form-label">
                        Min Tuition
                    </label>
                    <input
                        type="number"
                        id="minTuition"
                        className="form-input"
                        placeholder="Enter minimum"
                        value={minTuition}
                        onChange={(e) => setMinTuition(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="maxTuition" className="form-label">
                        Max Tuition
                    </label>
                    <input
                        type="number"
                        id="maxTuition"
                        className="form-input"
                        placeholder="Enter maximum"
                        value={maxTuition}
                        onChange={(e) => setMaxTuition(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="scholarship" className="form-label">
                        Scholarship
                    </label>
                    <select
                        id="scholarship"
                        className="form-select"
                        onChange={(e) => setHasScholarship(e.target.value)}
                        value={hasScholarship}
                    >
                        <option value="">Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>

                <button onClick={handleSearch} className="form-btn">
                    Get Program
                </button>
            </form>
        </Wrapper>
    );
};

    // background-color: #e3edf7;
const Wrapper = styled.div`
    background-color: #f8f4f4;
    padding: 1.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    max-width: 500px;
    margin: auto;

    .form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .form-title {
        text-align: center;
        font-size: 1.5rem;
        color: #333;
        margin-bottom: 1rem;
    }

    .form-group {
        display: flex;
        flex-direction: column;
    }

    .form-label {
        font-size: 0.9rem;
        color: #555;
        margin-bottom: 0.4rem;
    }

    .form-input,
    .form-select {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
        box-sizing: border-box;
    }

    .form-input:focus,
    .form-select:focus {
        outline: none;
        border-color: #1a73e8;
    }

    .input-icon {
        position: relative;
        display: flex;
        align-items: center;
    }

    .form-input {
        padding-right: 30px;
    }

    .icon {
        position: absolute;
        right: 10px;
        font-size: 1.2rem;
        color: #666;
    }

    .form-btn {
        padding: 10px;
        background-color: #1a73e8;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .form-btn:hover {
        background-color: #135ab5;
    }

    @media (max-width: 768px) {
        .form-group {
            width: 100%;
        }
    }
`;

export default SearchAndFilter;
















// // THE CODE BELOW WORKS. THE ONLY THING IS THAT ITS NOT MOBILE RESPONSIVE 

// import React, { useState } from "react";
// import styled from "styled-components";
// import { School_Status, Course_Type, School_Sort_By } from "../../utils/SchoolData";
// import { CiFilter, CiSearch } from "react-icons/ci";
// import { useSearchAndFilterContext } from "../../context/SearchAndFilterContext"; // Updated context

// const SearchAndFilter = () => {
//     const { handleSearchAndFilter, hasSearched } = useSearchAndFilterContext(); // Updated

//     const [courseTypeFilter, setCourseTypeFilter] = useState("");
//     const [schoolStatusFilter, setSchoolStatusFilter] = useState("");
//     const [sortBy, setSortBy] = useState("");
//     const [searchQuery, setSearchQuery] = useState("");
//     const [minTuition, setMinTuition] = useState("");
//     const [maxTuition, setMaxTuition] = useState("");
//     const [hasScholarship, setHasScholarship] = useState("");

//     const handleSearch = () => {
//         const searchParams = {};

//         if (searchQuery.trim()) searchParams.search = searchQuery;
//         if (courseTypeFilter) searchParams.courseType = courseTypeFilter;
//         if (schoolStatusFilter) searchParams.schoolStatus = schoolStatusFilter;
//         if (sortBy) searchParams.sort = sortBy;
//         if (minTuition) searchParams.minTuition = minTuition;
//         if (maxTuition) searchParams.maxTuition = maxTuition;
//         // if (hasScholarship) searchParams.scholarship = hasScholarship;

//          // Ensure the scholarship filter is applied as a boolean
//         if (hasScholarship === "true") searchParams.scholarship = true;
//         else if (hasScholarship === "false") searchParams.scholarship = false;

//         if (Object.keys(searchParams).length > 0) {
//             handleSearchAndFilter(searchParams);
//         } else {
//             alert("Please provide at least one search query or filter.");
//         }
//     };

//     return (
//         <Wrapper>
//             <form className="form" onSubmit={(e) => e.preventDefault()}>
//                 <div className="search-container">
//                     <div className="search-row">
//                         <input
//                             type="text"
//                             className="search"
//                             placeholder="Search by course title"
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             value={searchQuery}
//                         />
//                         <span className="icon">
//                             <CiSearch />
//                         </span>
//                     </div>
//                     <button onClick={handleSearch} className="search-btn">
//                         Search
//                     </button>
//                 </div>

//                 <div className="filter">
//                     <div className="filter-group">
//                         <span className="filter-label">Course Type</span>
//                         <select
//                             className="filter-select"
//                             onChange={(e) => setCourseTypeFilter(e.target.value)}
//                             value={courseTypeFilter}
//                         >
//                             <option value="">Select</option>
//                             {Course_Type?.map((type, i) => (
//                                 <option key={i + type} value={type}>
//                                     {type}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="filter-group">
//                         <span className="filter-label">Degree Type</span>
//                         <select
//                             className="filter-select"
//                             onChange={(e) => setSchoolStatusFilter(e.target.value)}
//                             value={schoolStatusFilter}
//                         >
//                             <option value="">Select</option>
//                             {School_Status?.map((status, i) => (
//                                 <option key={i + status} value={status}>
//                                     {status}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="filter-group">
//                         <span className="filter-label">Sort By</span>
//                         <select
//                             className="filter-select"
//                             onChange={(e) => setSortBy(e.target.value)}
//                             value={sortBy}
//                         >
//                             <option value="">Select</option>
//                             {School_Sort_By?.map((sort, i) => (
//                                 <option key={i + sort} value={sort}>
//                                     {sort}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="filter-group">
//                         <span className="filter-label">Min Tuition</span>
//                         <input
//                             type="number"
//                             placeholder="Min"
//                             value={minTuition}
//                             onChange={(e) => setMinTuition(e.target.value)}
//                             className="tuition-input"
//                         />
//                     </div>
//                     <div className="filter-group">
//                         <span className="filter-label">Max Tuition</span>
//                         <input
//                             type="number"
//                             placeholder="Max"
//                             value={maxTuition}
//                             onChange={(e) => setMaxTuition(e.target.value)}
//                             className="tuition-input"
//                         />
//                     </div>








//                     <div className="filter-group">
//                         <span className="filter-label">Scholarship</span>
//                         <select
//                             className="filter-select"
//                             onChange={(e) => setHasScholarship(e.target.value)}
//                             value={hasScholarship}
//                         >
//                             <option value="">Select</option>
//                             <option value="true">Yes</option>
//                             <option value="false">No</option>
//                         </select>
//                     </div>





//                 </div>
//             </form>
//         </Wrapper>
//     );
// };




// // background-color: lightcyan;
// // background-color: #f8f4f4;
//     //background-color: rgba(135, 206, 235, 0.2); /* light sky blue with 20% opacity */
// const Wrapper = styled.div`
//     background-color: #f8f4f4;
//     padding: 1.5rem;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
//     border-radius: 8px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;

//     .form {
//         width: 100%;
//         display: flex;
//         flex-direction: column;
//         gap: 1rem;
//     }

//     .search-container {
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         width: 100%;
//     }

//     .search-row {
//         flex-grow: 1;
//         position: relative;
//     }

//     .search {
//         width: 100%;
//         padding: 7px 10px;
//         border: 1px solid #ddd;
//         border-radius: 4px;
//         font-size: 1rem;
//     }

//     .icon {
//         position: absolute;
//         right: 10px;
//         top: 50%;
//         transform: translateY(-50%);
//         font-size: 1.5rem;
//         color: #666;
//     }

//     .search-btn {
//         background-color: #1a73e8;
//         color: #fff;
//         padding: 7px 10px;
//         border: none;
//         border-radius: 4px;
//         cursor: pointer;
//         transition: background-color 0.3s;
//     }

//     .search-btn:hover {
//         background-color: #135ab5;
//     }

//     .filter {
//         display: flex;
//         flex-wrap: wrap;
//         gap: 1rem;
//         justify-content: space-between;
//     }

//     .filter-group {
//         display: flex;
//         flex-direction: column;
//         gap: 0.2rem;
//         width: 100%;
//         max-width: 180px;
//     }

//     .filter-label {
//         font-size: 0.875rem;
//         color: #333;
//     }

//     .filter-select {
//         padding: 4px 6px;
//         border-radius: 4px;
//         border: 1px solid #ccc;
//         background-color: #fff;
//         font-size: 0.9rem;
//         transition: border-color 0.3s;
        
//         width: 100%; /* Ensure dropdown matches input width */
//         box-sizing: border-box; /* Ensure padding doesn't affect width */
//     }

//     .filter-select:hover {
//         border-color: #888;
//     } 


    

//     .tuition-input {
//         padding: 4px;
//         border-radius: 4px;
//         border: 1px solid #ccc;
//         font-size: 0.9rem;
//         transition: border-color 0.3s;
//     }

//     .tuition-input:hover {
//         border-color: #888;
//     }

//     /* Responsive design */
//     @media (max-width: 768px) {
//         .search-container {
//             flex-direction: row;
//             gap: 1rem;
//         }

//         .filter {
//             flex-direction: row;
//         } 

//     } 

//     @media (max-width: 600px) {
//         .search-container {
//             flex-direction: row;
//             gap: 0.3rem;
//         }

//         .filter {
//             flex-direction: row;
//         }

//         .search-row, 
//         .filter-group {
//             width: 45%; /* Adjust width to fit two input fields per row */
//         }
//     }
// `; 



// // const Wrapper = styled.div`
// //     background-color: rgba(135, 206, 235, 0.2); /* light sky blue with 20% opacity */
// //     padding: 1.5rem;
// //     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
// //     border-radius: 8px;
// //     display: flex;
// //     flex-direction: column;
// //     align-items: center;
// //     gap: 1rem;

// //     .form {
// //         width: 100%;
// //         display: flex;
// //         flex-direction: column;
// //         gap: 1rem;
// //     }

// //     .search-container {
// //         display: flex;
// //         flex-direction: row;
// //         justify-content: space-between;
// //         align-items: center;
// //         width: 100%;
// //         flex-wrap: wrap; /* Allow wrapping on smaller screens */
// //         gap: 1rem;
// //     }

// //     .search-row {
// //         flex-grow: 1;
// //         position: relative;
// //         min-width: 150px; /* Minimum width to prevent shrinking too much */
// //     }

// //     .search {
// //         width: 100%;
// //         padding: 7px 10px;
// //         border: 1px solid #ddd;
// //         border-radius: 4px;
// //         font-size: 1rem;
// //     }

// //     .icon {
// //         position: absolute;
// //         right: 10px;
// //         top: 50%;
// //         transform: translateY(-50%);
// //         font-size: 1.5rem;
// //         color: #666;
// //     }

// //     .search-btn {
// //         background-color: #1a73e8;
// //         color: #fff;
// //         padding: 7px 10px;
// //         border: none;
// //         border-radius: 4px;
// //         cursor: pointer;
// //         transition: background-color 0.3s;
// //         white-space: nowrap; /* Prevent button text from breaking */
// //     }

// //     .search-btn:hover {
// //         background-color: #135ab5;
// //     }

// //     .filter {
// //         display: flex;
// //         flex-direction: row;
// //         flex-wrap: wrap; /* Allow filter groups to wrap */
// //         gap: 1rem;
// //         justify-content: flex-start; /* Adjust position of filter groups */
// //         width: 100%;
// //     }

// //     .filter-group {
// //         display: flex;
// //         flex-direction: column;
// //         gap: 0.2rem;
// //         min-width: 120px;
// //         max-width: 180px;
// //         flex-grow: 1; /* Allow each filter group to grow */
// //     }

// //     .filter-label {
// //         font-size: 0.875rem;
// //         color: #333;
// //     }

// //     .filter-select,
// //     .tuition-input {
// //         padding: 4px 6px;
// //         border-radius: 4px;
// //         border: 1px solid #ccc;
// //         background-color: #fff;
// //         font-size: 0.9rem;
// //         transition: border-color 0.3s;
// //     }

// //     .filter-select:hover,
// //     .tuition-input:hover {
// //         border-color: #888;
// //     }

// //     /* Responsive design */
// //     @media (max-width: 768px) {
// //         .search-container {
// //             flex-direction: row;
// //             gap: 1rem;
// //             flex-wrap: wrap;
// //         }

// //         .search-row {
// //             width: 100%; /* Ensure search field takes full width on smaller screens */
// //         }

// //         .filter {
// //             flex-direction: row;
// //             flex-wrap: wrap;
// //             justify-content: space-between; /* Spread filter groups evenly */
// //             gap: 1rem;
// //         }

// //         .filter-group {
// //             max-width: 45%; /* Reduce filter group size for better fit on small screens */
// //         }
// //     }

// //     @media (max-width: 480px) {
// //         .search-btn {
// //             width: 100%;
// //             text-align: center;
// //         }

// //         .filter-group {
// //             width: 100%;
// //         }

// //         .search-container {
// //             flex-direction: column;
// //             gap: 1rem;
// //         }

// //         .filter {
// //             flex-direction: column;
// //             gap: 1rem;
// //         }
// //     }
// // `;



// export default SearchAndFilter;

















































// THIS CODE IS WORKING 



// import React, { useState } from "react";
// import styled from "styled-components";
// import { School_Status, Course_Type, School_Sort_By } from "../../utils/SchoolData";
// import { CiFilter, CiSearch } from "react-icons/ci";
// import { useSearchAndFilterContext } from "../../context/SearchAndFilterContext"; // Updated context

// const SearchAndFilter = () => {
//     const { handleSearchAndFilter, hasSearched } = useSearchAndFilterContext(); // Updated

//     const [courseTypeFilter, setCourseTypeFilter] = useState("");
//     const [schoolStatusFilter, setSchoolStatusFilter] = useState("");
//     const [sortBy, setSortBy] = useState("");
//     const [searchQuery, setSearchQuery] = useState("");
//     const [minTuition, setMinTuition] = useState("");
//     const [maxTuition, setMaxTuition] = useState("");
//     const [hasScholarship, setHasScholarship] = useState("");

//     // Updated handleSearch to check for any available filters or search query
//     const handleSearch = () => {
//         const searchParams = {};

//         if (searchQuery.trim()) searchParams.search = searchQuery;
//         if (courseTypeFilter) searchParams.courseType = courseTypeFilter;
//         if (schoolStatusFilter) searchParams.schoolStatus = schoolStatusFilter;
//         if (sortBy) searchParams.sort = sortBy;
//         if (minTuition) searchParams.minTuition = minTuition;
//         if (maxTuition) searchParams.maxTuition = maxTuition;
//         if (hasScholarship) searchParams.scholarship = hasScholarship;

//         // Call handleSearchAndFilter with search parameters if at least one filter or search query exists
//         if (Object.keys(searchParams).length > 0) {
//             handleSearchAndFilter(searchParams);
//         } else {
//             alert("Please provide at least one search query or filter.");
//         }
//     };

//     return (
//         <Wrapper>
//             <form className="form" onSubmit={(e) => e.preventDefault()}>
//                 <div className="filter">
//                     <div className="hidden">
//                         <CiFilter />
//                     </div>
//                     <div className="type-row">
//                         <span className="text">Course Type</span>
//                         <select
//                             className="type-select"
//                             onChange={(e) => setCourseTypeFilter(e.target.value)}
//                             value={courseTypeFilter}
//                         >
//                             <option value="">default</option>
//                             {Course_Type?.map((type, i) => (
//                                 <option key={i + type} value={type}>
//                                     {type}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="status-row">
//                         <span className="text">Degree type</span>
//                         <select
//                             className="status-select"
//                             onChange={(e) => setSchoolStatusFilter(e.target.value)}
//                             value={schoolStatusFilter}
//                         >
//                             <option value="">default</option>
//                             {School_Status?.map((status, i) => (
//                                 <option key={i + status} value={status}>
//                                     {status}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="status-row">
//                         <span className="text">Sort By</span>
//                         <select
//                             className="status-select"
//                             onChange={(e) => setSortBy(e.target.value)}
//                             value={sortBy}
//                         >
//                             <option value="">default</option>
//                             {School_Sort_By?.map((sort, i) => (
//                                 <option key={i + sort} value={sort}>
//                                     {sort}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="status-row">
//                         <span className="text">Min Tuition</span>
//                         <input
//                             type="number"
//                             placeholder="Minimum"
//                             value={minTuition}
//                             onChange={(e) => setMinTuition(e.target.value)}
//                         />
//                     </div>
//                     <div className="status-row">
//                         <span className="text">Max Tuition</span>
//                         <input
//                             type="number"
//                             placeholder="Maximum"
//                             value={maxTuition}
//                             onChange={(e) => setMaxTuition(e.target.value)}
//                         />
//                     </div>

//                     <div className="status-row">
//                         <span className="text">Scholarship</span>
//                         <select
//                             className="status-select"
//                             onChange={(e) => setHasScholarship(e.target.value)}
//                             value={hasScholarship}
//                         >
//                             <option value="">default</option>
//                             <option value="true">Yes</option>
//                             <option value="false">No</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div className="search-row">
//                     <input
//                         type="text"
//                         className="search"
//                         placeholder="Type Course Title"
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         value={searchQuery}
//                     />
//                     <span className="icon">
//                         <CiSearch />
//                     </span>
//                 </div>

//                 <button onClick={handleSearch} className="search-btn">
//                     Search
//                 </button>
//             </form>
//         </Wrapper>
//     );
// };











 




// const Wrapper = styled.div`
//     background-color: #f8f4f4;
//     padding: 1.2rem 1rem;
//     display: flex;
//     align-items: center;
//     border-radius: 6px;

//     .form {
//         width: 100%;
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//     }

//     .filter {
//         display: flex;
//         justify-content: flex-start;
//         flex-wrap: wrap;
//         align-items: center;
//         column-gap: 1.1rem;
//     }

//     .search-row {
//         display: flex;
//         align-items: center;
//     }

//     .search-btn {
//         background-color: #1a73e8;
//         color: #fff;
//         padding: 5px 10px;
//         border: none;
//         border-radius: 4px;
//         cursor: pointer;
//         transition: background-color 0.3s;
//     }

//     .search-btn:hover {
//         background-color: #135ab5;
//     }

//     /* Other existing styles... */
// `;

// export default SearchAndFilter;




//  THI IS THE END OF THE WORKING CODE 





























// ------------------------THIS ONE BELOW WORKSSS ------------------------------- //

// import React, { useState } from "react";
// import styled from "styled-components";
// import { School_Status, Course_Type, School_Sort_By } from "../../utils/SchoolData";
// import { CiFilter, CiSearch } from "react-icons/ci";
// import { useSchoolContext } from "../../context/SchoolContext";

// const SearchAndFilter = () => {
//     const { handleSchoolFetch, hasSearched, setHasSearched } = useSchoolContext(); // Destructure setHasSearched

//     const [courseTypeFilter, setCourseTypeFilter] = useState("");
//     const [schoolStatusFilter, setSchoolStatusFilter] = useState("");
//     const [sortBy, setSortBy] = useState("");
//     const [searchQuery, setSearchQuery] = useState("");
//     const [minTuition, setMinTuition] = useState("");
//     const [maxTuition, setMaxTuition] = useState("");
//     const [hasScholarship, setHasScholarship] = useState("");

//     const handleSearch = () => {


//          // Validate at least one search parameter is provided
//          if (
//             !searchQuery.trim() &&
//             !courseTypeFilter &&
//             !schoolStatusFilter &&
//             !sortBy &&
//             !minTuition &&
//             !maxTuition &&
//             !hasScholarship
//         ) {
//             alert("Please provide a search query or select at least one filter.");
//             return;
//         }


        


//         const baseUrl = "${import.meta.env.VITE_API_BASE_URL}/schools?page=1&limit=5";
//         let url = baseUrl;

//         const queryParams = {};

//         if (searchQuery) queryParams.search = searchQuery;
//         if (courseTypeFilter) queryParams.courseType = courseTypeFilter;
//         if (schoolStatusFilter) queryParams.schoolStatus = schoolStatusFilter;
//         if (sortBy) queryParams.sort = sortBy;
//         if (minTuition) queryParams.minTuition = minTuition;
//         if (maxTuition) queryParams.maxTuition = maxTuition;
//         if (hasScholarship) queryParams.scholarship = hasScholarship;

//         const queryString = new URLSearchParams(queryParams).toString();
//         if (queryString) url += `&${queryString}`;

//         // Reset search status before fetching new results
//         setHasSearched(false);   //it was true just now 

//         // Fetch filtered results
//         handleSchoolFetch(url);
//     };

//     return (
//         <Wrapper>
//             <form className="form" onSubmit={(e) => e.preventDefault()}>
//                 <div className="filter">
//                     <div className="hidden">
//                         <CiFilter />
//                     </div>
//                     <div className="type-row">
//                         <span className="text">Course Type</span>
//                         <select
//                             className="type-select"
//                             onChange={(e) => setCourseTypeFilter(e.target.value)}
//                             value={courseTypeFilter}
//                         >
//                             <option value="">default</option>
//                             {Course_Type?.map((type, i) => (
//                                 <option key={i + type} value={type}>
//                                     {type}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="status-row">
//                         <span className="text">Degree type</span>
//                         <select
//                             className="status-select"
//                             onChange={(e) => setSchoolStatusFilter(e.target.value)}
//                             value={schoolStatusFilter}
//                         >
//                             <option value="">default</option>
//                             {School_Status?.map((status, i) => (
//                                 <option key={i + status} value={status}>
//                                     {status}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="status-row">
//                         <span className="text">Sort By</span>
//                         <select
//                             className="status-select"
//                             onChange={(e) => setSortBy(e.target.value)}
//                             value={sortBy}
//                         >
//                             <option value="">default</option>
//                             {School_Sort_By?.map((sort, i) => (
//                                 <option key={i + sort} value={sort}>
//                                     {sort}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="status-row">
//                         <span className="text">Min Tuition</span>
//                         <input
//                             type="number"
//                             placeholder="Minimum"
//                             value={minTuition}
//                             onChange={(e) => setMinTuition(e.target.value)}
//                         />
//                     </div>
//                     <div className="status-row">
//                         <span className="text">Max Tuition</span>
//                         <input
//                             type="number"
//                             placeholder="Maximum"
//                             value={maxTuition}
//                             onChange={(e) => setMaxTuition(e.target.value)}
//                         />
//                     </div>

//                     <div className="status-row">
//                         <span className="text">Scholarship</span>
//                         <select
//                             className="status-select"
//                             onChange={(e) => setHasScholarship(e.target.value)}
//                             value={hasScholarship}
//                         >
//                             <option value="">default</option>
//                             <option value="true">Yes</option>
//                             <option value="false">No</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div className="search-row">
//                     <input
//                         type="text"
//                         className="search"
//                         placeholder="Type Course Title"
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         value={searchQuery}
//                     />
//                     <span className="icon">
//                         <CiSearch />
//                     </span>
//                 </div>

//                 <button onClick={handleSearch} className="search-btn">
//                     Search
//                 </button>
//             </form>
//         </Wrapper>
//     );
// };








// const Wrapper = styled.div`
//     background-color: #f8f4f4;
//     padding: 1.2rem 1rem;
//     display: flex;
//     align-items: center;
//     border-radius: 6px;

//     .form {
//         width: 100%;
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//     }

//     .filter {
//         display: flex;
//         justify-content: flex-start;
//         flex-wrap: wrap;
//         align-items: center;
//         column-gap: 1.1rem;
//     }

//     .search-row {
//         display: flex;
//         align-items: center;
//     }

//     .search-btn {
//         background-color: #1a73e8;
//         color: #fff;
//         padding: 5px 10px;
//         border: none;
//         border-radius: 4px;
//         cursor: pointer;
//         transition: background-color 0.3s;
//     }

//     .search-btn:hover {
//         background-color: #135ab5;
//     }

//     /* Other existing styles... */
// `;

// export default SearchAndFilter;




























// import React, { useState } from "react";
// import styled from "styled-components";
// import { School_Status, Course_Type, School_Sort_By } from "../../utils/SchoolData"; // Adjust to match your file
// import { CiFilter, CiSearch } from "react-icons/ci";
// import { useSchoolContext } from "../../context/SchoolContext";

// const SearchAndFilter = () => {
//     const { handleSchoolFetch } = useSchoolContext();

//     const [courseTypeFilter, setCourseTypeFilter] = useState("");
//     const [schoolStatusFilter, setSchoolStatusFilter] = useState("");
//     const [sortBy, setSortBy] = useState("");
//     const [searchQuery, setSearchQuery] = useState("");
//     const [minTuition, setMinTuition] = useState(""); // New state for minimum tuition
//     const [maxTuition, setMaxTuition] = useState(""); // New state for maximum tuition
//     const [hasScholarship, setHasScholarship] = useState(""); // New state for scholarship filter


//     const handleSearch = () => {
//         const baseUrl = "${import.meta.env.VITE_API_BASE_URL}/schools?page=1&limit=5";
//         let url = baseUrl;
    
//         // Construct query params
//         const queryParams = {};
    
//         if (searchQuery) {
//             queryParams.search = searchQuery;
//         }
//         if (courseTypeFilter) {
//             queryParams.courseType = courseTypeFilter;
//         }
//         if (schoolStatusFilter) {
//             queryParams.schoolStatus = schoolStatusFilter;
//         }
//         if (sortBy) {
//             queryParams.sort = sortBy;
//         }
//         if (minTuition) {
//             queryParams.minTuition = minTuition;
//         }
//         if (maxTuition) {
//             queryParams.maxTuition = maxTuition;
//         }
//         if (hasScholarship) {
//             queryParams.scholarship = hasScholarship;
//         }
    
//         // Only append query params if any exist
//         const queryString = new URLSearchParams(queryParams).toString();
//         if (queryString) {
//             url += `&${queryString}`;
//         }
    
//         // Fetch filtered results
//         handleSchoolFetch(url);
//     };

//     return (
//         <Wrapper>
//             <form className="form" onSubmit={(e) => e.preventDefault()}>
//                 <div className="filter">
//                     <div className="hidden">
//                         <CiFilter />
//                     </div>
//                     <div className="type-row">
//                         <span className="text">Course Type</span>
//                         <select
//                             className="type-select"
//                             onChange={(e) => setCourseTypeFilter(e.target.value)}
//                             value={courseTypeFilter}
//                         >
//                             <option value="">default</option>
//                             {Course_Type?.map((type, i) => (
//                                 <option key={i + type} value={type}>
//                                     {type}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="status-row">
//                         <span className="text">School Status</span>
//                         <select
//                             className="status-select"
//                             onChange={(e) => setSchoolStatusFilter(e.target.value)}
//                             value={schoolStatusFilter}
//                         >
//                             <option value="">default</option>
//                             {School_Status?.map((status, i) => (
//                                 <option key={i + status} value={status}>
//                                     {status}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="status-row">
//                         <span className="text">Sort By</span>
//                         <select
//                             className="status-select"
//                             onChange={(e) => setSortBy(e.target.value)}
//                             value={sortBy}
//                         >
//                             <option value="">default</option>
//                             {School_Sort_By?.map((sort, i) => (
//                                 <option key={i + sort} value={sort}>
//                                     {sort}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Tuition Filter */}
//                     <div className="status-row">
//                         <span className="text">Min Tuition</span>
//                         <input
//                             type="number"
//                             placeholder="Minimum"
//                             value={minTuition}
//                             onChange={(e) => setMinTuition(e.target.value)}
//                         />
//                     </div>
//                     <div className="status-row">
//                         <span className="text">Max Tuition</span>
//                         <input
//                             type="number"
//                             placeholder="Maximum"
//                             value={maxTuition}
//                             onChange={(e) => setMaxTuition(e.target.value)}
//                         />
//                     </div>

//                     {/* Scholarship Filter */}
//                     <div className="status-row">
//                         <span className="text">Scholarship</span>
//                         <select
//                             className="status-select"
//                             onChange={(e) => setHasScholarship(e.target.value)}
//                             value={hasScholarship}
//                         >
//                             <option value="">default</option>
//                             <option value="true">Yes</option>
//                             <option value="false">No</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div className="search-row">
//                     <input
//                         type="text"
//                         className="search"
//                         placeholder="Type Course Title"
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         value={searchQuery}
//                     />
//                     <span className="icon">
//                         <CiSearch />
//                     </span>
//                 </div>

//                 <button onClick={handleSearch} className="search-btn">
//                     Search
//                 </button>
//             </form>
//         </Wrapper>
//     );
// };

// const Wrapper = styled.div`
//     background-color: #f8f4f4;
//     padding: 1.2rem 1rem;
//     display: flex;
//     align-items: center;
//     border-radius: 6px;

//     .form {
//         width: 100%;
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//     }

//     .filter {
//         display: flex;
//         justify-content: flex-start;
//         flex-wrap: wrap;
//         align-items: center;
//         column-gap: 1.1rem;
//     }

//     .search-row {
//         display: flex;
//         align-items: center;
//     }

//     .search-btn {
//         background-color: #1a73e8;
//         color: #fff;
//         padding: 5px 10px;
//         border: none;
//         border-radius: 4px;
//         cursor: pointer;
//         transition: background-color 0.3s;
//     }

//     .search-btn:hover {
//         background-color: #135ab5;
//     }

//     /* Other existing styles... */
// `;

// export default SearchAndFilter;



