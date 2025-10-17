import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUPI } from "../context/UPIContext";
import LoadingComTwo from "../components/shared/LoadingComTwo";
import { CiSquarePlus } from "react-icons/ci";
import { FaFileExport, FaDownload, FaEye } from "react-icons/fa";
import styled from "styled-components";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ManageUPI = () => {
    const { getAllUPIRegistrations } = useUPI();

    const {
        isLoading,
        isError,
        data: apiResponse,
        error,
        refetch,
    } = useQuery({
        queryKey: ["upi-applications"],
        queryFn: getAllUPIRegistrations,
    });

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const deleteApplication = async (id) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_API_BASE_URL}/api/v1/upi/applications/${id}`,
                { withCredentials: true }
            );
            refetch();
            Swal.fire("Deleted!", "UPI application removed successfully.", "success");
        } catch (error) {
            Swal.fire("Error!", error?.response?.data?.message || "Deletion failed", "error");
        }
    };

    const updateApplicationStatus = async (id, status) => {
        try {
            await axios.patch(
                `${import.meta.env.VITE_API_BASE_URL}/api/v1/upi/applications/${id}/status`,
                { status },
                { withCredentials: true }
            );
            refetch();
            Swal.fire("Updated!", `Application status updated to ${status}`, "success");
        } catch (error) {
            Swal.fire("Error!", error?.response?.data?.message || "Update failed", "error");
        }
    };

    const downloadDocument = async (doc) => { // Changed parameter name from 'document' to 'doc'
        try {
            // Create a direct download link
            const downloadUrl = `${import.meta.env.VITE_API_BASE_URL}${doc.fileUrl}`;
            
            // Create a temporary anchor element to trigger download
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', doc.name);
            link.setAttribute('target', '_blank');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            toast.success(`Downloading ${doc.name}`);
        } catch (error) {
            toast.error(`Failed to download ${doc.name}`);
            console.error('Download error:', error);
        }
    };

    const viewDocument = (doc) => { // Changed parameter name from 'document' to 'doc'
        const viewUrl = `${import.meta.env.VITE_API_BASE_URL}${doc.fileUrl}`;
        window.open(viewUrl, '_blank');
    };

    const exportToCSV = (data) => {
        const headers = [
            "No.", "Full Name", "Email", "Phone", "Academic Level", 
            "Intended Major", "Target Countries", "Current School",
            "Financial Readiness", "Status", "Registration Date"
        ].join(',');

        const rows = data.map((app, index) => [
            index + 1,
            `"${app.fullName}"`,
            `"${app.email}"`,
            `"${app.phoneNumber}"`,
            `"${app.academicLevel}"`,
            `"${app.intendedMajor}"`,
            `"${app.targetCountries?.join(', ') || 'N/A'}"`,
            `"${app.currentSchool}"`,
            `"${app.financialReadiness}"`,
            `"${app.status}"`,
            `"${formatDate(app.registrationDate || app.createdAt)}"`
        ].join(','));

        const csvContent = [headers, ...rows].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'UPI_Applications.csv');
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
                    Error loading UPI applications
                </h2>
                <p className="text-gray-600 mt-2">{error?.message}</p>
                <button 
                    onClick={() => refetch()}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Retry
                </button>
            </div>
        );
    }

    // Extract applications from API response
    const applications = apiResponse?.data || apiResponse || [];

    if (!applications.length) {
        return (
            <div className="text-center mt-12">
                <h2 className="text-gray-600 text-lg font-bold">
                    No UPI applications found
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
                    Manage UPI Applications
                    <CiSquarePlus className="ml-1 text-xl md:text-2xl" />
                </div>
                <button 
                    onClick={() => exportToCSV(applications)}
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
                            <th>Applicant Info</th>
                            <th>Contact</th>
                            <th>Academic Details</th>
                            <th>Documents</th>
                            <th>Status</th>
                            <th>Registered</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app, index) => (
                            <tr key={app._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="applicant-info">
                                        <strong>{app.fullName}</strong>
                                        <div className="text-sm text-gray-600">
                                            {app.currentSchool}
                                        </div>
                                        <div className="text-sm">
                                            <strong>Level:</strong> {app.academicLevel}
                                        </div>
                                        <div className="text-sm">
                                            <strong>Major:</strong> {app.intendedMajor}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="contact-info">
                                        <div>{app.email}</div>
                                        <div>{app.phoneNumber}</div>
                                        {app.parentalConsent?.parentName && (
                                            <div className="text-xs text-blue-600 mt-1">
                                                Parent: {app.parentalConsent.parentName}
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <div className="academic-details">
                                        <div><strong>Countries:</strong></div>
                                        <div className="countries">
                                            {app.targetCountries?.slice(0, 3).map(country => (
                                                <span key={country} className="country-tag">
                                                    {country}
                                                </span>
                                            ))}
                                            {app.targetCountries?.length > 3 && (
                                                <span className="more-countries">
                                                    +{app.targetCountries.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                        <div className="financial-badge mt-1">
                                            {app.financialReadiness?.replace(/_/g, ' ')}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="documents-list">
                                        {app.documents && app.documents.length > 0 ? (
                                            app.documents.map((doc, docIndex) => (
                                                <div key={docIndex} className="document-item">
                                                    <span className="doc-name">{doc.name}</span>
                                                    <div className="doc-actions">
                                                        <button 
                                                            onClick={() => viewDocument(doc)} // Updated to use 'doc'
                                                            className="doc-btn view"
                                                            title="View Document"
                                                        >
                                                            <FaEye />
                                                        </button>
                                                        <button 
                                                            onClick={() => downloadDocument(doc)} // Updated to use 'doc'
                                                            className="doc-btn download"
                                                            title="Download Document"
                                                        >
                                                            <FaDownload />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <span className="no-docs">No documents</span>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <select
                                        value={app.status}
                                        onChange={(e) => updateApplicationStatus(app._id, e.target.value)}
                                        className={`status-select ${app.status}`}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="under_review">Under Review</option>
                                        <option value="accepted">Accepted</option>
                                        <option value="rejected">Rejected</option>
                                        <option value="waitlisted">Waitlisted</option>
                                    </select>
                                </td>
                                <td>{formatDate(app.registrationDate || app.createdAt)}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button
                                            className="action view"
                                            onClick={() => {
                                                Swal.fire({
                                                    title: "Application Details",
                                                    html: `
                                                        <div style="text-align: left; max-height: 60vh; overflow-y: auto;">
                                                            <h3 style="color: #2d8cd4; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">${app.fullName}</h3>
                                                            
                                                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
                                                                <div>
                                                                    <h4 style="color: #4a5568; margin-bottom: 10px;">Personal Information</h4>
                                                                    <p><strong>Email:</strong> ${app.email}</p>
                                                                    <p><strong>Phone:</strong> ${app.phoneNumber}</p>
                                                                    <p><strong>Date of Birth:</strong> ${app.dateOfBirth ? new Date(app.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
                                                                    <p><strong>Nationality:</strong> ${app.nationality || 'N/A'}</p>
                                                                    <p><strong>Address:</strong> ${app.address || 'N/A'}</p>
                                                                </div>
                                                                
                                                                <div>
                                                                    <h4 style="color: #4a5568; margin-bottom: 10px;">Academic Information</h4>
                                                                    <p><strong>Academic Level:</strong> ${app.academicLevel}</p>
                                                                    <p><strong>Current School:</strong> ${app.currentSchool}</p>
                                                                    <p><strong>Intended Major:</strong> ${app.intendedMajor}</p>
                                                                    <p><strong>Financial Readiness:</strong> ${app.financialReadiness?.replace(/_/g, ' ')}</p>
                                                                    <p><strong>Status:</strong> <span class="status-badge ${app.status}">${app.status}</span></p>
                                                                </div>
                                                            </div>
                                                            
                                                            <div style="margin: 20px 0;">
                                                                <h4 style="color: #4a5568; margin-bottom: 10px;">Target Countries</h4>
                                                                <p>${app.targetCountries?.join(', ') || 'N/A'}</p>
                                                            </div>
                                                            
                                                            ${app.motivationEssay ? `
                                                            <div style="margin: 20px 0;">
                                                                <h4 style="color: #4a5568; margin-bottom: 10px;">Motivation Essay</h4>
                                                                <div style="background: #f7fafc; padding: 15px; border-radius: 5px; border-left: 4px solid #2d8cd4;">
                                                                    ${app.motivationEssay.substring(0, 500)}${app.motivationEssay.length > 500 ? '...' : ''}
                                                                </div>
                                                                <p style="text-align: right; color: #718096; margin-top: 5px;">${app.motivationEssay.length} characters total</p>
                                                            </div>
                                                            ` : ''}
                                                            
                                                            ${app.documents && app.documents.length > 0 ? `
                                                            <div style="margin: 20px 0;">
                                                                <h4 style="color: #4a5568; margin-bottom: 10px;">Uploaded Documents (${app.documents.length})</h4>
                                                                <ul style="list-style: none; padding: 0;">
                                                                    ${app.documents.map(doc => `<li style="padding: 5px 0; border-bottom: 1px solid #e2e8f0;">
                                                                        <strong>${doc.name}</strong> (${doc.size})
                                                                    </li>`).join('')}
                                                                </ul>
                                                            </div>
                                                            ` : ''}
                                                        </div>
                                                    `,
                                                    confirmButtonText: "Close",
                                                    width: '700px'
                                                });
                                            }}
                                        >
                                            Details
                                        </button>
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

// ... styled components remain exactly the same ...

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
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
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
    
    .table tr:hover {
        background-color: #edf2f7;
    }

    .applicant-info {
        min-width: 180px;
    }
    
    .contact-info {
        min-width: 150px;
    }
    
    .academic-details {
        min-width: 150px;
    }
    
    .countries {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem;
        margin: 0.25rem 0;
    }
    
    .country-tag {
        background: #e2e8f0;
        padding: 0.2rem 0.4rem;
        border-radius: 8px;
        font-size: 10px;
        white-space: nowrap;
    }
    
    .more-countries {
        color: #718096;
        font-size: 10px;
        font-style: italic;
    }

    .financial-badge {
        background: #e8f4ff;
        color: #2d8cd4;
        padding: 0.2rem 0.5rem;
        border-radius: 8px;
        font-size: 10px;
        font-weight: 500;
        text-transform: capitalize;
        display: inline-block;
    }

    .documents-list {
        min-width: 200px;
        max-width: 250px;
    }
    
    .document-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 0;
        border-bottom: 1px solid #f1f5f9;
        
        &:last-child {
            border-bottom: none;
        }
    }
    
    .doc-name {
        font-size: 11px;
        color: #4a5568;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 0.5rem;
    }
    
    .doc-actions {
        display: flex;
        gap: 0.25rem;
    }
    
    .doc-btn {
        background: none;
        border: none;
        padding: 0.25rem;
        border-radius: 3px;
        cursor: pointer;
        font-size: 10px;
        
        &.view {
            color: #2d8cd4;
            
            &:hover {
                background: #e8f4ff;
            }
        }
        
        &.download {
            color: #48bb78;
            
            &:hover {
                background: #f0fff4;
            }
        }
    }
    
    .no-docs {
        font-size: 11px;
        color: #a0aec0;
        font-style: italic;
    }

    .status-select {
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        border: 1px solid #e2e8f0;
        font-size: 12px;
        font-weight: 500;
        
        &.pending { background: #feebcb; color: #744210; }
        &.under_review { background: #e9d8fd; color: #44337a; }
        &.accepted { background: #c6f6d5; color: #22543d; }
        &.rejected { background: #fed7d7; color: #742a2a; }
        &.waitlisted { background: #e2e8f0; color: #4a5568; }
    }

    .action-buttons {
        display: flex;
        gap: 0.5rem;
    }
    
    .action {
        padding: 0.375rem 0.75rem;
        border-radius: 4px;
        font-weight: 500;
        cursor: pointer;
        font-size: 12px;
        border: none;
        
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

    @media (max-width: 768px) {
        padding: 1rem;
        
        .header-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
        }
        
        .export-btn {
            align-self: flex-end;
        }
        
        .table {
            font-size: 14px;
        }
        
        .action-buttons {
            flex-direction: column;
        }
        
        .documents-list {
            min-width: 150px;
        }
    }
`;

export default ManageUPI;

































































// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useUPI } from "../context/UPIContext";
// import LoadingComTwo from "../components/shared/LoadingComTwo";
// import { CiSquarePlus } from "react-icons/ci";
// import { FaFileExport, FaDownload, FaEye } from "react-icons/fa";
// import styled from "styled-components";
// import Swal from "sweetalert2";
// import { toast } from "react-toastify"


// const ManageUPI = () => {
//     const { getAllUPIRegistrations } = useUPI();

//     const {
//         isLoading,
//         isError,
//         data: apiResponse,
//         error,
//         refetch,
//     } = useQuery({
//         queryKey: ["upi-applications"],
//         queryFn: getAllUPIRegistrations,
//     });

//     const formatDate = (dateString) => {
//         const options = { year: 'numeric', month: 'short', day: 'numeric' };
//         return new Date(dateString).toLocaleDateString(undefined, options);
//     };

//     const deleteApplication = async (id) => {
//         try {
//             await axios.delete(
//                 `${import.meta.env.VITE_API_BASE_URL}/upi/applications/${id}`, // FIXED: Added /api/v1/upi
//                 { withCredentials: true }
//             );
//             refetch();
//             Swal.fire("Deleted!", "UPI application removed successfully.", "success");
//         } catch (error) {
//             Swal.fire("Error!", error?.response?.data?.message || "Deletion failed", "error");
//         }
//     };

//     const updateApplicationStatus = async (id, status) => {
//         try {
//             await axios.patch(
//                 `${import.meta.env.VITE_API_BASE_URL}/upi/applications/${id}/status`, // FIXED: Added /api/v1/upi
//                 { status },
//                 { withCredentials: true }
//             );
//             refetch();
//             Swal.fire("Updated!", `Application status updated to ${status}`, "success");
//         } catch (error) {
//             Swal.fire("Error!", error?.response?.data?.message || "Update failed", "error");
//         }
//     };

//     const downloadDocument = async (document) => {
//         try {
//             // Create a direct download link
//             const downloadUrl = `${import.meta.env.VITE_API_BASE_URL}${document.fileUrl}`;
            
//             // Create a temporary anchor element to trigger download
//             const link = document.createElement('a');
//             link.href = downloadUrl;
//             link.setAttribute('download', document.name);
//             link.setAttribute('target', '_blank');
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
            
//             toast.success(`Downloading ${document.name}`);
//         } catch (error) {
//             toast.error(`Failed to download ${document.name}`);
//             console.error('Download error:', error);
//         }
//     };

//     const viewDocument = (document) => {
//         const viewUrl = `${import.meta.env.VITE_API_BASE_URL}${document.fileUrl}`;
//         window.open(viewUrl, '_blank');
//     };

//     const exportToCSV = (data) => {
//         const headers = [
//             "No.", "Full Name", "Email", "Phone", "Academic Level", 
//             "Intended Major", "Target Countries", "Current School",
//             "Financial Readiness", "Status", "Registration Date"
//         ].join(',');

//         const rows = data.map((app, index) => [
//             index + 1,
//             `"${app.fullName}"`,
//             `"${app.email}"`,
//             `"${app.phoneNumber}"`,
//             `"${app.academicLevel}"`,
//             `"${app.intendedMajor}"`,
//             `"${app.targetCountries?.join(', ') || 'N/A'}"`,
//             `"${app.currentSchool}"`,
//             `"${app.financialReadiness}"`,
//             `"${app.status}"`,
//             `"${formatDate(app.registrationDate || app.createdAt)}"`
//         ].join(','));

//         const csvContent = [headers, ...rows].join('\n');

//         const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//         const url = URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.setAttribute('href', url);
//         link.setAttribute('download', 'UPI_Applications.csv');
//         link.style.visibility = 'hidden';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };

//     if (isLoading) {
//         return <LoadingComTwo />;
//     }

//     if (isError) {
//         return (
//             <div className="text-center mt-12">
//                 <h2 className="text-red-600 text-lg font-bold">
//                     Error loading UPI applications
//                 </h2>
//                 <p className="text-gray-600 mt-2">{error?.message}</p>
//                 <button 
//                     onClick={() => refetch()}
//                     className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                     Retry
//                 </button>
//             </div>
//         );
//     }

//     // Extract applications from API response
//     const applications = apiResponse?.data || apiResponse || [];

//     if (!applications.length) {
//         return (
//             <div className="text-center mt-12">
//                 <h2 className="text-gray-600 text-lg font-bold">
//                     No UPI applications found
//                 </h2>
//                 <button 
//                     onClick={() => refetch()}
//                     className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                     Refresh
//                 </button>
//             </div>
//         );
//     }

//     return (
//         <Wrapper>
//             <div className="header-row">
//                 <div className="title-row">
//                     Manage UPI Applications
//                     <CiSquarePlus className="ml-1 text-xl md:text-2xl" />
//                 </div>
//                 <button 
//                     onClick={() => exportToCSV(applications)}
//                     className="export-btn"
//                 >
//                     <FaFileExport className="mr-2" />
//                     Export to CSV
//                 </button>
//             </div>
//             <div className="content-row">
//                 <table className="table">
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Applicant Info</th>
//                             <th>Contact</th>
//                             <th>Academic Details</th>
//                             <th>Documents</th>
//                             <th>Status</th>
//                             <th>Registered</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {applications.map((app, index) => (
//                             <tr key={app._id}>
//                                 <td>{index + 1}</td>
//                                 <td>
//                                     <div className="applicant-info">
//                                         <strong>{app.fullName}</strong>
//                                         <div className="text-sm text-gray-600">
//                                             {app.currentSchool}
//                                         </div>
//                                         <div className="text-sm">
//                                             <strong>Level:</strong> {app.academicLevel}
//                                         </div>
//                                         <div className="text-sm">
//                                             <strong>Major:</strong> {app.intendedMajor}
//                                         </div>
//                                     </div>
//                                 </td>
//                                 <td>
//                                     <div className="contact-info">
//                                         <div>{app.email}</div>
//                                         <div>{app.phoneNumber}</div>
//                                         {app.parentalConsent?.parentName && (
//                                             <div className="text-xs text-blue-600 mt-1">
//                                                 Parent: {app.parentalConsent.parentName}
//                                             </div>
//                                         )}
//                                     </div>
//                                 </td>
//                                 <td>
//                                     <div className="academic-details">
//                                         <div><strong>Countries:</strong></div>
//                                         <div className="countries">
//                                             {app.targetCountries?.slice(0, 3).map(country => (
//                                                 <span key={country} className="country-tag">
//                                                     {country}
//                                                 </span>
//                                             ))}
//                                             {app.targetCountries?.length > 3 && (
//                                                 <span className="more-countries">
//                                                     +{app.targetCountries.length - 3} more
//                                                 </span>
//                                             )}
//                                         </div>
//                                         <div className="financial-badge mt-1">
//                                             {app.financialReadiness?.replace(/_/g, ' ')}
//                                         </div>
//                                     </div>
//                                 </td>
//                                 <td>
//                                     <div className="documents-list">
//                                         {app.documents && app.documents.length > 0 ? (
//                                             app.documents.map((doc, docIndex) => (
//                                                 <div key={docIndex} className="document-item">
//                                                     <span className="doc-name">{doc.name}</span>
//                                                     <div className="doc-actions">
//                                                         <button 
//                                                             onClick={() => viewDocument(doc)}
//                                                             className="doc-btn view"
//                                                             title="View Document"
//                                                         >
//                                                             <FaEye />
//                                                         </button>
//                                                         <button 
//                                                             onClick={() => downloadDocument(doc)}
//                                                             className="doc-btn download"
//                                                             title="Download Document"
//                                                         >
//                                                             <FaDownload />
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                             ))
//                                         ) : (
//                                             <span className="no-docs">No documents</span>
//                                         )}
//                                     </div>
//                                 </td>
//                                 <td>
//                                     <select
//                                         value={app.status}
//                                         onChange={(e) => updateApplicationStatus(app._id, e.target.value)}
//                                         className={`status-select ${app.status}`}
//                                     >
//                                         <option value="pending">Pending</option>
//                                         <option value="under_review">Under Review</option>
//                                         <option value="accepted">Accepted</option>
//                                         <option value="rejected">Rejected</option>
//                                         <option value="waitlisted">Waitlisted</option>
//                                     </select>
//                                 </td>
//                                 <td>{formatDate(app.registrationDate || app.createdAt)}</td>
//                                 <td>
//                                     <div className="action-buttons">
//                                         <button
//                                             className="action view"
//                                             onClick={() => {
//                                                 Swal.fire({
//                                                     title: "Application Details",
//                                                     html: `
//                                                         <div style="text-align: left; max-height: 60vh; overflow-y: auto;">
//                                                             <h3 style="color: #2d8cd4; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">${app.fullName}</h3>
                                                            
