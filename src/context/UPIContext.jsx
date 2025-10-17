import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const UPIContext = createContext();

export const UPIProvider = ({ children }) => {
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [applications, setApplications] = useState([]);
    const [currentApplication, setCurrentApplication] = useState(null);
    const [stats, setStats] = useState(null);

    const registerForUPI = async (formData) => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/upi/register`, // this is the correct route 
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true
                }
            );
            toast.success("UPI application submitted successfully!");
            return response.data;
        } catch (err) {
            const errorMsg = err.response?.data?.message || "UPI application submission failed";
            toast.error(errorMsg);
            setError(errorMsg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getAllUPIRegistrations = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/upi/applications`, // this is the correct route 
                { withCredentials: true }
            );
            setRegistrations(response.data.data);
            return response.data;
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Failed to fetch UPI applications";
            toast.error(errorMsg);
            setError(errorMsg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        loading,
        error,
        registrations,
        registerForUPI,
        getAllUPIRegistrations
    };

    return (
        <UPIContext.Provider value={value}>
            {children}
        </UPIContext.Provider>
    );
};

export const useUPI = () => useContext(UPIContext);






































// import React, { createContext, useContext, useState } from "react";
// import axios from "axios";
// import { toast } from 'react-toastify';

// const UPIContext = createContext();

// export const UPIProvider = ({ children }) => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [applications, setApplications] = useState([]);
//     const [currentApplication, setCurrentApplication] = useState(null);
//     const [stats, setStats] = useState(null);

//     const registerForUPI = async (formData) => {
//         setLoading(true);
//         setError(null);
//         try {
//             console.log('Submitting UPI application...', formData);
            
//             const response = await axios.post(
//                 `${import.meta.env.VITE_API_BASE_URL}/register`, // FIXED: Added /api/upi
//                 formData,
//                 {
//                     headers: {
//                         'Content-Type': 'multipart/form-data'
//                     },
//                     // withCredentials: true, // ADDED: For cookies/auth
//                     timeout: 30000
//                 }
//             );
            
