import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const SATContext = createContext();

export const SATProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [registrations, setRegistrations] = useState([]);

    const registerForSAT = async (formData) => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/sat/register`,
                formData
            );
            toast.success("SAT Registration successful!");
            return response.data;
        } catch (err) {
            const errorMsg = err.response?.data?.message || "SAT Registration failed";
            toast.error(errorMsg);
            setError(errorMsg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getAllSATRegistrations = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/sat/registrations`
            );
            setRegistrations(response.data);
            return response.data;
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Failed to fetch SAT registrations";
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
        registerForSAT,
        getAllSATRegistrations
    };

    return (
        <SATContext.Provider value={value}>
            {children}
        </SATContext.Provider>
    );
};

export const useSAT = () => useContext(SATContext);