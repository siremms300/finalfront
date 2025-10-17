// components/BlogEditor.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { useUserContext } from '../context/UserContext';
import { 
    FaSave, 
    FaEye, 
    FaUpload, 
    FaBold, 
    FaItalic, 
    FaListUl, 
    FaListOl, 
    FaLink, 
    FaImage,
    FaUnderline,
    FaAlignLeft,
    FaAlignCenter,
    FaAlignRight,
    FaCode
} from 'react-icons/fa';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const BlogEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { createBlog, updateBlog, getBlogById, currentBlog, loading } = useBlog();
    const { user } = useUserContext();
    
    const contentEditableRef = useRef(null);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        categories: [],
        tags: [],
        status: 'draft',
        featured: false,
        metaTitle: '',
        metaDescription: '',
        keywords: ''
    });
    const [featuredImage, setFeaturedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [characterCount, setCharacterCount] = useState(0);
    const [wordCount, setWordCount] = useState(0);
    const [readTime, setReadTime] = useState(0);

    useEffect(() => {
        if (id) {
            setIsEditing(true);
            loadBlogForEditing();
        }
    }, [id]);

    const loadBlogForEditing = async () => {
        try {
            await getBlogById(id);
        } catch (error) {
            console.error('Failed to load blog for editing:', error);
            Swal.fire('Error!', 'Failed to load blog post for editing.', 'error');
        }
    };

    // useEffect(() => {
    //     if (isEditing && currentBlog) {
    //         const updatedFormData = {
    //             title: currentBlog.title || '',
    //             excerpt: currentBlog.excerpt || '',
    //             content: currentBlog.content || '',
    //             categories: currentBlog.categories || [],
    //             tags: currentBlog.tags || [],
    //             status: currentBlog.status || 'draft',
    //             featured: currentBlog.featured || false,
    //             metaTitle: currentBlog.metaTitle || '',
    //             metaDescription: currentBlog.metaDescription || '',
    //             keywords: currentBlog.keywords?.join(', ') || ''
    //         };
            
    //         setFormData(updatedFormData);
            
    //         // Handle image preview - check if it's a full URL or relative path
    //         if (currentBlog.featuredImage?.url) {
    //             if (currentBlog.featuredImage.url.startsWith('http')) {
    //                 setImagePreview(currentBlog.featuredImage.url);
    //             } else {
    //                 // For local uploads, construct the full URL
    //                 setImagePreview(`${window.location.origin}${currentBlog.featuredImage.url}`);
    //             }
    //         }
    //         calculateContentStats(currentBlog.content);
    //     }
    // }, [currentBlog, isEditing]);

    // In the useEffect that loads currentBlog, add this:
    
    useEffect(() => {
        if (isEditing && currentBlog) {
            const updatedFormData = {
                title: currentBlog.title || '',
                excerpt: currentBlog.excerpt || '',
                content: currentBlog.content || '',
                categories: currentBlog.categories || [],
                tags: currentBlog.tags || [],
                status: currentBlog.status || 'draft',
                featured: currentBlog.featured || false,
                metaTitle: currentBlog.metaTitle || '',
                metaDescription: currentBlog.metaDescription || '',
                keywords: currentBlog.keywords?.join(', ') || ''
            };
            
            setFormData(updatedFormData);
            
            // Set the content in the editor after a small delay to ensure DOM is ready
            setTimeout(() => {
                if (contentEditableRef.current && currentBlog.content) {
                    contentEditableRef.current.innerHTML = currentBlog.content;
                    calculateContentStats(currentBlog.content);
                }
            }, 100);
            
            // Handle image preview
            if (currentBlog.featuredImage?.url) {
                if (currentBlog.featuredImage.url.startsWith('http')) {
                    setImagePreview(currentBlog.featuredImage.url);
                } else {
                    setImagePreview(`${window.location.origin}${currentBlog.featuredImage.url}`);
                }
            }
        }
    }, [currentBlog, isEditing]);
    const calculateContentStats = (content) => {
        if (!content) {
            setCharacterCount(0);
            setWordCount(0);
            setReadTime(0);
            return;
        }

        // Strip HTML tags for accurate counting
        const textContent = content.replace(/<[^>]*>/g, '');
        const characters = textContent.length;
        const words = textContent.split(/\s+/).filter(word => word.length > 0).length;
        const readingTime = Math.ceil(words / 200); // 200 words per minute

        setCharacterCount(characters);
        setWordCount(words);
        setReadTime(readingTime);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleArrayInput = (e) => {
        const { name, value } = e.target;
        const array = value.split(',').map(item => item.trim()).filter(item => item);
        setFormData(prev => ({
            ...prev,
            [name]: array
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                Swal.fire('Error!', 'Please select an image file.', 'error');
                return;
            }
            
            // Validate file size (15MB max)
            if (file.size > 15 * 1024 * 1024) {
                Swal.fire('Error!', 'Image size must be less than 15MB.', 'error');
                return;
            }

            setFeaturedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // const handleContentChange = () => {
    //     const content = contentEditableRef.current?.innerHTML || '';
    //     setFormData(prev => ({
    //         ...prev,
    //         content: content
    //     }));
    //     calculateContentStats(content);
    // };

    const handleContentChange = () => {
        const content = contentEditableRef.current?.innerHTML || '';
        // Check if content is actually valid HTML, not just 'undefined'
        if (content && content !== 'undefined') {
            setFormData(prev => ({
                ...prev,
                content: content
            }));
            calculateContentStats(content);
        }
    };

    const formatText = (command, value = '') => {
        document.execCommand(command, false, value);
        handleContentChange();
    };

    const insertImage = () => {
        const url = prompt('Enter image URL:');
        if (url) {
            // Validate URL
            try {
                new URL(url);
                formatText('insertImage', url);
            } catch (e) {
                Swal.fire('Error!', 'Please enter a valid URL.', 'error');
            }
        }
    };

    const insertLink = () => {
        const url = prompt('Enter URL:');
        if (url) {
            try {
                new URL(url);
                formatText('createLink', url);
            } catch (e) {
                Swal.fire('Error!', 'Please enter a valid URL.', 'error');
            }
        }
    };

    const clearFormatting = () => {
        formatText('removeFormat');
    };

    const validateForm = () => {
        if (!formData.title.trim()) {
            return 'Title is required';
        }
        if (!formData.excerpt.trim()) {
            return 'Excerpt is required';
        }
        if (characterCount < 100) {
            return `Content must be at least 100 characters (currently ${characterCount})`;
        }
        if (formData.categories.length === 0) {
            return 'Please select at least one category';
        }
        return null;
    };

    // const handleSubmit = async (e, publishStatus = 'draft') => {
    //     e.preventDefault();
        
    //     // Get the latest content before submitting
    //     const latestContent = contentEditableRef.current?.innerHTML || formData.content;
        
    //     // Update form data with latest content and status
    //     const updatedFormData = {
    //         ...formData,
    //         content: latestContent,
    //         status: publishStatus
    //     };

    //     // Validate form
    //     const validationError = validateForm();
    //     if (validationError) {
    //         Swal.fire('Error!', validationError, 'error');
    //         return;
    //     }

    //     const submitData = new FormData();
        
    //     // Append basic fields
    //     submitData.append('title', updatedFormData.title);
    //     submitData.append('excerpt', updatedFormData.excerpt);
    //     submitData.append('content', updatedFormData.content);
    //     submitData.append('status', updatedFormData.status);
    //     submitData.append('featured', updatedFormData.featured);

    //     // Handle categories
    //     if (updatedFormData.categories && updatedFormData.categories.length > 0) {
    //         updatedFormData.categories.forEach(cat => {
    //             if (cat && cat.trim() !== '') {
    //                 submitData.append('categories', cat);
    //             }
    //         });
    //     } else {
    //         submitData.append('categories', 'General');
    //     }

    //     // Handle tags
    //     if (updatedFormData.tags && updatedFormData.tags.length > 0) {
    //         updatedFormData.tags.forEach(tag => {
    //             if (tag && tag.trim() !== '') {
    //                 submitData.append('tags', tag);
    //             }
    //         });
    //     }

    //     // Handle other fields - FIXED: Don't cut off meta fields
    //     if (updatedFormData.metaTitle !== undefined) {
    //         submitData.append('metaTitle', updatedFormData.metaTitle);
    //     }
    //     if (updatedFormData.metaDescription !== undefined) {
    //         submitData.append('metaDescription', updatedFormData.metaDescription);
    //     }
    //     if (updatedFormData.keywords) {
    //         submitData.append('keywords', updatedFormData.keywords);
    //     }

    //     if (featuredImage) {
    //         submitData.append('featuredImage', featuredImage);
    //     }

    //     console.log('Submitting blog:', {
    //         title: updatedFormData.title,
    //         metaTitle: updatedFormData.metaTitle,
    //         metaDescription: updatedFormData.metaDescription,
    //         contentLength: updatedFormData.content.length,
    //         characterCount,
    //         wordCount,
    //         status: updatedFormData.status
    //     });

    //     try {
    //         if (isEditing) {
    //             await updateBlog(id, submitData);
    //             Swal.fire('Success!', 'Blog post updated successfully.', 'success');
    //         } else {
    //             await createBlog(submitData);
    //             Swal.fire('Success!', 'Blog post created successfully.', 'success');
    //         }
    //         navigate('/dashboard/manage-blogs');
    //     } catch (error) {
    //         console.error('Submit error:', error);
    //         const errorMessage = error.response?.data?.message || 'Failed to save blog post.';
    //         Swal.fire('Error!', errorMessage, 'error');
    //     }
    // };

    // components/BlogEditor.jsx - Update the handleContentChange and handleSubmit functions

    const handleSubmit = async (e, publishStatus = 'draft') => {
        e.preventDefault();
        
        // Get the latest content before submitting - FIXED
        const latestContent = contentEditableRef.current?.innerHTML || '';
        
        // Validate that we have actual content, not 'undefined'
        if (!latestContent || latestContent === 'undefined') {
            Swal.fire('Error!', 'Please add some content to your blog post.', 'error');
            return;
        }
        
        // Update form data with latest content and status
        const updatedFormData = {
            ...formData,
            content: latestContent,
            status: publishStatus
        };

        // Validate form
        const validationError = validateForm();
        if (validationError) {
            Swal.fire('Error!', validationError, 'error');
            return;
        }

        const submitData = new FormData();
        
        // Append basic fields
        submitData.append('title', updatedFormData.title);
        submitData.append('excerpt', updatedFormData.excerpt);
        submitData.append('content', updatedFormData.content);
        submitData.append('status', updatedFormData.status);
        submitData.append('featured', updatedFormData.featured);

        // Handle categories
        if (updatedFormData.categories && updatedFormData.categories.length > 0) {
            updatedFormData.categories.forEach(cat => {
                if (cat && cat.trim() !== '') {
                    submitData.append('categories', cat);
                }
            });
        } else {
            submitData.append('categories', 'General');
        }

        // Handle tags
        if (updatedFormData.tags && updatedFormData.tags.length > 0) {
            updatedFormData.tags.forEach(tag => {
                if (tag && tag.trim() !== '') {
                    submitData.append('tags', tag);
                }
            });
        }

        // Handle other fields
        if (updatedFormData.metaTitle !== undefined) {
            submitData.append('metaTitle', updatedFormData.metaTitle);
        }
        if (updatedFormData.metaDescription !== undefined) {
            submitData.append('metaDescription', updatedFormData.metaDescription);
        }
        if (updatedFormData.keywords) {
            submitData.append('keywords', updatedFormData.keywords);
        }

        if (featuredImage) {
            submitData.append('featuredImage', featuredImage);
        }

        console.log('Submitting blog:', {
            title: updatedFormData.title,
            metaTitle: updatedFormData.metaTitle,
            metaDescription: updatedFormData.metaDescription,
            contentLength: updatedFormData.content.length,
            contentPreview: updatedFormData.content.substring(0, 100),
            characterCount,
            wordCount,
            status: updatedFormData.status
        });

        try {
            if (isEditing) {
                await updateBlog(id, submitData);
                Swal.fire('Success!', 'Blog post updated successfully.', 'success');
            } else {
                await createBlog(submitData);
                Swal.fire('Success!', 'Blog post created successfully.', 'success');
            }
            navigate('/dashboard/manage-blogs');
        } catch (error) {
            console.error('Submit error:', error);
            const errorMessage = error.response?.data?.message || 'Failed to save blog post.';
            Swal.fire('Error!', errorMessage, 'error');
        }
    };
    const handlePreview = () => {
        const latestContent = contentEditableRef.current?.innerHTML || formData.content;
        
        if (characterCount < 100) {
            Swal.fire('Error!', 'Content must be at least 100 characters for preview.', 'error');
            return;
        }

        // Save current content to localStorage for preview
        localStorage.setItem('blogPreview', JSON.stringify({
            ...formData,
            content: latestContent,
            featuredImage: imagePreview,
            author: user,
            createdAt: new Date().toISOString(),
            readTime: readTime
        }));
        window.open('/blog-preview', '_blank');
    };

    const handlePaste = (e) => {
        e.preventDefault();
        
        // Get plain text from clipboard
        const text = e.clipboardData.getData('text/plain');
        
        // Insert text at cursor position
        document.execCommand('insertText', false, text);
        handleContentChange();
    };

    const removeImage = () => {
        setImagePreview('');
        setFeaturedImage(null);
        // If editing, you might want to also remove the image from the server
        // This would require an additional API call to delete the file
    };

    return (
        <Wrapper>
            <div className="container">
                <div className="header">
                    <div className="header-left">
                        <h1>{isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}</h1>
                        <div className="content-stats">
                            <span>{wordCount} words</span>
                            <span>{characterCount} characters</span>
                            <span>{readTime} min read</span>
                            {characterCount < 100 && (
                                <span className="warning">Minimum 100 characters required</span>
                            )}
                        </div>
                    </div>
                    <div className="action-buttons">
                        <button onClick={handlePreview} className="preview-btn" type="button" disabled={characterCount < 100}>
                            <FaEye />
                            Preview
                        </button>
                        <button onClick={(e) => handleSubmit(e, 'published')} className="publish-btn" disabled={loading}>
                            <FaSave />
                            {loading ? 'Publishing...' : (isEditing ? 'Update' : 'Publish')}
                        </button>
                    </div>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="editor-form">
                    {/* Basic Information */}
                    <div className="form-section">
                        <h2>Basic Information</h2>
                        
                        <div className="form-group">
                            <label>Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Enter blog post title..."
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Excerpt *</label>
                            <textarea
                                name="excerpt"
                                value={formData.excerpt}
                                onChange={handleInputChange}
                                placeholder="Brief description of your blog post..."
                                rows="3"
                                maxLength="300"
                                required
                            />
                            <div className="char-count">{formData.excerpt.length}/300</div>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>Categories *</label>
                                <select
                                    name="categories"
                                    value={formData.categories[0] || ''}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        categories: [e.target.value]
                                    }))}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="Education">Education</option>
                                    <option value="Career">Career</option>
                                    <option value="Study Abroad">Study Abroad</option>
                                    <option value="Tips & Advice">Tips & Advice</option>
                                    <option value="News">News</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Lifestyle">Lifestyle</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Tags</label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags.join(', ')}
                                    onChange={handleArrayInput}
                                    placeholder="tag1, tag2, tag3"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="form-section">
                        <h2>Featured Image</h2>
                        <div className="image-upload">
                            {imagePreview ? (
                                <div className="image-preview">
                                    <img src={imagePreview} alt="Featured preview" onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'block';
                                    }} />
                                    <div className="image-fallback" style={{display: 'none'}}>
                                        <FaImage size={48} />
                                        <p>Image failed to load</p>
                                    </div>
                                    <div className="image-actions">
                                        <button 
                                            type="button" 
                                            className="remove-image"
                                            onClick={removeImage}
                                        >
                                            Remove Image
                                        </button>
                                        <label className="change-image">
                                            Change Image
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="file-input"
                                            />
                                        </label>
                                    </div>
                                </div>
                            ) : (
                                <div className="upload-area">
                                    <FaUpload className="upload-icon" />
                                    <p>Click to upload featured image</p>
                                    <p className="upload-hint">Recommended: 1200×630px, max 15MB</p>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="file-input"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content Editor */}
                    <div className="form-section">
                        <div className="section-header">
                            <h2>Content *</h2>
                            <div className="content-stats-mini">
                                {wordCount} words • {readTime} min read
                            </div>
                        </div>
                        <div className="editor-toolbar">
                            <div className="toolbar-group">
                                <button type="button" onClick={() => formatText('bold')} title="Bold">
                                    <FaBold />
                                </button>
                                <button type="button" onClick={() => formatText('italic')} title="Italic">
                                    <FaItalic />
                                </button>
                                <button type="button" onClick={() => formatText('underline')} title="Underline">
                                    <FaUnderline />
                                </button>
                            </div>
                            
                            <div className="toolbar-group">
                                <button type="button" onClick={() => formatText('insertUnorderedList')} title="Bullet List">
                                    <FaListUl />
                                </button>
                                <button type="button" onClick={() => formatText('insertOrderedList')} title="Numbered List">
                                    <FaListOl />
                                </button>
                            </div>
                            
                            <div className="toolbar-group">
                                <button type="button" onClick={() => formatText('justifyLeft')} title="Align Left">
                                    <FaAlignLeft />
                                </button>
                                <button type="button" onClick={() => formatText('justifyCenter')} title="Align Center">
                                    <FaAlignCenter />
                                </button>
                                <button type="button" onClick={() => formatText('justifyRight')} title="Align Right">
                                    <FaAlignRight />
                                </button>
                            </div>
                            
                            <div className="toolbar-group">
                                <button type="button" onClick={insertLink} title="Insert Link">
                                    <FaLink />
                                </button>
                                <button type="button" onClick={insertImage} title="Insert Image">
                                    <FaImage />
                                </button>
                                <button type="button" onClick={clearFormatting} title="Clear Formatting">
                                    <FaCode />
                                </button>
                            </div>
                        </div>
                        <div
                            ref={contentEditableRef}
                            className="content-editor"
                            contentEditable
                            onInput={handleContentChange}
                            onBlur={handleContentChange}
                            onPaste={handlePaste}
                            dangerouslySetInnerHTML={{ __html: formData.content }}
                            placeholder="Start writing your blog post here..."
                        />
                        <div className="editor-footer">
                            <div className="content-warning">
                                {characterCount < 100 && (
                                    <span className="warning">⚠️ Content must be at least 100 characters</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* SEO Settings - FIXED: Proper field handling */}
                    <div className="form-section">
                        <h2>SEO Settings</h2>
                        <div className="form-group">
                            <label>Meta Title</label>
                            <input
                                type="text"
                                name="metaTitle"
                                value={formData.metaTitle || ''}
                                onChange={handleInputChange}
                                placeholder="SEO title (optional)"
                                maxLength="60"
                            />
                            <div className="char-count">{(formData.metaTitle || '').length}/60</div>
                        </div>
                        <div className="form-group">
                            <label>Meta Description</label>
                            <textarea
                                name="metaDescription"
                                value={formData.metaDescription || ''}
                                onChange={handleInputChange}
                                placeholder="SEO description (optional)"
                                rows="3"
                                maxLength="160"
                            />
                            <div className="char-count">{(formData.metaDescription || '').length}/160</div>
                        </div>
                        <div className="form-group">
                            <label>Keywords</label>
                            <input
                                type="text"
                                name="keywords"
                                value={formData.keywords || ''}
                                onChange={handleInputChange}
                                placeholder="keyword1, keyword2, keyword3"
                            />
                        </div>
                    </div>

                    {/* Publishing Options */}
                    <div className="form-section">
                        <h2>Publishing Options</h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>
                            <div className="form-group checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={formData.featured}
                                        onChange={handleInputChange}
                                    />
                                    Featured Post
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={() => navigate('/dashboard/manage-blogs')}
                            className="cancel-btn"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={(e) => handleSubmit(e, 'draft')}
                            className="save-draft-btn"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save Draft'}
                        </button>
                        <button
                            type="button"
                            onClick={(e) => handleSubmit(e, 'published')}
                            className="publish-btn"
                            disabled={loading || characterCount < 100}
                        >
                            {loading ? 'Publishing...' : 'Publish Now'}
                        </button>
                    </div>
                </form>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    padding: 2rem;
    background: #f8fafc;
    min-height: 100vh;

    .container {
        max-width: 1000px;
        margin: 0 auto;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 2rem;
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        .header-left {
            flex: 1;
            
            h1 {
                font-size: 1.5rem;
                font-weight: 700;
                color: #1a202c;
                margin: 0 0 0.5rem 0;
            }

            .content-stats {
                display: flex;
                gap: 1rem;
                font-size: 0.875rem;
                color: #718096;

                .warning {
                    color: #e53e3e;
                    font-weight: 600;
                }
            }
        }

        .action-buttons {
            display: flex;
            gap: 1rem;

            .preview-btn, .publish-btn {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.75rem 1.5rem;
                border: none;
                border-radius: 6px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            }

            .preview-btn {
                background: #e2e8f0;
                color: #4a5568;

                &:hover:not(:disabled) {
                    background: #cbd5e0;
                }

                &:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
            }

            .publish-btn {
                background: #2d8cd4;
                color: white;

                &:hover:not(:disabled) {
                    background: #1a5f8b;
                }

                &:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
            }
        }
    }

    .editor-form {
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }

    .form-section {
        padding: 2rem;
        border-bottom: 1px solid #e2e8f0;

        &:last-child {
            border-bottom: none;
        }

        h2 {
            font-size: 1.25rem;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 1.5rem;
        }

        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;

            .content-stats-mini {
                font-size: 0.875rem;
                color: #718096;
                background: #f7fafc;
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
            }
        }
    }

    .form-group {
        margin-bottom: 1.5rem;

        label {
            display: block;
            font-weight: 600;
            color: #4a5568;
            margin-bottom: 0.5rem;
        }

        input, textarea, select {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 2px solid #e2e8f0;
            border-radius: 6px;
            font-size: 1rem;
            transition: border-color 0.2s;

            &:focus {
                outline: none;
                border-color: #2d8cd4;
            }
        }

        textarea {
            resize: vertical;
            min-height: 80px;
        }

        .char-count {
            text-align: right;
            font-size: 0.875rem;
            color: #718096;
            margin-top: 0.25rem;
        }
    }

    .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;

        @media (max-width: 768px) {
            grid-template-columns: 1fr;
        }
    }

    .checkbox-group {
        display: flex;
        align-items: center;
        margin-top: 1.75rem;

        label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0;
            cursor: pointer;
            font-weight: 600;

            input {
                width: auto;
            }
        }
    }

    .image-upload {
        .image-preview {
            max-width: 500px;
            position: relative;

            img {
                width: 100%;
                height: 250px;
                object-fit: cover;
                border-radius: 8px;
                margin-bottom: 1rem;
                border: 2px solid #e2e8f0;
            }

            .image-fallback {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 250px;
                background: #f7fafc;
                border: 2px dashed #cbd5e0;
                border-radius: 8px;
                color: #a0aec0;
                margin-bottom: 1rem;

                p {
                    margin-top: 0.5rem;
                    font-size: 0.875rem;
                }
            }

            .image-actions {
                display: flex;
                gap: 1rem;

                .remove-image, .change-image {
                    padding: 0.75rem 1.5rem;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 0.875rem;
                    font-weight: 600;
                    transition: all 0.2s;
                }

                .remove-image {
                    background: #e53e3e;
                    color: white;

                    &:hover {
                        background: #c53030;
                    }
                }

                .change-image {
                    background: #2d8cd4;
                    color: white;
                    position: relative;

                    &:hover {
                        background: #1a5f8b;
                    }

                    .file-input {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        opacity: 0;
                        cursor: pointer;
                    }
                }
            }
        }

        .upload-area {
            position: relative;
            border: 2px dashed #cbd5e0;
            border-radius: 8px;
            padding: 3rem 2rem;
            text-align: center;
            transition: border-color 0.2s;
            cursor: pointer;
            max-width: 500px;

            &:hover {
                border-color: #2d8cd4;
                background: #f7fafc;
            }

            .upload-icon {
                font-size: 3rem;
                color: #a0aec0;
                margin-bottom: 1rem;
            }

            p {
                color: #718096;
                margin: 0;
                font-size: 1rem;
            }

            .upload-hint {
                font-size: 0.875rem;
                color: #a0aec0;
                margin-top: 0.5rem;
            }

            .file-input {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
                cursor: pointer;
            }
        }
    }

    .editor-toolbar {
        display: flex;
        gap: 1rem;
        padding: 1rem;
        background: #f7fafc;
        border: 1px solid #e2e8f0;
        border-bottom: none;
        border-radius: 6px 6px 0 0;
        flex-wrap: wrap;

        .toolbar-group {
            display: flex;
            gap: 0.25rem;
            border-right: 1px solid #e2e8f0;
            padding-right: 1rem;

            &:last-child {
                border-right: none;
                padding-right: 0;
            }

            button {
                background: white;
                border: 1px solid #e2e8f0;
                padding: 0.5rem;
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.2s;
                font-size: 0.875rem;

                &:hover {
                    background: #edf2f7;
                    border-color: #cbd5e0;
                }

                &.active {
                    background: #2d8cd4;
                    color: white;
                    border-color: #2d8cd4;
                }
            }
        }
    }

    .content-editor {
        min-height: 400px;
        padding: 1rem;
        border: 1px solid #e2e8f0;
        border-radius: 0 0 6px 6px;
        font-size: 1rem;
        line-height: 1.6;
        outline: none;

        &:empty:before {
            content: attr(placeholder);
            color: #a0aec0;
        }

        h1, h2, h3, h4, h5, h6 {
            margin: 1.5rem 0 1rem;
            color: #1a202c;
        }

        p {
            margin-bottom: 1rem;
        }

        ul, ol {
            margin: 1rem 0;
            padding-left: 2rem;
        }

        img {
            max-width: 100%;
            height: auto;
            border-radius: 4px;
            margin: 1rem 0;
        }

        a {
            color: #2d8cd4;
            text-decoration: underline;
        }
    }

    .editor-footer {
        margin-top: 1rem;
        
        .content-warning {
            .warning {
                color: #e53e3e;
                font-size: 0.875rem;
                font-weight: 600;
            }
        }
    }

    .form-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        padding: 1.5rem 2rem;
        background: #f7fafc;
        border-top: 1px solid #e2e8f0;

        button {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }

        .cancel-btn {
            background: #e2e8f0;
            color: #4a5568;

            &:hover {
                background: #cbd5e0;
            }
        }

        .save-draft-btn {
            background: #ed8936;
            color: white;

            &:hover:not(:disabled) {
                background: #dd6b20;
            }

            &:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }
        }

        .publish-btn {
            background: #2d8cd4;
            color: white;

            &:hover:not(:disabled) {
                background: #1a5f8b;
            }

            &:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }
        }
    }

    @media (max-width: 768px) {
        padding: 1rem;

        .header {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;

            .header-left {
                .content-stats {
                    flex-direction: column;
                    gap: 0.25rem;
                }
            }

            .action-buttons {
                justify-content: stretch;

                button {
                    flex: 1;
                    justify-content: center;
                }
            }
        }

        .form-section {
            padding: 1.5rem;
        }

        .editor-toolbar {
            gap: 0.5rem;

            .toolbar-group {
                padding-right: 0.5rem;
            }
        }

        .image-upload {
            .image-preview {
                .image-actions {
                    flex-direction: column;
                }
            }
        }

        .form-actions {
            flex-direction: column;
        }
    }