//             toast.success("UPI application submitted successfully!");
//             return response.data;
//         } catch (err) {
//             console.error('UPI application error:', err);
//             const errorMsg = err.response?.data?.message || err.message || "Application submission failed";
//             toast.error(errorMsg);
//             setError(errorMsg);
//             throw err;
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getAllUPIApplications = async (filters = {}) => {
//         setLoading(true);
//         try {
//             const params = new URLSearchParams();
//             Object.keys(filters).forEach(key => {
//                 if (filters[key]) params.append(key, filters[key]);
//             });

//             const response = await axios.get(
//                 `${import.meta.env.VITE_API_BASE_URL}/applications?${params}`, // FIXED: Added /api/upi
//                 { withCredentials: true } // ADDED: For cookies/auth
//             );
//             setApplications(response.data.data);
//             return response.data;
//         } catch (err) {
//             const errorMsg = err.response?.data?.message || "Failed to fetch UPI applications";
//             toast.error(errorMsg);
//             setError(errorMsg);
//             throw err;
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getUPIApplication = async (id) => {
//         setLoading(true);
//         try {
//             const response = await axios.get(
//                 `${import.meta.env.VITE_API_BASE_URL}/applications/${id}`, // FIXED: Added /api/upi
//                 { withCredentials: true } // ADDED: For cookies/auth
//             );
//             setCurrentApplication(response.data.data);
//             return response.data;
//         } catch (err) {
//             const errorMsg = err.response?.data?.message || "Failed to fetch application";
//             toast.error(errorMsg);
//             setError(errorMsg);
//             throw err;
//         } finally {
//             setLoading(false);
//         }
//     };

//     const updateApplicationStatus = async (id, status) => {
//         setLoading(true);
//         try {
//             const response = await axios.patch(
//                 `${import.meta.env.VITE_API_BASE_URL}/applications/${id}/status`, // FIXED: Added /api/upi
//                 { status },
//                 { withCredentials: true } // ADDED: For cookies/auth
//             );
            
//             // Update local state for immediate UI update
//             setApplications(prev => 
//                 prev.map(app => 
//                     app._id === id ? { ...app, status } : app
//                 )
//             );
            
//             if (currentApplication && currentApplication._id === id) {
//                 setCurrentApplication(prev => ({ ...prev, status }));
//             }
            
//             toast.success("Application status updated successfully!");
//             return response.data;
//         } catch (err) {
//             const errorMsg = err.response?.data?.message || "Failed to update application status";
//             toast.error(errorMsg);
//             setError(errorMsg);
//             throw err;
//         } finally {
//             setLoading(false);
//         }
//     };

//     const deleteApplication = async (id) => {
//         setLoading(true);
//         try {
//             await axios.delete(
//                 `${import.meta.env.VITE_API_BASE_URL}/applications/${id}`, // FIXED: Added /api/upi
//                 { withCredentials: true } // ADDED: For cookies/auth
//             );
            
//             // Update local state
//             setApplications(prev => prev.filter(app => app._id !== id));
            
//             if (currentApplication && currentApplication._id === id) {
//                 setCurrentApplication(null);
//             }
            
//             toast.success("Application deleted successfully!");
//             return { success: true };
//         } catch (err) {
//             const errorMsg = err.response?.data?.message || "Failed to delete application";
//             toast.error(errorMsg);
//             setError(errorMsg);
//             throw err;
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getUPIStats = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get(
//                 `${import.meta.env.VITE_API_BASE_URL}/applications/stats`, // FIXED: Added /api/upi
//                 { withCredentials: true } // ADDED: For cookies/auth
//             );
//             setStats(response.data.data);
//             return response.data;
//         } catch (err) {
//             const errorMsg = err.response?.data?.message || "Failed to fetch statistics";
//             toast.error(errorMsg);
//             setError(errorMsg);
//             throw err;
//         } finally {
//             setLoading(false);
//         }
//     };

//     const exportToCSV = async (filters = {}) => {
//         try {
//             const params = new URLSearchParams(filters);
//             const response = await axios.get(
//                 `${import.meta.env.VITE_API_BASE_URL}/applications?${params}`, // FIXED: Added /api/upi
//                 { withCredentials: true }
//             );
            
//             const applications = response.data.data;
//             const headers = [
//                 "No.", "Full Name", "Email", "Phone", "Academic Level", 
//                 "Intended Major", "Target Countries", "Current School",
//                 "Financial Readiness", "Status", "Registration Date"
//             ].join(',');

//             const rows = applications.map((app, index) => [
//                 index + 1,
//                 `"${app.fullName}"`,
//                 `"${app.email}"`,
//                 `"${app.phoneNumber}"`,
//                 `"${app.academicLevel}"`,
//                 `"${app.intendedMajor}"`,
//                 `"${app.targetCountries?.join(', ') || 'N/A'}"`,
//                 `"${app.currentSchool}"`,
//                 `"${app.financialReadiness}"`,
//                 `"${app.status}"`,
//                 `"${new Date(app.registrationDate || app.createdAt).toLocaleDateString()}"`
//             ].join(','));

//             const csvContent = [headers, ...rows].join('\n');
//             const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//             const url = URL.createObjectURL(blob);
//             const link = document.createElement('a');
//             link.setAttribute('href', url);
//             link.setAttribute('download', `UPI_Applications_${new Date().toISOString().split('T')[0]}.csv`);
//             link.style.visibility = 'hidden';
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
            
//             toast.success("Applications exported successfully!");
//         } catch (err) {
//             const errorMsg = err.response?.data?.message || "Failed to export applications";
//             toast.error(errorMsg);
//             throw err;
//         }
//     };

//     const clearError = () => setError(null);

//     const value = {
//         loading,
//         error,
//         applications,
//         currentApplication,
//         stats,
//         registerForUPI,
//         getAllUPIApplications,
//         getUPIApplication,
//         updateApplicationStatus,
//         deleteApplication,
//         getUPIStats,
//         exportToCSV,
//         clearError
//     };

//     return (
//         <UPIContext.Provider value={value}>
//             {children}
//         </UPIContext.Provider>
//     );
// };

// export const useUPI = () => {
//     const context = useContext(UPIContext);
//     if (!context) {
//         throw new Error('useUPI must be used within a UPIProvider');
//     }
//     return context;
// };





































// // import React, { createContext, useContext, useState } from "react";

// // import axios from "axios";
// // import { toast } from 'react-toastify';

// // const UPIContext = createContext();

// // export const UPIProvider = ({ children }) => {
// //     const [loading, setLoading] = useState(false);
// //     const [error, setError] = useState(null);
// //     const [applications, setApplications] = useState([]);
// //     const [currentApplication, setCurrentApplication] = useState(null);

// //     const registerForUPI = async (formData) => {
// //         setLoading(true);
// //         setError(null);
// //         try {
// //             console.log('Submitting UPI application...', formData);
            
// //             const response = await axios.post(
// //                 `${import.meta.env.VITE_API_BASE_URL}/register`,
// //                 formData,
// //                 {
// //                     headers: {
// //                         'Content-Type': 'multipart/form-data'
// //                     },
// //                     timeout: 30000 // 30 second timeout
// //                 }
// //             );
            
// //             toast.success("UPI application submitted successfully!");
// //             return response.data;
// //         } catch (err) {
// //             console.error('UPI application error:', err);
// //             const errorMsg = err.response?.data?.message || err.message || "Application submission failed";
// //             toast.error(errorMsg);
// //             setError(errorMsg);
// //             throw err;
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const getAllUPIApplications = async (filters = {}) => {
// //         setLoading(true);
// //         try {
// //             const params = new URLSearchParams();
// //             Object.keys(filters).forEach(key => {
// //                 if (filters[key]) params.append(key, filters[key]);
// //             });

// //             const response = await axios.get(
// //                 `${import.meta.env.VITE_API_BASE_URL}/applications?${params}`
// //             );
// //             setApplications(response.data.data);
// //             return response.data;
// //         } catch (err) {
// //             const errorMsg = err.response?.data?.message || "Failed to fetch UPI applications";
// //             toast.error(errorMsg);
// //             setError(errorMsg);
// //             throw err;
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const getUPIApplication = async (id) => {
// //         setLoading(true);
// //         try {
// //             const response = await axios.get(
// //                 `${import.meta.env.VITE_API_BASE_URL}/applications/${id}`
// //             );
// //             setCurrentApplication(response.data.data);
// //             return response.data;
// //         } catch (err) {
// //             const errorMsg = err.response?.data?.message || "Failed to fetch application";
// //             toast.error(errorMsg);
// //             setError(errorMsg);
// //             throw err;
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const updateApplicationStatus = async (id, status) => {
// //         setLoading(true);
// //         try {
// //             const response = await axios.patch(
// //                 `${import.meta.env.VITE_API_BASE_URL}/applications/${id}/status`,
// //                 { status }
// //             );
// //             toast.success("Application status updated successfully!");
// //             return response.data;
// //         } catch (err) {
// //             const errorMsg = err.response?.data?.message || "Failed to update application status";
// //             toast.error(errorMsg);
// //             setError(errorMsg);
// //             throw err;
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const value = {
// //         loading,
// //         error,
// //         applications,
// //         currentApplication,
// //         registerForUPI,
// //         getAllUPIApplications,
// //         getUPIApplication,
// //         updateApplicationStatus
// //     };

// //     return (
// //         <UPIContext.Provider value={value}>
// //             {children}
// //         </UPIContext.Provider>
// //     );
// // };

// // export const useUPI = () => useContext(UPIContext);














































// // import React, { createContext, useContext, useState } from "react";
// // import axios from "axios";
// // import { toast } from 'react-toastify';

// // const UPIContext = createContext();

// // export const UPIProvider = ({ children }) => {
// //     const [loading, setLoading] = useState(false);
// //     const [error, setError] = useState(null);
// //     const [applications, setApplications] = useState([]);
// //     const [currentApplication, setCurrentApplication] = useState(null);

// //     const registerForUPI = async (formData) => {
// //         setLoading(true);
// //         setError(null);
// //         try {
// //             const response = await axios.post(
// //                 `${import.meta.env.VITE_API_BASE_URL}/upi/register`,
// //                 formData,
// //                 {
// //                     headers: {
// //                         'Content-Type': 'multipart/form-data'
// //                     }
// //                     // withCredentials: true
// //                 }
// //             );
// //             toast.success("UPI application submitted successfully!");
// //             return response.data;
// //         } catch (err) {
// //             const errorMsg = err.response?.data?.message || "Application submission failed";
// //             toast.error(errorMsg);
// //             setError(errorMsg);
// //             throw err;
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const getAllUPIApplications = async (filters = {}) => {
// //         setLoading(true);
// //         try {
// //             const params = new URLSearchParams();
// //             Object.keys(filters).forEach(key => {
// //                 if (filters[key]) params.append(key, filters[key]);
// //             });

// //             const response = await axios.get(
// //                 `${import.meta.env.VITE_API_BASE_URL}/upi/applications?${params}`
// //             );
// //             setApplications(response.data.data);
// //             return response.data;
// //         } catch (err) {
// //             const errorMsg = err.response?.data?.message || "Failed to fetch UPI applications";
// //             toast.error(errorMsg);
// //             setError(errorMsg);
// //             throw err;
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const getUPIApplication = async (id) => {
// //         setLoading(true);
// //         try {
// //             const response = await axios.get(
// //                 `${import.meta.env.VITE_API_BASE_URL}/upi/applications/${id}`
// //             );
// //             setCurrentApplication(response.data.data);
// //             return response.data;
// //         } catch (err) {
// //             const errorMsg = err.response?.data?.message || "Failed to fetch application";
// //             toast.error(errorMsg);
// //             setError(errorMsg);
// //             throw err;
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const updateApplicationStatus = async (id, status) => {
// //         setLoading(true);
// //         try {
// //             const response = await axios.patch(
// //                 `${import.meta.env.VITE_API_BASE_URL}/upi/applications/${id}/status`,
// //                 { status }
// //             );
// //             toast.success("Application status updated successfully!");
// //             return response.data;
// //         } catch (err) {
// //             const errorMsg = err.response?.data?.message || "Failed to update application status";
// //             toast.error(errorMsg);
// //             setError(errorMsg);
// //             throw err;
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const value = {
// //         loading,
// //         error,
// //         applications,
// //         currentApplication,
// //         registerForUPI,
// //         getAllUPIApplications,
// //         getUPIApplication,
// //         updateApplicationStatus
// //     };

// //     return (
// //         <UPIContext.Provider value={value}>
// //             {children}
// //         </UPIContext.Provider>
// //     );
// // };

// // export const useUPI = () => useContext(UPIContext);