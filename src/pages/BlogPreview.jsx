// components/BlogPreview.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogPreview = () => {
    const navigate = useNavigate();
    const previewData = JSON.parse(localStorage.getItem('blogPreview') || '{}');

    if (!previewData.title) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h2>No preview data found</h2>
                <p>Please create a blog post first.</p>
                <button onClick={() => navigate('/dashboard/create-blog')}>
                    Create Blog Post
                </button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1>{previewData.title}</h1>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>
                    By {previewData.author?.username} • {new Date(previewData.createdAt).toLocaleDateString()}
                </div>
            </header>
            
            {previewData.featuredImage && (
                <img 
                    src={previewData.featuredImage} 
                    alt="Featured" 
                    style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px', marginBottom: '2rem' }}
                />
            )}
            
            <div 
                dangerouslySetInnerHTML={{ __html: previewData.content }}
                style={{ lineHeight: '1.6' }}
            />
            
            <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
                <p><strong>Note:</strong> This is a preview. Changes are not saved.</p>
                <button onClick={() => window.close()}>Close Preview</button>
            </div>
        </div>
    );
};

export default BlogPreview;