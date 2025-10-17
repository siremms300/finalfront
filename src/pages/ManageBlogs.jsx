// components/ManageBlogs.jsx
import React, { useState, useEffect } from 'react';
import { useBlog } from '../context/BlogContext';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaEye, FaChartLine } from 'react-icons/fa';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const ManageBlogs = () => {
    const { blogs, loading, getAllBlogs, deleteBlog, getBlogStats, stats } = useBlog();
    const [filters, setFilters] = useState({
        status: '',
        search: ''
    });

    useEffect(() => {
        loadBlogs();
        loadStats();
    }, [filters]);

    const loadBlogs = async () => {
        try {
            await getAllBlogs({ ...filters, limit: 50 });
        } catch (error) {
            console.error('Failed to load blogs:', error);
        }
    };

    const loadStats = async () => {
        try {
            await getBlogStats();
        } catch (error) {
            console.error('Failed to load stats:', error);
        }
    };

    const handleDelete = async (id, title) => {
        const result = await Swal.fire({
            title: 'Delete Blog Post?',
            html: `Are you sure you want to delete <strong>"${title}"</strong>?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await deleteBlog(id);
                Swal.fire('Deleted!', 'Blog post has been deleted.', 'success');
            } catch (error) {
                Swal.fire('Error!', 'Failed to delete blog post.', 'error');
            }
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            published: { color: '#48bb78', bg: '#c6f6d5' },
            draft: { color: '#ed8936', bg: '#feebcb' },
            archived: { color: '#718096', bg: '#e2e8f0' }
        };
        
        const config = statusConfig[status] || statusConfig.draft;
        return (
            <span 
                className="status-badge"
                style={{ 
                    background: config.bg, 
                    color: config.color 
                }}
            >
                {status}
            </span>
        );
    };

    return (
        <Wrapper>
            <div className="container">
                {/* Header */}
                <div className="header">
                    <div className="title-section">
                        <h1>Manage Blog Posts</h1>
                        <p>Create, edit, and manage your blog content</p>
                    </div>
                    <Link to="/dashboard/create-blog" className="create-btn">
                        <FaPlus />
                        New Post
                    </Link>
                </div>

                {/* Stats */}
                {stats && (
                    <div className="stats-grid">
                        <div className="stat-card">
                            <FaChartLine />
                            <div>
                                <h3>{stats.totalBlogs}</h3>
                                <p>Total Posts</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <FaEye />
                            <div>
                                <h3>{stats.totalViews}</h3>
                                <p>Total Views</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="filters-section">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search blog posts..."
                            value={filters.search}
                            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                        />
                    </div>
                    <select
                        value={filters.status}
                        onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    >
                        <option value="">All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>

                {/* Blog Posts Table */}
                <div className="table-container">
                    <table className="blogs-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Status</th>
                                <th>Published</th>
                                <th>Views</th>
                                <th>Likes</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map(blog => (
                                <tr key={blog._id}>
                                    <td>
                                        <div className="title-cell">
                                            {blog.featuredImage?.url && (
                                                <img 
                                                    src={blog.featuredImage.url} 
                                                    alt={blog.title}
                                                    className="thumbnail"
                                                />
                                            )}
                                            <div>
                                                <div className="blog-title">{blog.title}</div>
                                                <div className="categories">
                                                    {blog.categories.map(cat => (
                                                        <span key={cat} className="category">{cat}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{blog.author?.username}</td>
                                    <td>
                                        {getStatusBadge(blog.status)}
                                        {blog.featured && <span className="featured-indicator">Featured</span>}
                                    </td>
                                    <td>{blog.publishedAt ? formatDate(blog.publishedAt) : '-'}</td>
                                    <td>{blog.views}</td>
                                    <td>{blog.likes?.length || 0}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <Link 
                                                to={`/blog/${blog.slug}`} 
                                                className="action-btn view"
                                                target="_blank"
                                            >
                                                <FaEye />
                                            </Link>
                                            <Link 
                                                to={`/dashboard/edit-blog/${blog._id}`}
                                                className="action-btn edit"
                                            >
                                                <FaEdit />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(blog._id, blog.title)}
                                                className="action-btn delete"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {blogs.length === 0 && !loading && (
                        <div className="empty-state">
                            <h3>No blog posts found</h3>
                            <p>Create your first blog post to get started</p>
                            <Link to="/dashboard/create-blog" className="create-btn">
                                Create Post
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    padding: 2rem;

    .container {
        max-width: 1200px;
        margin: 0 auto;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;

        .title-section {
            h1 {
                font-size: 2rem;
                font-weight: 700;
                color: #1a202c;
                margin-bottom: 0.5rem;
            }

            p {
                color: #718096;
            }
        }

        .create-btn {
            background: #2d8cd4;
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 600;
            transition: background-color 0.2s;

            &:hover {
                background: #1a5f8b;
            }
        }
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;

        .stat-card {
            background: white;
            padding: 1.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            gap: 1rem;

            svg {
                font-size: 2rem;
                color: #2d8cd4;
            }

            h3 {
                font-size: 1.5rem;
                font-weight: 700;
                color: #1a202c;
                margin-bottom: 0.25rem;
            }

            p {
                color: #718096;
                font-size: 0.9rem;
            }
        }
    }

    .filters-section {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;

        .search-box {
            flex: 1;
            min-width: 300px;

            input {
                width: 100%;
                padding: 0.75rem 1rem;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                font-size: 1rem;

                &:focus {
                    outline: none;
                    border-color: #2d8cd4;
                }
            }
        }

        select {
            padding: 0.75rem 1rem;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            background: white;
            cursor: pointer;

            &:focus {
                outline: none;
                border-color: #2d8cd4;
            }
        }
    }

    .table-container {
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }

    .blogs-table {
        width: 100%;
        border-collapse: collapse;

        th {
            background: #f7fafc;
            padding: 1rem;
            text-align: left;
            font-weight: 600;
            color: #4a5568;
            border-bottom: 1px solid #e2e8f0;
        }

        td {
            padding: 1rem;
            border-bottom: 1px solid #e2e8f0;
            vertical-align: top;
        }

        tr:hover {
            background: #f8fafc;
        }

        .title-cell {
            display: flex;
            align-items: flex-start;
            gap: 1rem;

            .thumbnail {
                width: 60px;
                height: 40px;
                object-fit: cover;
                border-radius: 4px;
            }

            .blog-title {
                font-weight: 600;
                color: #2d3748;
                margin-bottom: 0.5rem;
                line-height: 1.3;
            }

            .categories {
                display: flex;
                gap: 0.5rem;
                flex-wrap: wrap;

                .category {
                    background: #e8f4ff;
                    color: #2d8cd4;
                    padding: 0.25rem 0.5rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 500;
                }
            }
        }

        .status-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: capitalize;
        }

        .featured-indicator {
            background: #fed7d7;
            color: #c53030;
            padding: 0.25rem 0.5rem;
            border-radius: 12px;
            font-size: 0.7rem;
            font-weight: 600;
            margin-left: 0.5rem;
        }

        .action-buttons {
            display: flex;
            gap: 0.5rem;

            .action-btn {
                padding: 0.5rem;
                border-radius: 6px;
                text-decoration: none;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
                border: none;
                cursor: pointer;

                &.view {
                    background: #e8f4ff;
                    color: #2d8cd4;

                    &:hover {
                        background: #2d8cd4;
                        color: white;
                    }
                }

                &.edit {
                    background: #feebcb;
                    color: #ed8936;

                    &:hover {
                        background: #ed8936;
                        color: white;
                    }
                }

                &.delete {
                    background: #fed7d7;
                    color: #e53e3e;

                    &:hover {
                        background: #e53e3e;
                        color: white;
                    }
                }
            }
        }
    }

    .empty-state {
        text-align: center;
        padding: 3rem;
        color: #718096;

        h3 {
            color: #4a5568;
            margin-bottom: 0.5rem;
        }

        p {
            margin-bottom: 1.5rem;
        }
    }

    @media (max-width: 768px) {
        padding: 1rem;

        .header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;

            .create-btn {
                align-self: stretch;
                text-align: center;
                justify-content: center;
            }
        }

        .filters-section {
            .search-box {
                min-width: auto;
            }
        }

        .blogs-table {
            display: block;
            overflow-x: auto;

            .title-cell {
                flex-direction: column;
                align-items: flex-start;
                gap: 0.5rem;
            }
        }
    }
`;

export default ManageBlogs;