import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { School_Status, Course_Type, School_Sort_By } from "../../utils/SchoolData";
import { useSearchAndFilterContext } from "../../context/SearchAndFilterContext";
import { FaChevronUp, FaChevronDown, FaSearch, FaFilter, FaTimes } from "react-icons/fa";

const SearchAndFilter = () => {
    const { handleSearchAndFilter, searchResults } = useSearchAndFilterContext();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Form state
    const [courseTypeFilter, setCourseTypeFilter] = useState("");
    const [schoolStatusFilter, setSchoolStatusFilter] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [minTuition, setMinTuition] = useState("");
    const [maxTuition, setMaxTuition] = useState("");
    const [hasScholarship, setHasScholarship] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const handleSearch = () => {
        const searchParams = {};

        if (searchQuery.trim()) searchParams.search = searchQuery;
        if (courseTypeFilter) searchParams.courseType = courseTypeFilter;
        if (schoolStatusFilter) searchParams.schoolStatus = schoolStatusFilter;
        if (sortBy) searchParams.sort = sortBy;
        if (minTuition) searchParams.minTuition = minTuition;
        if (maxTuition) searchParams.maxTuition = maxTuition;

        if (hasScholarship === "true") searchParams.scholarship = true;
        else if (hasScholarship === "false") searchParams.scholarship = false;

        const additionalData = { email, phone };

        if (Object.keys(searchParams).length > 0 || email || phone) {
            handleSearchAndFilter(searchParams, additionalData);
            if (isMobile) setIsCollapsed(true);
        } else {
            alert("Please provide at least one search query or filter.");
        }
    };

    const clearFilters = () => {
        setCourseTypeFilter("");
        setSchoolStatusFilter("");
        setSortBy("");
        setSearchQuery("");
        setMinTuition("");
        setMaxTuition("");
        setHasScholarship("");
    };

    return (
        <Wrapper>
            <FormContainer className={isCollapsed ? 'collapsed' : ''}>
                {/* Mobile Header */}
                {isMobile && (
                    <MobileHeader>
                        <div className="mobile-title">
                            <FaFilter className="icon" />
                            <span>Search Filters</span>
                        </div>
                        <button 
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="mobile-toggle"
                        >
                            {isCollapsed ? <FaChevronDown /> : <FaChevronUp />}
                        </button>
                    </MobileHeader>
                )}

                <AnimatePresence>
                    {(!isCollapsed || !isMobile) && (
                        <motion.form 
                            className="form"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSearch();
                            }}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="form-header">
                                <h3 className="form-title">Program Search</h3>
                                <button 
                                    type="button" 
                                    onClick={clearFilters}
                                    className="clear-btn"
                                >
                                    <FaTimes />
                                    Clear All
                                </button>
                            </div>

                            {/* Contact Information */}
                            <div className="form-section">
                                <h4 className="section-title">Contact Information</h4>
                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-input"
                                        placeholder="your.email@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone" className="form-label">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="form-input"
                                        placeholder="+1 (555) 123-4567"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Search Criteria */}
                            <div className="form-section">
                                <h4 className="section-title">Search Criteria</h4>
                                
                                <div className="form-group">
                                    <label htmlFor="search" className="form-label">
                                        Search Programs
                                    </label>
                                    <div className="input-icon">
                                        <input
                                            type="text"
                                            id="search"
                                            className="form-input"
                                            placeholder="Computer Science, Business, Engineering..."
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            value={searchQuery}
                                        />
                                        <FaSearch className="icon" />
                                    </div>
                                </div>

                                <div className="form-row">
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
                                            <option value="">All Course Types</option>
                                            {Course_Type.map((type, i) => (
                                                <option key={i + type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="degreeType" className="form-label">
                                            Degree Level
                                        </label>
                                        <select
                                            id="degreeType"
                                            className="form-select"
                                            onChange={(e) => setSchoolStatusFilter(e.target.value)}
                                            value={schoolStatusFilter}
                                        >
                                            <option value="">All Degrees</option>
                                            {School_Status.map((status, i) => (
                                                <option key={i + status} value={status}>
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="minTuition" className="form-label">
                                            Min Tuition ($)
                                        </label>
                                        <input
                                            type="number"
                                            id="minTuition"
                                            className="form-input"
                                            placeholder="0"
                                            value={minTuition}
                                            onChange={(e) => setMinTuition(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="maxTuition" className="form-label">
                                            Max Tuition ($)
                                        </label>
                                        <input
                                            type="number"
                                            id="maxTuition"
                                            className="form-input"
                                            placeholder="50000"
                                            value={maxTuition}
                                            onChange={(e) => setMaxTuition(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="scholarship" className="form-label">
                                            Scholarship Available
                                        </label>
                                        <select
                                            id="scholarship"
                                            className="form-select"
                                            onChange={(e) => setHasScholarship(e.target.value)}
                                            value={hasScholarship}
                                        >
                                            <option value="">All Options</option>
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
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
                                            <option value="">Recommended</option>
                                            {School_Sort_By.map((sort, i) => (
                                                <option key={i + sort} value={sort}>
                                                    {sort}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="form-btn primary">
                                <FaSearch className="btn-icon" />
                                Find Programs
                            </button>

                            <button type="button" onClick={clearFilters} className="form-btn secondary">
                                Clear Filters
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </FormContainer>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    background-color: transparent;
`;

const FormContainer = styled.div`
    .form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        padding: 1.5rem;
    }

    .form-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }

    .form-title {
        font-size: 1.25rem;
        font-weight: 700;
        color: #2d3748;
        margin: 0;
    }

    .clear-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: none;
        border: none;
        color: #718096;
        font-size: 0.875rem;
        cursor: pointer;
        transition: color 0.2s;

        &:hover {
            color: #e53e3e;
        }
    }

    .form-section {
        border: 1px solid #e2e8f0;
        border-radius: 0.75rem;
        padding: 1.5rem;
        background: #f7fafc;
    }

    .section-title {
        font-size: 1rem;
        font-weight: 600;
        color: #2d3748;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #e2e8f0;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
    }

    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    .form-label {
        font-size: 0.875rem;
        font-weight: 500;
        color: #4a5568;
        margin-bottom: 0.5rem;
    }

    .form-input,
    .form-select {
        padding: 0.75rem;
        border: 1px solid #cbd5e0;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        transition: all 0.2s;
        background: white;

        &:focus {
            outline: none;
            border-color: #2D8CD4;
            box-shadow: 0 0 0 3px rgba(45, 140, 212, 0.1);
        }
    }

    .input-icon {
        position: relative;
        display: flex;
        align-items: center;

        .form-input {
            padding-right: 2.5rem;
            width: 100%;
        }

        .icon {
            position: absolute;
            right: 0.75rem;
            color: #a0aec0;
        }
    }

    .form-btn {
        padding: 0.875rem 1.5rem;
        border: none;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;

        &.primary {
            background: linear-gradient(135deg, #2D8CD4, #1A5F8B);
            color: white;

            &:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(45, 140, 212, 0.3);
            }
        }

        &.secondary {
            background: white;
            color: #4a5568;
            border: 1px solid #cbd5e0;

            &:hover {
                background: #f7fafc;
                border-color: #a0aec0;
            }
        }
    }
`;

const MobileHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background: #2D8CD4;
    color: white;

    .mobile-title {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
    }

    .mobile-toggle {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
    }
`;

export default SearchAndFilter;





















































// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { School_Status, Course_Type, School_Sort_By } from "../../utils/SchoolData";
// import { useSearchAndFilterContext } from "../../context/SearchAndFilterContext";
// import { FaChevronUp, FaChevronDown, FaSearch } from "react-icons/fa";

// const SearchAndFilter = () => {
//     const { handleSearchAndFilter, searchResults } = useSearchAndFilterContext();
//     const [isCollapsed, setIsCollapsed] = useState(false);
//     const [isMobile, setIsMobile] = useState(false);

//     // Form state
//     const [courseTypeFilter, setCourseTypeFilter] = useState("");
//     const [schoolStatusFilter, setSchoolStatusFilter] = useState("");
//     const [sortBy, setSortBy] = useState("");
//     const [searchQuery, setSearchQuery] = useState("");
//     const [minTuition, setMinTuition] = useState("");
//     const [maxTuition, setMaxTuition] = useState("");
//     const [hasScholarship, setHasScholarship] = useState("");
//     const [email, setEmail] = useState("");
//     const [phone, setPhone] = useState("");

//     // Check if mobile on mount and resize
//     useEffect(() => {
//         const checkIfMobile = () => {
//             setIsMobile(window.innerWidth < 768);
//         };
        
//         checkIfMobile();
//         window.addEventListener('resize', checkIfMobile);
        
//         return () => window.removeEventListener('resize', checkIfMobile);
//     }, []);

//     // Collapse form when results appear on mobile
//     useEffect(() => {
//         if (isMobile && searchResults && searchResults.length > 0) {
//             setIsCollapsed(true);
//         }
//     }, [searchResults, isMobile]);

//     const handleSearch = () => {
//         const searchParams = {};

//         if (searchQuery.trim()) searchParams.search = searchQuery;
//         if (courseTypeFilter) searchParams.courseType = courseTypeFilter;
//         if (schoolStatusFilter) searchParams.schoolStatus = schoolStatusFilter;
//         if (sortBy) searchParams.sort = sortBy;
//         if (minTuition) searchParams.minTuition = minTuition;
//         if (maxTuition) searchParams.maxTuition = maxTuition;

//         if (hasScholarship === "true") searchParams.scholarship = true;
//         else if (hasScholarship === "false") searchParams.scholarship = false;

//         const additionalData = { email, phone };

//         if (Object.keys(searchParams).length > 0 || email || phone) {
//             handleSearchAndFilter(searchParams, additionalData);
//         } else {
//             alert("Please provide at least one search query or filter.");
//         }
//     };

//     return (
//         <Wrapper>
//             <FormContainer className={isCollapsed ? 'collapsed' : ''}>
//                 {/* Collapse Toggle Button (Mobile Only) */}
//                 {isMobile && (
//                     <ToggleButton onClick={() => setIsCollapsed(!isCollapsed)}>
//                         {isCollapsed ? (
//                             <>
//                                 <FaSearch className="icon" />
//                                 <span>Show Search Form</span>
//                                 <FaChevronDown className="arrow" />
//                             </>
//                         ) : (
//                             <>
//                                 <FaSearch className="icon" />
//                                 <span>Hide Search Form</span>
//                                 <FaChevronUp className="arrow" />
//                             </>
//                         )}
//                     </ToggleButton>
//                 )}

//                 <form className="form" onSubmit={(e) => {
//                     e.preventDefault();
//                     handleSearch();
//                 }}>
//                     <h2 className="form-title">Fill Program Form</h2>

//                     {/* Email Field */}
//                     <div className="form-group">
//                         <label htmlFor="email" className="form-label">
//                             Email
//                         </label>
//                         <input
//                             type="email"
//                             id="email"
//                             className="form-input"
//                             placeholder="Enter your email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>

//                     {/* Phone Field */}
//                     <div className="form-group">
//                         <label htmlFor="phone" className="form-label">
//                             Phone Number
//                         </label>
//                         <input
//                             type="tel"
//                             id="phone"
//                             className="form-input"
//                             placeholder="Enter your phone number"
//                             value={phone}
//                             onChange={(e) => setPhone(e.target.value)}
//                             required
//                         />
//                     </div>

//                     {/* Search Bar */}
//                     <div className="form-group">
//                         <label htmlFor="search" className="form-label">
//                             Search by Course Title
//                         </label>
//                         <div className="input-icon">
//                             <input
//                                 type="text"
//                                 id="search"
//                                 className="form-input"
//                                 placeholder="Enter course title"
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 value={searchQuery}
//                             />
//                         </div>
//                     </div>

//                     {/* Course Type Filter */}
//                     <div className="form-group">
//                         <label htmlFor="courseType" className="form-label">
//                             Course Type
//                         </label>
//                         <select
//                             id="courseType"
//                             className="form-select"
//                             onChange={(e) => setCourseTypeFilter(e.target.value)}
//                             value={courseTypeFilter}
//                         >
//                             <option value="">Select</option>
//                             {Course_Type.map((type, i) => (
//                                 <option key={i + type} value={type}>
//                                     {type}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Degree Type Filter */}
//                     <div className="form-group">
//                         <label htmlFor="degreeType" className="form-label">
//                             Degree Type
//                         </label>
//                         <select
//                             id="degreeType"
//                             className="form-select"
//                             onChange={(e) => setSchoolStatusFilter(e.target.value)}
//                             value={schoolStatusFilter}
//                         >
//                             <option value="">Select</option>
//                             {School_Status.map((status, i) => (
//                                 <option key={i + status} value={status}>
//                                     {status}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Sort By */}
//                     <div className="form-group">
//                         <label htmlFor="sortBy" className="form-label">
//                             Sort By
//                         </label>
//                         <select
//                             id="sortBy"
//                             className="form-select"
//                             onChange={(e) => setSortBy(e.target.value)}
//                             value={sortBy}
//                         >
//                             <option value="">Select</option>
//                             {School_Sort_By.map((sort, i) => (
//                                 <option key={i + sort} value={sort}>
//                                     {sort}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Min Tuition */}
//                     <div className="form-group">
//                         <label htmlFor="minTuition" className="form-label">
//                             Min Tuition
//                         </label>
//                         <input
//                             type="number"
//                             id="minTuition"
//                             className="form-input"
//                             placeholder="Enter minimum"
//                             value={minTuition}
//                             onChange={(e) => setMinTuition(e.target.value)}
//                         />
//                     </div>

//                     {/* Max Tuition */}
//                     <div className="form-group">
//                         <label htmlFor="maxTuition" className="form-label">
//                             Max Tuition
//                         </label>
//                         <input
//                             type="number"
//                             id="maxTuition"
//                             className="form-input"
//                             placeholder="Enter maximum"
//                             value={maxTuition}
//                             onChange={(e) => setMaxTuition(e.target.value)}
//                         />
//                     </div>

//                     {/* Scholarship Filter */}
//                     <div className="form-group">
//                         <label htmlFor="scholarship" className="form-label">
//                             Scholarship
//                         </label>
//                         <select
//                             id="scholarship"
//                             className="form-select"
//                             onChange={(e) => setHasScholarship(e.target.value)}
//                             value={hasScholarship}
//                         >
//                             <option value="">Select</option>
//                             <option value="true">Yes</option>
//                             <option value="false">No</option>
//                         </select>
//                     </div>

//                     <button type="submit" className="form-btn">
//                         Get Program
//                     </button>
//                 </form>
//             </FormContainer>
//         </Wrapper>
//     );
// };

// const Wrapper = styled.div`
//     background-color: #f8f4f4;
//     padding: 1.5rem;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//     border-radius: 8px;
//     max-width: 500px;
//     margin: auto;

//     @media (min-width: 768px) {
//         position: sticky;
//         top: 20px;
//     }
// `;

// const FormContainer = styled.div`
//     .form {
//         display: flex;
//         flex-direction: column;
//         gap: 1rem;
//     }

//     .form-title {
//         text-align: center;
//         font-size: 1.5rem;
//         color: #333;
//         margin-bottom: 1rem;
//     }

//     .form-group {
//         display: flex;
//         flex-direction: column;
//     }

//     .form-label {
//         font-size: 0.9rem;
//         color: #555;
//         margin-bottom: 0.4rem;
//     }

//     .form-input,
//     .form-select {
//         padding: 8px;
//         border: 1px solid #ccc;
//         border-radius: 4px;
//         font-size: 1rem;
//         box-sizing: border-box;
//     }

//     .form-input:focus,
//     .form-select:focus {
//         outline: none;
//         border-color: #1a73e8;
//     }

//     .input-icon {
//         position: relative;
//         display: flex;
//         align-items: center;
//     }

//     .form-input {
//         padding-right: 30px;
//     }

//     .icon {
//         position: absolute;
//         right: 10px;
//         font-size: 1.2rem;
//         color: #666;
//     }

//     .form-btn {
//         padding: 10px;
//         background-color: #1a73e8;
//         color: white;
//         border: none;
//         border-radius: 4px;
//         font-size: 1rem;
//         cursor: pointer;
//         transition: background-color 0.3s;
//     }

//     .form-btn:hover {
//         background-color: #135ab5;
//     }

//     @media (max-width: 767px) {
//         transition: max-height 0.3s ease;
//         overflow: hidden;

//         &.collapsed {
//             max-height: 60px;
//         }
//     }
// `;

// const ToggleButton = styled.button`
//     display: none;
    
//     @media (max-width: 767px) {
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         width: 100%;
//         padding: 10px;
//         background-color: #2D8CD4;
//         color: white;
//         border: none;
//         border-radius: 4px;
//         font-size: 1rem;
//         cursor: pointer;
//         margin-bottom: 1rem;
        
//         .icon {
//             margin-right: 8px;
//         }
        
//         .arrow {
//             margin-left: 8px;
//         }
//     }
// `;

// export default SearchAndFilter;








