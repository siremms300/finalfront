
import React, { useState } from "react";  // Add { useState } here
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useApplicationContext } from "../context/ApplicationContext";
import LoadingComTwo from "../components/shared/LoadingComTwo";
import { FaFileExport, FaSearch } from "react-icons/fa";
import styled from "styled-components";
import Swal from "sweetalert2";

const Applications = () => {
    const { getAllApplications, applicationLoading } = useApplicationContext();
    const [searchTerm, setSearchTerm] = useState("");

    const {
        isLoading,
        isError,
        data: apiResponse,
        error,
        refetch,
    } = useQuery({
        queryKey: ["applications"],
        queryFn: getAllApplications,
    });

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const deleteApplication = async (id) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_API_BASE_URL}/application/${id}`,
                { withCredentials: true }
            );
            refetch();
            Swal.fire("Deleted!", "Application removed successfully.", "success");
        } catch (error) {
            Swal.fire("Error!", error?.response?.data?.message || "Deletion failed", "error");
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await axios.patch(
                `${import.meta.env.VITE_API_BASE_URL}/application/${id}`,
                { status: newStatus },
                { withCredentials: true }
            );
            refetch();
            Swal.fire("Updated!", "Application status updated.", "success");
        } catch (error) {
            Swal.fire("Error!", error?.response?.data?.message || "Update failed", "error");
        }
    };


    const exportToCSV = (data) => {
        // CSV header row
        const headers = [
            "No.",
            "Applicant",
            "Email",
            "Phone",
            "University",
            "Course",
            "Tuition",
            "Location",
            "Status",
            "Applied Date",
            "Resume"
        ].join(',');
    
        // Format each data row
        const rows = data.map((app, index) => {
            return [
                index + 1,  // No.
                `"${app.applicantDetails?.username || 'N/A'}"`,  // Applicant
                `"${app.applicantDetails?.email || 'N/A'}"`,  // Email
                `"${app.phoneNumber || 'N/A'}"`,  // Phone
                `"${app.schoolDetails?.university || 'N/A'}"`,  // University
                `"${app.schoolDetails?.course || 'N/A'}"`,  // Course
                `"$${app.schoolDetails?.tuition?.toLocaleString() || 'N/A'}"`,  // Tuition
                `"${app.schoolDetails?.location || 'N/A'}"`,  // Location
                `"${app.status || 'pending'}"`,  // Status
                `"${formatDate(app.createdAt || app.registrationDate || new Date())}"`,  // Applied Date
                `"${app.resumeLink || 'N/A'}"`  // Resume
            ].join(',');
        });
    
        // Combine headers and rows
        const csvContent = [headers, ...rows].join('\n');
        
        // Create and trigger download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'Applications.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // const exportToCSV = (data) => {
    //     const headers = [
    //         "No.", "Applicant", "Email", "Phone", "University", 
    //         "Course", "Tuition", "Location", "Status", "Applied Date", "Resume"
    //     ].join(',');

    //     const rows = data.map((app, index) => [
    //         index + 1,
    //         `"${app.applicantDetails.username}"`,
    //         `"${app.applicantDetails.email}"`,
    //         `"${app.phoneNumber}"`,
    //         `"${app.schoolDetails.university}"`,
    //         `"${app.schoolDetails.course}"`,
    //         `$${app.schoolDetails.tuition?.toLocaleString() || 'N/A'}`,
    //         `"${app.schoolDetails.location}"`,
    //         `"${app.status}"`,
    //         `"${formatDate(app.createdAt)}"`,
    //         `"${app.resumeLink}"`
    //     ].join(','));

    //     const csvContent = [headers, ...rows].join('\n');
    //     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    //     const url = URL.createObjectURL(blob);
    //     const link = document.createElement('a');
    //     link.setAttribute('href', url);
    //     link.setAttribute('download', 'Applications.csv');
    //     link.style.visibility = 'hidden';
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // };

    const filteredApplications = (apiResponse?.data || apiResponse || [])
        .filter(app => 
            app.applicantDetails.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.schoolDetails.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.schoolDetails.course.toLowerCase().includes(searchTerm.toLowerCase())
        );

    if (isLoading || applicationLoading) {
        return <LoadingComTwo />;
    }

    if (isError) {
        return (
            <div className="text-center mt-12">
                <h2 className="text-red-600 text-lg font-bold">
                    Error loading applications: {error.message}
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

    if (!filteredApplications.length) {
        return (
            <div className="text-center mt-12">
                <h2 className="text-gray-600 text-lg font-bold">
                    {searchTerm ? "No matching applications found" : "No applications found"}
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
                    Manage Applications
                </div>
                <div className="actions-row">
                    <div className="search-box">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search applications..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button 
                        onClick={() => exportToCSV(filteredApplications)}
                        className="export-btn"
                    >
                        <FaFileExport className="mr-2" />
                        Export to CSV
                    </button>
                </div>
            </div>
            
            <div className="content-row">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Applicant</th>
                            <th>University</th>
                            <th>Course</th>
                            <th>Tuition</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Applied</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredApplications.map((app, index) => (
                            <tr key={app._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="applicant-info">
                                        <div className="name">{app.applicantDetails.username}</div>
                                        <div className="email">{app.applicantDetails.email}</div>
                                        <div className="phone">{app.phoneNumber}</div>
                                    </div>
                                </td>
                                <td>{app.schoolDetails.university}</td>
                                <td>{app.schoolDetails.course}</td>
                                <td>${app.schoolDetails.tuition?.toLocaleString()}</td>
                                <td>{app.schoolDetails.location}</td>
                                <td>
                                    <select
                                        value={app.status}
                                        onChange={(e) => updateStatus(app._id, e.target.value)}
                                        className={`status-select ${app.status}`}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </td>
                                <td>{formatDate(app.createdAt)}</td>
                                <td>
                                    <div className="action-buttons">
                                        <a
                                            href={app.resumeLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="action view"
                                        >
                                            View Resume
                                        </a>
                                        <button
                                            className="action delete"
                                            onClick={() => 
                                                Swal.fire({
                                                    title: "Delete Application?",
                                                    text: "This cannot be undone",
                                                    icon: "warning",
                                                    showCancelButton: true,
                                                    confirmButtonColor: "#d33",
                                                    cancelButtonColor: "#3085d6",
                                                    confirmButtonText: "Delete"
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        deleteApplication(app._id);
                                                    }
                                                })
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
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
        flex-wrap: wrap;
        gap: 1rem;
    }
    
    .title-row {
        font-size: 1.5rem;
        font-weight: 600;
        color: #2d3748;
    }
    
    .actions-row {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .search-box {
        position: relative;
        display: flex;
        align-items: center;
        
        input {
            padding: 0.5rem 1rem 0.5rem 2rem;
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            min-width: 250px;
            
            &:focus {
                outline: none;
                border-color: #2d8cd4;
            }
        }
        
        .search-icon {
            position: absolute;
            left: 0.75rem;
            color: #718096;
        }
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
    
    .applicant-info {
        .name {
            font-weight: 500;
        }
        
        .email, .phone {
            font-size: 0.875rem;
            color: #718096;
        }
    }
    
    .status-select {
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        border: 1px solid #e2e8f0;
        cursor: pointer;
        
        &.pending {
            background-color: #fef3c7;
            color: #92400e;
        }
        
        &.approved {
            background-color: #d1fae5;
            color: #065f46;
        }
        
        &.rejected {
            background-color: #fee2e2;
            color: #991b1b;
        }
    }
    
    .action-buttons {
        display: flex;
        gap: 0.5rem;
    }
    
    .action {
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-weight: 500;
        cursor: pointer;
        font-size: 0.875rem;
        white-space: nowrap;
        
        &.view {
            background-color: #2d8cd4;
            color: white;
            
            &:hover {
                background-color: #1a5f8b;
            }
        }
        
        &.delete {
            background-color: #e53e3e;
            color: white;
            
            &:hover {
                background-color: #c53030;
            }
        }
    }
`;

export default Applications;