//                                                             <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
//                                                                 <div>
//                                                                     <h4 style="color: #4a5568; margin-bottom: 10px;">Personal Information</h4>
//                                                                     <p><strong>Email:</strong> ${app.email}</p>
//                                                                     <p><strong>Phone:</strong> ${app.phoneNumber}</p>
//                                                                     <p><strong>Date of Birth:</strong> ${app.dateOfBirth ? new Date(app.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
//                                                                     <p><strong>Nationality:</strong> ${app.nationality || 'N/A'}</p>
//                                                                     <p><strong>Address:</strong> ${app.address || 'N/A'}</p>
//                                                                 </div>
                                                                
//                                                                 <div>
//                                                                     <h4 style="color: #4a5568; margin-bottom: 10px;">Academic Information</h4>
//                                                                     <p><strong>Academic Level:</strong> ${app.academicLevel}</p>
//                                                                     <p><strong>Current School:</strong> ${app.currentSchool}</p>
//                                                                     <p><strong>Intended Major:</strong> ${app.intendedMajor}</p>
//                                                                     <p><strong>Financial Readiness:</strong> ${app.financialReadiness?.replace(/_/g, ' ')}</p>
//                                                                     <p><strong>Status:</strong> <span class="status-badge ${app.status}">${app.status}</span></p>
//                                                                 </div>
//                                                             </div>
                                                            
