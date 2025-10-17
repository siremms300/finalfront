// components/BlogDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { useUserContext } from '../context/UserContext';
import { FaCalendar, FaEye, FaHeart, FaClock, FaShare, FaComment, FaReply } from 'react-icons/fa';
import styled from 'styled-components';
import LoadingComTwo from "../components/shared/LoadingComTwo";
import Navbar from "../components/shared/Navbar";
import { toast } from 'react-toastify';

const BlogDetail = () => {
    const { slug } = useParams();
    const { currentBlog, loading, getBlogBySlug, toggleLike, addComment } = useBlog();
    const { user } = useUserContext();
    const [commentText, setCommentText] = useState('');
    const [replyText, setReplyText] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);

    useEffect(() => {
        if (slug) {
            getBlogBySlug(slug);
        }
    }, [slug]);

    const handleLike = async () => {
        if (!user) {
            toast.error('Please login to like posts');
            return;
        }
        try {
            await toggleLike(currentBlog._id);
        } catch (error) {
            console.error('Failed to like post:', error);
        }
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('Please login to comment');
            return;
        }
        if (!commentText.trim()) return;

        try {
            await addComment(currentBlog._id, commentText);
            setCommentText('');
        } catch (error) {
            console.error('Failed to add comment:', error);
        }
    };

    const handleAddReply = async (commentId, e) => {
        e.preventDefault();
        if (!user) {
            toast.error('Please login to reply');
            return;
        }
        if (!replyText.trim()) return;

        try {
            // Note: You'll need to implement reply functionality in the backend
            // For now, this is a placeholder
            console.log('Add reply:', { commentId, content: replyText });
            setReplyText('');
            setReplyingTo(null);
        } catch (error) {
            console.error('Failed to add reply:', error);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const shareBlog = () => {
        if (navigator.share) {
            navigator.share({
                title: currentBlog.title,
                text: currentBlog.excerpt,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Link copied to clipboard!');
        }
    };

    if (loading) return (
        <div>
            <Navbar />
            <LoadingComTwo />
        </div>
    );
    
    if (!currentBlog) return (
        <div>
            <Navbar />
            <div className="text-center py-12">Blog post not found</div>
        </div>
    );

    return (
        <div>
            <Navbar />
            <Wrapper>
                <div className="container">
                    {/* Blog Header */}
                    <article className="blog-article">
                        <header className="blog-header">
                            <div className="breadcrumb">
                                <Link to="/blog">Blog</Link> / <span>{currentBlog.title}</span>
                            </div>
                            
                            <h1 className="blog-title">{currentBlog.title}</h1>
                            
                            <div className="blog-meta">
                                <div className="author-section">
                                    {currentBlog.author?.profilePicture && (
                                        <img 
                                            src={currentBlog.author.profilePicture} 
                                            alt={currentBlog.author.username}
                                            className="author-avatar"
                                        />
                                    )}
                                    <div>
                                        <div className="author-name">By {currentBlog.author?.username}</div>
                                        <div className="publish-date">
                                            <FaCalendar />
                                            {formatDate(currentBlog.publishedAt)}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="stats-section">
                                    <div className="stat">
                                        <FaClock />
                                        <span>{currentBlog.readTime} min read</span>
                                    </div>
                                    <div className="stat">
                                        <FaEye />
                                        <span>{currentBlog.views} views</span>
                                    </div>
                                    <button 
                                        className={`like-btn ${currentBlog.hasLiked ? 'liked' : ''}`}
                                        onClick={handleLike}
                                    >
                                        <FaHeart />
                                        <span>{currentBlog.likes?.length || 0}</span>
                                    </button>
                                    <button className="share-btn" onClick={shareBlog}>
                                        <FaShare />
                                    </button>
                                </div>
                            </div>

                            {currentBlog.featuredImage?.url && (
                                <div className="featured-image">
                                    <img 
                                        src={currentBlog.featuredImage.url} 
                                        alt={currentBlog.featuredImage.alt || currentBlog.title}
                                    />
                                    {currentBlog.featuredImage.caption && (
                                        <figcaption>{currentBlog.featuredImage.caption}</figcaption>
                                    )}
                                </div>
                            )}
                        </header>

                        {/* Blog Content */}
                        <div className="blog-content">
                            <div 
                                className="content"
                                dangerouslySetInnerHTML={{ __html: currentBlog.content }}
                            />
                        </div>

                        {/* Tags */}
                        {currentBlog.tags && currentBlog.tags.length > 0 && (
                            <div className="tags-section">
                                <h3>Tags</h3>
                                <div className="tags">
                                    {currentBlog.tags.map(tag => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </article>

                    {/* Comments Section */}
                    <section className="comments-section">
                        <h2>Comments ({currentBlog.comments?.length || 0})</h2>
                        
                        {/* Add Comment Form */}
                        {user ? (
                            <form onSubmit={handleAddComment} className="comment-form">
                                <div className="form-group">
                                    <textarea
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        placeholder="Share your thoughts..."
                                        rows="4"
                                        required
                                    />
                                </div>
                                <button type="submit" className="submit-btn">
                                    Post Comment
                                </button>
                            </form>
                        ) : (
                            <div className="login-prompt">
                                <Link to="/login">Login</Link> to join the conversation
                            </div>
                        )}

                        {/* Comments List */}
                        <div className="comments-list">
                            {currentBlog.comments?.map(comment => (
                                <div key={comment._id} className="comment">
                                    <div className="comment-header">
                                        <div className="comment-author">
                                            {comment.user?.profilePicture && (
                                                <img 
                                                    src={comment.user.profilePicture} 
                                                    alt={comment.user.username}
                                                    className="comment-avatar"
                                                />
                                            )}
                                            <div>
                                                <div className="author-name">{comment.user?.username}</div>
                                                <div className="comment-date">
                                                    {formatDate(comment.createdAt)}
                                                </div>
                                            </div>
                                        </div>
                                        <button 
                                            className="reply-btn"
                                            onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
                                        >
                                            <FaReply />
                                            Reply
                                        </button>
                                    </div>
                                    
                                    <div className="comment-content">
                                        {comment.content}
                                    </div>

                                    {/* Reply Form */}
                                    {replyingTo === comment._id && (
                                        <form onSubmit={(e) => handleAddReply(comment._id, e)} className="reply-form">
                                            <div className="form-group">
                                                <textarea
                                                    value={replyText}
                                                    onChange={(e) => setReplyText(e.target.value)}
                                                    placeholder="Write a reply..."
                                                    rows="3"
                                                    required
                                                />
                                            </div>
                                            <div className="form-actions">
                                                <button type="submit" className="submit-btn small">
                                                    Post Reply
                                                </button>
                                                <button 
                                                    type="button" 
                                                    className="cancel-btn"
                                                    onClick={() => setReplyingTo(null)}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                    {/* Replies */}
                                    {comment.replies && comment.replies.length > 0 && (
                                        <div className="replies">
                                            {comment.replies.map(reply => (
                                                <div key={reply._id} className="reply">
                                                    <div className="reply-header">
                                                        {reply.user?.profilePicture && (
                                                            <img 
                                                                src={reply.user.profilePicture} 
                                                                alt={reply.user.username}
                                                                className="reply-avatar"
                                                            />
                                                        )}
                                                        <div>
                                                            <div className="author-name">{reply.user?.username}</div>
                                                            <div className="reply-date">
                                                                {formatDate(reply.createdAt)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="reply-content">
                                                        {reply.content}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {(!currentBlog.comments || currentBlog.comments.length === 0) && (
                            <div className="no-comments">
                                <FaComment />
                                <p>No comments yet. Be the first to share your thoughts!</p>
                            </div>
                        )}
                    </section>
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
        max-width: 800px;
        margin: 0 auto;
    }

    .blog-article {
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        overflow: hidden;
        margin-bottom: 2rem;
    }

    .blog-header {
        padding: 2rem;

        .breadcrumb {
            color: #718096;
            font-size: 0.9rem;
            margin-bottom: 1rem;

            a {
                color: #2d8cd4;
                text-decoration: none;

                &:hover {
                    text-decoration: underline;
                }
            }
        }

        .blog-title {
            font-size: 2.5rem;
            font-weight: 700;
            color: #1a202c;
            line-height: 1.2;
            margin-bottom: 1.5rem;
        }

        .blog-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            flex-wrap: wrap;
            gap: 1rem;

            .author-section {
                display: flex;
                align-items: center;
                gap: 1rem;

                .author-avatar {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    object-fit: cover;
                }

                .author-name {
                    font-weight: 600;
                    color: #2d3748;
                }

                .publish-date {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #718096;
                    font-size: 0.9rem;
                }
            }

            .stats-section {
                display: flex;
                align-items: center;
                gap: 1rem;

                .stat {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #718096;
                    font-size: 0.9rem;
                }

                .like-btn, .share-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: #f7fafc;
                    border: 1px solid #e2e8f0;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 0.9rem;

                    &:hover {
                        background: #edf2f7;
                    }

                    &.liked {
                        background: #fed7d7;
                        border-color: #feb2b2;
                        color: #c53030;
                    }
                }
            }
        }

        .featured-image {
            margin: 0 -2rem;

            img {
                width: 100%;
                max-height: 400px;
                object-fit: cover;
            }

            figcaption {
                text-align: center;
                color: #718096;
                font-style: italic;
                padding: 1rem;
                border-top: 1px solid #e2e8f0;
            }
        }
    }

    .blog-content {
        padding: 2rem;

        .content {
            line-height: 1.8;
            color: #2d3748;
            font-size: 1.1rem;

            h1, h2, h3, h4, h5, h6 {
                margin: 2rem 0 1rem;
                color: #1a202c;
            }

            p {
                margin-bottom: 1.5rem;
            }

            img {
                max-width: 100%;
                height: auto;
                border-radius: 8px;
                margin: 1.5rem 0;
            }

            blockquote {
                border-left: 4px solid #2d8cd4;
                padding-left: 1.5rem;
                margin: 1.5rem 0;
                font-style: italic;
                color: #4a5568;
            }

            ul, ol {
                margin: 1.5rem 0;
                padding-left: 2rem;

                li {
                    margin-bottom: 0.5rem;
                }
            }
        }
    }

    .tags-section {
        padding: 1.5rem 2rem;
        border-top: 1px solid #e2e8f0;

        h3 {
            margin-bottom: 1rem;
            color: #2d3748;
        }

        .tags {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;

            .tag {
                background: #e8f4ff;
                color: #2d8cd4;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: 500;
            }
        }
    }

    .comments-section {
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        padding: 2rem;

        h2 {
            color: #1a202c;
            margin-bottom: 1.5rem;
            font-size: 1.5rem;
        }

        .comment-form {
            margin-bottom: 2rem;

            .form-group {
                margin-bottom: 1rem;

                textarea {
                    width: 100%;
                    padding: 1rem;
                    border: 2px solid #e2e8f0;
                    border-radius: 8px;
                    font-size: 1rem;
                    resize: vertical;
                    transition: border-color 0.2s;

                    &:focus {
                        outline: none;
                        border-color: #2d8cd4;
                    }
                }
            }

            .submit-btn {
                background: #2d8cd4;
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                transition: background-color 0.2s;

                &:hover {
                    background: #1a5f8b;
                }

                &.small {
                    padding: 0.5rem 1rem;
                    font-size: 0.9rem;
                }
            }
        }

        .login-prompt {
            text-align: center;
            padding: 2rem;
            background: #f7fafc;
            border-radius: 8px;
            margin-bottom: 2rem;

            a {
                color: #2d8cd4;
                text-decoration: none;
                font-weight: 600;

                &:hover {
                    text-decoration: underline;
                }
            }
        }

        .comments-list {
            .comment {
                padding: 1.5rem 0;
                border-bottom: 1px solid #e2e8f0;

                &:last-child {
                    border-bottom: none;
                }

                .comment-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1rem;

                    .comment-author {
                        display: flex;
                        align-items: center;
                        gap: 0.75rem;

                        .comment-avatar {
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                            object-fit: cover;
                        }

                        .author-name {
                            font-weight: 600;
                            color: #2d3748;
                        }

                        .comment-date {
                            color: #718096;
                            font-size: 0.8rem;
                        }
                    }

                    .reply-btn {
                        background: none;
                        border: none;
                        color: #2d8cd4;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        font-size: 0.9rem;

                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }

                .comment-content {
                    color: #4a5568;
                    line-height: 1.6;
                    margin-bottom: 1rem;
                }

                .reply-form {
                    margin: 1rem 0;
                    padding: 1rem;
                    background: #f7fafc;
                    border-radius: 8px;

                    .form-actions {
                        display: flex;
                        gap: 1rem;
                        margin-top: 1rem;

                        .cancel-btn {
                            background: #718096;
                            color: white;
                            border: none;
                            padding: 0.5rem 1rem;
                            border-radius: 6px;
                            cursor: pointer;
                            font-size: 0.9rem;

                            &:hover {
                                background: #4a5568;
                            }
                        }
                    }
                }

                .replies {
                    margin-left: 3rem;
                    margin-top: 1rem;

                    .reply {
                        padding: 1rem 0;
                        border-top: 1px solid #e2e8f0;

                        .reply-header {
                            display: flex;
                            align-items: center;
                            gap: 0.75rem;
                            margin-bottom: 0.5rem;

                            .reply-avatar {
                                width: 32px;
                                height: 32px;
                                border-radius: 50%;
                                object-fit: cover;
                            }

                            .author-name {
                                font-weight: 600;
                                color: #2d3748;
                                font-size: 0.9rem;
                            }

                            .reply-date {
                                color: #718096;
                                font-size: 0.8rem;
                            }
                        }

                        .reply-content {
                            color: #4a5568;
                            font-size: 0.9rem;
                            line-height: 1.5;
                        }
                    }
                }
            }
        }

        .no-comments {
            text-align: center;
            padding: 3rem;
            color: #718096;

            svg {
                font-size: 3rem;
                margin-bottom: 1rem;
                opacity: 0.5;
            }
        }
    }

    @media (max-width: 768px) {
        padding: 1rem 0.5rem;

        .blog-header {
            padding: 1.5rem;

            .blog-title {
                font-size: 2rem;
            }

            .blog-meta {
                flex-direction: column;
                align-items: flex-start;
                gap: 1rem;
            }

            .featured-image {
                margin: 0 -1.5rem;
            }
        }

        .blog-content {
            padding: 1.5rem;
        }

        .comments-section {
            padding: 1.5rem;

            .replies {
                margin-left: 1rem;
            }
        }
    }
`;

export default BlogDetail;





























































// // components/BlogDetail.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { useBlog } from '../context/BlogContext';
// import { useUserContext } from '../context/UserContext';
// import { FaCalendar, FaEye, FaHeart, FaClock, FaShare, FaComment, FaReply } from 'react-icons/fa';
// import styled from 'styled-components';
// import LoadingComTwo from "../components/shared/LoadingComTwo";
// import Navbar from "../components/shared/Navbar";

// const BlogDetail = () => {
//     const { slug } = useParams();
//     const { currentBlog, loading, getBlogBySlug, toggleLike, addComment } = useBlog();
//     const { user } = useUserContext();
//     const [commentText, setCommentText] = useState('');
//     const [replyText, setReplyText] = useState('');
//     const [replyingTo, setReplyingTo] = useState(null);

//     useEffect(() => {
//         if (slug) {
//             getBlogBySlug(slug);
//         }
//     }, [slug]);

//     const handleLike = async () => {
//         if (!user) {
//             toast.error('Please login to like posts');
//             return;
//         }
//         try {
//             await toggleLike(currentBlog._id);
//         } catch (error) {
//             console.error('Failed to like post:', error);
//         }
//     };

//     const handleAddComment = async (e) => {
//         e.preventDefault();
//         if (!user) {
//             toast.error('Please login to comment');
//             return;
//         }
//         if (!commentText.trim()) return;

//         try {
//             await addComment(currentBlog._id, commentText);
//             setCommentText('');
//         } catch (error) {
//             console.error('Failed to add comment:', error);
//         }
//     };

//     const handleAddReply = async (commentId, e) => {
//         e.preventDefault();
//         if (!user) {
//             toast.error('Please login to reply');
//             return;
//         }
//         if (!replyText.trim()) return;

//         try {
//             // Note: You'll need to implement reply functionality in the backend
//             // For now, this is a placeholder
//             console.log('Add reply:', { commentId, content: replyText });
//             setReplyText('');
//             setReplyingTo(null);
//         } catch (error) {
//             console.error('Failed to add reply:', error);
//         }
//     };

//     const formatDate = (dateString) => {
//         return new Date(dateString).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });
//     };

//     const shareBlog = () => {
//         if (navigator.share) {
//             navigator.share({
//                 title: currentBlog.title,
//                 text: currentBlog.excerpt,
//                 url: window.location.href,
//             });
//         } else {
//             navigator.clipboard.writeText(window.location.href);
//             toast.success('Link copied to clipboard!');
//         }
//     };

//     if (loading) return <LoadingComTwo />;
//     if (!currentBlog) return <div>Blog post not found</div>;

//     return (
//         <Wrapper>
//             <Navbar />
//             <div className="container">
//                 {/* Blog Header */}
//                 <article className="blog-article">
//                     <header className="blog-header">
//                         <div className="breadcrumb">
//                             <Link to="/blog">Blog</Link> / <span>{currentBlog.title}</span>
//                         </div>
                        
//                         <h1 className="blog-title">{currentBlog.title}</h1>
                        
//                         <div className="blog-meta">
//                             <div className="author-section">
//                                 {currentBlog.author?.profilePicture && (
//                                     <img 
//                                         src={currentBlog.author.profilePicture} 
//                                         alt={currentBlog.author.username}
//                                         className="author-avatar"
//                                     />
//                                 )}
//                                 <div>
//                                     <div className="author-name">By {currentBlog.author?.username}</div>
//                                     <div className="publish-date">
//                                         <FaCalendar />
//                                         {formatDate(currentBlog.publishedAt)}
//                                     </div>
//                                 </div>
//                             </div>
                            
//                             <div className="stats-section">
//                                 <div className="stat">
//                                     <FaClock />
//                                     <span>{currentBlog.readTime} min read</span>
//                                 </div>
//                                 <div className="stat">
//                                     <FaEye />
//                                     <span>{currentBlog.views} views</span>
//                                 </div>
//                                 <button 
//                                     className={`like-btn ${currentBlog.hasLiked ? 'liked' : ''}`}
//                                     onClick={handleLike}
//                                 >
//                                     <FaHeart />
//                                     <span>{currentBlog.likes?.length || 0}</span>
//                                 </button>
//                                 <button className="share-btn" onClick={shareBlog}>
//                                     <FaShare />
//                                 </button>
//                             </div>
//                         </div>

//                         {currentBlog.featuredImage?.url && (
//                             <div className="featured-image">
//                                 <img 
//                                     src={currentBlog.featuredImage.url} 
//                                     alt={currentBlog.featuredImage.alt || currentBlog.title}
//                                 />
//                                 {currentBlog.featuredImage.caption && (
//                                     <figcaption>{currentBlog.featuredImage.caption}</figcaption>
//                                 )}
//                             </div>
//                         )}
//                     </header>

//                     {/* Blog Content */}
//                     <div className="blog-content">
//                         <div 
//                             className="content"
//                             dangerouslySetInnerHTML={{ __html: currentBlog.content }}
//                         />
//                     </div>

//                     {/* Tags */}
//                     {currentBlog.tags && currentBlog.tags.length > 0 && (
//                         <div className="tags-section">
//                             <h3>Tags</h3>
//                             <div className="tags">
//                                 {currentBlog.tags.map(tag => (
//                                     <span key={tag} className="tag">{tag}</span>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//                 </article>

//                 {/* Comments Section */}
//                 <section className="comments-section">
//                     <h2>Comments ({currentBlog.comments?.length || 0})</h2>
                    
//                     {/* Add Comment Form */}
//                     {user ? (
//                         <form onSubmit={handleAddComment} className="comment-form">
//                             <div className="form-group">
//                                 <textarea
//                                     value={commentText}
//                                     onChange={(e) => setCommentText(e.target.value)}
//                                     placeholder="Share your thoughts..."
//                                     rows="4"
//                                     required
//                                 />
//                             </div>
//                             <button type="submit" className="submit-btn">
//                                 Post Comment
//                             </button>
//                         </form>
//                     ) : (
//                         <div className="login-prompt">
//                             <Link to="/login">Login</Link> to join the conversation
//                         </div>
//                     )}

//                     {/* Comments List */}
//                     <div className="comments-list">
//                         {currentBlog.comments?.map(comment => (
//                             <div key={comment._id} className="comment">
//                                 <div className="comment-header">
//                                     <div className="comment-author">
//                                         {comment.user?.profilePicture && (
//                                             <img 
//                                                 src={comment.user.profilePicture} 
//                                                 alt={comment.user.username}
//                                                 className="comment-avatar"
//                                             />
//                                         )}
//                                         <div>
//                                             <div className="author-name">{comment.user?.username}</div>
//                                             <div className="comment-date">
//                                                 {formatDate(comment.createdAt)}
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <button 
//                                         className="reply-btn"
//                                         onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
//                                     >
//                                         <FaReply />
//                                         Reply
//                                     </button>
//                                 </div>
                                
//                                 <div className="comment-content">
//                                     {comment.content}
//                                 </div>

//                                 {/* Reply Form */}
//                                 {replyingTo === comment._id && (
//                                     <form onSubmit={(e) => handleAddReply(comment._id, e)} className="reply-form">
//                                         <div className="form-group">
//                                             <textarea
//                                                 value={replyText}
//                                                 onChange={(e) => setReplyText(e.target.value)}
//                                                 placeholder="Write a reply..."
//                                                 rows="3"
//                                                 required
//                                             />
//                                         </div>
//                                         <div className="form-actions">
//                                             <button type="submit" className="submit-btn small">
//                                                 Post Reply
//                                             </button>
//                                             <button 
//                                                 type="button" 
//                                                 className="cancel-btn"
//                                                 onClick={() => setReplyingTo(null)}
//                                             >
//                                                 Cancel
//                                             </button>
//                                         </div>
//                                     </form>
//                                 )}

//                                 {/* Replies */}
//                                 {comment.replies && comment.replies.length > 0 && (
//                                     <div className="replies">
//                                         {comment.replies.map(reply => (
//                                             <div key={reply._id} className="reply">
//                                                 <div className="reply-header">
//                                                     {reply.user?.profilePicture && (
//                                                         <img 
//                                                             src={reply.user.profilePicture} 
//                                                             alt={reply.user.username}
//                                                             className="reply-avatar"
//                                                         />
//                                                     )}
//                                                     <div>
//                                                         <div className="author-name">{reply.user?.username}</div>
//                                                         <div className="reply-date">
//                                                             {formatDate(reply.createdAt)}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="reply-content">
//                                                     {reply.content}
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div>
//                         ))}
//                     </div>

//                     {(!currentBlog.comments || currentBlog.comments.length === 0) && (
//                         <div className="no-comments">
//                             <FaComment />
//                             <p>No comments yet. Be the first to share your thoughts!</p>
//                         </div>
//                     )}
//                 </section>
//             </div>
//         </Wrapper>
//     );
// };

// const Wrapper = styled.section`
//     padding: 2rem 1rem;
//     background: #f8fafc;
//     min-height: 100vh;

//     .container {
//         max-width: 800px;
//         margin: 0 auto;
//     }

//     .blog-article {
//         background: white;
//         border-radius: 12px;
//         box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
//         overflow: hidden;
//         margin-bottom: 2rem;
//     }

//     .blog-header {
//         padding: 2rem;

//         .breadcrumb {
//             color: #718096;
//             font-size: 0.9rem;
//             margin-bottom: 1rem;

//             a {
//                 color: #2d8cd4;
//                 text-decoration: none;

//                 &:hover {
//                     text-decoration: underline;
//                 }
//             }
//         }

//         .blog-title {
//             font-size: 2.5rem;
//             font-weight: 700;
//             color: #1a202c;
//             line-height: 1.2;
//             margin-bottom: 1.5rem;
//         }

//         .blog-meta {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             margin-bottom: 2rem;
//             flex-wrap: wrap;
//             gap: 1rem;

//             .author-section {
//                 display: flex;
//                 align-items: center;
//                 gap: 1rem;

//                 .author-avatar {
//                     width: 50px;
//                     height: 50px;
//                     border-radius: 50%;
//                     object-fit: cover;
//                 }

//                 .author-name {
//                     font-weight: 600;
//                     color: #2d3748;
//                 }

//                 .publish-date {
//                     display: flex;
//                     align-items: center;
//                     gap: 0.5rem;
//                     color: #718096;
//                     font-size: 0.9rem;
//                 }
//             }

//             .stats-section {
//                 display: flex;
//                 align-items: center;
//                 gap: 1rem;

//                 .stat {
//                     display: flex;
//                     align-items: center;
//                     gap: 0.5rem;
//                     color: #718096;
//                     font-size: 0.9rem;
//                 }

//                 .like-btn, .share-btn {
//                     display: flex;
//                     align-items: center;
//                     gap: 0.5rem;
//                     background: #f7fafc;
//                     border: 1px solid #e2e8f0;
//                     padding: 0.5rem 1rem;
//                     border-radius: 8px;
//                     cursor: pointer;
//                     transition: all 0.2s;
//                     font-size: 0.9rem;

//                     &:hover {
//                         background: #edf2f7;
//                     }

//                     &.liked {
//                         background: #fed7d7;
//                         border-color: #feb2b2;
//                         color: #c53030;
//                     }
//                 }
//             }
//         }

//         .featured-image {
//             margin: 0 -2rem;

//             img {
//                 width: 100%;
//                 max-height: 400px;
//                 object-fit: cover;
//             }

//             figcaption {
//                 text-align: center;
//                 color: #718096;
//                 font-style: italic;
//                 padding: 1rem;
//                 border-top: 1px solid #e2e8f0;
//             }
//         }
//     }

//     .blog-content {
//         padding: 2rem;

//         .content {
//             line-height: 1.8;
//             color: #2d3748;
//             font-size: 1.1rem;

//             h1, h2, h3, h4, h5, h6 {
//                 margin: 2rem 0 1rem;
//                 color: #1a202c;
//             }

//             p {
//                 margin-bottom: 1.5rem;
//             }

//             img {
//                 max-width: 100%;
//                 height: auto;
//                 border-radius: 8px;
//                 margin: 1.5rem 0;
//             }

//             blockquote {
//                 border-left: 4px solid #2d8cd4;
//                 padding-left: 1.5rem;
//                 margin: 1.5rem 0;
//                 font-style: italic;
//                 color: #4a5568;
//             }

//             ul, ol {
//                 margin: 1.5rem 0;
//                 padding-left: 2rem;

//                 li {
//                     margin-bottom: 0.5rem;
//                 }
//             }
//         }
//     }

//     .tags-section {
//         padding: 1.5rem 2rem;
//         border-top: 1px solid #e2e8f0;

//         h3 {
//             margin-bottom: 1rem;
//             color: #2d3748;
//         }

//         .tags {
//             display: flex;
//             gap: 0.5rem;
//             flex-wrap: wrap;

//             .tag {
//                 background: #e8f4ff;
//                 color: #2d8cd4;
//                 padding: 0.5rem 1rem;
//                 border-radius: 20px;
//                 font-size: 0.9rem;
//                 font-weight: 500;
//             }
//         }
//     }

//     .comments-section {
//         background: white;
//         border-radius: 12px;
//         box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
//         padding: 2rem;

//         h2 {
//             color: #1a202c;
//             margin-bottom: 1.5rem;
//             font-size: 1.5rem;
//         }

//         .comment-form {
//             margin-bottom: 2rem;

//             .form-group {
//                 margin-bottom: 1rem;

//                 textarea {
//                     width: 100%;
//                     padding: 1rem;
//                     border: 2px solid #e2e8f0;
//                     border-radius: 8px;
//                     font-size: 1rem;
//                     resize: vertical;
//                     transition: border-color 0.2s;

//                     &:focus {
//                         outline: none;
//                         border-color: #2d8cd4;
//                     }
//                 }
//             }

//             .submit-btn {
//                 background: #2d8cd4;
//                 color: white;
//                 border: none;
//                 padding: 0.75rem 1.5rem;
//                 border-radius: 8px;
//                 cursor: pointer;
//                 font-weight: 600;
//                 transition: background-color 0.2s;

//                 &:hover {
//                     background: #1a5f8b;
//                 }

//                 &.small {
//                     padding: 0.5rem 1rem;
//                     font-size: 0.9rem;
//                 }
//             }
//         }

//         .login-prompt {
//             text-align: center;
//             padding: 2rem;
//             background: #f7fafc;
//             border-radius: 8px;
//             margin-bottom: 2rem;

//             a {
//                 color: #2d8cd4;
//                 text-decoration: none;
//                 font-weight: 600;

//                 &:hover {
//                     text-decoration: underline;
//                 }
//             }
//         }

//         .comments-list {
//             .comment {
//                 padding: 1.5rem 0;
//                 border-bottom: 1px solid #e2e8f0;

//                 &:last-child {
//                     border-bottom: none;
//                 }

//                 .comment-header {
//                     display: flex;
//                     justify-content: space-between;
//                     align-items: flex-start;
//                     margin-bottom: 1rem;

//                     .comment-author {
//                         display: flex;
//                         align-items: center;
//                         gap: 0.75rem;

//                         .comment-avatar {
//                             width: 40px;
//                             height: 40px;
//                             border-radius: 50%;
//                             object-fit: cover;
//                         }

//                         .author-name {
//                             font-weight: 600;
//                             color: #2d3748;
//                         }

//                         .comment-date {
//                             color: #718096;
//                             font-size: 0.8rem;
//                         }
//                     }

//                     .reply-btn {
//                         background: none;
//                         border: none;
//                         color: #2d8cd4;
//                         cursor: pointer;
//                         display: flex;
//                         align-items: center;
//                         gap: 0.5rem;
//                         font-size: 0.9rem;

//                         &:hover {
//                             text-decoration: underline;
//                         }
//                     }
//                 }

//                 .comment-content {
//                     color: #4a5568;
//                     line-height: 1.6;
//                     margin-bottom: 1rem;
//                 }

//                 .reply-form {
//                     margin: 1rem 0;
//                     padding: 1rem;
//                     background: #f7fafc;
//                     border-radius: 8px;

//                     .form-actions {
//                         display: flex;
//                         gap: 1rem;
//                         margin-top: 1rem;

//                         .cancel-btn {
//                             background: #718096;
//                             color: white;
//                             border: none;
//                             padding: 0.5rem 1rem;
//                             border-radius: 6px;
//                             cursor: pointer;
//                             font-size: 0.9rem;

//                             &:hover {
//                                 background: #4a5568;
//                             }
//                         }
//                     }
//                 }

//                 .replies {
//                     margin-left: 3rem;
//                     margin-top: 1rem;

//                     .reply {
//                         padding: 1rem 0;
//                         border-top: 1px solid #e2e8f0;

//                         .reply-header {
//                             display: flex;
//                             align-items: center;
//                             gap: 0.75rem;
//                             margin-bottom: 0.5rem;

//                             .reply-avatar {
//                                 width: 32px;
//                                 height: 32px;
//                                 border-radius: 50%;
//                                 object-fit: cover;
//                             }

//                             .author-name {
//                                 font-weight: 600;
//                                 color: #2d3748;
//                                 font-size: 0.9rem;
//                             }

//                             .reply-date {
//                                 color: #718096;
//                                 font-size: 0.8rem;
//                             }
//                         }

//                         .reply-content {
//                             color: #4a5568;
//                             font-size: 0.9rem;
//                             line-height: 1.5;
//                         }
//                     }
//                 }
//             }
//         }

//         .no-comments {
//             text-align: center;
//             padding: 3rem;
//             color: #718096;

//             svg {
//                 font-size: 3rem;
//                 margin-bottom: 1rem;
//                 opacity: 0.5;
//             }
//         }
//     }

//     @media (max-width: 768px) {
//         padding: 1rem 0.5rem;

//         .blog-header {
//             padding: 1.5rem;

//             .blog-title {
//                 font-size: 2rem;
//             }

//             .blog-meta {
//                 flex-direction: column;
//                 align-items: flex-start;
//                 gap: 1rem;
//             }

//             .featured-image {
//                 margin: 0 -1.5rem;
//             }
//         }

//         .blog-content {
//             padding: 1.5rem;
//         }

//         .comments-section {
//             padding: 1.5rem;

//             .replies {
//                 margin-left: 1rem;
//             }
//         }
//     }
// `;

// export default BlogDetail;


