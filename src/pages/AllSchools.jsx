import React from "react";
import styled from "styled-components";

import SchoolsListCom from "../components/AllJobsPage/SchoolsListCom";
import SearchAndFilter from "../components/AllJobsPage/SearchAndFilter";

import Navbar from "../components/shared/Navbar";
import PaginationCom from "../components/AllJobsPage/PaginationCom";

const AllSchools = () => {
    return (
        <>
            <Navbar />
            <Wrapper>
                <SearchAndFilter />
                <SchoolsListCom />
                <PaginationCom />
            </Wrapper>
        </>
    );
};

const Wrapper = styled.section`
    padding: 2rem 1.5rem;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
`;
export default AllSchools;