//                                                             <div style="margin: 20px 0;">
//                                                                 <h4 style="color: #4a5568; margin-bottom: 10px;">Target Countries</h4>
//                                                                 <p>${app.targetCountries?.join(', ') || 'N/A'}</p>
//                                                             </div>
                                                            
//                                                             ${app.motivationEssay ? `
//                                                             <div style="margin: 20px 0;">
//                                                                 <h4 style="color: #4a5568; margin-bottom: 10px;">Motivation Essay</h4>
//                                                                 <div style="background: #f7fafc; padding: 15px; border-radius: 5px; border-left: 4px solid #2d8cd4;">
//                                                                     ${app.motivationEssay.substring(0, 500)}${app.motivationEssay.length > 500 ? '...' : ''}
//                                                                 </div>
//                                                                 <p style="text-align: right; color: #718096; margin-top: 5px;">${app.motivationEssay.length} characters total</p>
//                                                             </div>
//                                                             ` : ''}
                                                            
//                                                             ${app.documents && app.documents.length > 0 ? `
//                                                             <div style="margin: 20px 0;">
//                                                                 <h4 style="color: #4a5568; margin-bottom: 10px;">Uploaded Documents (${app.documents.length})</h4>
//                                                                 <ul style="list-style: none; padding: 0;">
//                                                                     ${app.documents.map(doc => `<li style="padding: 5px 0; border-bottom: 1px solid #e2e8f0;">
//                                                                         <strong>${doc.name}</strong> (${doc.size})
//                                                                     </li>`).join('')}
//                                                                 </ul>
//                                                             </div>
//                                                             ` : ''}
//                                                         </div>
//                                                     `,
//                                                     confirmButtonText: "Close",
//                                                     width: '700px'
//                                                 });
//                                             }}
//                                         >
//                                             Details
//                                         </button>
//                                         <button
//                                             className="action delete"
//                                             onClick={() => 
//                                                 Swal.fire({
//                                                     title: "Delete Application?",
//                                                     text: "This cannot be undone",
//                                                     icon: "warning",
//                                                     showCancelButton: true,
//                                                     confirmButtonColor: "#d33",
//                                                     cancelButtonColor: "#3085d6",
//                                                     confirmButtonText: "Delete"
//                                                 }).then((result) => {
//                                                     if (result.isConfirmed) {
//                                                         deleteApplication(app._id);
//                                                     }
//                                                 })
//                                             }
//                                         >
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </Wrapper>
//     );
// };

// const Wrapper = styled.section`
//     padding: 2rem;
    
//     .header-row {
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         margin-bottom: 1.5rem;
//     }
    
//     .title-row {
//         display: flex;
//         align-items: center;
//         font-size: 1.5rem;
//         font-weight: 600;
//         color: #2d3748;
//     }
    
//     .export-btn {
//         display: flex;
//         align-items: center;
//         background-color: #2d8cd4;
//         color: white;
//         padding: 0.5rem 1rem;
//         border-radius: 4px;
//         font-weight: 500;
//         transition: background-color 0.2s;
        
//         &:hover {
//             background-color: #1a5f8b;
//         }
//     }
    
//     .content-row {
//         overflow-x: auto;
//         margin-top: 1.5rem;
//     }
    
//     .table {
//         width: 100%;
//         border-collapse: collapse;
//         background: white;
//         border-radius: 8px;
//         overflow: hidden;
//         box-shadow: 0 1px 3px rgba(0,0,0,0.1);
//     }
    
//     .table th, .table td {
//         padding: 12px;
//         text-align: left;
//         border-bottom: 1px solid #e2e8f0;
//     }
    
//     .table th {
//         background-color: #2d8cd4;
//         color: white;
//         font-weight: 500;
//     }
    
//     .table tr:nth-child(even) {
//         background-color: #f7fafc;
//     }
    
//     .table tr:hover {
//         background-color: #edf2f7;
//     }

//     .applicant-info {
//         min-width: 180px;
//     }
    
//     .contact-info {
//         min-width: 150px;
//     }
    
//     .academic-details {
//         min-width: 150px;
//     }
    
//     .countries {
//         display: flex;
//         flex-wrap: wrap;
//         gap: 0.25rem;
//         margin: 0.25rem 0;
//     }
    
//     .country-tag {
//         background: #e2e8f0;
//         padding: 0.2rem 0.4rem;
//         border-radius: 8px;
//         font-size: 10px;
//         white-space: nowrap;
//     }
    
//     .more-countries {
//         color: #718096;
//         font-size: 10px;
//         font-style: italic;
//     }

//     .financial-badge {
//         background: #e8f4ff;
//         color: #2d8cd4;
//         padding: 0.2rem 0.5rem;
//         border-radius: 8px;
//         font-size: 10px;
//         font-weight: 500;
//         text-transform: capitalize;
//         display: inline-block;
//     }

//     .documents-list {
//         min-width: 200px;
//         max-width: 250px;
//     }
    
//     .document-item {
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         padding: 0.5rem 0;
//         border-bottom: 1px solid #f1f5f9;
        
//         &:last-child {
//             border-bottom: none;
//         }
//     }
    
//     .doc-name {
//         font-size: 11px;
//         color: #4a5568;
//         flex: 1;
//         overflow: hidden;
//         text-overflow: ellipsis;
//         white-space: nowrap;
//         margin-right: 0.5rem;
//     }
    
//     .doc-actions {
//         display: flex;
//         gap: 0.25rem;
//     }
    
//     .doc-btn {
//         background: none;
//         border: none;
//         padding: 0.25rem;
//         border-radius: 3px;
//         cursor: pointer;
//         font-size: 10px;
        
//         &.view {
//             color: #2d8cd4;
            
//             &:hover {
//                 background: #e8f4ff;
//             }
//         }
        
//         &.download {
//             color: #48bb78;
            
//             &:hover {
//                 background: #f0fff4;
//             }
//         }
//     }
    
//     .no-docs {
//         font-size: 11px;
//         color: #a0aec0;
//         font-style: italic;
//     }

//     .status-select {
//         padding: 0.25rem 0.5rem;
//         border-radius: 4px;
//         border: 1px solid #e2e8f0;
//         font-size: 12px;
//         font-weight: 500;
        
//         &.pending { background: #feebcb; color: #744210; }
//         &.under_review { background: #e9d8fd; color: #44337a; }
//         &.accepted { background: #c6f6d5; color: #22543d; }
//         &.rejected { background: #fed7d7; color: #742a2a; }
//         &.waitlisted { background: #e2e8f0; color: #4a5568; }
//     }

//     .action-buttons {
//         display: flex;
//         gap: 0.5rem;
//     }
    
//     .action {
//         padding: 0.375rem 0.75rem;
//         border-radius: 4px;
//         font-weight: 500;
//         cursor: pointer;
//         font-size: 12px;
//         border: none;
        
//         &.view {
//             background-color: #2d8cd4;
//             color: white;
            
//             &:hover {
//                 background-color: #1a5f8b;
//             }
//         }
        
//         &.delete {
//             background-color: #e53e3e;
//             color: white;
            
//             &:hover {
//                 background-color: #c53030;
//             }
//         }
//     }

//     @media (max-width: 768px) {
//         padding: 1rem;
        
//         .header-row {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: 1rem;
//         }
        
//         .export-btn {
//             align-self: flex-end;
//         }
        
//         .table {
//             font-size: 14px;
//         }
        
//         .action-buttons {
//             flex-direction: column;
//         }
        
//         .documents-list {
//             min-width: 150px;
//         }
//     }
// `;

// export default ManageUPI;



























// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useUPI } from "../context/UPIContext";
// import LoadingComTwo from "../components/shared/LoadingComTwo";
// import { CiSquarePlus } from "react-icons/ci";
// import { FaFileExport } from "react-icons/fa";
// import styled from "styled-components";
// import Swal from "sweetalert2";

// const ManageUPI = () => {
//     const { getAllUPIRegistrations } = useUPI();

//     const {
//         isLoading,
//         isError,
//         data: apiResponse,
//         error,
//         refetch,
//     } = useQuery({
//         queryKey: ["upi-applications"],
//         queryFn: getAllUPIRegistrations,
//     });

//     const formatDate = (dateString) => {
//         const options = { year: 'numeric', month: 'short', day: 'numeric' };
//         return new Date(dateString).toLocaleDateString(undefined, options);
//     };

//     const deleteApplication = async (id) => {
//         try {
//             await axios.delete(
//                 `${import.meta.env.VITE_API_BASE_URL}/applications/${id}`,
//                 { withCredentials: true }
//             );
//             refetch();
//             Swal.fire("Deleted!", "UPI application removed successfully.", "success");
//         } catch (error) {
//             Swal.fire("Error!", error?.response?.data?.message || "Deletion failed", "error");
//         }
//     };

//     const updateApplicationStatus = async (id, status) => {
//         try {
//             await axios.patch(
//                 `${import.meta.env.VITE_API_BASE_URL}/applications/${id}/status`,
//                 { status },
//                 { withCredentials: true }
//             );
//             refetch();
//             Swal.fire("Updated!", `Application status updated to ${status}`, "success");
//         } catch (error) {
//             Swal.fire("Error!", error?.response?.data?.message || "Update failed", "error");
//         }
//     };

