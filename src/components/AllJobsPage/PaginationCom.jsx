
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useSearchAndFilterContext } from "../../context/SearchAndFilterContext";
import styled from "styled-components";

const PaginationCom = () => {
    const { handleSearchAndFilter, searchResults } = useSearchAndFilterContext();
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1); // Add currentPage state

    useEffect(() => {
        if (searchResults?.pageCount) {
            setPageCount(searchResults.pageCount);
        }
    }, [searchResults]);

    // Handle page click and update the search parameters
    const handlePageClick = (e) => {
        const selectedPage = e.selected + 1; // Page index starts from 0 in ReactPaginate
        setCurrentPage(selectedPage); // Update the current page
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("page", selectedPage); // Set the page query parameter

        // Pass the updated search params to the handleSearchAndFilter function
        handleSearchAndFilter(Object.fromEntries(searchParams.entries()));
    };

    return (
        <Wrapper>
            <ReactPaginate
                breakLabel="..."
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                forcePage={currentPage - 1} // Keep current page active
                previousLabel="<"
                nextLabel=">"
                className="pagination-list"
                pageClassName="item"
                activeClassName="active"
                previousClassName="prev-item"
                nextClassName="next-item"
                disabledClassName="disabled-item"
            />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin-top: 20px;
    .pagination-list {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
    .pagination-list .item,
    .prev-item,
    .next-item {
        font-size: 15px;
        font-weight: 500;
        color: #000;
        padding: 1px 8px;
        border: 1px solid var(--color-accent);
        border-radius: 3px;
    }
    .pagination-list .active {
        border: 1px solid var(--color-accent);
        background-color: var(--color-accent);
        color: var(--color-white);
    }
    .pagination-list .disabled-item {
        background-color: #d3d3d3;
        border: none;
        color: #000;
        cursor: not-allowed;
    }
`;

export default PaginationCom;








// ---------------WAS WORKING 


// import React, { useState, useEffect } from "react";
// import ReactPaginate from "react-paginate";
// import { useSearchAndFilterContext } from "../../context/SearchAndFilterContext"; // Updated
// // import { useSchoolContext } from "../../context/SchoolContext";
// import styled from "styled-components";

// const PaginationCom = () => {
//     const { handleSearchAndFilter, searchResults } = useSearchAndFilterContext();
//     const [pageCount, setPageCount] = useState(0);

//     useEffect(() => {
//         if (searchResults?.pageCount) {
//             setPageCount(searchResults.pageCount);
//         }
//     }, [searchResults]);

    

//     const handlePageClick = (e) => {
//         const searchParams = new URLSearchParams(window.location.search);
//         searchParams.set('page', e.selected + 1);

//         const queryString = searchParams.toString();
//         handleSearchAndFilter(Object.fromEntries(searchParams.entries())); // Pass the params
//     };



//     return (
//         <Wrapper>
//             <ReactPaginate
//                 breakLabel="..."
//                 onPageChange={handlePageClick}
//                 pageRangeDisplayed={5}
//                 pageCount={pageCount}
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











// import React from "react";

// import ReactPaginate from "react-paginate";
// import { useSchoolContext } from "../../context/SchoolContext";
// import styled from "styled-components";

// const PaginationCom = () => {
//     const { handleSchoolFetch, schools } = useSchoolContext();

//     const handlePageClick = (e) => {
//         // const newOffset = (e.selected * itemsPerPage) % items.length;
//         // console.log(
//         //     `User requested page number ${e.selected}, which is offset ${newOffset}`
//         // );
//         // setItemOffset(newOffset);
//         handleSchoolFetch(
//             `${import.meta.env.VITE_API_BASE_URL}/schools?page=${
//                 e.selected + 1
//             }&limit=5`
//         );
//     };

//     return (
//         <Wrapper>
//             <ReactPaginate
//                 breakLabel="..."
//                 onPageChange={handlePageClick}
//                 pageRangeDisplayed={5}
//                 pageCount={schools?.pageCount}
//                 previousLabel="<"
//                 nextLabel=">"
//                 renderOnZeroPageCount={null}
//                 className="job-list"
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
//     .job-list {
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         gap: 10px;
//     }
//     .job-list .item,
//     .prev-item,
//     .next-item {
//         font-size: 15px;
//         font-weight: 500;
//         color: #000;
//         padding: 1px 8px;
//         border: 1px solid var(--color-accent);
//         border-radius: 3px;
//     }
//     .job-list .active {
//         border: 1px solid var(--color-accent);
//         background-color: var(--color-accent);
//         color: var(--color-white);
//     }
//     .job-list .disabled-item {
//         background-color: #d3d3d3;
//         border: none;
//         color: #000;
//         cursor: not-allowed;
//     }
// `;
// export default PaginationCom;
