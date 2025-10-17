// components/BlogList.jsx
import React, { useState, useEffect } from 'react';
import { useBlog } from '../context/BlogContext';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaCalendar, FaEye, FaHeart, FaClock } from 'react-icons/fa';
import styled from 'styled-components';
import Navbar from "../components/shared/Navbar";

const BlogList = () => {
    const { blogs, loading, getAllBlogs } = useBlog();
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        tag: '',
        sortBy: 'publishedAt',
        sortOrder: 'desc'
    });

    useEffect(() => {
        loadBlogs();
    }, [filters]);

    const loadBlogs = async () => {
        try {
            await getAllBlogs(filters);
        } catch (error) {
            console.error('Failed to load blogs:', error);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className="text-center py-12">Loading blog posts...</div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <Wrapper>
                <div className="container">
                    {/* Header */}
                    <div className="header">
                        <h1>Our Blog</h1>
                        <p>Stay updated with the latest insights and news</p>
                    </div>

                    {/* Filters */}
                    <div className="filters-section">
                        <div className="search-box">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search blog posts..."
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                            />
                        </div>
                        
                        <div className="filter-grid">
                            <select
                                value={filters.category}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                            >
                                <option value="">All Categories</option>
                                <option value="education">Education</option>
                                <option value="career">Career</option>
                                <option value="study-abroad">Study Abroad</option>
                                <option value="tips">Tips & Advice</option>
                            </select>
                            
                            <select
                                value={filters.sortBy}
                                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                            >
                                <option value="publishedAt">Latest</option>
                                <option value="views">Most Popular</option>
                                <option value="readTime">Reading Time</option>
                            </select>
                        </div>
                    </div>

                    {/* Blog Grid */}
                    <div className="blog-grid">
                        {blogs.map(blog => (
                            <article key={blog._id} className="blog-card">
                                {blog.featuredImage?.url && (
                                    <div className="image-container">
                                        <img 
                                            src={blog.featuredImage.url} 
                                            alt={blog.featuredImage.alt || blog.title}
                                            className="blog-image"
                                        />
                                        {blog.featured && <span className="featured-badge">Featured</span>}
                                    </div>
                                )}
                                
                                <div className="blog-content">
                                    <div className="categories">
                                        {blog.categories.map(category => (
                                            <span key={category} className="category-tag">
                                                {category}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    <h2 className="blog-title">
                                        <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                                    </h2>
                                    
                                    <p className="blog-excerpt">{blog.excerpt}</p>
                                    
                                    <div className="blog-meta">
                                        <div className="author-info">
                                            {blog.author?.profilePicture && (
                                                <img 
                                                    src={blog.author.profilePicture} 
                                                    alt={blog.author.username}
                                                    className="author-avatar"
                                                />
                                            )}
                                            <span>By {blog.author?.username}</span>
                                        </div>
                                        
                                        <div className="meta-stats">
                                            <span className="meta-item">
                                                <FaCalendar />
                                                {formatDate(blog.publishedAt)}
                                            </span>
                                            <span className="meta-item">
                                                <FaClock />
                                                {blog.readTime} min read
                                            </span>
                                            <span className="meta-item">
                                                <FaEye />
                                                {blog.views}
                                            </span>
                                            <span className="meta-item">
                                                <FaHeart />
                                                {blog.likes?.length || 0}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {blogs.length === 0 && !loading && (
                        <div className="empty-state">
                            <h3>No blog posts found</h3>
                            <p>Try adjusting your search filters</p>
                        </div>
                    )}
                </div>
            </Wrapper>
        </div>
    );
};

const Wrapper = styled.section`
    padding: 2rem 1rem;
    background: #f8fafc;
    min-height: calc(100vh - 80px); /* Adjust for navbar height */

    .container {
        max-width: 1200px;
        margin: 0 auto;
    }

    .header {
        text-align: center;
        margin-bottom: 3rem;
        padding-top: 2rem;

        h1 {
            font-size: 3rem;
            font-weight: 700;
            color: #1a202c;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #2d8cd4, #1a5f8b);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        p {
            font-size: 1.2rem;
            color: #718096;
            max-width: 600px;
            margin: 0 auto;
        }
    }

    .filters-section {
        background: white;
        padding: 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        margin-bottom: 2rem;
        display: flex;
        gap: 1.5rem;
        align-items: center;
        flex-wrap: wrap;

        .search-box {
            position: relative;
            flex: 1;
            min-width: 300px;

            .search-icon {
                position: absolute;
                left: 1rem;
                top: 50%;
                transform: translateY(-50%);
                color: #a0aec0;
            }

            input {
                width: 100%;
                padding: 0.75rem 1rem 0.75rem 2.5rem;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                font-size: 1rem;
                transition: all 0.2s;

                &:focus {
                    outline: none;
                    border-color: #2d8cd4;
                    box-shadow: 0 0 0 3px rgba(45, 140, 212, 0.1);
                }
            }
        }

        .filter-grid {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;

            select {
                padding: 0.75rem 1rem;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                font-size: 0.9rem;
                background: white;
                cursor: pointer;
                transition: all 0.2s;

                &:focus {
                    outline: none;
                    border-color: #2d8cd4;
                }
            }
        }
    }

    .blog-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
    }

    .blog-card {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;
        border: 1px solid #e2e8f0;

        &:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
        }

        .image-container {
            position: relative;
            height: 200px;
            overflow: hidden;

            .blog-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.3s ease;
            }

            .featured-badge {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: linear-gradient(135deg, #ff6b6b, #ee5a52);
                color: white;
                padding: 0.25rem 0.75rem;
                border-radius: 20px;
                font-size: 0.75rem;
                font-weight: 600;
            }

            &:hover .blog-image {
                transform: scale(1.05);
            }
        }

        .blog-content {
            padding: 1.5rem;

            .categories {
                display: flex;
                gap: 0.5rem;
                margin-bottom: 1rem;
                flex-wrap: wrap;

                .category-tag {
                    background: #e8f4ff;
                    color: #2d8cd4;
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    text-transform: capitalize;
                }
            }

            .blog-title {
                margin-bottom: 1rem;

                a {
                    color: #1a202c;
                    text-decoration: none;
                    font-size: 1.25rem;
                    font-weight: 600;
                    line-height: 1.4;
                    transition: color 0.2s;

                    &:hover {
                        color: #2d8cd4;
                    }
                }
            }

            .blog-excerpt {
                color: #718096;
                line-height: 1.6;
                margin-bottom: 1.5rem;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

            .blog-meta {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 1rem;
                border-top: 1px solid #e2e8f0;
                flex-wrap: wrap;
                gap: 1rem;

                .author-info {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;

                    .author-avatar {
                        width: 32px;
                        height: 32px;
                        border-radius: 50%;
                        object-fit: cover;
                    }

                    span {
                        font-size: 0.875rem;
                        color: #4a5568;
                        font-weight: 500;
                    }
                }

                .meta-stats {
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;

                    .meta-item {
                        display: flex;
                        align-items: center;
                        gap: 0.25rem;
                        font-size: 0.75rem;
                        color: #a0aec0;

                        svg {
                            font-size: 0.875rem;
                        }
                    }
                }
            }
        }
    }

    .empty-state {
        text-align: center;
        padding: 4rem 2rem;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

        h3 {
            color: #4a5568;
            margin-bottom: 0.5rem;
        }

        p {
            color: #718096;
        }
    }

    @media (max-width: 768px) {
        padding: 1rem 0.5rem;

        .header {
            padding-top: 1rem;
            
            h1 {
                font-size: 2rem;
            }
        }

        .filters-section {
            flex-direction: column;
            align-items: stretch;

            .search-box {
                min-width: auto;
            }
        }

        .blog-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }

        .blog-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
        }
    }
`;

export default BlogList;

































































// // components/BlogList.jsx
// import React, { useState, useEffect } from 'react';
// import { useBlog } from '../context/BlogContext';
// import { Link } from 'react-router-dom';
// import { FaSearch, FaFilter, FaCalendar, FaEye, FaHeart, FaClock } from 'react-icons/fa';
// import styled from 'styled-components';
// import Navbar from "../components/shared/Navbar";

// const BlogList = () => {
//     const { blogs, loading, getAllBlogs } = useBlog();
//     const [filters, setFilters] = useState({
//         search: '',
//         category: '',
//         tag: '',
//         sortBy: 'publishedAt',
//         sortOrder: 'desc'
//     });

//     useEffect(() => {
//         loadBlogs();
//     }, [filters]);

//     const loadBlogs = async () => {
//         try {
//             await getAllBlogs(filters);
//         } catch (error) {
//             console.error('Failed to load blogs:', error);
//         }
//     };

//     const handleFilterChange = (key, value) => {
//         setFilters(prev => ({ ...prev, [key]: value }));
//     };

//     const formatDate = (dateString) => {
//         return new Date(dateString).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });
//     };

//     if (loading) {
//         return <div className="text-center py-12">Loading blog posts...</div>;
//     }

//     return (
//         <Wrapper>
//                 <Navbar />
//             <div className="container">
//                 {/* Header */}
//                 <div className="header">
//                     <h1>Our Blog</h1>
//                     <p>Stay updated with the latest insights and news</p>
//                 </div>

//                 {/* Filters */}
//                 <div className="filters-section">
//                     <div className="search-box">
//                         <FaSearch className="search-icon" />
//                         <input
//                             type="text"
//                             placeholder="Search blog posts..."
//                             value={filters.search}
//                             onChange={(e) => handleFilterChange('search', e.target.value)}
//                         />
//                     </div>
                    
//                     <div className="filter-grid">
//                         <select
//                             value={filters.category}
//                             onChange={(e) => handleFilterChange('category', e.target.value)}
//                         >
//                             <option value="">All Categories</option>
//                             <option value="education">Education</option>
//                             <option value="career">Career</option>
//                             <option value="study-abroad">Study Abroad</option>
//                             <option value="tips">Tips & Advice</option>
//                         </select>
                        
//                         <select
//                             value={filters.sortBy}
//                             onChange={(e) => handleFilterChange('sortBy', e.target.value)}
//                         >
//                             <option value="publishedAt">Latest</option>
//                             <option value="views">Most Popular</option>
//                             <option value="readTime">Reading Time</option>
//                         </select>
//                     </div>
//                 </div>

//                 {/* Blog Grid */}
//                 <div className="blog-grid">
//                     {blogs.map(blog => (
//                         <article key={blog._id} className="blog-card">
//                             {blog.featuredImage?.url && (
//                                 <div className="image-container">
//                                     <img 
//                                         src={blog.featuredImage.url} 
//                                         alt={blog.featuredImage.alt || blog.title}
//                                         className="blog-image"
//                                     />
//                                     {blog.featured && <span className="featured-badge">Featured</span>}
//                                 </div>
//                             )}
                            
//                             <div className="blog-content">
//                                 <div className="categories">
//                                     {blog.categories.map(category => (
//                                         <span key={category} className="category-tag">
//                                             {category}
//                                         </span>
//                                     ))}
//                                 </div>
                                
//                                 <h2 className="blog-title">
//                                     <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
//                                 </h2>
                                
//                                 <p className="blog-excerpt">{blog.excerpt}</p>
                                
//                                 <div className="blog-meta">
//                                     <div className="author-info">
//                                         {blog.author?.profilePicture && (
//                                             <img 
//                                                 src={blog.author.profilePicture} 
//                                                 alt={blog.author.username}
//                                                 className="author-avatar"
//                                             />
//                                         )}
//                                         <span>By {blog.author?.username}</span>
//                                     </div>
                                    
//                                     <div className="meta-stats">
//                                         <span className="meta-item">
//                                             <FaCalendar />
//                                             {formatDate(blog.publishedAt)}
//                                         </span>
//                                         <span className="meta-item">
//                                             <FaClock />
//                                             {blog.readTime} min read
//                                         </span>
//                                         <span className="meta-item">
//                                             <FaEye />
//                                             {blog.views}
//                                         </span>
//                                         <span className="meta-item">
//                                             <FaHeart />
//                                             {blog.likes?.length || 0}
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </article>
//                     ))}
//                 </div>

//                 {blogs.length === 0 && !loading && (
//                     <div className="empty-state">
//                         <h3>No blog posts found</h3>
//                         <p>Try adjusting your search filters</p>
//                     </div>
//                 )}
//             </div>
//         </Wrapper>
//     );
// };

// const Wrapper = styled.section`
//     padding: 2rem 1rem;
//     background: #f8fafc;
//     min-height: 100vh;

//     .container {
//         max-width: 1200px;
//         margin: 0 auto;
//     }

//     .header {
//         text-align: center;
//         margin-bottom: 3rem;

//         h1 {
//             font-size: 3rem;
//             font-weight: 700;
//             color: #1a202c;
//             margin-bottom: 1rem;
//             background: linear-gradient(135deg, #2d8cd4, #1a5f8b);
//             -webkit-background-clip: text;
//             -webkit-text-fill-color: transparent;
//         }

//         p {
//             font-size: 1.2rem;
//             color: #718096;
//             max-width: 600px;
//             margin: 0 auto;
//         }
//     }

//     .filters-section {
//         background: white;
//         padding: 1.5rem;
//         border-radius: 12px;
//         box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
//         margin-bottom: 2rem;
//         display: flex;
//         gap: 1.5rem;
//         align-items: center;
//         flex-wrap: wrap;

//         .search-box {
//             position: relative;
//             flex: 1;
//             min-width: 300px;

//             .search-icon {
//                 position: absolute;
//                 left: 1rem;
//                 top: 50%;
//                 transform: translateY(-50%);
//                 color: #a0aec0;
//             }

//             input {
//                 width: 100%;
//                 padding: 0.75rem 1rem 0.75rem 2.5rem;
//                 border: 2px solid #e2e8f0;
//                 border-radius: 8px;
//                 font-size: 1rem;
//                 transition: all 0.2s;

//                 &:focus {
//                     outline: none;
//                     border-color: #2d8cd4;
//                     box-shadow: 0 0 0 3px rgba(45, 140, 212, 0.1);
//                 }
//             }
//         }

//         .filter-grid {
//             display: flex;
//             gap: 1rem;
//             flex-wrap: wrap;

//             select {
//                 padding: 0.75rem 1rem;
//                 border: 2px solid #e2e8f0;
//                 border-radius: 8px;
//                 font-size: 0.9rem;
//                 background: white;
//                 cursor: pointer;
//                 transition: all 0.2s;

//                 &:focus {
//                     outline: none;
//                     border-color: #2d8cd4;
//                 }
//             }
//         }
//     }

//     .blog-grid {
//         display: grid;
//         grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
//         gap: 2rem;
//         margin-bottom: 3rem;
//     }

//     .blog-card {
//         background: white;
//         border-radius: 12px;
//         overflow: hidden;
//         box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
//         transition: all 0.3s ease;
//         border: 1px solid #e2e8f0;

//         &:hover {
//             transform: translateY(-4px);
//             box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
//         }

//         .image-container {
//             position: relative;
//             height: 200px;
//             overflow: hidden;

//             .blog-image {
//                 width: 100%;
//                 height: 100%;
//                 object-fit: cover;
//                 transition: transform 0.3s ease;
//             }

//             .featured-badge {
//                 position: absolute;
//                 top: 1rem;
//                 right: 1rem;
//                 background: linear-gradient(135deg, #ff6b6b, #ee5a52);
//                 color: white;
//                 padding: 0.25rem 0.75rem;
//                 border-radius: 20px;
//                 font-size: 0.75rem;
//                 font-weight: 600;
//             }

//             &:hover .blog-image {
//                 transform: scale(1.05);
//             }
//         }

//         .blog-content {
//             padding: 1.5rem;

//             .categories {
//                 display: flex;
//                 gap: 0.5rem;
//                 margin-bottom: 1rem;
//                 flex-wrap: wrap;

//                 .category-tag {
//                     background: #e8f4ff;
//                     color: #2d8cd4;
//                     padding: 0.25rem 0.75rem;
//                     border-radius: 20px;
//                     font-size: 0.75rem;
//                     font-weight: 600;
//                     text-transform: capitalize;
//                 }
//             }

//             .blog-title {
//                 margin-bottom: 1rem;

//                 a {
//                     color: #1a202c;
//                     text-decoration: none;
//                     font-size: 1.25rem;
//                     font-weight: 600;
//                     line-height: 1.4;
//                     transition: color 0.2s;

//                     &:hover {
//                         color: #2d8cd4;
//                     }
//                 }
//             }

//             .blog-excerpt {
//                 color: #718096;
//                 line-height: 1.6;
//                 margin-bottom: 1.5rem;
//                 display: -webkit-box;
//                 -webkit-line-clamp: 3;
//                 -webkit-box-orient: vertical;
//                 overflow: hidden;
//             }

//             .blog-meta {
//                 display: flex;
//                 justify-content: space-between;
//                 align-items: center;
//                 padding-top: 1rem;
//                 border-top: 1px solid #e2e8f0;
//                 flex-wrap: wrap;
//                 gap: 1rem;

//                 .author-info {
//                     display: flex;
//                     align-items: center;
//                     gap: 0.5rem;

//                     .author-avatar {
//                         width: 32px;
//                         height: 32px;
//                         border-radius: 50%;
//                         object-fit: cover;
//                     }

//                     span {
//                         font-size: 0.875rem;
//                         color: #4a5568;
//                         font-weight: 500;
//                     }
//                 }

//                 .meta-stats {
//                     display: flex;
//                     gap: 1rem;
//                     flex-wrap: wrap;

//                     .meta-item {
//                         display: flex;
//                         align-items: center;
//                         gap: 0.25rem;
//                         font-size: 0.75rem;
//                         color: #a0aec0;

//                         svg {
//                             font-size: 0.875rem;
//                         }
//                     }
//                 }
//             }
//         }
//     }

//     .empty-state {
//         text-align: center;
//         padding: 4rem 2rem;
//         background: white;
//         border-radius: 12px;
//         box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

//         h3 {
//             color: #4a5568;
//             margin-bottom: 0.5rem;
//         }

//         p {
//             color: #718096;
//         }
//     }

//     @media (max-width: 768px) {
//         padding: 1rem 0.5rem;

//         .header h1 {
//             font-size: 2rem;
//         }

//         .filters-section {
//             flex-direction: column;
//             align-items: stretch;

//             .search-box {
//                 min-width: auto;
//             }
//         }

//         .blog-grid {
//             grid-template-columns: 1fr;
//             gap: 1.5rem;
//         }

//         .blog-meta {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: 0.75rem;
//         }
//     }
// `;

// export default BlogList;