//     const exportToCSV = (data) => {
//         const headers = [
//             "No.", "Full Name", "Email", "Phone", "Academic Level", 
//             "Intended Major", "Target Countries", "Current School",
//             "Financial Readiness", "Status", "Registration Date"
//         ].join(',');

//         const rows = data.map((app, index) => [
//             index + 1,
//             `"${app.fullName}"`,
//             `"${app.email}"`,
//             `"${app.phoneNumber}"`,
//             `"${app.academicLevel}"`,
//             `"${app.intendedMajor}"`,
//             `"${app.targetCountries?.join(', ') || 'N/A'}"`,
//             `"${app.currentSchool}"`,
//             `"${app.financialReadiness}"`,
//             `"${app.status}"`,
//             `"${formatDate(app.registrationDate || app.createdAt)}"`
//         ].join(','));

//         const csvContent = [headers, ...rows].join('\n');

//         const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//         const url = URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.setAttribute('href', url);
//         link.setAttribute('download', 'UPI_Applications.csv');
//         link.style.visibility = 'hidden';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };

//     if (isLoading) {
//         return <LoadingComTwo />;
//     }

//     if (isError) {
//         return (
//             <div className="text-center mt-12">
//                 <h2 className="text-red-600 text-lg font-bold">
//                     Error loading UPI applications
//                 </h2>
//                 <button 
//                     onClick={() => refetch()}
//                     className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                     Retry
//                 </button>
//             </div>
//         );
//     }

//     // Extract applications from API response
//     const applications = apiResponse?.data || apiResponse || [];

//     if (!applications.length) {
//         return (
//             <div className="text-center mt-12">
//                 <h2 className="text-gray-600 text-lg font-bold">
//                     No UPI applications found
//                 </h2>
//                 <button 
//                     onClick={() => refetch()}
//                     className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                     Refresh
//                 </button>
//             </div>
//         );
//     }

//     return (
//         <Wrapper>
//             <div className="header-row">
//                 <div className="title-row">
//                     Manage UPI Applications
//                     <CiSquarePlus className="ml-1 text-xl md:text-2xl" />
//                 </div>
//                 <button 
//                     onClick={() => exportToCSV(applications)}
//                     className="export-btn"
//                 >
//                     <FaFileExport className="mr-2" />
//                     Export to CSV
//                 </button>
//             </div>
//             <div className="content-row">
//                 <table className="table">
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Phone</th>
//                             <th>Academic Level</th>
//                             <th>Intended Major</th>
//                             <th>Target Countries</th>
//                             <th>Status</th>
//                             <th>Registered</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {applications.map((app, index) => (
//                             <tr key={app._id}>
//                                 <td>{index + 1}</td>
//                                 <td>
//                                     <div className="applicant-info">
//                                         <strong>{app.fullName}</strong>
//                                         <div className="text-sm text-gray-600">
//                                             {app.currentSchool}
//                                         </div>
//                                     </div>
//                                 </td>
//                                 <td>{app.email}</td>
//                                 <td>{app.phoneNumber}</td>
//                                 <td>{app.academicLevel}</td>
//                                 <td>{app.intendedMajor}</td>
//                                 <td>
//                                     <div className="countries">
//                                         {app.targetCountries?.slice(0, 2).map(country => (
//                                             <span key={country} className="country-tag">
//                                                 {country}
//                                             </span>
//                                         ))}
//                                         {app.targetCountries?.length > 2 && (
//                                             <span className="more-countries">
//                                                 +{app.targetCountries.length - 2} more
//                                             </span>
//                                         )}
//                                     </div>
//                                 </td>
//                                 <td>
//                                     <select
//                                         value={app.status}
//                                         onChange={(e) => updateApplicationStatus(app._id, e.target.value)}
//                                         className={`status-select ${app.status}`}
//                                     >
//                                         <option value="pending">Pending</option>
//                                         <option value="under_review">Under Review</option>
//                                         <option value="accepted">Accepted</option>
//                                         <option value="rejected">Rejected</option>
//                                         <option value="waitlisted">Waitlisted</option>
//                                     </select>
//                                 </td>
//                                 <td>{formatDate(app.registrationDate || app.createdAt)}</td>
//                                 <td>
//                                     <div className="action-buttons">
//                                         <button
//                                             className="action view"
//                                             onClick={() => {
//                                                 Swal.fire({
//                                                     title: "Application Details",
//                                                     html: `
//                                                         <div style="text-align: left;">
//                                                             <h3>${app.fullName}</h3>
//                                                             <p><strong>Email:</strong> ${app.email}</p>
//                                                             <p><strong>Phone:</strong> ${app.phoneNumber}</p>
//                                                             <p><strong>Academic Level:</strong> ${app.academicLevel}</p>
//                                                             <p><strong>Current School:</strong> ${app.currentSchool}</p>
//                                                             <p><strong>Intended Major:</strong> ${app.intendedMajor}</p>
//                                                             <p><strong>Target Countries:</strong> ${app.targetCountries?.join(', ')}</p>
//                                                             <p><strong>Financial Readiness:</strong> ${app.financialReadiness}</p>
//                                                             <p><strong>Status:</strong> ${app.status}</p>
//                                                             ${app.motivationEssay ? `<p><strong>Motivation Essay Preview:</strong><br>${app.motivationEssay.substring(0, 200)}...</p>` : ''}
//                                                         </div>
//                                                     `,
//                                                     confirmButtonText: "Close",
//                                                     width: '600px'
//                                                 });
//                                             }}
//                                         >
//                                             View
//                                         </button>
//                                         <button
//                                             className="action delete"
//                                             onClick={() => 
//                                                 Swal.fire({
//                                                     title: "Delete Application?",
//                                                     text: "This cannot be undone",
//                                                     icon: "warning",
//                                                     showCancelButton: true,
//                                                     confirmButtonColor: "#d33",
//                                                     cancelButtonColor: "#3085d6",
//                                                     confirmButtonText: "Delete"
//                                                 }).then((result) => {
//                                                     if (result.isConfirmed) {
//                                                         deleteApplication(app._id);
//                                                     }
//                                                 })
//                                             }
//                                         >
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </Wrapper>
//     );
// };

// const Wrapper = styled.section`
//     padding: 2rem;
    
//     .header-row {
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         margin-bottom: 1.5rem;
//     }
    
//     .title-row {
//         display: flex;
//         align-items: center;
//         font-size: 1.5rem;
//         font-weight: 600;
//         color: #2d3748;
//     }
    
//     .export-btn {
//         display: flex;
//         align-items: center;
//         background-color: #2d8cd4;
//         color: white;
//         padding: 0.5rem 1rem;
//         border-radius: 4px;
//         font-weight: 500;
//         transition: background-color 0.2s;
        
//         &:hover {
//             background-color: #1a5f8b;
//         }
//     }
    
//     .content-row {
//         overflow-x: auto;
//         margin-top: 1.5rem;
//     }
    
//     .table {
//         width: 100%;
//         border-collapse: collapse;
//         background: white;
//         border-radius: 8px;
//         overflow: hidden;
//         box-shadow: 0 1px 3px rgba(0,0,0,0.1);
//     }
    
//     .table th, .table td {
//         padding: 12px;
//         text-align: left;
//         border-bottom: 1px solid #e2e8f0;
//     }
    
//     .table th {
//         background-color: #2d8cd4;
//         color: white;
//         font-weight: 500;
//     }
    
//     .table tr:nth-child(even) {
//         background-color: #f7fafc;
//     }
    
//     .table tr:hover {
//         background-color: #edf2f7;
//     }

//     .applicant-info {
//         min-width: 150px;
//     }
    
//     .countries {
//         display: flex;
//         flex-wrap: wrap;
//         gap: 0.25rem;
//         max-width: 120px;
//     }
    
//     .country-tag {
//         background: #e2e8f0;
//         padding: 0.25rem 0.5rem;
//         border-radius: 12px;
//         font-size: 11px;
//         white-space: nowrap;
//     }
    
//     .more-countries {
//         color: #718096;
//         font-size: 11px;
//         font-style: italic;
//     }

//     .status-select {
//         padding: 0.25rem 0.5rem;
//         border-radius: 4px;
//         border: 1px solid #e2e8f0;
//         font-size: 12px;
//         font-weight: 500;
        
//         &.pending { background: #feebcb; color: #744210; }
//         &.under_review { background: #e9d8fd; color: #44337a; }
//         &.accepted { background: #c6f6d5; color: #22543d; }
//         &.rejected { background: #fed7d7; color: #742a2a; }
//         &.waitlisted { background: #e2e8f0; color: #4a5568; }
//     }

//     .action-buttons {
//         display: flex;
//         gap: 0.5rem;
//     }
    
//     .action {
//         padding: 0.375rem 0.75rem;
//         border-radius: 4px;
//         font-weight: 500;
//         cursor: pointer;
//         font-size: 12px;
//         border: none;
        
//         &.view {
//             background-color: #2d8cd4;
//             color: white;
            
//             &:hover {
//                 background-color: #1a5f8b;
//             }
//         }
        
//         &.delete {
//             background-color: #e53e3e;
//             color: white;
            
//             &:hover {
//                 background-color: #c53030;
//             }
//         }
//     }

//     @media (max-width: 768px) {
//         padding: 1rem;
        
//         .header-row {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: 1rem;
//         }
        
//         .export-btn {
//             align-self: flex-end;
//         }
        
//         .table {
//             font-size: 14px;
//         }
        
//         .action-buttons {
//             flex-direction: column;
//         }
//     }
// `;

// export default ManageUPI;























// // // import React from "react";
// // // import { useQuery } from "@tanstack/react-query";
// // // import axios from "axios";
// // // import styled from "styled-components";
// // // import { FaFileExport, FaSearch, FaFilter, FaSync } from "react-icons/fa";
// // // import { CiSquarePlus } from "react-icons/ci";
// // // import LoadingComTwo from "../components/shared/LoadingComTwo";
// // // import Swal from "sweetalert2";

// // // const ManageUPI = () => {
// // //     const [filters, setFilters] = React.useState({
// // //         status: "",
// // //         search: "",
// // //         academicLevel: "",
// // //         dateFrom: "",
// // //         dateTo: ""
// // //     });
// // //     const [currentPage, setCurrentPage] = React.useState(1);
// // //     const itemsPerPage = 10;

// // //     const {
// // //         isLoading,
// // //         isError,
// // //         data: apiResponse,
// // //         error,
// // //         refetch,
// // //     } = useQuery({
// // //         queryKey: ["upi-applications", currentPage, filters],
// // //         queryFn: () => getUPIApplications(currentPage, filters),
// // //     });