`;

export default BlogEditor;













































































// // components/BlogEditor.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useBlog } from '../context/BlogContext';
// import { useUserContext } from '../context/UserContext';
// import { 
//     FaSave, 
//     FaEye, 
//     FaUpload, 
//     FaBold, 
//     FaItalic, 
//     FaListUl, 
//     FaListOl, 
//     FaLink, 
//     FaImage,
//     FaUndo,
//     FaRedo,
//     FaUnderline,
//     FaAlignLeft,
//     FaAlignCenter,
//     FaAlignRight,
//     FaCode
// } from 'react-icons/fa';
// import styled from 'styled-components';
// import Swal from 'sweetalert2';

// const BlogEditor = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { createBlog, updateBlog, getBlogById, currentBlog, loading } = useBlog();
//     const { user } = useUserContext();
    
//     const contentEditableRef = useRef(null);
//     const [formData, setFormData] = useState({
//         title: '',
//         excerpt: '',
//         content: '',
//         categories: [],
//         tags: [],
//         status: 'draft',
//         featured: false,
//         metaTitle: '',
//         metaDescription: '',
//         keywords: ''
//     });
//     const [featuredImage, setFeaturedImage] = useState(null);
//     const [imagePreview, setImagePreview] = useState('');
//     const [isEditing, setIsEditing] = useState(false);
//     const [characterCount, setCharacterCount] = useState(0);
//     const [wordCount, setWordCount] = useState(0);
//     const [readTime, setReadTime] = useState(0);

//     useEffect(() => {
//         if (id) {
//             setIsEditing(true);
//             loadBlogForEditing();
//         }
//     }, [id]);

//     const loadBlogForEditing = async () => {
//         try {
//             await getBlogById(id);
//         } catch (error) {
//             console.error('Failed to load blog for editing:', error);
//             Swal.fire('Error!', 'Failed to load blog post for editing.', 'error');
//         }
//     };

//     useEffect(() => {
//         if (isEditing && currentBlog) {
//             setFormData({
//                 title: currentBlog.title || '',
//                 excerpt: currentBlog.excerpt || '',
//                 content: currentBlog.content || '',
//                 categories: currentBlog.categories || [],
//                 tags: currentBlog.tags || [],
//                 status: currentBlog.status || 'draft',
//                 featured: currentBlog.featured || false,
//                 metaTitle: currentBlog.metaTitle || '',
//                 metaDescription: currentBlog.metaDescription || '',
//                 keywords: currentBlog.keywords?.join(', ') || ''
//             });
//             if (currentBlog.featuredImage?.url) {
//                 setImagePreview(currentBlog.featuredImage.url);
//             }
//             calculateContentStats(currentBlog.content);
//         }
//     }, [currentBlog, isEditing]);

//     const calculateContentStats = (content) => {
//         if (!content) {
//             setCharacterCount(0);
//             setWordCount(0);
//             setReadTime(0);
//             return;
//         }

//         // Strip HTML tags for accurate counting
//         const textContent = content.replace(/<[^>]*>/g, '');
//         const characters = textContent.length;
//         const words = textContent.split(/\s+/).filter(word => word.length > 0).length;
//         const readingTime = Math.ceil(words / 200); // 200 words per minute

//         setCharacterCount(characters);
//         setWordCount(words);
//         setReadTime(readingTime);
//     };

//     const handleInputChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: type === 'checkbox' ? checked : value
//         }));
//     };

//     const handleArrayInput = (e) => {
//         const { name, value } = e.target;
//         const array = value.split(',').map(item => item.trim()).filter(item => item);
//         setFormData(prev => ({
//             ...prev,
//             [name]: array
//         }));
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             // Validate file type
//             if (!file.type.startsWith('image/')) {
//                 Swal.fire('Error!', 'Please select an image file.', 'error');
//                 return;
//             }
            
//             // Validate file size (15MB max)
//             if (file.size > 15 * 1024 * 1024) {
//                 Swal.fire('Error!', 'Image size must be less than 15MB.', 'error');
//                 return;
//             }

//             setFeaturedImage(file);
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setImagePreview(reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleContentChange = () => {
//         const content = contentEditableRef.current?.innerHTML || '';
//         setFormData(prev => ({
//             ...prev,
//             content: content
//         }));
//         calculateContentStats(content);
//     };

//     const formatText = (command, value = '') => {
//         document.execCommand(command, false, value);
//         handleContentChange();
//     };

//     const insertImage = () => {
//         const url = prompt('Enter image URL:');
//         if (url) {
//             // Validate URL
//             try {
//                 new URL(url);
//                 formatText('insertImage', url);
//             } catch (e) {
//                 Swal.fire('Error!', 'Please enter a valid URL.', 'error');
//             }
//         }
//     };

//     const insertLink = () => {
//         const url = prompt('Enter URL:');
//         if (url) {
//             try {
//                 new URL(url);
//                 formatText('createLink', url);
//             } catch (e) {
//                 Swal.fire('Error!', 'Please enter a valid URL.', 'error');
//             }
//         }
//     };

//     const clearFormatting = () => {
//         formatText('removeFormat');
//     };

//     const validateForm = () => {
//         if (!formData.title.trim()) {
//             return 'Title is required';
//         }
//         if (!formData.excerpt.trim()) {
//             return 'Excerpt is required';
//         }
//         if (characterCount < 100) {
//             return `Content must be at least 100 characters (currently ${characterCount})`;
//         }
//         if (formData.categories.length === 0) {
//             return 'Please select at least one category';
//         }
//         return null;
//     };

//     const handleSubmit = async (e, publishStatus = 'draft') => {
//         e.preventDefault();
        
//         // Get the latest content before submitting
//         const latestContent = contentEditableRef.current?.innerHTML || formData.content;
        
//         // Update form data with latest content and status
//         const updatedFormData = {
//             ...formData,
//             content: latestContent,
//             status: publishStatus
//         };

//         // Validate form
//         const validationError = validateForm();
//         if (validationError) {
//             Swal.fire('Error!', validationError, 'error');
//             return;
//         }

//         const submitData = new FormData();
        
//         // Append basic fields
//         submitData.append('title', updatedFormData.title);
//         submitData.append('excerpt', updatedFormData.excerpt);
//         submitData.append('content', updatedFormData.content);
//         submitData.append('status', updatedFormData.status);
//         submitData.append('featured', updatedFormData.featured);

//         // Handle categories
//         if (updatedFormData.categories && updatedFormData.categories.length > 0) {
//             updatedFormData.categories.forEach(cat => {
//                 if (cat && cat.trim() !== '') {
//                     submitData.append('categories', cat);
//                 }
//             });
//         } else {
//             submitData.append('categories', 'General');
//         }

//         // Handle tags
//         if (updatedFormData.tags && updatedFormData.tags.length > 0) {
//             updatedFormData.tags.forEach(tag => {
//                 if (tag && tag.trim() !== '') {
//                     submitData.append('tags', tag);
//                 }
//             });
//         }

//         // Handle other fields
//         if (updatedFormData.metaTitle) submitData.append('metaTitle', updatedFormData.metaTitle);
//         if (updatedFormData.metaDescription) submitData.append('metaDescription', updatedFormData.metaDescription);
//         if (updatedFormData.keywords) submitData.append('keywords', updatedFormData.keywords);

//         if (featuredImage) {
//             submitData.append('featuredImage', featuredImage);
//         }

//         console.log('Submitting blog:', {
//             title: updatedFormData.title,
//             contentLength: updatedFormData.content.length,
//             characterCount,
//             wordCount,
//             status: updatedFormData.status
//         });

//         try {
//             if (isEditing) {
//                 await updateBlog(id, submitData);
//                 Swal.fire('Success!', 'Blog post updated successfully.', 'success');
//             } else {
//                 await createBlog(submitData);
//                 Swal.fire('Success!', 'Blog post created successfully.', 'success');
//             }
//             navigate('/dashboard/manage-blogs');
//         } catch (error) {
//             console.error('Submit error:', error);
//             const errorMessage = error.response?.data?.message || 'Failed to save blog post.';
//             Swal.fire('Error!', errorMessage, 'error');
//         }
//     };

//     const handlePreview = () => {
//         const latestContent = contentEditableRef.current?.innerHTML || formData.content;
        
//         if (characterCount < 100) {
//             Swal.fire('Error!', 'Content must be at least 100 characters for preview.', 'error');
//             return;
//         }

//         // Save current content to localStorage for preview
//         localStorage.setItem('blogPreview', JSON.stringify({
//             ...formData,
//             content: latestContent,
//             featuredImage: imagePreview,
//             author: user,
//             createdAt: new Date().toISOString(),
//             readTime: readTime
//         }));
//         window.open('/blog-preview', '_blank');
//     };

//     const handlePaste = (e) => {
//         e.preventDefault();
        
//         // Get plain text from clipboard
//         const text = e.clipboardData.getData('text/plain');
        
//         // Insert text at cursor position
//         document.execCommand('insertText', false, text);
//         handleContentChange();
//     };

//     return (
//         <Wrapper>
//             <div className="container">
//                 <div className="header">
//                     <div className="header-left">
//                         <h1>{isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}</h1>
//                         <div className="content-stats">
//                             <span>{wordCount} words</span>
//                             <span>{characterCount} characters</span>
//                             <span>{readTime} min read</span>
//                             {characterCount < 100 && (
//                                 <span className="warning">Minimum 100 characters required</span>
//                             )}
//                         </div>
//                     </div>
//                     <div className="action-buttons">
//                         <button onClick={handlePreview} className="preview-btn" type="button" disabled={characterCount < 100}>
//                             <FaEye />
//                             Preview
//                         </button>
//                         <button onClick={(e) => handleSubmit(e, 'published')} className="publish-btn" disabled={loading}>
//                             <FaSave />
//                             {loading ? 'Publishing...' : (isEditing ? 'Update' : 'Publish')}
//                         </button>
//                     </div>
//                 </div>

//                 <form onSubmit={(e) => e.preventDefault()} className="editor-form">
//                     {/* Basic Information */}
//                     <div className="form-section">
//                         <h2>Basic Information</h2>
                        
//                         <div className="form-group">
//                             <label>Title *</label>
//                             <input
//                                 type="text"
//                                 name="title"
//                                 value={formData.title}
//                                 onChange={handleInputChange}
//                                 placeholder="Enter blog post title..."
//                                 required
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label>Excerpt *</label>
//                             <textarea
//                                 name="excerpt"
//                                 value={formData.excerpt}
//                                 onChange={handleInputChange}
//                                 placeholder="Brief description of your blog post..."
//                                 rows="3"
//                                 maxLength="300"
//                                 required
//                             />
//                             <div className="char-count">{formData.excerpt.length}/300</div>
//                         </div>

//                         <div className="form-grid">
//                             <div className="form-group">
//                                 <label>Categories *</label>
//                                 <select
//                                     name="categories"
//                                     value={formData.categories[0] || ''}
//                                     onChange={(e) => setFormData(prev => ({
//                                         ...prev,
//                                         categories: [e.target.value]
//                                     }))}
//                                     required
//                                 >
//                                     <option value="">Select Category</option>
//                                     <option value="Education">Education</option>
//                                     <option value="Career">Career</option>
//                                     <option value="Study Abroad">Study Abroad</option>
//                                     <option value="Tips & Advice">Tips & Advice</option>
//                                     <option value="News">News</option>
//                                     <option value="Technology">Technology</option>
//                                     <option value="Lifestyle">Lifestyle</option>
//                                 </select>
//                             </div>

//                             <div className="form-group">
//                                 <label>Tags</label>
//                                 <input
//                                     type="text"
//                                     name="tags"
//                                     value={formData.tags.join(', ')}
//                                     onChange={handleArrayInput}
//                                     placeholder="tag1, tag2, tag3"
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Featured Image */}
//                     <div className="form-section">
//                         <h2>Featured Image</h2>
//                         <div className="image-upload">
//                             {imagePreview ? (
//                                 <div className="image-preview">
//                                     <img src={imagePreview} alt="Featured preview" />
//                                     <div className="image-actions">
//                                         <button 
//                                             type="button" 
//                                             className="remove-image"
//                                             onClick={() => {
//                                                 setImagePreview('');
//                                                 setFeaturedImage(null);
//                                             }}
//                                         >
//                                             Remove
//                                         </button>
//                                         <label className="change-image">
//                                             Change
//                                             <input
//                                                 type="file"
//                                                 accept="image/*"
//                                                 onChange={handleImageChange}
//                                                 className="file-input"
//                                             />
//                                         </label>
//                                     </div>
//                                 </div>
//                             ) : (
//                                 <div className="upload-area">
//                                     <FaUpload className="upload-icon" />
//                                     <p>Click to upload featured image</p>
//                                     <p className="upload-hint">Recommended: 1200×630px, max 5MB</p>
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={handleImageChange}
//                                         className="file-input"
//                                     />
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {/* Content Editor */}
//                     <div className="form-section">
//                         <div className="section-header">
//                             <h2>Content *</h2>
//                             <div className="content-stats-mini">
//                                 {wordCount} words • {readTime} min read
//                             </div>
//                         </div>
//                         <div className="editor-toolbar">
//                             <div className="toolbar-group">
//                                 <button type="button" onClick={() => formatText('bold')} title="Bold">
//                                     <FaBold />
//                                 </button>
//                                 <button type="button" onClick={() => formatText('italic')} title="Italic">
//                                     <FaItalic />
//                                 </button>
//                                 <button type="button" onClick={() => formatText('underline')} title="Underline">
//                                     <FaUnderline />
//                                 </button>
//                             </div>
                            
//                             <div className="toolbar-group">
//                                 <button type="button" onClick={() => formatText('insertUnorderedList')} title="Bullet List">
//                                     <FaListUl />
//                                 </button>
//                                 <button type="button" onClick={() => formatText('insertOrderedList')} title="Numbered List">
//                                     <FaListOl />
//                                 </button>
//                             </div>
                            
//                             <div className="toolbar-group">
//                                 <button type="button" onClick={() => formatText('justifyLeft')} title="Align Left">
//                                     <FaAlignLeft />
//                                 </button>
//                                 <button type="button" onClick={() => formatText('justifyCenter')} title="Align Center">
//                                     <FaAlignCenter />
//                                 </button>
//                                 <button type="button" onClick={() => formatText('justifyRight')} title="Align Right">
//                                     <FaAlignRight />
//                                 </button>
//                             </div>
                            
//                             <div className="toolbar-group">
//                                 <button type="button" onClick={insertLink} title="Insert Link">
//                                     <FaLink />
//                                 </button>
//                                 <button type="button" onClick={insertImage} title="Insert Image">
//                                     <FaImage />
//                                 </button>
//                                 <button type="button" onClick={clearFormatting} title="Clear Formatting">
//                                     <FaCode />
//                                 </button>
//                             </div>
//                         </div>
//                         <div
//                             ref={contentEditableRef}
//                             className="content-editor"
//                             contentEditable
//                             onInput={handleContentChange}
//                             onBlur={handleContentChange}
//                             onPaste={handlePaste}
//                             dangerouslySetInnerHTML={{ __html: formData.content }}
//                             placeholder="Start writing your blog post here..."
//                         />
//                         <div className="editor-footer">
//                             <div className="content-warning">
//                                 {characterCount < 100 && (
//                                     <span className="warning">⚠️ Content must be at least 100 characters</span>
//                                 )}
//                             </div>
//                         </div>
//                     </div>

//                     {/* SEO Settings */}
//                     <div className="form-section">
//                         <h2>SEO Settings</h2>
//                         <div className="form-group">
//                             <label>Meta Title</label>
//                             <input
//                                 type="text"
//                                 name="metaTitle"
//                                 value={formData.metaTitle}
//                                 onChange={handleInputChange}
//                                 placeholder="SEO title (optional)"
//                                 maxLength="60"
//                             />
//                             <div className="char-count">{formData.metaTitle.length}/60</div>
//                         </div>
//                         <div className="form-group">
//                             <label>Meta Description</label>
//                             <textarea
//                                 name="metaDescription"
//                                 value={formData.metaDescription}
//                                 onChange={handleInputChange}
//                                 placeholder="SEO description (optional)"
//                                 rows="3"
//                                 maxLength="160"
//                             />
//                             <div className="char-count">{formData.metaDescription.length}/160</div>
//                         </div>
//                         <div className="form-group">
//                             <label>Keywords</label>
//                             <input
//                                 type="text"
//                                 name="keywords"
//                                 value={formData.keywords}
//                                 onChange={handleInputChange}
//                                 placeholder="keyword1, keyword2, keyword3"
//                             />
//                         </div>
//                     </div>

//                     {/* Publishing Options */}
//                     <div className="form-section">
//                         <h2>Publishing Options</h2>
//                         <div className="form-grid">
//                             <div className="form-group">
//                                 <label>Status</label>
//                                 <select
//                                     name="status"
//                                     value={formData.status}
//                                     onChange={handleInputChange}
//                                 >
//                                     <option value="draft">Draft</option>
//                                     <option value="published">Published</option>
//                                 </select>
//                             </div>
//                             <div className="form-group checkbox-group">
//                                 <label>
//                                     <input
//                                         type="checkbox"
//                                         name="featured"
//                                         checked={formData.featured}
//                                         onChange={handleInputChange}
//                                     />
//                                     Featured Post
//                                 </label>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Submit Buttons */}
//                     <div className="form-actions">
//                         <button
//                             type="button"
//                             onClick={() => navigate('/dashboard/manage-blogs')}
//                             className="cancel-btn"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="button"
//                             onClick={(e) => handleSubmit(e, 'draft')}
//                             className="save-draft-btn"
//                             disabled={loading}
//                         >
//                             {loading ? 'Saving...' : 'Save Draft'}
//                         </button>
//                         <button
//                             type="button"
//                             onClick={(e) => handleSubmit(e, 'published')}
//                             className="publish-btn"
//                             disabled={loading || characterCount < 100}
//                         >
//                             {loading ? 'Publishing...' : 'Publish Now'}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </Wrapper>
//     );
// };

// const Wrapper = styled.section`
//     padding: 2rem;
//     background: #f8fafc;
//     min-height: 100vh;

