import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useSearchAndFilterContext } from "../../context/SearchAndFilterContext";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const PaginationCom = () => {
    const { handleSearchAndFilter, searchResults } = useSearchAndFilterContext();
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (searchResults?.pageCount) {
            setPageCount(searchResults.pageCount);
        }
    }, [searchResults]);

    const handlePageClick = (e) => {
        const selectedPage = e.selected + 1;
        setCurrentPage(selectedPage);
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("page", selectedPage);
        handleSearchAndFilter(Object.fromEntries(searchParams.entries()));
    };

    if (pageCount <= 1) return null;

    return (
        <Wrapper>
            <div className="pagination-info">
                Page {currentPage} of {pageCount}
            </div>
            <ReactPaginate
                breakLabel="..."
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                forcePage={currentPage - 1}
                previousLabel={<FaChevronLeft />}
                nextLabel={<FaChevronRight />}
                className="pagination-list"
                pageClassName="item"
                activeClassName="active"
                previousClassName="nav-item prev-item"
                nextClassName="nav-item next-item"
                disabledClassName="disabled-item"
                breakClassName="break-item"
            />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    .pagination-info {
        font-size: 0.875rem;
        color: #718096;
        font-weight: 500;
    }

    .pagination-list {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .item,
    .nav-item,
    .break-item {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 2.5rem;
        height: 2.5rem;
        border: 1px solid #e2e8f0;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: #4a5568;
        cursor: pointer;
        transition: all 0.2s;

        &:hover:not(.disabled-item) {
            border-color: #2D8CD4;
            color: #2D8CD4;
        }
    }

    .active {
        background: linear-gradient(135deg, #2D8CD4, #1A5F8B);
        border-color: #2D8CD4;
        color: white;
    }

    .nav-item {
        background: white;
        
        &.disabled-item {
            background: #f7fafc;
            color: #a0aec0;
            cursor: not-allowed;
        }
    }

    .break-item {
        background: #f7fafc;
        color: #a0aec0;
    }

    @media (max-width: 640px) {
        .pagination-list {
            gap: 0.25rem;
        }

        .item,
        .nav-item,
        .break-item {
            min-width: 2rem;
            height: 2rem;
            font-size: 0.75rem;
        }
    }
`;

export default PaginationCom;
















































// import React, { useState, useEffect } from "react";
// import ReactPaginate from "react-paginate";
// import { useSearchAndFilterContext } from "../../context/SearchAndFilterContext";
// import styled from "styled-components";

// const PaginationCom = () => {
//     const { handleSearchAndFilter, searchResults } = useSearchAndFilterContext();
//     const [pageCount, setPageCount] = useState(0);
//     const [currentPage, setCurrentPage] = useState(1); // Add currentPage state

//     useEffect(() => {
//         if (searchResults?.pageCount) {
//             setPageCount(searchResults.pageCount);
//         }
//     }, [searchResults]);

//     // Handle page click and update the search parameters
//     const handlePageClick = (e) => {
//         const selectedPage = e.selected + 1; // Page index starts from 0 in ReactPaginate
//         setCurrentPage(selectedPage); // Update the current page
//         const searchParams = new URLSearchParams(window.location.search);
//         searchParams.set("page", selectedPage); // Set the page query parameter

//         // Pass the updated search params to the handleSearchAndFilter function
//         handleSearchAndFilter(Object.fromEntries(searchParams.entries()));
//     };

//     return (
//         <Wrapper>
//             <ReactPaginate
//                 breakLabel="..."
//                 onPageChange={handlePageClick}
//                 pageRangeDisplayed={5}
//                 pageCount={pageCount}
//                 forcePage={currentPage - 1} // Keep current page active
//                 previousLabel="<"
//                 nextLabel=">"
//                 className="pagination-list"
//                 pageClassName="item"
//                 activeClassName="active"
//                 previousClassName="prev-item"
//                 nextClassName="next-item"
//                 disabledClassName="disabled-item"
//             />
//         </Wrapper>
//     );
// };

// const Wrapper = styled.div`
//     margin-top: 20px;
//     .pagination-list {
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         gap: 10px;
//     }
//     .pagination-list .item,
//     .prev-item,
//     .next-item {
//         font-size: 15px;
//         font-weight: 500;
//         color: #000;
//         padding: 1px 8px;
//         border: 1px solid var(--color-accent);
//         border-radius: 3px;
//     }
//     .pagination-list .active {
//         border: 1px solid var(--color-accent);
//         background-color: var(--color-accent);
//         color: var(--color-white);
//     }
//     .pagination-list .disabled-item {
//         background-color: #d3d3d3;
//         border: none;
//         color: #000;
//         cursor: not-allowed;
//     }
// `;

// export default PaginationCom;



















// // import React, { useState, useEffect } from "react";
// // import ReactPaginate from "react-paginate";
// // import { useSearchAndFilterContext } from "../../context/SearchAndFilterContext";
// // import styled from "styled-components";

// // const PaginationCom = () => {
// //     const { handleSearchAndFilter, searchResults } = useSearchAndFilterContext();
// //     const [pageCount, setPageCount] = useState(0);
// //     const [currentPage, setCurrentPage] = useState(1); // Add currentPage state

// //     useEffect(() => {
// //         if (searchResults?.pageCount) {
// //             setPageCount(searchResults.pageCount);
// //         }
// //     }, [searchResults]);

// //     // Handle page click and update the search parameters
// //     const handlePageClick = (e) => {
// //         const selectedPage = e.selected + 1; // Page index starts from 0 in ReactPaginate
// //         setCurrentPage(selectedPage); // Update the current page
// //         const searchParams = new URLSearchParams(window.location.search);
// //         searchParams.set("page", selectedPage); // Set the page query parameter

// //         // Pass the updated search params to the handleSearchAndFilter function
// //         handleSearchAndFilter(Object.fromEntries(searchParams.entries()));
// //     };

// //     return (
// //         <Wrapper>
// //             <ReactPaginate
// //                 breakLabel="..."
// //                 onPageChange={handlePageClick}
// //                 pageRangeDisplayed={5}
// //                 pageCount={pageCount}
// //                 forcePage={currentPage - 1} // Keep current page active
// //                 previousLabel="<"
// //                 nextLabel=">"
// //                 className="pagination-list"
// //                 pageClassName="item"
// //                 activeClassName="active"
// //                 previousClassName="prev-item"
// //                 nextClassName="next-item"
// //                 disabledClassName="disabled-item"
// //             />
// //         </Wrapper>
// //     );
// // };

// // const Wrapper = styled.div`
// //     margin-top: 20px;
// //     .pagination-list {
// //         display: flex;
// //         justify-content: center;
// //         align-items: center;
// //         gap: 10px;
// //     }
// //     .pagination-list .item,
// //     .prev-item,
// //     .next-item {
// //         font-size: 15px;
// //         font-weight: 500;
// //         color: #000;
// //         padding: 1px 8px;
// //         border: 1px solid var(--color-accent);
// //         border-radius: 3px;
// //     }
// //     .pagination-list .active {
// //         border: 1px solid var(--color-accent);
// //         background-color: var(--color-accent);
// //         color: var(--color-white);
// //     }
// //     .pagination-list .disabled-item {
// //         background-color: #d3d3d3;
// //         border: none;
// //         color: #000;
// //         cursor: not-allowed;
// //     }
// // `;

// // export default PaginationCom;








// // ---------------WAS WORKING 


// // import React, { useState, useEffect } from "react";
// // import ReactPaginate from "react-paginate";
// // import { useSearchAndFilterContext } from "../../context/SearchAndFilterContext"; // Updated
// // // import { useSchoolContext } from "../../context/SchoolContext";
// // import styled from "styled-components";

// // const PaginationCom = () => {
// //     const { handleSearchAndFilter, searchResults } = useSearchAndFilterContext();
// //     const [pageCount, setPageCount] = useState(0);

// //     useEffect(() => {
// //         if (searchResults?.pageCount) {
// //             setPageCount(searchResults.pageCount);
// //         }
// //     }, [searchResults]);

    

// //     const handlePageClick = (e) => {
// //         const searchParams = new URLSearchParams(window.location.search);
// //         searchParams.set('page', e.selected + 1);

// //         const queryString = searchParams.toString();
// //         handleSearchAndFilter(Object.fromEntries(searchParams.entries())); // Pass the params
// //     };



// //     return (
// //         <Wrapper>
// //             <ReactPaginate
// //                 breakLabel="..."
// //                 onPageChange={handlePageClick}
// //                 pageRangeDisplayed={5}
// //                 pageCount={pageCount}
// //                 previousLabel="<"
// //                 nextLabel=">"
// //                 className="pagination-list"
// //                 pageClassName="item"
// //                 activeClassName="active"
// //                 previousClassName="prev-item"
// //                 nextClassName="next-item"
// //                 disabledClassName="disabled-item"
// //             />


// //         </Wrapper>
// //     );
// // };









// // const Wrapper = styled.div`
// //     margin-top: 20px;
// //     .pagination-list {
// //         display: flex;
// //         justify-content: center;
// //         align-items: center;
// //         gap: 10px;
// //     }
// //     .pagination-list .item,
// //     .prev-item,
// //     .next-item {
// //         font-size: 15px;
// //         font-weight: 500;
// //         color: #000;
// //         padding: 1px 8px;
// //         border: 1px solid var(--color-accent);
// //         border-radius: 3px;
// //     }
// //     .pagination-list .active {
// //         border: 1px solid var(--color-accent);
// //         background-color: var(--color-accent);
// //         color: var(--color-white);
// //     }
// //     .pagination-list .disabled-item {
// //         background-color: #d3d3d3;
// //         border: none;
// //         color: #000;
// //         cursor: not-allowed;
// //     }
// // `;

// // export default PaginationCom;











// // import React from "react";

// // import ReactPaginate from "react-paginate";
// // import { useSchoolContext } from "../../context/SchoolContext";
// // import styled from "styled-components";

// // const PaginationCom = () => {
// //     const { handleSchoolFetch, schools } = useSchoolContext();

// //     const handlePageClick = (e) => {
// //         // const newOffset = (e.selected * itemsPerPage) % items.length;
// //         // console.log(
// //         //     `User requested page number ${e.selected}, which is offset ${newOffset}`
// //         // );
// //         // setItemOffset(newOffset);
// //         handleSchoolFetch(
// //             `${import.meta.env.VITE_API_BASE_URL}/schools?page=${
// //                 e.selected + 1
// //             }&limit=5`
// //         );
// //     };

// //     return (
// //         <Wrapper>
// //             <ReactPaginate
// //                 breakLabel="..."
// //                 onPageChange={handlePageClick}
// //                 pageRangeDisplayed={5}
// //                 pageCount={schools?.pageCount}
// //                 previousLabel="<"
// //                 nextLabel=">"
// //                 renderOnZeroPageCount={null}
// //                 className="job-list"
// //                 pageClassName="item"
// //                 activeClassName="active"
// //                 previousClassName="prev-item"
// //                 nextClassName="next-item"
// //                 disabledClassName="disabled-item"
// //             />
// //         </Wrapper>
// //     );
// // };




// // const Wrapper = styled.div`
// //     margin-top: 20px;
// //     .job-list {
// //         display: flex;
// //         justify-content: center;
// //         align-items: center;
// //         gap: 10px;
// //     }
// //     .job-list .item,
// //     .prev-item,
// //     .next-item {
// //         font-size: 15px;
// //         font-weight: 500;
// //         color: #000;
// //         padding: 1px 8px;
// //         border: 1px solid var(--color-accent);
// //         border-radius: 3px;
// //     }
// //     .job-list .active {
// //         border: 1px solid var(--color-accent);
// //         background-color: var(--color-accent);
// //         color: var(--color-white);
// //     }
// //     .job-list .disabled-item {
// //         background-color: #d3d3d3;
// //         border: none;
// //         color: #000;
// //         cursor: not-allowed;
// //     }
// // `;
// // export default PaginationCom;