// // //     const getUPIApplications = async (page = 1, filters = {}) => {
// // //         const params = new URLSearchParams({
// // //             page: page.toString(),
// // //             limit: itemsPerPage.toString(),
// // //             ...filters
// // //         });
        
// // //         const response = await axios.get(
// // //             `${import.meta.env.VITE_API_BASE_URL}/api/upi/applications?${params}`,
// // //             { withCredentials: true }
// // //         );
// // //         return response.data;
// // //     };

// // //     const formatDate = (dateString) => {
// // //         const options = { year: 'numeric', month: 'short', day: 'numeric' };
// // //         return new Date(dateString).toLocaleDateString(undefined, options);
// // //     };

// // //     const deleteApplication = async (id) => {
// // //         try {
// // //             await axios.delete(
// // //                 `${import.meta.env.VITE_API_BASE_URL}/api/upi/applications/${id}`,
// // //                 { withCredentials: true }
// // //             );
// // //             refetch();
// // //             Swal.fire("Deleted!", "UPI application removed successfully.", "success");
// // //         } catch (error) {
// // //             Swal.fire("Error!", error?.response?.data?.message || "Deletion failed", "error");
// // //         }
// // //     };

// // //     const updateApplicationStatus = async (id, newStatus) => {
// // //         try {
// // //             await axios.patch(
// // //                 `${import.meta.env.VITE_API_BASE_URL}/api/upi/applications/${id}/status`,
// // //                 { status: newStatus },
// // //                 { withCredentials: true }
// // //             );
// // //             refetch();
// // //             Swal.fire("Updated!", `Application status updated to ${newStatus}`, "success");
// // //         } catch (error) {
// // //             Swal.fire("Error!", error?.response?.data?.message || "Update failed", "error");
// // //         }
// // //     };

// // //     const exportToCSV = (data) => {
// // //         const headers = [
// // //             "No.", "Full Name", "Email", "Phone", "Academic Level", 
// // //             "Intended Major", "Target Countries", "Current School",
// // //             "Financial Readiness", "Status", "Registration Date"
// // //         ].join(',');

// // //         const rows = data.map((app, index) => [
// // //             index + 1,
// // //             `"${app.fullName}"`,
// // //             `"${app.email}"`,
// // //             `"${app.phoneNumber}"`,
// // //             `"${app.academicLevel}"`,
// // //             `"${app.intendedMajor}"`,
// // //             `"${app.targetCountries?.join(', ') || 'N/A'}"`,
// // //             `"${app.currentSchool}"`,
// // //             `"${app.financialReadiness}"`,
// // //             `"${app.status}"`,
// // //             `"${formatDate(app.registrationDate || app.createdAt)}"`
// // //         ].join(','));

// // //         const csvContent = [headers, ...rows].join('\n');
// // //         const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
// // //         const url = URL.createObjectURL(blob);
// // //         const link = document.createElement('a');
// // //         link.setAttribute('href', url);
// // //         link.setAttribute('download', 'UPI_Applications.csv');
// // //         link.style.visibility = 'hidden';
// // //         document.body.appendChild(link);
// // //         link.click();
// // //         document.body.removeChild(link);
// // //     };

// // //     const handleFilterChange = (key, value) => {
// // //         setFilters(prev => ({ ...prev, [key]: value }));
// // //         setCurrentPage(1);
// // //     };

// // //     const clearFilters = () => {
// // //         setFilters({
// // //             status: "",
// // //             search: "",
// // //             academicLevel: "",
// // //             dateFrom: "",
// // //             dateTo: ""
// // //         });
// // //         setCurrentPage(1);
// // //     };

// // //     if (isLoading) {
// // //         return <LoadingComTwo />;
// // //     }

// // //     if (isError) {
// // //         return (
// // //             <div className="text-center mt-12">
// // //                 <h2 className="text-red-600 text-lg font-bold">
// // //                     Error loading UPI applications
// // //                 </h2>
// // //                 <p className="text-gray-600 mt-2">{error?.message}</p>
// // //                 <button 
// // //                     onClick={() => refetch()}
// // //                     className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
// // //                 >
// // //                     Retry
// // //                 </button>
// // //             </div>
// // //         );
// // //     }

// // //     const applications = apiResponse?.data || [];
// // //     const totalPages = apiResponse?.totalPages || 1;
// // //     const totalApplications = apiResponse?.total || 0;

// // //     if (!applications.length && !filters.search && !filters.status) {
// // //         return (
// // //             <div className="text-center mt-12">
// // //                 <h2 className="text-gray-600 text-lg font-bold">
// // //                     No UPI applications found
// // //                 </h2>
// // //                 <button 
// // //                     onClick={() => refetch()}
// // //                     className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
// // //                 >
// // //                     Refresh
// // //                 </button>
// // //             </div>
// // //         );
// // //     }

// // //     return (
// // //         <Wrapper>
// // //             <div className="header-row">
// // //                 <div className="title-row">
// // //                     Manage UPI Applications
// // //                     <CiSquarePlus className="ml-1 text-xl md:text-2xl" />
// // //                 </div>
// // //                 <div className="action-buttons">
// // //                     <button 
// // //                         onClick={() => exportToCSV(applications)}
// // //                         className="export-btn"
// // //                     >
// // //                         <FaFileExport className="mr-2" />
// // //                         Export to CSV
// // //                     </button>
// // //                     <button 
// // //                         onClick={() => refetch()}
// // //                         className="refresh-btn"
// // //                     >
// // //                         <FaSync className="mr-2" />
// // //                         Refresh
// // //                     </button>
// // //                 </div>
// // //             </div>

// // //             {/* Filters Section */}
// // //             <div className="filters-section">
// // //                 <div className="filter-grid">
// // //                     <div className="filter-group">
// // //                         <label>Search</label>
// // //                         <div className="search-input">
// // //                             <FaSearch className="search-icon" />
// // //                             <input
// // //                                 type="text"
// // //                                 placeholder="Search by name, email, or school..."
// // //                                 value={filters.search}
// // //                                 onChange={(e) => handleFilterChange('search', e.target.value)}
// // //                             />
// // //                         </div>
// // //                     </div>
                    
// // //                     <div className="filter-group">
// // //                         <label>Status</label>
// // //                         <select
// // //                             value={filters.status}
// // //                             onChange={(e) => handleFilterChange('status', e.target.value)}
// // //                         >
// // //                             <option value="">All Status</option>
// // //                             <option value="pending">Pending</option>
// // //                             <option value="under_review">Under Review</option>
// // //                             <option value="accepted">Accepted</option>
// // //                             <option value="rejected">Rejected</option>
// // //                             <option value="waitlisted">Waitlisted</option>
// // //                         </select>
// // //                     </div>

// // //                     <div className="filter-group">
// // //                         <label>Academic Level</label>
// // //                         <select
// // //                             value={filters.academicLevel}
// // //                             onChange={(e) => handleFilterChange('academicLevel', e.target.value)}
// // //                         >
// // //                             <option value="">All Levels</option>
// // //                             <option value="SS1">SS1</option>
// // //                             <option value="SS2">SS2</option>
// // //                             <option value="SS3">SS3</option>
// // //                             <option value="Graduate">Graduate</option>
// // //                             <option value="Other">Other</option>
// // //                         </select>
// // //                     </div>

// // //                     <div className="filter-group">
// // //                         <label>Date From</label>
// // //                         <input
// // //                             type="date"
// // //                             value={filters.dateFrom}
// // //                             onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
// // //                         />
// // //                     </div>

// // //                     <div className="filter-group">
// // //                         <label>Date To</label>
// // //                         <input
// // //                             type="date"
// // //                             value={filters.dateTo}
// // //                             onChange={(e) => handleFilterChange('dateTo', e.target.value)}
// // //                         />
// // //                     </div>
// // //                 </div>
                
// // //                 <button onClick={clearFilters} className="clear-filters">
// // //                     Clear Filters
// // //                 </button>
// // //             </div>

// // //             {/* Stats Summary */}
// // //             <div className="stats-grid">
// // //                 <div className="stat-card total">
// // //                     <h3>Total Applications</h3>
// // //                     <p>{totalApplications}</p>
// // //                 </div>
// // //                 <div className="stat-card pending">
// // //                     <h3>Pending</h3>
// // //                     <p>{applications.filter(app => app.status === 'pending').length}</p>
// // //                 </div>
// // //                 <div className="stat-card under-review">
// // //                     <h3>Under Review</h3>
// // //                     <p>{applications.filter(app => app.status === 'under_review').length}</p>
// // //                 </div>
// // //                 <div className="stat-card accepted">
// // //                     <h3>Accepted</h3>
// // //                     <p>{applications.filter(app => app.status === 'accepted').length}</p>
// // //                 </div>
// // //             </div>

