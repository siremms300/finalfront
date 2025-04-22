import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useVisitor } from "../context/VisitorContext";
import LoadingComTwo from "../components/shared/LoadingComTwo";
import { CiSquarePlus } from "react-icons/ci";
import { FaFileExport } from "react-icons/fa";
import styled from "styled-components";
import Swal from "sweetalert2";

const ManageVisitor = () => {
    const { getAllVisitorRegistrations } = useVisitor();

    const {
        isLoading,
        isError,
        data: apiResponse,
        error,
        refetch,
    } = useQuery({
        queryKey: ["visitor-registrations"],
        queryFn: getAllVisitorRegistrations,
    });

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const deleteRegistration = async (id) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_API_BASE_URL}/visitor/registrations/${id}`,
                { withCredentials: true }
            );
            refetch();
            Swal.fire("Deleted!", "Visitor registration removed successfully.", "success");
        } catch (error) {
            Swal.fire("Error!", error?.response?.data?.message || "Deletion failed", "error");
        }
    };

    const exportToCSV = (data) => {
        // Prepare CSV content
        const headers = [
            "No.", "Full Name", "Email", "Phone", "Preferred Course", 
            "Preferred Country", "Registration Date"
        ].join(',');

        const rows = data.map((reg, index) => [
            index + 1,
            `"${reg.fullName}"`,
            `"${reg.email}"`,
            `"${reg.phoneNumber}"`,
            `"${reg.preferredCourse || 'N/A'}"`,
            `"${reg.preferredCountry || 'N/A'}"`,
            `"${formatDate(reg.registrationDate || reg.createdAt)}"`
        ].join(','));

        const csvContent = [headers, ...rows].join('\n');

        // Create download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'VisitorRegistrations.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (isLoading) {
        return <LoadingComTwo />;
    }

    if (isError) {
        return (
            <div className="text-center mt-12">
                <h2 className="text-red-600 text-lg font-bold">
                    Error loading visitor registrations
                </h2>
                <button 
                    onClick={() => refetch()}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Retry
                </button>
            </div>
        );
    }

    // Extract registrations from API response
    const registrations = apiResponse?.data || apiResponse || [];

    if (!registrations.length) {
        return (
            <div className="text-center mt-12">
                <h2 className="text-gray-600 text-lg font-bold">
                    No visitor registrations found
                </h2>
                <button 
                    onClick={() => refetch()}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Refresh
                </button>
            </div>
        );
    }

    return (
        <Wrapper>
            <div className="header-row">
                <div className="title-row">
                    Manage Visitor Registrations
                    <CiSquarePlus className="ml-1 text-xl md:text-2xl" />
                </div>
                <button 
                    onClick={() => exportToCSV(registrations)}
                    className="export-btn"
                >
                    <FaFileExport className="mr-2" />
                    Export to CSV
                </button>
            </div>
            <div className="content-row">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Preferred Course</th>
                            <th>Preferred Country</th>
                            <th>Registered</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registrations.map((reg, index) => (
                            <tr key={reg._id}>
                                <td>{index + 1}</td>
                                <td>{reg.fullName}</td>
                                <td>{reg.email}</td>
                                <td>{reg.phoneNumber}</td>
                                <td>{reg.preferredCourse || 'N/A'}</td>
                                <td>{reg.preferredCountry || 'N/A'}</td>
                                <td>{formatDate(reg.registrationDate || reg.createdAt)}</td>
                                <td>
                                    <button
                                        className="action delete"
                                        onClick={() => 
                                            Swal.fire({
                                                title: "Delete Registration?",
                                                text: "This cannot be undone",
                                                icon: "warning",
                                                showCancelButton: true,
                                                confirmButtonColor: "#d33",
                                                cancelButtonColor: "#3085d6",
                                                confirmButtonText: "Delete"
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    deleteRegistration(reg._id);
                                                }
                                            })
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    padding: 2rem;
    
    .header-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }
    
    .title-row {
        display: flex;
        align-items: center;
        font-size: 1.5rem;
        font-weight: 600;
        color: #2d3748;
    }
    
    .export-btn {
        display: flex;
        align-items: center;
        background-color: #2d8cd4;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-weight: 500;
        transition: background-color 0.2s;
        
        &:hover {
            background-color: #1a5f8b;
        }
    }
    
    .content-row {
        overflow-x: auto;
        margin-top: 1.5rem;
    }
    
    .table {
        width: 100%;
        border-collapse: collapse;
    }
    
    .table th, .table td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #e2e8f0;
    }
    
    .table th {
        background-color: #2d8cd4;
        color: white;
        font-weight: 500;
    }
    
    .table tr:nth-child(even) {
        background-color: #f7fafc;
    }
    
    .action {
        padding: 6px 12px;
        border-radius: 4px;
        font-weight: 500;
        cursor: pointer;
        
        &.delete {
            background-color: #e53e3e;
            color: white;
            
            &:hover {
                background-color: #c53030;
            }
        }
    }
`;

export default ManageVisitor;