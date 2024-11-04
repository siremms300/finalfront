
import axios from "axios";
import React from "react";
import styled from "styled-components";
import LoadingComTwo from "../shared/LoadingComTwo";

import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { updateHandler } from "../../utils/FetchHandlers";
import Swal from "sweetalert2";
const queryClient = new QueryClient();

const Recruiter = () => {
    const {
        isPending,
        isError,
        data: schools,
        error,
        refetch,
    } = useQuery({
        queryKey: ["rec-schools"],
        queryFn: async () => {
            const response = await axios.get(

                `${import.meta.env.VITE_API_BASE_URL}/application/recruiter-schools`, // Update to reflect schools

                {
                    withCredentials: true,
                }
            );
            return response?.data?.result;
        },
    });

    const updateSchoolStatusMutation = useMutation({
        mutationFn: updateHandler,
        onSuccess: (data, variable, context) => {
            refetch();
            Swal.fire({
                icon: "success",
                title: "Status Updated",
                text: data?.message,
            });
        },
        onError: (error, variables, context) => {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error?.response?.data,
            });
        },
    });

    const handleAcceptStatus = (id, recruiterId) => {
        const newStatus = { recruiterId, status: "accepted" };
        updateSchoolStatusMutation.mutate({
            body: newStatus,
            url: `${import.meta.env.VITE_API_BASE_URL}/application/${id}`, // Update to reflect schools
        });
    };

    const handleRejectStatus = (id, recruiterId) => {
        const newStatus = { recruiterId, status: "rejected" };
        updateSchoolStatusMutation.mutate({
            body: newStatus,
            url: `${import.meta.env.VITE_API_BASE_URL}/application/${id}`, // Update to reflect schools
        });
    };

    const handleResumeView = (drive) => {
        const newWindow = window.open(drive, "_blank");
        if (newWindow) {
            newWindow.focus();
        } else {
            alert("Please allow pop-ups for this site to open the document.");
        }
    };

    if (isPending) {
        return <LoadingComTwo />;
    }

    if (isError) {
        return (
            <h2 className="mt-8 text-2xl font-semibold text-center text-red-600">
                -- {error?.response?.data} --
            </h2>
        );
    }

    if (schools) {
        // console.log(schools);
    }

    if (!schools?.length === 0) {
        return <h2 className="">No Application found</h2>;
    }

    return (
        <Wrapper>
            <div className="content-row">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>School</th>
                            <th>University</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schools?.map((school, index) => {
                            let i =
                                index + 1 < 10 ? `0${index + 1}` : index + 1;
                            return (
                                <tr key={school?._id}>
                                    <td>{i}</td>
                                    <td>{school?.schoolId?.course}</td> {/* Update to schoolId */}
                                    <td>{school?.schoolId?.university}</td>
                                    <td>{school?.status}</td>
                                    <td className="action-row">
                                        <button
                                            className="action resume"
                                            onClick={() =>
                                                handleResumeView(school.resume)
                                            }
                                        >
                                            View Application
                                        </button>

                                        {school?.status === "pending" && (
                                            <>
                                                <button
                                                    className="action accept"
                                                    onClick={() =>
                                                        handleAcceptStatus(
                                                            school._id,
                                                            school?.recruiterId
                                                        )
                                                    }
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    className="action reject"
                                                    onClick={() =>
                                                        handleRejectStatus(
                                                            school._id,
                                                            school?.recruiterId
                                                        )
                                                    }
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}

                                        {school?.status === "accepted" && (
                                            <button
                                                className="action reject"
                                                onClick={() =>
                                                    handleRejectStatus(
                                                        school._id,
                                                        school?.recruiterId
                                                    )
                                                }
                                            >
                                                Reject
                                            </button>
                                        )}

                                        {school?.status === "rejected" && (
                                            <button
                                                className="action accept"
                                                onClick={() =>
                                                    handleAcceptStatus(
                                                        school._id,
                                                        school?.recruiterId
                                                    )
                                                }
                                            >
                                                Accept
                                            </button>
                                        )}
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
        font-size: 12px;
        text-transform: capitalize;
        font-weight: 500;
        color: #fff;
        padding: 1px 6px;
        border-radius: 4px;
    }
    .action.accept {
        background-color: #168e24;
    }
    .action.reject {
        background-color: #f1322f;
    }
    .action.resume {
        background-color: #ef9712;
    }
`;

export default Recruiter;