// // //             {/* Applications Table */}
// // //             <div className="content-row">
// // //                 <div className="table-info">
// // //                     Showing {applications.length} of {totalApplications} applications
// // //                 </div>
// // //                 <table className="table">
// // //                     <thead>
// // //                         <tr>
// // //                             <th>#</th>
// // //                             <th>Applicant</th>
// // //                             <th>Contact</th>
// // //                             <th>Academic Info</th>
// // //                             <th>Target Countries</th>
// // //                             <th>Financial</th>
// // //                             <th>Status</th>
// // //                             <th>Registered</th>
// // //                             <th>Actions</th>
// // //                         </tr>
// // //                     </thead>
// // //                     <tbody>
// // //                         {applications.map((app, index) => (
// // //                             <tr key={app._id}>
// // //                                 <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
// // //                                 <td>
// // //                                     <div className="applicant-info">
// // //                                         <strong>{app.fullName}</strong>
// // //                                         <div className="text-sm text-gray-600">
// // //                                             {app.academicLevel} • {app.currentSchool}
// // //                                         </div>
// // //                                         <div className="text-sm">
// // //                                             Major: {app.intendedMajor}
// // //                                         </div>
// // //                                     </div>
// // //                                 </td>
// // //                                 <td>
// // //                                     <div className="contact-info">
// // //                                         <div>{app.email}</div>
// // //                                         <div>{app.phoneNumber}</div>
// // //                                         {app.parentalConsent?.parentName && (
// // //                                             <div className="text-xs text-blue-600">
// // //                                                 Parent: {app.parentalConsent.parentName}
// // //                                             </div>
// // //                                         )}
// // //                                     </div>
// // //                                 </td>
// // //                                 <td>
// // //                                     <div className="academic-info">
// // //                                         <div><strong>Level:</strong> {app.academicLevel}</div>
// // //                                         <div><strong>School:</strong> {app.currentSchool}</div>
// // //                                         <div><strong>Major:</strong> {app.intendedMajor}</div>
// // //                                     </div>
// // //                                 </td>
// // //                                 <td>
// // //                                     <div className="countries">
// // //                                         {app.targetCountries?.slice(0, 2).map(country => (
// // //                                             <span key={country} className="country-tag">
// // //                                                 {country}
// // //                                             </span>
// // //                                         ))}
// // //                                         {app.targetCountries?.length > 2 && (
// // //                                             <span className="more-countries">
// // //                                                 +{app.targetCountries.length - 2} more
// // //                                             </span>
// // //                                         )}
// // //                                     </div>
// // //                                 </td>
// // //                                 <td>
// // //                                     <span className={`financial-badge ${app.financialReadiness}`}>
// // //                                         {app.financialReadiness.replace(/_/g, ' ')}
// // //                                     </span>
// // //                                 </td>
// // //                                 <td>
// // //                                     <select
// // //                                         value={app.status}
// // //                                         onChange={(e) => updateApplicationStatus(app._id, e.target.value)}
// // //                                         className={`status-select ${app.status}`}
// // //                                     >
// // //                                         <option value="pending">Pending</option>
// // //                                         <option value="under_review">Under Review</option>
// // //                                         <option value="accepted">Accepted</option>
// // //                                         <option value="rejected">Rejected</option>
// // //                                         <option value="waitlisted">Waitlisted</option>
// // //                                     </select>
// // //                                 </td>
// // //                                 <td>{formatDate(app.registrationDate || app.createdAt)}</td>
// // //                                 <td>
// // //                                     <div className="action-buttons">
// // //                                         <button
// // //                                             className="action view"
// // //                                             onClick={() => {
// // //                                                 // Will implement detailed view modal
// // //                                                 Swal.fire({
// // //                                                     title: "Application Details",
// // //                                                     html: `
// // //                                                         <div style="text-align: left;">
// // //                                                             <h3>${app.fullName}</h3>
// // //                                                             <p><strong>Email:</strong> ${app.email}</p>
// // //                                                             <p><strong>Phone:</strong> ${app.phoneNumber}</p>
// // //                                                             <p><strong>Academic Level:</strong> ${app.academicLevel}</p>
// // //                                                             <p><strong>Intended Major:</strong> ${app.intendedMajor}</p>
// // //                                                             <p><strong>Current School:</strong> ${app.currentSchool}</p>
// // //                                                             <p><strong>Target Countries:</strong> ${app.targetCountries?.join(', ')}</p>
// // //                                                             <p><strong>Financial Readiness:</strong> ${app.financialReadiness}</p>
// // //                                                             ${app.motivationEssay ? `<p><strong>Motivation Essay Preview:</strong><br>${app.motivationEssay.substring(0, 200)}...</p>` : ''}
// // //                                                         </div>
// // //                                                     `,
// // //                                                     confirmButtonText: "Close"
// // //                                                 });
// // //                                             }}
// // //                                         >
// // //                                             View
// // //                                         </button>
// // //                                         <button
// // //                                             className="action delete"
// // //                                             onClick={() => 
// // //                                                 Swal.fire({
// // //                                                     title: "Delete Application?",
// // //                                                     text: "This will permanently remove this UPI application",
// // //                                                     icon: "warning",
// // //                                                     showCancelButton: true,
// // //                                                     confirmButtonColor: "#d33",
// // //                                                     cancelButtonColor: "#3085d6",
// // //                                                     confirmButtonText: "Delete"
// // //                                                 }).then((result) => {
// // //                                                     if (result.isConfirmed) {
// // //                                                         deleteApplication(app._id);
// // //                                                     }
// // //                                                 })
// // //                                             }
// // //                                         >
// // //                                             Delete
// // //                                         </button>
// // //                                     </div>
// // //                                 </td>
// // //                             </tr>
// // //                         ))}
// // //                     </tbody>
// // //                 </table>

// // //                 {/* Pagination */}
// // //                 {totalPages > 1 && (
// // //                     <div className="pagination">
// // //                         <button
// // //                             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
// // //                             disabled={currentPage === 1}
// // //                             className="pagination-btn"
// // //                         >
// // //                             Previous
// // //                         </button>
                        
// // //                         <div className="page-numbers">
// // //                             {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
// // //                                 let pageNum;
// // //                                 if (totalPages <= 5) {
// // //                                     pageNum = i + 1;
// // //                                 } else if (currentPage <= 3) {
// // //                                     pageNum = i + 1;
// // //                                 } else if (currentPage >= totalPages - 2) {
// // //                                     pageNum = totalPages - 4 + i;
// // //                                 } else {
// // //                                     pageNum = currentPage - 2 + i;
// // //                                 }
                                
// // //                                 return (
// // //                                     <button
// // //                                         key={pageNum}
// // //                                         onClick={() => setCurrentPage(pageNum)}
// // //                                         className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
// // //                                     >
// // //                                         {pageNum}
// // //                                     </button>
// // //                                 );
// // //                             })}
// // //                         </div>

// // //                         <button
// // //                             onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
// // //                             disabled={currentPage === totalPages}
// // //                             className="pagination-btn"
// // //                         >
// // //                             Next
// // //                         </button>
// // //                     </div>
// // //                 )}
// // //             </div>
// // //         </Wrapper>
// // //     );
// // // };
// // import React from "react";
// // import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// // import axios from "axios";
// // import styled from "styled-components";
// // import { FaFileExport, FaSearch, FaSync, FaUserGraduate } from "react-icons/fa";
// // import { CiSquarePlus } from "react-icons/ci";
// // import LoadingComTwo from "../components/shared/LoadingComTwo";
// // import Swal from "sweetalert2";

// // const ManageUPI = () => {
// //     const [filters, setFilters] = React.useState({
// //         status: "",
// //         search: "",
// //         academicLevel: "",
// //         dateFrom: "",
// //         dateTo: ""
// //     });
// //     const [currentPage, setCurrentPage] = React.useState(1);
// //     const itemsPerPage = 10;
// //     const queryClient = useQueryClient();

// //     // Get UPI applications
// //     const {
// //         isLoading,
// //         isError,
// //         data: apiResponse,
// //         error,
// //         refetch,
// //     } = useQuery({
// //         queryKey: ["upi-applications", currentPage, filters],
// //         queryFn: () => getUPIApplications(currentPage, filters),
// //     });

// //     const getUPIStats = async () => {
// //         const response = await axios.get(
// //             `${import.meta.env.VITE_API_BASE_URL}/applications/stats`,
// //             { withCredentials: true }
// //         );
// //         return response.data;
// //     };

// //     // Get statistics
// //     const { data: statsData } = useQuery({
// //         queryKey: ["upi-stats"],
// //         queryFn: getUPIStats,
// //     });

// //     const getUPIApplications = async (page = 1, filters = {}) => {
// //         const params = new URLSearchParams({
// //             page: page.toString(),
// //             limit: itemsPerPage.toString(),
// //             ...filters
// //         });
        
// //         const response = await axios.get(
// //             `${import.meta.env.VITE_API_BASE_URL}/applications?${params}`,
// //             { withCredentials: true }
// //         );
// //         return response.data;
// //     };

// //     // Update status mutation
// //     const updateStatusMutation = useMutation({
// //         mutationFn: ({ id, status }) => 
// //             axios.patch(
// //                 `${import.meta.env.VITE_API_BASE_URL}/applications/${id}/status`,
// //                 { status },
// //                 { withCredentials: true }
// //             ),
// //         onSuccess: () => {
// //             queryClient.invalidateQueries(["upi-applications"]);
// //             queryClient.invalidateQueries(["upi-stats"]);
// //         },
// //     });

// //     // Delete mutation
// //     const deleteMutation = useMutation({
// //         mutationFn: (id) => 
// //             axios.delete(
// //                 `${import.meta.env.VITE_API_BASE_URL}/applications/${id}`,
// //                 { withCredentials: true }
// //             ),
// //         onSuccess: () => {
// //             queryClient.invalidateQueries(["upi-applications"]);
// //             queryClient.invalidateQueries(["upi-stats"]);
// //         },
// //     });

// //     const formatDate = (dateString) => {
// //         const options = { year: 'numeric', month: 'short', day: 'numeric' };
// //         return new Date(dateString).toLocaleDateString(undefined, options);
// //     };

// //     const handleUpdateStatus = async (id, newStatus) => {
// //         try {
// //             await updateStatusMutation.mutateAsync({ id, status: newStatus });
// //             Swal.fire("Updated!", `Application status updated to ${newStatus}`, "success");
// //         } catch (error) {
// //             Swal.fire("Error!", error?.response?.data?.message || "Update failed", "error");
// //         }
// //     };

// //     const handleDeleteApplication = async (id) => {
// //         const result = await Swal.fire({
// //             title: "Delete Application?",
// //             text: "This will permanently remove this UPI application",
// //             icon: "warning",
// //             showCancelButton: true,
// //             confirmButtonColor: "#d33",
// //             cancelButtonColor: "#3085d6",
// //             confirmButtonText: "Delete"
// //         });

// //         if (result.isConfirmed) {
// //             try {
// //                 await deleteMutation.mutateAsync(id);
// //                 Swal.fire("Deleted!", "UPI application removed successfully.", "success");
// //             } catch (error) {
// //                 Swal.fire("Error!", error?.response?.data?.message || "Deletion failed", "error");
// //             }
// //         }
// //     };

// //     const exportToCSV = (data) => {
// //         const headers = [
// //             "No.", "Full Name", "Email", "Phone", "Academic Level", 
// //             "Intended Major", "Target Countries", "Current School",
// //             "Financial Readiness", "Status", "Registration Date"
// //         ].join(',');

// //         const rows = data.map((app, index) => [
// //             index + 1,
// //             `"${app.fullName}"`,
// //             `"${app.email}"`,
// //             `"${app.phoneNumber}"`,
// //             `"${app.academicLevel}"`,
// //             `"${app.intendedMajor}"`,
// //             `"${app.targetCountries?.join(', ') || 'N/A'}"`,
// //             `"${app.currentSchool}"`,
// //             `"${app.financialReadiness}"`,
// //             `"${app.status}"`,
// //             `"${formatDate(app.registrationDate || app.createdAt)}"`
// //         ].join(','));