//     .container {
//         max-width: 1000px;
//         margin: 0 auto;
//     }

//     .header {
//         display: flex;
//         justify-content: space-between;
//         align-items: flex-start;
//         margin-bottom: 2rem;
//         background: white;
//         padding: 1.5rem;
//         border-radius: 8px;
//         box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

//         .header-left {
//             flex: 1;
            
//             h1 {
//                 font-size: 1.5rem;
//                 font-weight: 700;
//                 color: #1a202c;
//                 margin: 0 0 0.5rem 0;
//             }

//             .content-stats {
//                 display: flex;
//                 gap: 1rem;
//                 font-size: 0.875rem;
//                 color: #718096;

//                 .warning {
//                     color: #e53e3e;
//                     font-weight: 600;
//                 }
//             }
//         }

//         .action-buttons {
//             display: flex;
//             gap: 1rem;

//             .preview-btn, .publish-btn {
//                 display: flex;
//                 align-items: center;
//                 gap: 0.5rem;
//                 padding: 0.75rem 1.5rem;
//                 border: none;
//                 border-radius: 6px;
//                 font-weight: 600;
//                 cursor: pointer;
//                 transition: all 0.2s;
//             }

//             .preview-btn {
//                 background: #e2e8f0;
//                 color: #4a5568;

