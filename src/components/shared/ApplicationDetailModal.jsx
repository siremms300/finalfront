import React from 'react';
import styled from 'styled-components';

const ApplicationDetailModal = ({ application, onClose, onStatusUpdate }) => {
    if (!application) return null;

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <ModalHeader>
                    <h2>UPI Application Details</h2>
                    <button onClick={onClose} className="close-btn">×</button>
                </ModalHeader>
                
                <ModalBody>
                    <Section>
                        <h3>Personal Information</h3>
                        <InfoGrid>
                            <InfoItem>
                                <label>Full Name:</label>
                                <span>{application.fullName}</span>
                            </InfoItem>
                            <InfoItem>
                                <label>Email:</label>
                                <span>{application.email}</span>
                            </InfoItem>
                            <InfoItem>
                                <label>Phone:</label>
                                <span>{application.phoneNumber}</span>
                            </InfoItem>
                            <InfoItem>
                                <label>Date of Birth:</label>
                                <span>{new Date(application.dateOfBirth).toLocaleDateString()}</span>
                            </InfoItem>
                            <InfoItem>
                                <label>Nationality:</label>
                                <span>{application.nationality}</span>
                            </InfoItem>
                            <InfoItem>
                                <label>Address:</label>
                                <span>{application.address}</span>
                            </InfoItem>
                        </InfoGrid>
                    </Section>

                    <Section>
                        <h3>Academic Information</h3>
                        <InfoGrid>
                            <InfoItem>
                                <label>Current School:</label>
                                <span>{application.currentSchool}</span>
                            </InfoItem>
                            <InfoItem>
                                <label>Academic Level:</label>
                                <span>{application.academicLevel}</span>
                            </InfoItem>
                            <InfoItem>
                                <label>Intended Major:</label>
                                <span>{application.intendedMajor}</span>
                            </InfoItem>
                            <InfoItem>
                                <label>Target Countries:</label>
                                <span>{application.targetCountries?.join(', ')}</span>
                            </InfoItem>
                        </InfoGrid>
                    </Section>

                    {application.parentalConsent?.consentGiven && (
                        <Section>
                            <h3>Parental Information</h3>
                            <InfoGrid>
                                <InfoItem>
                                    <label>Parent Name:</label>
                                    <span>{application.parentalConsent.parentName}</span>
                                </InfoItem>
                                <InfoItem>
                                    <label>Parent Email:</label>
                                    <span>{application.parentalConsent.parentEmail}</span>
                                </InfoItem>
                                <InfoItem>
                                    <label>Parent Phone:</label>
                                    <span>{application.parentalConsent.parentPhone}</span>
                                </InfoItem>
                            </InfoGrid>
                        </Section>
                    )}

                    <Section>
                        <h3>Financial Information</h3>
                        <InfoItem>
                            <label>Financial Readiness:</label>
                            <span className={`financial-badge ${application.financialReadiness}`}>
                                {application.financialReadiness.replace(/_/g, ' ')}
                            </span>
                        </InfoItem>
                    </Section>

                    {application.motivationEssay && (
                        <Section>
                            <h3>Motivation Essay</h3>
                            <EssayPreview>
                                {application.motivationEssay}
                            </EssayPreview>
                        </Section>
                    )}

                    {application.documents && application.documents.length > 0 && (
                        <Section>
                            <h3>Uploaded Documents</h3>
                            <DocumentList>
                                {application.documents.map((doc, index) => (
                                    <DocumentItem key={index}>
                                        <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                                            {doc.name} ({doc.size})
                                        </a>
                                    </DocumentItem>
                                ))}
                            </DocumentList>
                        </Section>
                    )}

                    <Section>
                        <h3>Application Status</h3>
                        <StatusSection>
                            <select
                                value={application.status}
                                onChange={(e) => onStatusUpdate(application._id, e.target.value)}
                                className={`status-select large ${application.status}`}
                            >
                                <option value="pending">Pending</option>
                                <option value="under_review">Under Review</option>
                                <option value="accepted">Accepted</option>
                                <option value="rejected">Rejected</option>
                                <option value="waitlisted">Waitlisted</option>
                            </select>
                            <div className="application-id">
                                Application ID: {application._id}
                            </div>
                        </StatusSection>
                    </Section>
                </ModalBody>
                
                <ModalFooter>
                    <button onClick={onClose} className="btn-secondary">
                        Close
                    </button>
                </ModalFooter>
            </ModalContent>
        </ModalOverlay>
    );
};

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 1rem;
`;

const ModalContent = styled.div`
    background: white;
    border-radius: 8px;
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #e2e8f0;
    
    h2 {
        margin: 0;
        color: #2d3748;
    }
    
    .close-btn {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #718096;
        
        &:hover {
            color: #2d3748;
        }
    }
`;

const ModalBody = styled.div`
    padding: 1.5rem;
`;

const ModalFooter = styled.div`
    padding: 1.5rem;
    border-top: 1px solid #e2e8f0;
    display: flex;
    justify-content: flex-end;
    
    .btn-secondary {
        background: #718096;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        
        &:hover {
            background: #4a5568;
        }
    }
`;

const Section = styled.div`
    margin-bottom: 2rem;
    
    h3 {
        color: #2d8cd4;
        margin-bottom: 1rem;
        font-size: 1.1rem;
        border-bottom: 2px solid #e2e8f0;
        padding-bottom: 0.5rem;
    }
`;

const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
`;

const InfoItem = styled.div`
    display: flex;
    flex-direction: column;
    
    label {
        font-weight: 600;
        color: #4a5568;
        margin-bottom: 0.25rem;
        font-size: 0.9rem;
    }
    
    span {
        color: #2d3748;
    }
    
    .financial-badge {
        display: inline-block;
        padding: 0.25rem 0.5rem;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 500;
        text-transform: capitalize;
        width: fit-content;
        
        &.within_7_days { background: #c6f6d5; color: #22543d; }
        &.within_14_days { background: #fed7d7; color: #742a2a; }
        &.within_30_days { background: #feebcb; color: #744210; }
        &.need_financial_aid { background: #e9d8fd; color: #44337a; }
    }
`;

const EssayPreview = styled.div`
    background: #f7fafc;
    padding: 1rem;
    border-radius: 4px;
    border-left: 4px solid #2d8cd4;
    white-space: pre-wrap;
    line-height: 1.6;
    max-height: 300px;
    overflow-y: auto;
`;

const DocumentList = styled.ul`
    list-style: none;
    padding: 0;
`;

const DocumentItem = styled.li`
    margin-bottom: 0.5rem;
    
    a {
        color: #2d8cd4;
        text-decoration: none;
        
        &:hover {
            text-decoration: underline;
        }
    }
`;

const StatusSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    
    .status-select.large {
        padding: 0.5rem 1rem;
        border-radius: 4px;
        border: 1px solid #e2e8f0;
        font-weight: 500;
        min-width: 150px;
        
        &.pending { background: #feebcb; color: #744210; }
        &.under_review { background: #e9d8fd; color: #44337a; }
        &.accepted { background: #c6f6d5; color: #22543d; }
        &.rejected { background: #fed7d7; color: #742a2a; }
        &.waitlisted { background: #e2e8f0; color: #4a5568; }
    }
    
    .application-id {
        color: #718096;
        font-size: 0.9rem;
        font-family: monospace;
    }
`;

export default ApplicationDetailModal;