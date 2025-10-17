// context/BlogContext.js
import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [currentBlog, setCurrentBlog] = useState(null);
    const [stats, setStats] = useState(null);

    // Get all blogs with filters
    const getAllBlogs = async (filters = {}) => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            Object.keys(filters).forEach(key => {
                if (filters[key]) params.append(key, filters[key]);
            });

            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/blogs?${params}`
            );
            setBlogs(response.data.data);
            return response.data;
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Failed to fetch blog posts";
            toast.error(errorMsg);
            setError(errorMsg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Get single blog by slug
    const getBlogBySlug = async (slug) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/blogs/${slug}`
            );
            setCurrentBlog(response.data.data);
            return response.data;
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Failed to fetch blog post";
            toast.error(errorMsg);
            setError(errorMsg);
            throw err;
        } finally {
            setLoading(false);
        }
    };
 


    // context/BlogContext.js - Update createBlog function
    const createBlog = async (formData) => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/blogs`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true
                }
            );
            toast.success("Blog post created successfully!");
            return response.data;
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Failed to create blog post";
            toast.error(errorMsg);
            setError(errorMsg);
            throw err;
        } finally {
            setLoading(false);
        }
    };
    // Update blog post
    const updateBlog = async (id, formData) => {
        setLoading(true);
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/blogs/${id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true
                }
            );
            toast.success("Blog post updated successfully!");
            return response.data;
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Failed to update blog post";
            toast.error(errorMsg);
            setError(errorMsg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Delete blog post
    const deleteBlog = async (id) => {
        setLoading(true);
        try {
            await axios.delete(
                `${import.meta.env.VITE_API_BASE_URL}/blogs/${id}`,
                { withCredentials: true }
            );
            setBlogs(prev => prev.filter(blog => blog._id !== id));
            toast.success("Blog post deleted successfully!");
            return { success: true };
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Failed to delete blog post";
            toast.error(errorMsg);
            setError(errorMsg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Like/Unlike blog post
    const toggleLike = async (id) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/blogs/${id}/like`,
                {},
                { withCredentials: true }
            );
            
            // Update local state
            setBlogs(prev => prev.map(blog => 
                blog._id === id 
                    ? { ...blog, likes: response.data.data.likes, hasLiked: response.data.data.hasLiked }
                    : blog
            ));
            
            if (currentBlog && currentBlog._id === id) {
                setCurrentBlog(prev => ({
                    ...prev,
                    likes: response.data.data.likes,
                    hasLiked: response.data.data.hasLiked
                }));
            }
            
            return response.data;
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Failed to toggle like";
            toast.error(errorMsg);
            throw err;
        }
    };

    // Add comment to blog post
    const addComment = async (id, content) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/blogs/${id}/comment`,
                { content },
                { withCredentials: true }
            );
            
            // Update local state
            if (currentBlog && currentBlog._id === id) {
                setCurrentBlog(prev => ({
                    ...prev,
                    comments: [...prev.comments, response.data.data]
                }));
            }
            
            toast.success("Comment added successfully!");
            return response.data;
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Failed to add comment";
            toast.error(errorMsg);
            throw err;
        }
    };

    // Add to BlogContext.js
    const getBlogById = async (id) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/v1/blogs/id/${id}`,
                { withCredentials: true }
            );
            setCurrentBlog(response.data.data);
            return response.data;
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Failed to fetch blog post";
            toast.error(errorMsg);
            setError(errorMsg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Get blog statistics
    const getBlogStats = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/blogs/stats`
            );
            setStats(response.data.data);
            return response.data;
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Failed to fetch blog statistics";
            toast.error(errorMsg);
            setError(errorMsg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const clearError = () => setError(null);

    const value = {
        loading,
        error,
        blogs,
        currentBlog,
        stats,
        getAllBlogs,
        getBlogBySlug,
        createBlog,
        updateBlog,
        deleteBlog,
        toggleLike,
        addComment,
        getBlogById,
        getBlogStats,
        clearError
    };

    return (
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    );
};

export const useBlog = () => {
    const context = useContext(BlogContext);
    if (!context) {
        throw new Error('useBlog must be used within a BlogProvider');
    }
    return context;
};