//                 &:hover:not(:disabled) {
//                     background: #cbd5e0;
//                 }

//                 &:disabled {
//                     opacity: 0.6;
//                     cursor: not-allowed;
//                 }
//             }

//             .publish-btn {
//                 background: #2d8cd4;
//                 color: white;

//                 &:hover:not(:disabled) {
//                     background: #1a5f8b;
//                 }

//                 &:disabled {
//                     opacity: 0.6;
//                     cursor: not-allowed;
//                 }
//             }
//         }
//     }

//     .editor-form {
//         background: white;
//         border-radius: 8px;
//         box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//         overflow: hidden;
//     }

//     .form-section {
//         padding: 2rem;
//         border-bottom: 1px solid #e2e8f0;

//         &:last-child {
//             border-bottom: none;
//         }

//         h2 {
//             font-size: 1.25rem;
//             font-weight: 600;
//             color: #2d3748;
//             margin-bottom: 1.5rem;
//         }

//         .section-header {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             margin-bottom: 1.5rem;

//             .content-stats-mini {
//                 font-size: 0.875rem;
//                 color: #718096;
//                 background: #f7fafc;
//                 padding: 0.25rem 0.5rem;
//                 border-radius: 4px;
//             }
//         }
//     }

//     .form-group {
//         margin-bottom: 1.5rem;