// //         const csvContent = [headers, ...rows].join('\n');
// //         const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
// //         const url = URL.createObjectURL(blob);
// //         const link = document.createElement('a');
// //         link.setAttribute('href', url);
// //         link.setAttribute('download', 'UPI_Applications.csv');
// //         link.style.visibility = 'hidden';
// //         document.body.appendChild(link);
// //         link.click();
// //         document.body.removeChild(link);
// //     };

// //     const handleFilterChange = (key, value) => {
// //         setFilters(prev => ({ ...prev, [key]: value }));
// //         setCurrentPage(1);
// //     };

// //     const clearFilters = () => {
// //         setFilters({
// //             status: "",
// //             search: "",
// //             academicLevel: "",
// //             dateFrom: "",
// //             dateTo: ""
// //         });
// //         setCurrentPage(1);
// //     };

// //     if (isLoading) {
// //         return <LoadingComTwo />;
// //     }

// //     if (isError) {
// //         return (
// //             <div className="text-center mt-12">
// //                 <h2 className="text-red-600 text-lg font-bold">
// //                     Error loading UPI applications
// //                 </h2>
// //                 <p className="text-gray-600 mt-2">{error?.message}</p>
// //                 <button 
// //                     onClick={() => refetch()}
// //                     className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
// //                 >
// //                     Retry
// //                 </button>
// //             </div>
// //         );
// //     }

// //     const applications = apiResponse?.data || [];
// //     const totalPages = apiResponse?.totalPages || 1;
// //     const totalApplications = apiResponse?.total || 0;
// //     const stats = statsData?.data || {};

// //     return (
// //         <Wrapper>
// //             <div className="header-row">
// //                 <div className="title-row">
// //                     <FaUserGraduate className="mr-2" />
// //                     Manage UPI Applications
// //                     <CiSquarePlus className="ml-1 text-xl md:text-2xl" />
// //                 </div>
// //                 <div className="action-buttons">
// //                     <button 
// //                         onClick={() => exportToCSV(applications)}
// //                         className="export-btn"
// //                         disabled={applications.length === 0}
// //                     >
// //                         <FaFileExport className="mr-2" />
// //                         Export to CSV
// //                     </button>
// //                     <button 
// //                         onClick={() => refetch()}
// //                         className="refresh-btn"
// //                     >
// //                         <FaSync className="mr-2" />
// //                         Refresh
// //                     </button>
// //                 </div>
// //             </div>

            
// //             {/* Filters Section */}
// //              <div className="filters-section">
// //                  <div className="filter-grid">
// //                      <div className="filter-group">
// //                          <label>Search</label>
// //                          <div className="search-input">
// //                              <FaSearch className="search-icon" />
// //                              <input
// //                                 type="text"
// //                                 placeholder="Search by name, email, or school..."
// //                                 value={filters.search}
// //                                 onChange={(e) => handleFilterChange('search', e.target.value)}
// //                             />
// //                         </div>
// //                     </div>
                    
// //                     <div className="filter-group">
// //                         <label>Status</label>
// //                         <select
// //                             value={filters.status}
// //                             onChange={(e) => handleFilterChange('status', e.target.value)}
// //                         >
// //                             <option value="">All Status</option>
// //                             <option value="pending">Pending</option>
// //                             <option value="under_review">Under Review</option>
// //                             <option value="accepted">Accepted</option>
// //                             <option value="rejected">Rejected</option>
// //                             <option value="waitlisted">Waitlisted</option>
// //                         </select>
// //                     </div>

// //                     <div className="filter-group">
// //                         <label>Academic Level</label>
// //                         <select
// //                             value={filters.academicLevel}
// //                             onChange={(e) => handleFilterChange('academicLevel', e.target.value)}
// //                         >
// //                             <option value="">All Levels</option>
// //                             <option value="SS1">SS1</option>
// //                             <option value="SS2">SS2</option>
// //                             <option value="SS3">SS3</option>
// //                             <option value="Graduate">Graduate</option>
// //                             <option value="Other">Other</option>
// //                         </select>
// //                     </div>

// //                     <div className="filter-group">
// //                         <label>Date From</label>
// //                         <input
// //                             type="date"
// //                             value={filters.dateFrom}
// //                             onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
// //                         />
// //                     </div>

// //                     <div className="filter-group">
// //                         <label>Date To</label>
// //                         <input
// //                             type="date"
// //                             value={filters.dateTo}
// //                             onChange={(e) => handleFilterChange('dateTo', e.target.value)}
// //                         />
// //                     </div>
// //                 </div>
                
// //                 <button onClick={clearFilters} className="clear-filters">
// //                     Clear Filters
// //                 </button>
// //             </div>

// //             {/* Stats Summary */}
// //             <div className="stats-grid">
// //                 <div className="stat-card total">
// //                     <h3>Total Applications</h3>
// //                     <p>{totalApplications}</p>
// //                 </div>
// //                 <div className="stat-card pending">
// //                     <h3>Pending</h3>
// //                     <p>{applications.filter(app => app.status === 'pending').length}</p>
// //                 </div>
// //                 <div className="stat-card under-review">
// //                     <h3>Under Review</h3>
// //                     <p>{applications.filter(app => app.status === 'under_review').length}</p>
// //                 </div>
// //                 <div className="stat-card accepted">
// //                     <h3>Accepted</h3>
// //                     <p>{applications.filter(app => app.status === 'accepted').length}</p>
// //                 </div>
// //             </div>

// //             {/* Applications Table */}
// //             <div className="content-row">
// //                 <div className="table-info">
// //                     Showing {applications.length} of {totalApplications} applications
// //                 </div>
// //                 <table className="table">
// //                     <thead>
// //                         <tr>
// //                             <th>#</th>
// //                             <th>Applicant</th>
// //                             <th>Contact</th>
// //                             <th>Academic Info</th>
// //                             <th>Target Countries</th>
// //                             <th>Financial</th>
// //                             <th>Status</th>
// //                             <th>Registered</th>
// //                             <th>Actions</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         {applications.map((app, index) => (
// //                             <tr key={app._id}>
// //                                 <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
// //                                 <td>
// //                                     <div className="applicant-info">
// //                                         <strong>{app.fullName}</strong>
// //                                         <div className="text-sm text-gray-600">
// //                                             {app.academicLevel} • {app.currentSchool}
// //                                         </div>
// //                                         <div className="text-sm">
// //                                             Major: {app.intendedMajor}
// //                                         </div>
// //                                     </div>
// //                                 </td>
// //                                 <td>
// //                                     <div className="contact-info">
// //                                         <div>{app.email}</div>
// //                                         <div>{app.phoneNumber}</div>
// //                                         {app.parentalConsent?.parentName && (
// //                                             <div className="text-xs text-blue-600">
// //                                                 Parent: {app.parentalConsent.parentName}
// //                                             </div>
// //                                         )}
// //                                     </div>
// //                                 </td>
// //                                 <td>
// //                                     <div className="academic-info">
// //                                         <div><strong>Level:</strong> {app.academicLevel}</div>
// //                                         <div><strong>School:</strong> {app.currentSchool}</div>
// //                                         <div><strong>Major:</strong> {app.intendedMajor}</div>
// //                                     </div>
// //                                 </td>
// //                                 <td>
// //                                     <div className="countries">
// //                                         {app.targetCountries?.slice(0, 2).map(country => (
// //                                             <span key={country} className="country-tag">
// //                                                 {country}
// //                                             </span>
// //                                         ))}
// //                                         {app.targetCountries?.length > 2 && (
// //                                             <span className="more-countries">
// //                                                 +{app.targetCountries.length - 2} more
// //                                             </span>
// //                                         )}
// //                                     </div>
// //                                 </td>
// //                                 <td>
// //                                     <span className={`financial-badge ${app.financialReadiness}`}>
// //                                         {app.financialReadiness.replace(/_/g, ' ')}
// //                                     </span>
// //                                 </td>
// //                                 <td>
// //                                     <select
// //                                         value={app.status}
// //                                         onChange={(e) => updateApplicationStatus(app._id, e.target.value)}
// //                                         className={`status-select ${app.status}`}
// //                                     >
// //                                         <option value="pending">Pending</option>
// //                                         <option value="under_review">Under Review</option>
// //                                         <option value="accepted">Accepted</option>
// //                                         <option value="rejected">Rejected</option>
// //                                         <option value="waitlisted">Waitlisted</option>
// //                                     </select>
// //                                 </td>
// //                                 <td>{formatDate(app.registrationDate || app.createdAt)}</td>
// //                                 <td>
// //                                     <div className="action-buttons">
// //                                         <button
// //                                             className="action view"
// //                                             onClick={() => {
// //                                                 // Will implement detailed view modal
// //                                                 Swal.fire({
// //                                                     title: "Application Details",
// //                                                     html: `
// //                                                         <div style="text-align: left;">
// //                                                             <h3>${app.fullName}</h3>
// //                                                             <p><strong>Email:</strong> ${app.email}</p>
// //                                                             <p><strong>Phone:</strong> ${app.phoneNumber}</p>
// //                                                             <p><strong>Academic Level:</strong> ${app.academicLevel}</p>
// //                                                             <p><strong>Intended Major:</strong> ${app.intendedMajor}</p>
// //                                                             <p><strong>Current School:</strong> ${app.currentSchool}</p>
// //                                                             <p><strong>Target Countries:</strong> ${app.targetCountries?.join(', ')}</p>
// //                                                             <p><strong>Financial Readiness:</strong> ${app.financialReadiness}</p>
// //                                                             ${app.motivationEssay ? `<p><strong>Motivation Essay Preview:</strong><br>${app.motivationEssay.substring(0, 200)}...</p>` : ''}
// //                                                         </div>
// //                                                     `,
// //                                                     confirmButtonText: "Close"
// //                                                 });
// //                                             }}
// //                                         >
// //                                             View
// //                                         </button>
// //                                         <button
// //                                             className="action delete"
// //                                             onClick={() => 
// //                                                 Swal.fire({
// //                                                     title: "Delete Application?",
// //                                                     text: "This will permanently remove this UPI application",
// //                                                     icon: "warning",
// //                                                     showCancelButton: true,
// //                                                     confirmButtonColor: "#d33",
// //                                                     cancelButtonColor: "#3085d6",
// //                                                     confirmButtonText: "Delete"
// //                                                 }).then((result) => {
// //                                                     if (result.isConfirmed) {
// //                                                         deleteApplication(app._id);
// //                                                     }
// //                                                 })
// //                                             }
// //                                         >
// //                                             Delete
// //                                         </button>
// //                                     </div>
// //                                 </td>
// //                             </tr>
// //                         ))}
// //                     </tbody>
// //                 </table>

