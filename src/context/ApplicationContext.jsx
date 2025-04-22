 

 import React, { createContext, useContext, useState } from "react"; 
 import axios from "axios";
 import { toast } from 'react-toastify';
 
 const ApplicationContext = createContext();
 
 const ApplicationProvider = ({ children }) => {
     const [applicationLoading, setApplicationLoading] = useState(false);
     const [applicationError, setApplicationError] = useState({ status: false, message: "" });
     const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
     const [selectedSchoolId, setSelectedSchoolId] = useState(null);
     const [applications, setApplications] = useState([]);
     const [userApplications, setUserApplications] = useState([]);
 
     // Open the application modal and set the selected school ID
     const openApplicationModal = (schoolId) => {
         setSelectedSchoolId(schoolId);
         setIsApplicationModalOpen(true);
     };
 
     // Close the application modal
     const closeApplicationModal = () => {
         setIsApplicationModalOpen(false);
         setSelectedSchoolId(null);
     };
 
     // Handle the application submission
     const handleApply = async (applicationData) => {
         setApplicationLoading(true);
         try {
             const response = await axios.post(
                 `${import.meta.env.VITE_API_BASE_URL}/application/apply/${selectedSchoolId}`,
                 {
                     phoneNumber: applicationData.phoneNumber,
                     resumeLink: applicationData.resumeLink
                 },
                 { withCredentials: true }
             );
             toast.success("Application submitted successfully!");
             setApplicationError({ status: false, message: "" });
             closeApplicationModal();
             return response.data;
         } catch (error) {
             toast.error(error.response?.data?.message || "Application failed");
             setApplicationError({ 
                 status: true, 
                 message: error.response?.data?.message || "Application failed. Please try again."
             });
             throw error;
         } finally {
             setApplicationLoading(false);
         }
     };
 
     // Get all applications (admin only)
     const getAllApplications = async () => {
         setApplicationLoading(true);
         try {
             const response = await axios.get(
                 `${import.meta.env.VITE_API_BASE_URL}/application/`,
                 { withCredentials: true }
             );
             setApplications(response.data);
             return response.data;
         } catch (error) {
             toast.error(error.response?.data?.message || "Failed to fetch applications");
             setApplicationError({
                 status: true,
                 message: error.response?.data?.message || "Failed to fetch applications"
             });
             throw error;
         } finally {
             setApplicationLoading(false);
         }
     };
 
     // Get applications for the current user
     const getUserApplications = async () => {
         setApplicationLoading(true);
         try {
             const response = await axios.get(
                 `${import.meta.env.VITE_API_BASE_URL}/application/my-applications`,
                 { withCredentials: true }
             );
             setUserApplications(response.data);
             return response.data;
         } catch (error) {
             toast.error(error.response?.data?.message || "Failed to fetch your applications");
             setApplicationError({
                 status: true,
                 message: error.response?.data?.message || "Failed to fetch your applications"
             });
             throw error;
         } finally {
             setApplicationLoading(false);
         }
     };
 
     const value = {
         applicationLoading,
         applicationError,
         isApplicationModalOpen,
         openApplicationModal,
         closeApplicationModal,
         handleApply,
         selectedSchoolId,
         applications,
         userApplications,
         getAllApplications,
         getUserApplications,
     };
 
     return (
         <ApplicationContext.Provider value={value}>
             {children}
         </ApplicationContext.Provider>
     );
 };
 
 const useApplicationContext = () => useContext(ApplicationContext);
 
 export { ApplicationProvider, useApplicationContext };















// import React, { createContext, useContext, useState } from "react";
// import axios from "axios";
// import { toast } from 'react-toastify';

// const ApplicationContext = createContext();

// const ApplicationProvider = ({ children }) => {
//     const [applicationLoading, setApplicationLoading] = useState(false);
//     const [applicationError, setApplicationError] = useState({ status: false, message: "" });
//     const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
//     const [selectedSchoolId, setSelectedSchoolId] = useState(null);

//     // Open the application modal and set the selected school ID
//     const openApplicationModal = (schoolId) => {
//         setSelectedSchoolId(schoolId);
//         setIsApplicationModalOpen(true);
//     };

//     // Close the application modal
//     const closeApplicationModal = () => {
//         setIsApplicationModalOpen(false);
//         setSelectedSchoolId(null);
//     };

//     // Handle the application submission
//     const handleApply = async (applicationData) => {
//         setApplicationLoading(true);
//         try {
//             const response = await axios.post(
//                 `${import.meta.env.VITE_API_BASE_URL}/application/apply/${selectedSchoolId}`,
//                 {
//                     phoneNumber: applicationData.phoneNumber,
//                     resumeLink: applicationData.resumeLink
//                 },
//                 { withCredentials: true }
//             );
//             toast.success("Application submitted successfully!");
//             setApplicationError({ status: false, message: "" });
//             closeApplicationModal();
//             return response.data;
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Application failed");
//             setApplicationError({ 
//                 status: true, 
//                 message: error.response?.data?.message || "Application failed. Please try again."
//             });
//             throw error;
//         } finally {
//             setApplicationLoading(false);
//         }
//     };
    
 

    


//     const value = {
//         applicationLoading,
//         applicationError,
//         isApplicationModalOpen,
//         openApplicationModal,
//         closeApplicationModal,
//         handleApply,
//         selectedSchoolId,
//     };

//     return (
//         <ApplicationContext.Provider value={value}>
//             {children}
//         </ApplicationContext.Provider>
//     );
// };

// const useApplicationContext = () => useContext(ApplicationContext);

// export { ApplicationProvider, useApplicationContext };


