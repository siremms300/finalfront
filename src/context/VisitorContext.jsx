import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const VisitorContext = createContext();

export const VisitorProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 
    const [registrations, setRegistrations] = useState([]);


    const registerForVisitor = async (formData) => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/visitor/register`,
                formData,
                // { withCredentials: true }
            );
            toast.success("Registration successful!");
            return response.data;
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Registration failed";
            toast.error(errorMsg);
            setError(errorMsg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // const value = {
    //     loading,
    //     error,
    //     registerForWebinar
    // };

    const getAllVisitorRegistrations = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/visitor/registrations`
            );
            setRegistrations(response.data);
            return response.data;
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Failed to fetch webinar registrations";
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
        registerForVisitor,
        getAllVisitorRegistrations
    };


    return (
        <VisitorContext.Provider value={value}>
            {children}
        </VisitorContext.Provider>
    );
}; 

export const useVisitor = () => useContext(VisitorContext); 







