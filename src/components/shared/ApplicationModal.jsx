import React, { useState } from "react";
import { useApplicationContext } from "../../context/ApplicationContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaPaperPlane, FaUpload, FaCheckCircle } from "react-icons/fa";
import styled from "styled-components";

const ApplicationModal = () => {
    const {
        isApplicationModalOpen,
        closeApplicationModal,
        handleApply,
        applicationLoading,
        applicationError,
    } = useApplicationContext();

    const [formData, setFormData] = useState({
        phoneNumber: "",
        resumeLink: "",
        coverLetter: "",
        academicBackground: ""
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleApply(formData);
            setIsSubmitted(true);
            setCurrentStep(4); // Success step
        } catch (error) {
            // Error is already handled in the context
        }
    };

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);

    const steps = [
        { number: 1, title: "Contact Info" },
        { number: 2, title: "Documents" },
        { number: 3, title: "Review" },
        { number: 4, title: "Complete" }
    ];

    if (!isApplicationModalOpen) return null;

    return (
        <ModalOverlay>
            <ModalContent>
                <ModalHeader>
                    <h2>Apply to Program</h2>
                    <button onClick={closeApplicationModal} className="close-btn">
                        <FaTimes />
                    </button>
                </ModalHeader>

                {/* Progress Steps */}
                <ProgressSteps>
                    {steps.map((step) => (
                        <div key={step.number} className={`step ${currentStep >= step.number ? 'active' : ''}`}>
                            <div className="step-number">{step.number}</div>
                            <div className="step-title">{step.title}</div>
                        </div>
                    ))}
                </ProgressSteps>

                <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="step-content"
                        >
                            <h3>Contact Information</h3>
                            <div className="form-group">
                                <label>Phone Number *</label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>
                            <div className="form-group">
                                <label>Academic Background</label>
                                <textarea
                                    name="academicBackground"
                                    value={formData.academicBackground}
                                    onChange={handleChange}
                                    placeholder="Briefly describe your educational background and achievements..."
                                    rows="4"
                                />
                            </div>
                            <div className="step-actions">
                                <button type="button" onClick={nextStep} className="btn-primary">
                                    Next: Documents
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="step-content"
                        >
                            <h3>Application Documents</h3>
                            <div className="form-group">
                                <label>Resume/CV URL *</label>
                                <input
                                    type="url"
                                    name="resumeLink"
                                    value={formData.resumeLink}
                                    onChange={handleChange}
                                    required
                                    placeholder="https://drive.google.com/your-resume.pdf"
                                />
                                <small>Upload your resume to Google Drive, Dropbox, or similar and paste the link here</small>
                            </div>
                            <div className="form-group">
                                <label>Cover Letter (Optional)</label>
                                <textarea
                                    name="coverLetter"
                                    value={formData.coverLetter}
                                    onChange={handleChange}
                                    placeholder="Why are you interested in this program? What makes you a good candidate?"
                                    rows="4"
                                />
                            </div>
                            <div className="step-actions">
                                <button type="button" onClick={prevStep} className="btn-secondary">
                                    Back
                                </button>
                                <button type="button" onClick={nextStep} className="btn-primary">
                                    Next: Review
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="step-content"
                        >
                            <h3>Review Your Application</h3>
                            <div className="review-section">
                                <div className="review-item">
                                    <strong>Phone:</strong> {formData.phoneNumber}
                                </div>
                                <div className="review-item">
                                    <strong>Academic Background:</strong> 
                                    <p>{formData.academicBackground || "Not provided"}</p>
                                </div>
                                <div className="review-item">
                                    <strong>Resume:</strong> {formData.resumeLink}
                                </div>
                                <div className="review-item">
                                    <strong>Cover Letter:</strong>
                                    <p>{formData.coverLetter || "Not provided"}</p>
                                </div>
                            </div>
                            {applicationError.status && (
                                <div className="error-message">
                                    {applicationError.message}
                                </div>
                            )}
                            <div className="step-actions">
                                <button type="button" onClick={prevStep} className="btn-secondary">
                                    Back
                                </button>
                                <button 
                                    type="submit" 
                                    onClick={handleSubmit}
                                    disabled={applicationLoading}
                                    className="btn-primary submit-btn"
                                >
                                    {applicationLoading ? (
                                        "Submitting..."
                                    ) : (
                                        <>
                                            <FaPaperPlane />
                                            Submit Application
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="step-content success-content"
                        >
                            <div className="success-icon">
                                <FaCheckCircle />
                            </div>
                            <h3>Application Submitted!</h3>
                            <p>Your application has been successfully submitted. Our admissions team will review your application and contact you within 5-7 business days.</p>
                            <div className="next-steps">
                                <h4>Next Steps:</h4>
                                <ul>
                                    <li>Check your email for confirmation</li>
                                    <li>Prepare for potential interviews</li>
                                    <li>Gather any additional documents</li>
                                </ul>
                            </div>
                            <button onClick={closeApplicationModal} className="btn-primary">
                                Close
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </ModalContent>
        </ModalOverlay>
    );
};

// Styled Components
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    padding: 20px;
`;

const ModalContent = styled.div`
    background: white;
    border-radius: 20px;
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);

    .step-content {
        padding: 30px;

        h3 {
            font-size: 1.5rem;
            color: #1e293b;
            margin-bottom: 25px;
            font-weight: 600;
        }

        .form-group {
            margin-bottom: 25px;

            label {
                display: block;
                font-size: 0.9rem;
                font-weight: 600;
                color: #374151;
                margin-bottom: 8px;
            }

            input, textarea {
                width: 100%;
                padding: 12px 16px;
                border: 2px solid #e5e7eb;
                border-radius: 10px;
                font-size: 1rem;
                transition: all 0.2s;

                &:focus {
                    outline: none;
                    border-color: #2d8cd4;
                    box-shadow: 0 0 0 3px rgba(45, 140, 212, 0.1);
                }
            }

            textarea {
                resize: vertical;
                min-height: 100px;
            }

            small {
                display: block;
                margin-top: 6px;
                font-size: 0.8rem;
                color: #6b7280;
            }
        }

        .review-section {
            background: #f8fafc;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 25px;

            .review-item {
                margin-bottom: 15px;
                padding-bottom: 15px;
                border-bottom: 1px solid #e5e7eb;

                &:last-child {
                    margin-bottom: 0;
                    padding-bottom: 0;
                    border-bottom: none;
                }

                strong {
                    color: #374151;
                    display: block;
                    margin-bottom: 5px;
                }

                p {
                    margin: 5px 0 0 0;
                    color: #6b7280;
                    line-height: 1.5;
                }
            }
        }

        .error-message {
            background: #fef2f2;
            color: #dc2626;
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 20px;
            border: 1px solid #fecaca;
        }

        .step-actions {
            display: flex;
            gap: 12px;
            justify-content: flex-end;
            margin-top: 30px;

            .btn-primary, .btn-secondary {
                padding: 12px 24px;
                border: none;
                border-radius: 10px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .btn-primary {
                background: linear-gradient(135deg, #2d8cd4, #1a5f8b);
                color: white;

                &:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(45, 140, 212, 0.3);
                }

                &:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
            }

            .btn-secondary {
                background: white;
                color: #374151;
                border: 2px solid #e5e7eb;

                &:hover {
                    background: #f9fafb;
                }
            }
        }

        &.success-content {
            text-align: center;

            .success-icon {
                font-size: 4rem;
                color: #10b981;
                margin-bottom: 20px;
            }

            h3 {
                color: #10b981;
                margin-bottom: 15px;
            }

            p {
                color: #6b7280;
                line-height: 1.6;
                margin-bottom: 25px;
            }

            .next-steps {
                text-align: left;
                background: #f0fdf4;
                padding: 20px;
                border-radius: 10px;
                margin-bottom: 25px;

                h4 {
                    color: #065f46;
                    margin-bottom: 10px;
                }

                ul {
                    color: #047857;
                    padding-left: 20px;

                    li {
                        margin-bottom: 8px;
                    }
                }
            }
        }
    }
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 30px;
    border-bottom: 1px solid #e5e7eb;

    h2 {
        font-size: 1.5rem;
        color: #1e293b;
        margin: 0;
        font-weight: 700;
    }

    .close-btn {
        background: none;
        border: none;
        font-size: 1.2rem;
        color: #6b7280;
        cursor: pointer;
        padding: 8px;
        border-radius: 8px;
        transition: all 0.2s;

        &:hover {
            background: #f3f4f6;
            color: #374151;
        }
    }
`;

const ProgressSteps = styled.div`
    display: flex;
    padding: 0 30px;
    margin-bottom: 10px;

    .step {
        flex: 1;
        text-align: center;
        position: relative;

        &:not(:last-child)::after {
            content: '';
            position: absolute;
            top: 20px;
            left: 50%;
            right: -50%;
            height: 2px;
            background: #e5e7eb;
            z-index: 1;
        }

        &.active {
            .step-number {
                background: linear-gradient(135deg, #2d8cd4, #1a5f8b);
                color: white;
                border-color: #2d8cd4;
            }

            .step-title {
                color: #2d8cd4;
                font-weight: 600;
            }

            &::after {
                background: #2d8cd4;
            }
        }

        .step-number {
            width: 40px;
            height: 40px;
            border: 2px solid #e5e7eb;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 8px;
            background: white;
            color: #9ca3af;
            font-weight: 600;
            position: relative;
            z-index: 2;
        }

        .step-title {
            font-size: 0.8rem;
            color: #9ca3af;
            font-weight: 500;
        }
    }
`;

export default ApplicationModal;




































// import React, { useState } from "react";
// import { useApplicationContext } from "../../context/ApplicationContext"; 


// const ApplicationModal = () => {
//     const {
//         isApplicationModalOpen,
//         closeApplicationModal,
//         handleApply,
//         applicationLoading,
//         applicationError,
//     } = useApplicationContext();

//     const [formData, setFormData] = useState({
//         phoneNumber: "",
//         resumeLink: ""
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await handleApply(formData);
//             // Success notification can be added here
//         } catch (error) {
//             // Error is already handled in the context
//         }
//     };

//     if (!isApplicationModalOpen) return null;

//     return (
//         <div style={styles.modalOverlay}>
//             <div style={styles.modalContent}>
//                 <h2>Apply to School</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div style={styles.formGroup}>
//                         <label>Phone Number:</label>
//                         <input
//                             type="tel"
//                             name="phoneNumber"
//                             value={formData.phoneNumber}
//                             onChange={handleChange}
//                             required
//                             pattern="[0-9]{10,15}"
//                             title="Please enter a valid phone number"
//                         />
//                     </div>
//                     <div style={styles.formGroup}>
//                         <label>Resume URL:</label>
//                         <input
//                             type="url"
//                             name="resumeLink"
//                             value={formData.resumeLink}
//                             onChange={handleChange}
//                             required
//                             placeholder="https://example.com/myresume.pdf"
//                         />
//                     </div>
//                     {applicationError.status && (
//                         <p style={styles.error}>{applicationError.message}</p>
//                     )}
//                     <div style={styles.actions}>
//                         <button type="button" onClick={closeApplicationModal} style={styles.cancelButton}>
//                             Cancel
//                         </button>
//                         <button 
//                             type="submit" 
//                             disabled={applicationLoading} 
//                             style={styles.submitButton}
//                         >
//                             {applicationLoading ? "Submitting..." : "Submit Application"}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };
















// // const ApplicationModal = () => {
// //     const {
// //         isApplicationModalOpen,
// //         closeApplicationModal,
// //         handleApply,
// //         applicationLoading,
// //         applicationError,
// //     } = useApplicationContext();

// //     const [resume, setResume] = useState("");
// //     const [dateOfJoining, setDateOfJoining] = useState("");

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         try {
// //             await handleApply({ resume, dateOfJoining });
// //             alert("Application submitted successfully!");
// //         } catch (error) {
// //             console.error("Application failed:", error);
// //         }
// //     };

// //     if (!isApplicationModalOpen) return null;

// //     return (
// //         <div style={styles.modalOverlay}>
// //             <div style={styles.modalContent}>
// //                 <h2>Apply to School</h2>
// //                 <form onSubmit={handleSubmit}>
// //                     <div style={styles.formGroup}>
// //                         <label>Resume URL:</label>
// //                         <input
// //                             type="url"
// //                             value={resume}
// //                             onChange={(e) => setResume(e.target.value)}
// //                             required
// //                         />
// //                     </div>
// //                     <div style={styles.formGroup}>
// //                         <label>Date of Joining:</label>
// //                         <input
// //                             type="date"
// //                             value={dateOfJoining}
// //                             onChange={(e) => setDateOfJoining(e.target.value)}
// //                             required
// //                         />
// //                     </div>
// //                     {applicationError.status && (
// //                         <p style={styles.error}>{applicationError.message}</p>
// //                     )}
// //                     <div style={styles.actions}>
// //                         <button type="button" onClick={closeApplicationModal} style={styles.cancelButton}>
// //                             Cancel
// //                         </button>
// //                         <button type="submit" disabled={applicationLoading} style={styles.submitButton}>
// //                             {applicationLoading ? "Submitting..." : "Submit"}
// //                         </button>
// //                     </div>
// //                 </form>
// //             </div>
// //         </div>
// //     );
// // };

// const styles = {
//     modalOverlay: {
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         backgroundColor: "rgba(0, 0, 0, 0.5)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         zIndex: 1000,
//     },
//     modalContent: {
//         backgroundColor: "#fff",
//         padding: "20px",
//         borderRadius: "8px",
//         width: "100%",
//         maxWidth: "400px",
//         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//     },
//     formGroup: {
//         marginBottom: "16px",
//     },
//     actions: {
//         display: "flex",
//         justifyContent: "flex-end",
//         gap: "8px",
//     },
//     cancelButton: {
//         padding: "8px 16px",
//         border: "1px solid #ccc",
//         borderRadius: "4px",
//         backgroundColor: "#fff",
//         cursor: "pointer",
//     },
//     submitButton: {
//         padding: "8px 16px",
//         border: "none",
//         borderRadius: "4px",
//         backgroundColor: "#1a73e8",
//         color: "#fff",
//         cursor: "pointer",
//     },
//     error: {
//         color: "red",
//         marginBottom: "16px",
//     },
// };

// export default ApplicationModal;