//         label {
//             display: block;
//             font-weight: 600;
//             color: #4a5568;
//             margin-bottom: 0.5rem;
//         }

//         input, textarea, select {
//             width: 100%;
//             padding: 0.75rem 1rem;
//             border: 2px solid #e2e8f0;
//             border-radius: 6px;
//             font-size: 1rem;
//             transition: border-color 0.2s;

//             &:focus {
//                 outline: none;
//                 border-color: #2d8cd4;
//             }
//         }

//         textarea {
//             resize: vertical;
//             min-height: 80px;
//         }

//         .char-count {
//             text-align: right;
//             font-size: 0.875rem;
//             color: #718096;
//             margin-top: 0.25rem;
//         }
//     }

//     .form-grid {
//         display: grid;
//         grid-template-columns: 1fr 1fr;
//         gap: 1rem;

//         @media (max-width: 768px) {
//             grid-template-columns: 1fr;
//         }
//     }

//     .checkbox-group {
//         display: flex;
//         align-items: center;
//         margin-top: 1.75rem;

//         label {
//             display: flex;
//             align-items: center;
//             gap: 0.5rem;
//             margin-bottom: 0;
//             cursor: pointer;
//             font-weight: 600;

//             input {
//                 width: auto;
//             }
//         }
//     }

//     .image-upload {
//         .image-preview {
//             max-width: 400px;

