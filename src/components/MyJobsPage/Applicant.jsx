
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import styled from "styled-components";
import LoadingComTwo from "../shared/LoadingComTwo";

const Applicant = () => {
    const {
        isPending,
        isError,
        data: schools,
        error,
    } = useQuery({
        queryKey: ["my-schools"],
        queryFn: async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/application/applicant-schools`,
                { withCredentials: true }
            );
            return response?.data?.result;
        },
    });

    if (isPending) {
        return <LoadingComTwo />;
    }

    if (isError) {
        return <h2 className="">{error?.message}</h2>;
    }

    if (schools) {
        console.log(schools);
    }

    if (!schools?.length) {
        return <h2 className="">No schools found</h2>;
    }

    return (
        <Wrapper>
            <div className="content-row">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>School Name</th>
                            <th>Location</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schools?.map((school, index) => {
                            let i = index + 1 < 10 ? `0${index + 1}` : index + 1;
                            return (
                                <tr key={school?.schoolId?._id}>
                                    <td>{i}</td>
                                    <td>{school?.schoolId?.course}</td>
                                    <td>{school?.schoolId?.university}</td>
                                    <td className="action-row">
                                        {school?.status}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Wrapper>
    );
};


const Wrapper = styled.section`
    .title-row {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: calc(0.9rem + 0.4vw);
        text-transform: capitalize;
        letter-spacing: 1px;
        font-weight: 600;
        opacity: 0.85;
        color: var(--color-black);
        position: relative;
    }
    .title-row:before {
        content: "";
        position: absolute;
        bottom: -4px;
        left: 0;
        width: calc(30px + 0.7vw);
        height: calc(2px + 0.1vw);
        background-color: var(--color-primary);
    }
    .content-row {
        overflow-x: auto;
        margin-top: calc(2rem + 0.5vw);
    }
    .table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
        border: 1px solid #ddd;
        border-radius: 8px;
    }
    .table thead {
        background-color: var(--color-accent);
        color: var(--color-white);
        font-size: 14px;
        letter-spacing: 1px;
        font-weight: 400;
        text-transform: capitalize;
    }

    .table th,
    .table td {
        text-align: left;
        padding: 12px;
    }

    .table tbody tr {
        font-size: 15px;
        font-weight: 400;
        text-transform: capitalize;
        letter-spacing: 1px;
        transition: all 0.2s linear;
    }

    .table tbody tr:nth-child(even) {
        background-color: #00000011;
    }

    .table .action-row {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        column-gap: 12px;
    }
    .table .action-row .action {
        font-size: 21px;
    }
    .action.view {
        color: #22d637;
    }
    .action.edit {
        color: #f1c72f;
    }
    .action.delete {
        color: #f1322f;
    }
`;
export default Applicant;
