import React, { useState } from "react";
import { useApplicationContext } from "../../context/ApplicationContext"; 


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
        resumeLink: ""
    });

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
            // Success notification can be added here
        } catch (error) {
            // Error is already handled in the context
        }
    };

    if (!isApplicationModalOpen) return null;

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <h2>Apply to School</h2>
                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label>Phone Number:</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                            pattern="[0-9]{10,15}"
                            title="Please enter a valid phone number"
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label>Resume URL:</label>
                        <input
                            type="url"
                            name="resumeLink"
                            value={formData.resumeLink}
                            onChange={handleChange}
                            required
                            placeholder="https://example.com/myresume.pdf"
                        />
                    </div>
                    {applicationError.status && (
                        <p style={styles.error}>{applicationError.message}</p>
                    )}
                    <div style={styles.actions}>
                        <button type="button" onClick={closeApplicationModal} style={styles.cancelButton}>
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={applicationLoading} 
                            style={styles.submitButton}
                        >
                            {applicationLoading ? "Submitting..." : "Submit Application"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
















// const ApplicationModal = () => {
//     const {
//         isApplicationModalOpen,
//         closeApplicationModal,
//         handleApply,
//         applicationLoading,
//         applicationError,
//     } = useApplicationContext();

//     const [resume, setResume] = useState("");
//     const [dateOfJoining, setDateOfJoining] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await handleApply({ resume, dateOfJoining });
//             alert("Application submitted successfully!");
//         } catch (error) {
//             console.error("Application failed:", error);
//         }
//     };

//     if (!isApplicationModalOpen) return null;

//     return (
//         <div style={styles.modalOverlay}>
//             <div style={styles.modalContent}>
//                 <h2>Apply to School</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div style={styles.formGroup}>
//                         <label>Resume URL:</label>
//                         <input
//                             type="url"
//                             value={resume}
//                             onChange={(e) => setResume(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div style={styles.formGroup}>
//                         <label>Date of Joining:</label>
//                         <input
//                             type="date"
//                             value={dateOfJoining}
//                             onChange={(e) => setDateOfJoining(e.target.value)}
//                             required
//                         />
//                     </div>
//                     {applicationError.status && (
//                         <p style={styles.error}>{applicationError.message}</p>
//                     )}
//                     <div style={styles.actions}>
//                         <button type="button" onClick={closeApplicationModal} style={styles.cancelButton}>
//                             Cancel
//                         </button>
//                         <button type="submit" disabled={applicationLoading} style={styles.submitButton}>
//                             {applicationLoading ? "Submitting..." : "Submit"}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

const styles = {
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        width: "100%",
        maxWidth: "400px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    formGroup: {
        marginBottom: "16px",
    },
    actions: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "8px",
    },
    cancelButton: {
        padding: "8px 16px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        backgroundColor: "#fff",
        cursor: "pointer",
    },
    submitButton: {
        padding: "8px 16px",
        border: "none",
        borderRadius: "4px",
        backgroundColor: "#1a73e8",
        color: "#fff",
        cursor: "pointer",
    },
    error: {
        color: "red",
        marginBottom: "16px",
    },
};

export default ApplicationModal;