// //                 {/* Pagination */}
// //                 {totalPages > 1 && (
// //                     <div className="pagination">
// //                         <button
// //                             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
// //                             disabled={currentPage === 1}
// //                             className="pagination-btn"
// //                         >
// //                             Previous
// //                         </button>
                        
// //                         <div className="page-numbers">
// //                             {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
// //                                 let pageNum;
// //                                 if (totalPages <= 5) {
// //                                     pageNum = i + 1;
// //                                 } else if (currentPage <= 3) {
// //                                     pageNum = i + 1;
// //                                 } else if (currentPage >= totalPages - 2) {
// //                                     pageNum = totalPages - 4 + i;
// //                                 } else {
// //                                     pageNum = currentPage - 2 + i;
// //                                 }
                                
// //                                 return (
// //                                     <button
// //                                         key={pageNum}
// //                                         onClick={() => setCurrentPage(pageNum)}
// //                                         className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
// //                                     >
// //                                         {pageNum}
// //                                     </button>
// //                                 );
// //                             })}
// //                         </div>

// //                         <button
// //                             onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
// //                             disabled={currentPage === totalPages}
// //                             className="pagination-btn"
// //                         >
// //                             Next
// //                         </button>
// //                     </div>
// //                 )}
// //             </div>

// //         </Wrapper>
// //     );
// // };
 



// // const Wrapper = styled.section`
// //     padding: 2rem;
    
// //     .header-row {
// //         display: flex;
// //         justify-content: space-between;
// //         align-items: center;
// //         margin-bottom: 1.5rem;
// //         flex-wrap: wrap;
// //         gap: 1rem;
// //     }
    
// //     .title-row {
// //         display: flex;
// //         align-items: center;
// //         font-size: 1.5rem;
// //         font-weight: 600;
// //         color: #2d3748;
// //     }
    
// //     .action-buttons {
// //         display: flex;
// //         gap: 1rem;
// //     }
    
// //     .export-btn, .refresh-btn {
// //         display: flex;
// //         align-items: center;
// //         background-color: #2d8cd4;
// //         color: white;
// //         padding: 0.5rem 1rem;
// //         border-radius: 4px;
// //         font-weight: 500;
// //         transition: background-color 0.2s;
// //         border: none;
// //         cursor: pointer;
        
// //         &:hover {
// //             background-color: #1a5f8b;
// //         }
// //     }
    
// //     .refresh-btn {
// //         background-color: #48bb78;
        
// //         &:hover {
// //             background-color: #38a169;
// //         }
// //     }

// //     /* Filters Section */
// //     .filters-section {
// //         background: white;
// //         padding: 1.5rem;
// //         border-radius: 8px;
// //         box-shadow: 0 1px 3px rgba(0,0,0,0.1);
// //         margin-bottom: 1.5rem;
// //     }
    
// //     .filter-grid {
// //         display: grid;
// //         grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
// //         gap: 1rem;
// //         margin-bottom: 1rem;
// //     }
    
// //     .filter-group {
// //         display: flex;
// //         flex-direction: column;
// //     }
    
// //     .filter-group label {
// //         font-weight: 500;
// //         margin-bottom: 0.5rem;
// //         color: #4a5568;
// //     }
    
// //     .filter-group input,
// //     .filter-group select {
// //         padding: 0.5rem;
// //         border: 1px solid #e2e8f0;
// //         border-radius: 4px;
// //         font-size: 14px;
// //     }
    
// //     .search-input {
// //         position: relative;
// //     }
    
// //     .search-icon {
// //         position: absolute;
// //         left: 0.75rem;
// //         top: 50%;
// //         transform: translateY(-50%);
// //         color: #a0aec0;
// //     }
    
// //     .search-input input {
// //         padding-left: 2.5rem;
// //         width: 100%;
// //     }
    
// //     .clear-filters {
// //         background: none;
// //         border: 1px solid #e53e3e;
// //         color: #e53e3e;
// //         padding: 0.5rem 1rem;
// //         border-radius: 4px;
// //         cursor: pointer;
// //         font-size: 14px;
        
// //         &:hover {
// //             background: #e53e3e;
// //             color: white;
// //         }
// //     }

// //     /* Stats Grid */
// //     .stats-grid {
// //         display: grid;
// //         grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
// //         gap: 1rem;
// //         margin-bottom: 1.5rem;
// //     }
    
// //     .stat-card {
// //         padding: 1.5rem;
// //         border-radius: 8px;
// //         text-align: center;
// //         color: white;
        
// //         h3 {
// //             font-size: 0.875rem;
// //             font-weight: 500;
// //             margin-bottom: 0.5rem;
// //             opacity: 0.9;
// //         }
        
// //         p {
// //             font-size: 2rem;
// //             font-weight: bold;
// //             margin: 0;
// //         }
        
// //         &.total { background: linear-gradient(135deg, #2d8cd4, #1a5f8b); }
// //         &.pending { background: linear-gradient(135deg, #ed8936, #dd6b20); }
// //         &.under-review { background: linear-gradient(135deg, #9f7aea, #805ad5); }
// //         &.accepted { background: linear-gradient(135deg, #48bb78, #38a169); }
// //     }

// //     /* Table Styles */
// //     .content-row {
// //         overflow-x: auto;
// //         margin-top: 1.5rem;
// //     }
    
// //     .table-info {
// //         margin-bottom: 1rem;
// //         color: #718096;
// //         font-size: 14px;
// //     }
    
// //     .table {
// //         width: 100%;
// //         border-collapse: collapse;
// //         background: white;
// //         border-radius: 8px;
// //         overflow: hidden;
// //         box-shadow: 0 1px 3px rgba(0,0,0,0.1);
// //     }
    
// //     .table th, .table td {
// //         padding: 12px;
// //         text-align: left;
// //         border-bottom: 1px solid #e2e8f0;
// //     }
    
// //     .table th {
// //         background-color: #2d8cd4;
// //         color: white;
// //         font-weight: 500;
// //         font-size: 14px;
// //     }
    
// //     .table tr:nth-child(even) {
// //         background-color: #f7fafc;
// //     }
    
// //     .table tr:hover {
// //         background-color: #edf2f7;
// //     }

// //     /* Applicant Info */
// //     .applicant-info {
// //         min-width: 200px;
// //     }
    
// //     .contact-info {
// //         min-width: 150px;
// //     }
    
// //     .academic-info {
// //         min-width: 180px;
// //     }
    
// //     .countries {
// //         display: flex;
// //         flex-wrap: wrap;
// //         gap: 0.25rem;
// //         max-width: 150px;
// //     }
    
// //     .country-tag {
// //         background: #e2e8f0;
// //         padding: 0.25rem 0.5rem;
// //         border-radius: 12px;
// //         font-size: 12px;
// //         white-space: nowrap;
// //     }
    
// //     .more-countries {
// //         color: #718096;
// //         font-size: 12px;
// //         font-style: italic;
// //     }

// //     /* Status and Financial Badges */
// //     .financial-badge {
// //         padding: 0.25rem 0.5rem;
// //         border-radius: 12px;
// //         font-size: 12px;
// //         font-weight: 500;
// //         text-transform: capitalize;
        
// //         &.within_7_days { background: #c6f6d5; color: #22543d; }
// //         &.within_14_days { background: #fed7d7; color: #742a2a; }
// //         &.within_30_days { background: #feebcb; color: #744210; }
// //         &.need_financial_aid { background: #e9d8fd; color: #44337a; }
// //     }
    
// //     .status-select {
// //         padding: 0.25rem 0.5rem;
// //         border-radius: 4px;
// //         border: 1px solid #e2e8f0;
// //         font-size: 12px;
// //         font-weight: 500;
        
// //         &.pending { background: #feebcb; color: #744210; }
// //         &.under_review { background: #e9d8fd; color: #44337a; }
// //         &.accepted { background: #c6f6d5; color: #22543d; }
// //         &.rejected { background: #fed7d7; color: #742a2a; }
// //         &.waitlisted { background: #e2e8f0; color: #4a5568; }
// //     }

// //     /* Action Buttons */
// //     .action-buttons {
// //         display: flex;
// //         gap: 0.5rem;
// //         flex-wrap: wrap;
// //     }
    
// //     .action {
// //         padding: 0.375rem 0.75rem;
// //         border-radius: 4px;
// //         font-weight: 500;
// //         cursor: pointer;
// //         font-size: 12px;
// //         border: none;
        
// //         &.view {
// //             background-color: #2d8cd4;
// //             color: white;
            
// //             &:hover {
// //                 background-color: #1a5f8b;
// //             }
// //         }
        
// //         &.delete {
// //             background-color: #e53e3e;
// //             color: white;
            
// //             &:hover {
// //                 background-color: #c53030;
// //             }
// //         }
// //     }

// //     /* Pagination */
// //     .pagination {
// //         display: flex;
// //         justify-content: center;
// //         align-items: center;
// //         margin-top: 2rem;
// //         gap: 1rem;
// //     }
    
// //     .pagination-btn {
// //         padding: 0.5rem 1rem;
// //         border: 1px solid #e2e8f0;
// //         background: white;
// //         border-radius: 4px;
// //         cursor: pointer;
        
// //         &:hover:not(:disabled) {
// //             background: #edf2f7;
// //         }
        
// //         &:disabled {
// //             opacity: 0.5;
// //             cursor: not-allowed;
// //         }
// //     }
    
// //     .page-numbers {
// //         display: flex;
// //         gap: 0.5rem;
// //     }
    
// //     .page-btn {
// //         padding: 0.5rem 0.75rem;
// //         border: 1px solid #e2e8f0;
// //         background: white;
// //         border-radius: 4px;
// //         cursor: pointer;
        
// //         &:hover {
// //             background: #edf2f7;
// //         }
        
// //         &.active {
// //             background: #2d8cd4;
// //             color: white;
// //             border-color: #2d8cd4;
// //         }
// //     }

// //     @media (max-width: 768px) {
// //         padding: 1rem;
        
// //         .header-row {
// //             flex-direction: column;
// //             align-items: flex-start;
// //         }
        
// //         .action-buttons {
// //             width: 100%;
// //             justify-content: flex-end;
// //         }
        
// //         .filter-grid {
// //             grid-template-columns: 1fr;
// //         }
        
// //         .stats-grid {
// //             grid-template-columns: repeat(2, 1fr);
// //         }
        
// //         .table {
// //             font-size: 14px;
// //         }
        
// //         .action-buttons {
// //             flex-direction: column;
// //         }
// //     }
// // `;

// // export default ManageUPI;