//             img {
//                 width: 100%;
//                 height: 200px;
//                 object-fit: cover;
//                 border-radius: 6px;
//                 margin-bottom: 1rem;
//             }

//             .image-actions {
//                 display: flex;
//                 gap: 1rem;

//                 .remove-image, .change-image {
//                     padding: 0.5rem 1rem;
//                     border: none;
//                     border-radius: 4px;
//                     cursor: pointer;
//                     font-size: 0.875rem;
//                     font-weight: 600;
//                     transition: all 0.2s;
//                 }

//                 .remove-image {
//                     background: #e53e3e;
//                     color: white;

//                     &:hover {
//                         background: #c53030;
//                     }
//                 }

//                 .change-image {
//                     background: #e2e8f0;
//                     color: #4a5568;
//                     position: relative;

//                     &:hover {
//                         background: #cbd5e0;
//                     }
//                 }
//             }
//         }

//         .upload-area {
//             position: relative;
//             border: 2px dashed #cbd5e0;
//             border-radius: 6px;
//             padding: 3rem 2rem;
//             text-align: center;
//             transition: border-color 0.2s;
//             cursor: pointer;

//             &:hover {
//                 border-color: #2d8cd4;
//             }

//             .upload-icon {
//                 font-size: 2rem;
//                 color: #a0aec0;
//                 margin-bottom: 1rem;
//             }

//             p {
//                 color: #718096;
//                 margin: 0;
//             }

//             .upload-hint {
//                 font-size: 0.875rem;
//                 color: #a0aec0;
//                 margin-top: 0.5rem;
//             }

//             .file-input {
//                 position: absolute;
//                 top: 0;
//                 left: 0;
//                 width: 100%;
//                 height: 100%;
//                 opacity: 0;
//                 cursor: pointer;
//             }
//         }
//     }

//     .editor-toolbar {
//         display: flex;
//         gap: 1rem;
//         padding: 1rem;
//         background: #f7fafc;
//         border: 1px solid #e2e8f0;
//         border-bottom: none;
//         border-radius: 6px 6px 0 0;
//         flex-wrap: wrap;

//         .toolbar-group {
//             display: flex;
//             gap: 0.25rem;
//             border-right: 1px solid #e2e8f0;
//             padding-right: 1rem;

//             &:last-child {
//                 border-right: none;
//                 padding-right: 0;
//             }

//             button {
//                 background: white;
//                 border: 1px solid #e2e8f0;
//                 padding: 0.5rem;
//                 border-radius: 4px;
//                 cursor: pointer;
//                 transition: all 0.2s;
//                 font-size: 0.875rem;

//                 &:hover {
//                     background: #edf2f7;
//                     border-color: #cbd5e0;
//                 }

//                 &.active {
//                     background: #2d8cd4;
//                     color: white;
//                     border-color: #2d8cd4;
//                 }
//             }
//         }
//     }

//     .content-editor {
//         min-height: 400px;
//         padding: 1rem;
//         border: 1px solid #e2e8f0;
//         border-radius: 0 0 6px 6px;
//         font-size: 1rem;
//         line-height: 1.6;
//         outline: none;

//         &:empty:before {
//             content: attr(placeholder);
//             color: #a0aec0;
//         }

//         h1, h2, h3, h4, h5, h6 {
//             margin: 1.5rem 0 1rem;
//             color: #1a202c;
//         }

//         p {
//             margin-bottom: 1rem;
//         }

//         ul, ol {
//             margin: 1rem 0;
//             padding-left: 2rem;
//         }

//         img {
//             max-width: 100%;
//             height: auto;
//             border-radius: 4px;
//             margin: 1rem 0;
//         }

//         a {
//             color: #2d8cd4;
//             text-decoration: underline;
//         }
//     }

//     .editor-footer {
//         margin-top: 1rem;
        
//         .content-warning {
//             .warning {
//                 color: #e53e3e;
//                 font-size: 0.875rem;
//                 font-weight: 600;
//             }
//         }
//     }

//     .form-actions {
//         display: flex;
//         gap: 1rem;
//         justify-content: flex-end;
//         padding: 1.5rem 2rem;
//         background: #f7fafc;
//         border-top: 1px solid #e2e8f0;

//         button {
//             padding: 0.75rem 1.5rem;
//             border: none;
//             border-radius: 6px;
//             font-weight: 600;
//             cursor: pointer;
//             transition: all 0.2s;
//         }

//         .cancel-btn {
//             background: #e2e8f0;
//             color: #4a5568;

//             &:hover {
//                 background: #cbd5e0;
//             }
//         }

//         .save-draft-btn {
//             background: #ed8936;
//             color: white;

//             &:hover:not(:disabled) {
//                 background: #dd6b20;
//             }

//             &:disabled {
//                 opacity: 0.6;
//                 cursor: not-allowed;
//             }
//         }

//         .publish-btn {
//             background: #2d8cd4;
//             color: white;

//             &:hover:not(:disabled) {
//                 background: #1a5f8b;
//             }

//             &:disabled {
//                 opacity: 0.6;
//                 cursor: not-allowed;
//             }
//         }
//     }

//     @media (max-width: 768px) {
//         padding: 1rem;

//         .header {
//             flex-direction: column;
//             align-items: stretch;
//             gap: 1rem;

//             .header-left {
//                 .content-stats {
//                     flex-direction: column;
//                     gap: 0.25rem;
//                 }
//             }

//             .action-buttons {
//                 justify-content: stretch;

//                 button {
//                     flex: 1;
//                     justify-content: center;
//                 }
//             }
//         }

//         .form-section {
//             padding: 1.5rem;
//         }

//         .editor-toolbar {
//             gap: 0.5rem;

//             .toolbar-group {
//                 padding-right: 0.5rem;
//             }
//         }

//         .form-actions {
//             flex-direction: column;
//         }
//     }
// `;

// export default BlogEditor;

































































// // // components/BlogEditor.jsx
// // import React, { useState, useEffect } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { useBlog } from '../context/BlogContext';
// // import { useUserContext } from '../context/UserContext';
// // import { FaSave, FaEye, FaUpload, FaBold, FaItalic, FaListUl, FaListOl, FaLink, FaImage } from 'react-icons/fa';
// // import styled from 'styled-components';
// // import Swal from 'sweetalert2';

// // const BlogEditor = () => {
// //     const { id } = useParams();
// //     const navigate = useNavigate();
// //     const { createBlog, updateBlog, getBlogBySlug, currentBlog, loading } = useBlog();
// //     const { user } = useUserContext();
    
// //     const [formData, setFormData] = useState({
// //         title: '',
// //         excerpt: '',
// //         content: '',
// //         categories: [],
// //         tags: [],
// //         status: 'draft',
// //         featured: false,
// //         metaTitle: '',
// //         metaDescription: '',
// //         keywords: ''
// //     });
// //     const [featuredImage, setFeaturedImage] = useState(null);
// //     const [imagePreview, setImagePreview] = useState('');
// //     const [isEditing, setIsEditing] = useState(false);

// //     useEffect(() => {
// //         if (id) {
// //             setIsEditing(true);
// //             loadBlogForEditing();
// //         }
// //     }, [id]);

// //     const loadBlogForEditing = async () => {
// //         try {
// //             // You'll need to implement getBlogById in your context
// //             // For now, using getBlogBySlug as placeholder
// //             await getBlogBySlug(id);
// //         } catch (error) {
// //             console.error('Failed to load blog for editing:', error);
// //         }
// //     };

// //     useEffect(() => {
// //         if (isEditing && currentBlog) {
// //             setFormData({
// //                 title: currentBlog.title || '',
// //                 excerpt: currentBlog.excerpt || '',
// //                 content: currentBlog.content || '',
// //                 categories: currentBlog.categories || [],
// //                 tags: currentBlog.tags || [],
// //                 status: currentBlog.status || 'draft',
// //                 featured: currentBlog.featured || false,
// //                 metaTitle: currentBlog.metaTitle || '',
// //                 metaDescription: currentBlog.metaDescription || '',
// //                 keywords: currentBlog.keywords?.join(', ') || ''
// //             });
// //             if (currentBlog.featuredImage?.url) {
// //                 setImagePreview(currentBlog.featuredImage.url);
// //             }
// //         }
// //     }, [currentBlog, isEditing]);

// //     const handleInputChange = (e) => {
// //         const { name, value, type, checked } = e.target;
// //         setFormData(prev => ({
// //             ...prev,
// //             [name]: type === 'checkbox' ? checked : value
// //         }));
// //     };

// //     const handleArrayInput = (e) => {
// //         const { name, value } = e.target;
// //         const array = value.split(',').map(item => item.trim()).filter(item => item);
// //         setFormData(prev => ({
// //             ...prev,
// //             [name]: array
// //         }));
// //     };

// //     const handleImageChange = (e) => {
// //         const file = e.target.files[0];
// //         if (file) {
// //             setFeaturedImage(file);
// //             const reader = new FileReader();
// //             reader.onloadend = () => {
// //                 setImagePreview(reader.result);
// //             };
// //             reader.readAsDataURL(file);
// //         }
// //     };

// //     const handleContentChange = (value) => {
// //         setFormData(prev => ({
// //             ...prev,
// //             content: value
// //         }));
// //     };

// //     const formatText = (command, value = '') => {
// //         document.execCommand(command, false, value);
// //         // Update content with formatted HTML
// //         const content = document.getElementById('blog-content').innerHTML;
// //         handleContentChange(content);
// //     };

// //     const insertImage = () => {
// //         const url = prompt('Enter image URL:');
// //         if (url) {
// //             formatText('insertImage', url);
// //         }
// //     };

// //     const insertLink = () => {
// //         const url = prompt('Enter URL:');
// //         if (url) {
// //             formatText('createLink', url);
// //         }
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
        
// //         if (!formData.title || !formData.excerpt || !formData.content) {
// //             Swal.fire('Error!', 'Please fill in all required fields.', 'error');
// //             return;
// //         }

// //         const submitData = new FormData();
// //         Object.keys(formData).forEach(key => {
// //             if (key === 'categories' || key === 'tags') {
// //                 formData[key].forEach(item => submitData.append(key, item));
// //             } else if (key === 'keywords') {
// //                 const keywordsArray = formData[key].split(',').map(kw => kw.trim()).filter(kw => kw);
// //                 keywordsArray.forEach(kw => submitData.append('keywords', kw));
// //             } else {
// //                 submitData.append(key, formData[key]);
// //             }
// //         });

// //         if (featuredImage) {
// //             submitData.append('featuredImage', featuredImage);
// //         }

// //         try {
// //             if (isEditing) {
// //                 await updateBlog(id, submitData);
// //                 Swal.fire('Success!', 'Blog post updated successfully.', 'success');
// //             } else {
// //                 await createBlog(submitData);
// //                 Swal.fire('Success!', 'Blog post created successfully.', 'success');
// //             }
// //             navigate('/dashboard/manage-blogs');
// //         } catch (error) {
// //             Swal.fire('Error!', 'Failed to save blog post.', 'error');
// //         }
// //     };

// //     const handlePreview = () => {
// //         // Save current content to localStorage for preview
// //         localStorage.setItem('blogPreview', JSON.stringify({
// //             ...formData,
// //             featuredImage: imagePreview,
// //             author: user,
// //             createdAt: new Date().toISOString()
// //         }));
// //         window.open('/blog-preview', '_blank');
// //     };

// //     return (
// //         <Wrapper>
// //             <div className="container">
// //                 <div className="header">
// //                     <h1>{isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}</h1>
// //                     <div className="action-buttons">
// //                         <button onClick={handlePreview} className="preview-btn" type="button">
// //                             <FaEye />
// //                             Preview
// //                         </button>
// //                         <button onClick={handleSubmit} className="save-btn" disabled={loading}>
// //                             <FaSave />
// //                             {loading ? 'Saving...' : (isEditing ? 'Update' : 'Publish')}
// //                         </button>
// //                     </div>
// //                 </div>

// //                 <form onSubmit={handleSubmit} className="editor-form">
// //                     {/* Basic Information */}
// //                     <div className="form-section">
// //                         <h2>Basic Information</h2>
                        
// //                         <div className="form-group">
// //                             <label>Title *</label>
// //                             <input
// //                                 type="text"
// //                                 name="title"
// //                                 value={formData.title}
// //                                 onChange={handleInputChange}
// //                                 placeholder="Enter blog post title..."
// //                                 required
// //                             />
// //                         </div>

// //                         <div className="form-group">
// //                             <label>Excerpt *</label>
// //                             <textarea
// //                                 name="excerpt"
// //                                 value={formData.excerpt}
// //                                 onChange={handleInputChange}
// //                                 placeholder="Brief description of your blog post..."
// //                                 rows="3"
// //                                 maxLength="300"
// //                                 required
// //                             />
// //                             <div className="char-count">{formData.excerpt.length}/300</div>
// //                         </div>

// //                         <div className="form-grid">
// //                             <div className="form-group">
// //                                 <label>Categories *</label>
// //                                 <select
// //                                     name="categories"
// //                                     value={formData.categories[0] || ''}
// //                                     onChange={(e) => setFormData(prev => ({
// //                                         ...prev,
// //                                         categories: [e.target.value]
// //                                     }))}
// //                                     required
// //                                 >
// //                                     <option value="">Select Category</option>
// //                                     <option value="education">Education</option>
// //                                     <option value="career">Career</option>
// //                                     <option value="study-abroad">Study Abroad</option>
// //                                     <option value="tips">Tips & Advice</option>
// //                                     <option value="news">News</option>
// //                                 </select>
// //                             </div>

// //                             <div className="form-group">
// //                                 <label>Tags</label>
// //                                 <input
// //                                     type="text"
// //                                     name="tags"
// //                                     value={formData.tags.join(', ')}
// //                                     onChange={handleArrayInput}
// //                                     placeholder="tag1, tag2, tag3"
// //                                 />
// //                             </div>
// //                         </div>
// //                     </div>

// //                     {/* Featured Image */}
// //                     <div className="form-section">
// //                         <h2>Featured Image</h2>
// //                         <div className="image-upload">
// //                             {imagePreview ? (
// //                                 <div className="image-preview">
// //                                     <img src={imagePreview} alt="Featured preview" />
// //                                     <button 
// //                                         type="button" 
// //                                         className="remove-image"
// //                                         onClick={() => {
// //                                             setImagePreview('');
// //                                             setFeaturedImage(null);
// //                                         }}
// //                                     >
// //                                         Remove
// //                                     </button>
// //                                 </div>
// //                             ) : (
// //                                 <div className="upload-area">
// //                                     <FaUpload className="upload-icon" />
// //                                     <p>Click to upload featured image</p>
// //                                     <input
// //                                         type="file"
// //                                         accept="image/*"
// //                                         onChange={handleImageChange}
// //                                         className="file-input"
// //                                     />
// //                                 </div>
// //                             )}
// //                         </div>
// //                     </div>

// //                     {/* Content Editor */}
// //                     <div className="form-section">
// //                         <h2>Content *</h2>
// //                         <div className="editor-toolbar">
// //                             <button type="button" onClick={() => formatText('bold')}>
// //                                 <FaBold />
// //                             </button>
// //                             <button type="button" onClick={() => formatText('italic')}>
// //                                 <FaItalic />
// //                             </button>
// //                             <button type="button" onClick={() => formatText('insertUnorderedList')}>
// //                                 <FaListUl />
// //                             </button>
// //                             <button type="button" onClick={() => formatText('insertOrderedList')}>
// //                                 <FaListOl />
// //                             </button>
// //                             <button type="button" onClick={insertLink}>
// //                                 <FaLink />
// //                             </button>
// //                             <button type="button" onClick={insertImage}>
// //                                 <FaImage />
// //                             </button>
// //                         </div>
// //                         <div
// //                             id="blog-content"
// //                             className="content-editor"
// //                             contentEditable
// //                             dangerouslySetInnerHTML={{ __html: formData.content }}
// //                             onInput={(e) => handleContentChange(e.target.innerHTML)}
// //                             placeholder="Start writing your blog post here..."
// //                         />
// //                     </div>

// //                     {/* SEO Settings */}
// //                     <div className="form-section">
// //                         <h2>SEO Settings</h2>
// //                         <div className="form-group">
// //                             <label>Meta Title</label>
// //                             <input
// //                                 type="text"
// //                                 name="metaTitle"
// //                                 value={formData.metaTitle}
// //                                 onChange={handleInputChange}
// //                                 placeholder="SEO title (optional)"
// //                             />
// //                         </div>
// //                         <div className="form-group">
// //                             <label>Meta Description</label>
// //                             <textarea
// //                                 name="metaDescription"
// //                                 value={formData.metaDescription}
// //                                 onChange={handleInputChange}
// //                                 placeholder="SEO description (optional)"
// //                                 rows="3"
// //                             />
// //                         </div>
// //                         <div className="form-group">
// //                             <label>Keywords</label>
// //                             <input
// //                                 type="text"
// //                                 name="keywords"
// //                                 value={formData.keywords}
// //                                 onChange={handleInputChange}
// //                                 placeholder="keyword1, keyword2, keyword3"
// //                             />
// //                         </div>
// //                     </div>

// //                     {/* Publishing Options */}
// //                     <div className="form-section">
// //                         <h2>Publishing Options</h2>
// //                         <div className="form-grid">
// //                             <div className="form-group">
// //                                 <label>Status</label>
// //                                 <select
// //                                     name="status"
// //                                     value={formData.status}
// //                                     onChange={handleInputChange}
// //                                 >
// //                                     <option value="draft">Draft</option>
// //                                     <option value="published">Published</option>
// //                                 </select>
// //                             </div>
// //                             <div className="form-group checkbox-group">
// //                                 <label>
// //                                     <input
// //                                         type="checkbox"
// //                                         name="featured"
// //                                         checked={formData.featured}
// //                                         onChange={handleInputChange}
// //                                     />
// //                                     Featured Post
// //                                 </label>
// //                             </div>
// //                         </div>
// //                     </div>

// //                     {/* Submit Buttons */}
// //                     <div className="form-actions">
// //                         <button
// //                             type="button"
// //                             onClick={() => navigate('/dashboard/manage-blogs')}
// //                             className="cancel-btn"
// //                         >
// //                             Cancel
// //                         </button>
// //                         <button
// //                             type="submit"
// //                             name="status"
// //                             value="draft"
// //                             onClick={() => setFormData(prev => ({ ...prev, status: 'draft' }))}
// //                             className="save-draft-btn"
// //                             disabled={loading}
// //                         >
// //                             Save Draft
// //                         </button>
// //                         <button
// //                             type="submit"
// //                             name="status"
// //                             value="published"
// //                             onClick={() => setFormData(prev => ({ ...prev, status: 'published' }))}
// //                             className="publish-btn"
// //                             disabled={loading}
// //                         >
// //                             {loading ? 'Publishing...' : 'Publish'}
// //                         </button>
// //                     </div>
// //                 </form>
// //             </div>
// //         </Wrapper>
// //     );
// // };

// // const Wrapper = styled.section`
// //     padding: 2rem;
// //     background: #f8fafc;
// //     min-height: 100vh;

// //     .container {
// //         max-width: 1000px;
// //         margin: 0 auto;
// //     }

// //     .header {
// //         display: flex;
// //         justify-content: space-between;
// //         align-items: center;
// //         margin-bottom: 2rem;
// //         background: white;
// //         padding: 1.5rem;
// //         border-radius: 8px;
// //         box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

// //         h1 {
// //             font-size: 1.5rem;
// //             font-weight: 700;
// //             color: #1a202c;
// //             margin: 0;
// //         }

// //         .action-buttons {
// //             display: flex;
// //             gap: 1rem;

// //             .preview-btn, .save-btn {
// //                 display: flex;
// //                 align-items: center;
// //                 gap: 0.5rem;
// //                 padding: 0.75rem 1.5rem;
// //                 border: none;
// //                 border-radius: 6px;
// //                 font-weight: 600;
// //                 cursor: pointer;
// //                 transition: all 0.2s;
// //             }

// //             .preview-btn {
// //                 background: #e2e8f0;
// //                 color: #4a5568;

// //                 &:hover {
// //                     background: #cbd5e0;
// //                 }
// //             }

// //             .save-btn {
// //                 background: #2d8cd4;
// //                 color: white;

// //                 &:hover:not(:disabled) {
// //                     background: #1a5f8b;
// //                 }

// //                 &:disabled {
// //                     opacity: 0.6;
// //                     cursor: not-allowed;
// //                 }
// //             }
// //         }
// //     }

// //     .editor-form {
// //         background: white;
// //         border-radius: 8px;
// //         box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// //         overflow: hidden;
// //     }

// //     .form-section {
// //         padding: 2rem;
// //         border-bottom: 1px solid #e2e8f0;

// //         &:last-child {
// //             border-bottom: none;
// //         }

// //         h2 {
// //             font-size: 1.25rem;
// //             font-weight: 600;
// //             color: #2d3748;
// //             margin-bottom: 1.5rem;
// //         }
// //     }

// //     .form-group {
// //         margin-bottom: 1.5rem;

// //         label {
// //             display: block;
// //             font-weight: 600;
// //             color: #4a5568;
// //             margin-bottom: 0.5rem;
// //         }

// //         input, textarea, select {
// //             width: 100%;
// //             padding: 0.75rem 1rem;
// //             border: 2px solid #e2e8f0;
// //             border-radius: 6px;
// //             font-size: 1rem;
// //             transition: border-color 0.2s;

// //             &:focus {
// //                 outline: none;
// //                 border-color: #2d8cd4;
// //             }
// //         }

// //         textarea {
// //             resize: vertical;
// //             min-height: 80px;
// //         }

// //         .char-count {
// //             text-align: right;
// //             font-size: 0.875rem;
// //             color: #718096;
// //             margin-top: 0.25rem;
// //         }
// //     }

// //     .form-grid {
// //         display: grid;
// //         grid-template-columns: 1fr 1fr;
// //         gap: 1rem;

// //         @media (max-width: 768px) {
// //             grid-template-columns: 1fr;
// //         }
// //     }

// //     .checkbox-group {
// //         display: flex;
// //         align-items: center;

// //         label {
// //             display: flex;
// //             align-items: center;
// //             gap: 0.5rem;
// //             margin-bottom: 0;
// //             cursor: pointer;

// //             input {
// //                 width: auto;
// //             }
// //         }
// //     }

// //     .image-upload {
// //         .image-preview {
// //             position: relative;
// //             max-width: 400px;

// //             img {
// //                 width: 100%;
// //                 height: 200px;
// //                 object-fit: cover;
// //                 border-radius: 6px;
// //             }

// //             .remove-image {
// //                 position: absolute;
// //                 top: 0.5rem;
// //                 right: 0.5rem;
// //                 background: #e53e3e;
// //                 color: white;
// //                 border: none;
// //                 padding: 0.5rem;
// //                 border-radius: 4px;
// //                 cursor: pointer;
// //                 font-size: 0.875rem;

// //                 &:hover {
// //                     background: #c53030;
// //                 }
// //             }
// //         }

// //         .upload-area {
// //             position: relative;
// //             border: 2px dashed #cbd5e0;
// //             border-radius: 6px;
// //             padding: 3rem 2rem;
// //             text-align: center;
// //             transition: border-color 0.2s;
// //             cursor: pointer;

// //             &:hover {
// //                 border-color: #2d8cd4;
// //             }

// //             .upload-icon {
// //                 font-size: 2rem;
// //                 color: #a0aec0;
// //                 margin-bottom: 1rem;
// //             }

// //             p {
// //                 color: #718096;
// //                 margin: 0;
// //             }

// //             .file-input {
// //                 position: absolute;
// //                 top: 0;
// //                 left: 0;
// //                 width: 100%;
// //                 height: 100%;
// //                 opacity: 0;
// //                 cursor: pointer;
// //             }
// //         }
// //     }

// //     .editor-toolbar {
// //         display: flex;
// //         gap: 0.5rem;
// //         padding: 1rem;
// //         background: #f7fafc;
// //         border: 1px solid #e2e8f0;
// //         border-bottom: none;
// //         border-radius: 6px 6px 0 0;

// //         button {
// //             background: white;
// //             border: 1px solid #e2e8f0;
// //             padding: 0.5rem;
// //             border-radius: 4px;
// //             cursor: pointer;
// //             transition: all 0.2s;

// //             &:hover {
// //                 background: #edf2f7;
// //                 border-color: #cbd5e0;
// //             }
// //         }
// //     }

// //     .content-editor {
// //         min-height: 400px;
// //         padding: 1rem;
// //         border: 1px solid #e2e8f0;
// //         border-radius: 0 0 6px 6px;
// //         font-size: 1rem;
// //         line-height: 1.6;
// //         outline: none;

// //         &:empty:before {
// //             content: attr(placeholder);
// //             color: #a0aec0;
// //         }

// //         h1, h2, h3, h4, h5, h6 {
// //             margin: 1.5rem 0 1rem;
// //             color: #1a202c;
// //         }

// //         p {
// //             margin-bottom: 1rem;
// //         }

// //         ul, ol {
// //             margin: 1rem 0;
// //             padding-left: 2rem;
// //         }

// //         img {
// //             max-width: 100%;
// //             height: auto;
// //             border-radius: 4px;
// //             margin: 1rem 0;
// //         }

// //         a {
// //             color: #2d8cd4;
// //             text-decoration: underline;
// //         }
// //     }

// //     .form-actions {
// //         display: flex;
// //         gap: 1rem;
// //         justify-content: flex-end;
// //         padding: 1.5rem 2rem;
// //         background: #f7fafc;
// //         border-top: 1px solid #e2e8f0;

// //         button {
// //             padding: 0.75rem 1.5rem;
// //             border: none;
// //             border-radius: 6px;
// //             font-weight: 600;
// //             cursor: pointer;
// //             transition: all 0.2s;
// //         }

// //         .cancel-btn {
// //             background: #e2e8f0;
// //             color: #4a5568;

// //             &:hover {
// //                 background: #cbd5e0;
// //             }
// //         }

// //         .save-draft-btn {
// //             background: #ed8936;
// //             color: white;

// //             &:hover:not(:disabled) {
// //                 background: #dd6b20;
// //             }

// //             &:disabled {
// //                 opacity: 0.6;
// //                 cursor: not-allowed;
// //             }
// //         }

// //         .publish-btn {
// //             background: #2d8cd4;
// //             color: white;

// //             &:hover:not(:disabled) {
// //                 background: #1a5f8b;
// //             }

// //             &:disabled {
// //                 opacity: 0.6;
// //                 cursor: not-allowed;
// //             }
// //         }
// //     }

// //     @media (max-width: 768px) {
// //         padding: 1rem;

// //         .header {
// //             flex-direction: column;
// //             align-items: stretch;
// //             gap: 1rem;

// //             .action-buttons {
// //                 justify-content: stretch;

// //                 button {
// //                     flex: 1;
// //                     justify-content: center;
// //                 }
// //             }
// //         }

// //         .form-section {
// //             padding: 1.5rem;
// //         }

// //         .form-actions {
// //             flex-direction: column;
// //         }
// //     }
// // `;

// // export default BlogEditor;