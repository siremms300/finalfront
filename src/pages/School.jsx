import React, { useState } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSingleHandler } from "../utils/FetchHandlers";
import LoadingComTwo from "../components/shared/LoadingComTwo";
import { 
  FaUniversity, 
  FaCalendarAlt, 
  FaMoneyBillWave, 
  FaGraduationCap, 
  FaMapMarkerAlt, 
  FaChevronDown, 
  FaChevronUp,
  FaStar,
  FaUsers,
  FaGlobeAmericas,
  FaAward,
  FaBook,
  FaClock,
  FaLanguage,
  FaShareAlt,
  FaHeart,
  FaRegHeart
} from "react-icons/fa";
import Navbar from "../components/shared/Navbar";
import { useApplicationContext } from "../context/ApplicationContext";
import { useUserContext } from "../context/UserContext";
import ApplicationModal from "../components/shared/ApplicationModal";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { toast } from "react-toastify";

dayjs.extend(advancedFormat);

const School = () => {
    const { id } = useParams();
    const { user } = useUserContext();
    const { data: school, isLoading, isError, error } = useQuery({
        queryKey: ["school", id],
        queryFn: () => getSingleHandler(`${import.meta.env.VITE_API_BASE_URL}/schools/${id}`),
    });

    const [showRequirements, setShowRequirements] = useState(true);
    const [showFacilities, setShowFacilities] = useState(true);
    const [showAdmissionDetails, setShowAdmissionDetails] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);

    const { openApplicationModal } = useApplicationContext();
    const deadlineDate = dayjs(school?.applicationDeadline).format("MMMM D, YYYY");
    const postedDate = dayjs(school?.createdAt).format("MMMM D, YYYY");

    const handleApplyClick = () => {
        if (!user) {
            toast.info("Please log in to apply for this program");
            setShowLoginPrompt(true);
            return;
        }
        if (user.role === "user") {
            openApplicationModal(school._id);
        } else {
            toast.warning("Only regular users can apply for programs");
        }
    };

    const handleFavoriteClick = () => {
        if (!user) {
            toast.info("Please log in to save programs");
            return;
        }
        setIsFavorite(!isFavorite);
        toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
    };

    const shareProgram = () => {
        if (navigator.share) {
            navigator.share({
                title: `${school?.course} - ${school?.university}`,
                text: `Check out this program: ${school?.course} at ${school?.university}`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Program link copied to clipboard!");
        }
    };

    if (isLoading) return <LoadingComTwo />;
    if (isError) return <h2 className="">{error?.message}</h2>;

    const programStats = [
        { icon: FaUsers, label: "Program Duration", value: school?.duration || "4 years" },
        { icon: FaLanguage, label: "Language", value: school?.language || "English" },
        { icon: FaAward, label: "Degree Level", value: school?.schoolStatus },
        { icon: FaBook, label: "Course Type", value: school?.courseType }
    ];

    return (
        <>
            <Navbar />
            <Wrapper>
                {/* Enhanced Hero Section */}
                <HeroSection>
                    <div className="hero-overlay"></div>
                    <div className="hero-content">
                        <div className="hero-header">
                            <div className="course-info">
                                <div className="university-badge">
                                    <FaUniversity className="icon" />
                                    <span>Top Ranked University</span>
                                </div>
                                <h1 className="course-title">{school?.course}</h1>
                                <div className="university">
                                    <span>{school?.university}</span>
                                </div>
                                <div className="location">
                                    <FaMapMarkerAlt className="icon" />
                                    <span>{school?.location}</span>
                                </div>
                            </div>
                            <div className="hero-actions">
                                <button 
                                    className="action-btn favorite"
                                    onClick={handleFavoriteClick}
                                >
                                    {isFavorite ? <FaHeart /> : <FaRegHeart />}
                                    {isFavorite ? "Saved" : "Save"}
                                </button>
                                <button 
                                    className="action-btn share"
                                    onClick={shareProgram}
                                >
                                    <FaShareAlt />
                                    Share
                                </button>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="stats-grid">
                            {programStats.map((stat, index) => (
                                <div key={index} className="stat-item">
                                    <stat.icon className="stat-icon" />
                                    <div className="stat-content">
                                        <div className="stat-value">{stat.value}</div>
                                        <div className="stat-label">{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </HeroSection>

                {/* Main Content */}
                <div className="main-content">
                    {/* Left Column - Description */}
                    <div className="left-column">
                        {/* Program Highlights */}
                        <div className="content-card">
                            <h2 className="section-title">
                                <span className="title-icon">🚀</span>
                                Program Highlights
                            </h2>
                            <div className="highlights-grid">
                                <div className="highlight-item">
                                    <FaAward className="highlight-icon" />
                                    <span>Internationally Recognized Degree</span>
                                </div>
                                <div className="highlight-item">
                                    <FaUsers className="highlight-icon" />
                                    <span>Industry Connections</span>
                                </div>
                                <div className="highlight-item">
                                    <FaGlobeAmericas className="highlight-icon" />
                                    <span>Global Alumni Network</span>
                                </div>
                                <div className="highlight-item">
                                    <FaBook className="highlight-icon" />
                                    <span>Research Opportunities</span>
                                </div>
                            </div>
                        </div>

                        {/* Program Description */}
                        <div className="content-card">
                            <h2 className="section-title">
                                <span className="title-icon">📝</span>
                                Program Description
                            </h2>
                            <p className="description">{school?.description}</p>
                        </div>

                        {/* Admission Details Accordion */}
                        <div className="content-card accordion">
                            <div 
                                className="accordion-header" 
                                onClick={() => setShowAdmissionDetails(!showAdmissionDetails)}
                            >
                                <h2 className="section-title">
                                    <span className="title-icon">🎓</span>
                                    Admission Details
                                </h2>
                                {showAdmissionDetails ? <FaChevronUp /> : <FaChevronDown />}
                            </div>
                            {showAdmissionDetails && (
                                <div className="accordion-content">
                                    <div className="admission-grid">
                                        <div className="admission-item">
                                            <FaClock className="admission-icon" />
                                            <div>
                                                <h3>Application Deadline</h3>
                                                <p>{deadlineDate}</p>
                                            </div>
                                        </div>
                                        <div className="admission-item">
                                            <FaCalendarAlt className="admission-icon" />
                                            <div>
                                                <h3>Intake Period</h3>
                                                <p>Fall 2024 / Spring 2025</p>
                                            </div>
                                        </div>
                                        <div className="admission-item">
                                            <FaMoneyBillWave className="admission-icon" />
                                            <div>
                                                <h3>Application Fee</h3>
                                                <p>$75 - $150</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Requirements Accordion */}
                        <div className="content-card accordion">
                            <div 
                                className="accordion-header" 
                                onClick={() => setShowRequirements(!showRequirements)}
                            >
                                <h2 className="section-title">
                                    <span className="title-icon">📋</span>
                                    Admission Requirements
                                </h2>
                                {showRequirements ? <FaChevronUp /> : <FaChevronDown />}
                            </div>
                            {showRequirements && (
                                <div className="accordion-content">
                                    <ul className="requirements-list">
                                        {school?.requirements?.map((requirement, index) => (
                                            <li key={index}>
                                                <span className="bullet">•</span>
                                                {requirement}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Facilities Accordion */}
                        <div className="content-card accordion">
                            <div 
                                className="accordion-header" 
                                onClick={() => setShowFacilities(!showFacilities)}
                            >
                                <h2 className="section-title">
                                    <span className="title-icon">🏫</span>
                                    Campus Facilities
                                </h2>
                                {showFacilities ? <FaChevronUp /> : <FaChevronDown />}
                            </div>
                            {showFacilities && (
                                <div className="accordion-content">
                                    <ul className="facilities-list">
                                        {school?.facilities?.map((facility, index) => (
                                            <li key={index}>
                                                <span className="bullet">•</span>
                                                {facility}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Key Info & CTA */}
                    <div className="right-column">
                        <div className="info-card">
                            <div className="price-section">
                                <div className="tuition-amount">
                                    ${school?.tuition}
                                </div>
                                <div className="tuition-label">Annual Tuition</div>
                                <div className="scholarship-badge">
                                    <FaAward className="scholarship-icon" />
                                    Scholarships Available
                                </div>
                            </div>

                            <div className="info-section">
                                <h3 className="info-section-title">Key Information</h3>
                                <div className="info-item">
                                    <FaMapMarkerAlt className="info-icon" />
                                    <div>
                                        <h3>Location</h3>
                                        <p>{school?.location}</p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <FaGraduationCap className="info-icon" />
                                    <div>
                                        <h3>Degree Type</h3>
                                        <p>{school?.schoolStatus}</p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <FaCalendarAlt className="info-icon" />
                                    <div>
                                        <h3>Date Posted</h3>
                                        <p>{postedDate}</p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <FaMoneyBillWave className="info-icon" />
                                    <div>
                                        <h3>Scholarship</h3>
                                        <p>{school?.scholarship || "Available for qualified students"}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="apply-section">
                                <button 
                                    className="apply-button primary"
                                    onClick={handleApplyClick}
                                >
                                    Apply Now
                                </button>
                                
                                {showLoginPrompt && !user && (
                                    <p className="login-prompt">
                                        Please <Link to="/login">login</Link> or <Link to="/register">sign up</Link> to apply
                                    </p>
                                )}

                                <button className="apply-button secondary">
                                    Request Information
                                </button>

                                <div className="contact-info">
                                    <p>Need help? Contact admissions:</p>
                                    <p className="contact-detail">{school?.contact}</p>
                                </div>
                            </div>
                        </div>

                        {/* University Ranking Card */}
                        <div className="ranking-card">
                            <h3>University Ranking</h3>
                            <div className="ranking-content">
                                <FaStar className="ranking-icon" />
                                <div className="ranking-details">
                                    <div className="ranking-position">Top 100</div>
                                    <div className="ranking-source">Global University Rankings</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
            <ApplicationModal />
        </>
    );
};

// Styled Components
const Wrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    font-family: 'Inter', sans-serif;
    color: #2c3e50;

    .main-content {
        display: flex;
        gap: 30px;
        margin-top: 30px;

        @media (max-width: 768px) {
            flex-direction: column;
        }
    }

    .left-column {
        flex: 2;
    }

    .right-column {
        flex: 1;
    }

    .content-card {
        background: white;
        border-radius: 16px;
        padding: 30px;
        margin-bottom: 25px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        border: 1px solid #f1f5f9;
        
        &.accordion {
            padding: 0;
            overflow: hidden;
        }
    }

    .accordion-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 25px 30px;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
            background-color: #f8fafc;
        }

        svg {
            color: #2d8cd4;
            transition: transform 0.2s;
        }
    }

    .accordion-content {
        padding: 0 30px 25px;
    }

    .section-title {
        font-size: 1.4rem;
        color: #1e293b;
        margin: 0;
        display: flex;
        align-items: center;
        font-weight: 600;

        .title-icon {
            margin-right: 12px;
            font-size: 1.3rem;
        }
    }

    .description {
        font-size: 1.05rem;
        line-height: 1.7;
        color: #475569;
        margin-top: 15px;
    }

    .highlights-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        margin-top: 20px;
    }

    .highlight-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        background: #f8fafc;
        border-radius: 8px;
        font-weight: 500;
        color: #475569;

        .highlight-icon {
            color: #2d8cd4;
            font-size: 1.1rem;
        }
    }

    .admission-grid {
        display: grid;
        gap: 20px;
        margin-top: 15px;
    }

    .admission-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px;
        background: #f8fafc;
        border-radius: 8px;

        .admission-icon {
            color: #2d8cd4;
            font-size: 1.2rem;
        }

        h3 {
            font-size: 0.9rem;
            color: #64748b;
            margin: 0 0 4px 0;
            font-weight: 600;
        }

        p {
            font-size: 1rem;
            color: #1e293b;
            margin: 0;
            font-weight: 500;
        }
    }

    .requirements-list,
    .facilities-list {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
            padding: 12px 0;
            display: flex;
            align-items: flex-start;
            font-size: 1.05rem;
            color: #475569;
            line-height: 1.6;
            border-bottom: 1px solid #f1f5f9;

            &:last-child {
                border-bottom: none;
            }

            .bullet {
                color: #2d8cd4;
                margin-right: 12px;
                font-weight: bold;
                font-size: 1.2rem;
            }
        }
    }

    .info-card {
        background: white;
        border-radius: 16px;
        padding: 30px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        border: 1px solid #f1f5f9;
        position: sticky;
        top: 20px;
    }

    .price-section {
        text-align: center;
        padding-bottom: 25px;
        border-bottom: 1px solid #f1f5f9;
        margin-bottom: 25px;

        .tuition-amount {
            font-size: 2.5rem;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 8px;
        }

        .tuition-label {
            font-size: 1rem;
            color: #64748b;
            margin-bottom: 15px;
        }

        .scholarship-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #dcfce7;
            color: #166534;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 600;

            .scholarship-icon {
                font-size: 0.8rem;
            }
        }
    }

    .info-section {
        margin-bottom: 25px;

        .info-section-title {
            font-size: 1.1rem;
            color: #1e293b;
            margin-bottom: 20px;
            font-weight: 600;
        }
    }

    .info-item {
        display: flex;
        margin-bottom: 20px;
        align-items: flex-start;

        .info-icon {
            color: #2d8cd4;
            font-size: 1.1rem;
            margin-right: 15px;
            margin-top: 3px;
        }

        h3 {
            font-size: 0.9rem;
            color: #64748b;
            margin: 0 0 5px 0;
            font-weight: 600;
        }

        p {
            font-size: 1rem;
            color: #1e293b;
            margin: 0;
            font-weight: 500;
        }
    }

    .apply-section {
        .apply-button {
            width: 100%;
            padding: 15px;
            border: none;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            margin-bottom: 12px;

            &.primary {
                background: linear-gradient(135deg, #2d8cd4, #1a5f8b);
                color: white;

                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(45, 140, 212, 0.3);
                }
            }

            &.secondary {
                background: white;
                color: #2d8cd4;
                border: 2px solid #2d8cd4;

                &:hover {
                    background: #f8fafc;
                }
            }
        }

        .login-prompt {
            color: #dc2626;
            font-size: 0.9rem;
            margin-bottom: 15px;
            text-align: center;
            
            a {
                color: #2d8cd4;
                text-decoration: underline;
                margin: 0 4px;
                font-weight: 600;
            }
        }

        .contact-info {
            text-align: center;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #f1f5f9;

            p {
                font-size: 0.9rem;
                color: #64748b;
                margin: 0 0 8px 0;
            }

            .contact-detail {
                color: #2d8cd4;
                font-weight: 600;
                font-size: 1rem;
            }
        }
    }

    .ranking-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 16px;
        padding: 25px;
        margin-top: 20px;

        h3 {
            margin: 0 0 15px 0;
            font-size: 1.1rem;
            font-weight: 600;
        }

        .ranking-content {
            display: flex;
            align-items: center;
            gap: 15px;

            .ranking-icon {
                font-size: 2rem;
                color: #fbbf24;
            }

            .ranking-details {
                .ranking-position {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 4px;
                }

                .ranking-source {
                    font-size: 0.9rem;
                    opacity: 0.9;
                }
            }
        }
    }
`;

const HeroSection = styled.section`
    position: relative;
    margin-top: 20px;
    border-radius: 16px;
    overflow: hidden;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

    .hero-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        z-index: 1;
    }

    .hero-content {
        position: relative;
        z-index: 2;
        padding: 50px 40px;
        color: white;
    }

    .hero-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 40px;

        @media (max-width: 768px) {
            flex-direction: column;
            gap: 20px;
        }
    }

    .course-info {
        flex: 1;

        .university-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(255, 255, 255, 0.2);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 500;
            margin-bottom: 20px;

            .icon {
                font-size: 0.8rem;
            }
        }

        .course-title {
            font-size: 3rem;
            font-weight: 700;
            margin: 0 0 15px 0;
            line-height: 1.1;

            @media (max-width: 768px) {
                font-size: 2.2rem;
            }
        }

        .university {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 10px;
            opacity: 0.95;

            @media (max-width: 768px) {
                font-size: 1.3rem;
            }
        }

        .location {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 1.1rem;
            opacity: 0.9;

            .icon {
                font-size: 1rem;
            }
        }
    }

    .hero-actions {
        display: flex;
        gap: 12px;

        .action-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.3);
            padding: 10px 16px;
            border-radius: 8px;
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: translateY(-1px);
            }

            &.favorite {
                color: #fbbf24;
            }
        }
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 20px;

        .stat-item {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 20px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            backdrop-filter: blur(10px);

            .stat-icon {
                font-size: 1.5rem;
                color: #60a5fa;
            }

            .stat-content {
                .stat-value {
                    font-size: 1.2rem;
                    font-weight: 600;
                    margin-bottom: 4px;
                }

                .stat-label {
                    font-size: 0.9rem;
                    opacity: 0.8;
                }
            }
        }
    }
`;

export default School;






































// import React, { useState } from "react";
// import styled from "styled-components";
// import { useParams, Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { getSingleHandler } from "../utils/FetchHandlers";
// import LoadingComTwo from "../components/shared/LoadingComTwo";
// import { FaUniversity, FaCalendarAlt, FaMoneyBillWave, FaGraduationCap, FaMapMarkerAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
// import Navbar from "../components/shared/Navbar";
// import { useApplicationContext } from "../context/ApplicationContext";
// import { useUserContext } from "../context/UserContext";
// import ApplicationModal from "../components/shared/ApplicationModal";
// import dayjs from "dayjs";
// import advancedFormat from "dayjs/plugin/advancedFormat";
// import { toast } from "react-toastify";

// dayjs.extend(advancedFormat);

// const School = () => {
//     const { id } = useParams();
//     const { user } = useUserContext();
//     const { data: school, isLoading, isError, error } = useQuery({
//         queryKey: ["school", id],
//         queryFn: () => getSingleHandler(`${import.meta.env.VITE_API_BASE_URL}/schools/${id}`),
//     });

//     const [showRequirements, setShowRequirements] = useState(true);
//     const [showFacilities, setShowFacilities] = useState(true);
//     const [showLoginPrompt, setShowLoginPrompt] = useState(false);
//     const { openApplicationModal } = useApplicationContext();
//     const deadlineDate = dayjs(school?.applicationDeadline).format("MMMM D, YYYY");
//     const postedDate = dayjs(school?.createdAt).format("MMMM D, YYYY");

//     const handleApplyClick = () => {
//         if (!user) {
//             toast.info("Please log in to apply for this program");
//             setShowLoginPrompt(true);
//             return;
//         }
//         if (user.role === "user") {
//             openApplicationModal(school._id);
//         } else {
//             toast.warning("Only regular users can apply for programs");
//         }
//     };

//     if (isLoading) return <LoadingComTwo />;
//     if (isError) return <h2 className="">{error?.message}</h2>;

//     return (
//         <>
//             <Navbar />
//             <Wrapper>
//                 {/* Hero Section with Image Background */}
//                 <HeroSection>
//                     <div className="hero-overlay"></div>
//                     <div className="hero-content">
//                         <div className="course-info">
//                             <h1 className="course-title">{school?.course}</h1>
//                             <div className="university">
//                                 <FaUniversity className="icon" />
//                                 <span>{school?.university}</span>
//                             </div>
//                         </div>
//                     </div>
//                 </HeroSection>

//                 {/* Main Content */}
//                 <div className="main-content">
//                     {/* Left Column - Description */}
//                     <div className="left-column">
//                         <div className="content-card">
//                             <h2 className="section-title">
//                                 <span className="title-icon">📝</span>
//                                 Program Description
//                             </h2>
//                             <p className="description">{school?.description}</p>
//                         </div>

//                         {/* Requirements Accordion */}
//                         <div className="content-card accordion">
//                             <div 
//                                 className="accordion-header" 
//                                 onClick={() => setShowRequirements(!showRequirements)}
//                             >
//                                 <h2 className="section-title">
//                                     <span className="title-icon">📋</span>
//                                     Requirements
//                                 </h2>
//                                 {showRequirements ? <FaChevronUp /> : <FaChevronDown />}
//                             </div>
//                             {showRequirements && (
//                                 <ul className="requirements-list">
//                                     {school?.requirements?.map((requirement, index) => (
//                                         <li key={index}>
//                                             <span className="bullet">•</span>
//                                             {requirement}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             )}
//                         </div>

//                         {/* Facilities Accordion */}
//                         <div className="content-card accordion">
//                             <div 
//                                 className="accordion-header" 
//                                 onClick={() => setShowFacilities(!showFacilities)}
//                             >
//                                 <h2 className="section-title">
//                                     <span className="title-icon">🏫</span>
//                                     Facilities
//                                 </h2>
//                                 {showFacilities ? <FaChevronUp /> : <FaChevronDown />}
//                             </div>
//                             {showFacilities && (
//                                 <ul className="facilities-list">
//                                     {school?.facilities?.map((facility, index) => (
//                                         <li key={index}>
//                                             <span className="bullet">•</span>
//                                             {facility}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             )}
//                         </div>
//                     </div>

//                     {/* Right Column - Key Info */}
//                     <div className="right-column">
//                         <div className="info-card">
//                             <div className="info-item">
//                                 <FaMapMarkerAlt className="info-icon" />
//                                 <div>
//                                     <h3>Location</h3>
//                                     <p>{school?.location}</p>
//                                 </div>
//                             </div>

//                             <div className="info-item">
//                                 <FaGraduationCap className="info-icon" />
//                                 <div>
//                                     <h3>Degree Type</h3>
//                                     <p>{school?.schoolStatus}</p>
//                                 </div>
//                             </div>

//                             <div className="info-item">
//                                 <FaCalendarAlt className="info-icon" />
//                                 <div>
//                                     <h3>Date Uploaded</h3>
//                                     <p>{deadlineDate}</p>
//                                 </div>
//                             </div>

//                             <div className="info-item">
//                                 <FaMoneyBillWave className="info-icon" />
//                                 <div>
//                                     <h3>Tuition</h3>
//                                     <p>{school?.tuition} USD</p>
//                                 </div>
//                             </div>

//                             <div className="info-item">
//                                 <FaMoneyBillWave className="info-icon" />
//                                 <div>
//                                     <h3>Scholarship Availability</h3>
//                                     <p>{school?.scholarship || "Available for qualified students"}</p>
//                                 </div>
//                             </div>

//                             <div className="apply-section">
//                                 <button 
//                                     className="apply-button"
//                                     onClick={handleApplyClick}
//                                 >
//                                     Apply Now
//                                 </button>
//                                 {showLoginPrompt && !user && (
//                                     <p className="login-prompt">
//                                         Please <Link to="/login">login</Link> or <Link to="/register">sign up</Link> to apply
//                                     </p>
//                                 )}
//                                 <p className="contact-info">
//                                     Contact: <span>{school?.contact}</span>
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </Wrapper>
//             <ApplicationModal />
//         </>
//     );
// };

// // Styled Components
// const Wrapper = styled.div`
//     max-width: 1200px;
//     margin: 0 auto;
//     padding: 0 20px;
//     font-family: 'Poppins', sans-serif;
//     color: #2c3e50;

//     .main-content {
//         display: flex;
//         gap: 30px;
//         margin-top: 30px;

//         @media (max-width: 768px) {
//             flex-direction: column;
//         }
//     }

//     .left-column {
//         flex: 2;
//     }

//     .right-column {
//         flex: 1;
//     }

//     .content-card {
//         background: white;
//         border-radius: 12px;
//         padding: 25px;
//         margin-bottom: 25px;
//         box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        
//         &.accordion {
//             padding: 0;
//             overflow: hidden;
//         }
//     }

//     .accordion-header {
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         padding: 25px;
//         cursor: pointer;
//         transition: background-color 0.2s;

//         &:hover {
//             background-color: #f8f9fa;
//         }

//         svg {
//             color: #2d8cd4;
//         }
//     }

//     .section-title {
//         font-size: 1.4rem;
//         color: #2c3e50;
//         margin: 0;
//         display: flex;
//         align-items: center;
//         font-weight: 600;

//         .title-icon {
//             margin-right: 10px;
//             font-size: 1.3rem;
//         }
//     }

//     .description {
//         font-size: 1.05rem;
//         line-height: 1.7;
//         color: #4a5568;
//         margin-top: 15px;
//     }

//     .requirements-list,
//     .facilities-list {
//         list-style: none;
//         padding: 0 25px 25px;
//         margin: 0;

//         li {
//             padding: 8px 0;
//             display: flex;
//             align-items: flex-start;
//             font-size: 1.05rem;
//             color: #4a5568;
//             line-height: 1.6;

//             .bullet {
//                 color: #2d8cd4;
//                 margin-right: 10px;
//                 font-weight: bold;
//             }
//         }
//     }

//     .info-card {
//         background: white;
//         border-radius: 12px;
//         padding: 25px;
//         box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
//         position: sticky;
//         top: 20px;
//     }

//     .info-item {
//         display: flex;
//         margin-bottom: 20px;
//         align-items: flex-start;

//         .info-icon {
//             color: #2d8cd4;
//             font-size: 1.2rem;
//             margin-right: 15px;
//             margin-top: 3px;
//         }

//         h3 {
//             font-size: 0.95rem;
//             color: #718096;
//             margin: 0 0 5px 0;
//             font-weight: 600;
//         }

//         p {
//             font-size: 1.1rem;
//             color: #2d3748;
//             margin: 0;
//             font-weight: 500;
//         }
//     }

//     .apply-section {
//         margin-top: 30px;
//         text-align: center;

//         .apply-button {
//             background: #2d8cd4;
//             color: white;
//             border: none;
//             padding: 12px 25px;
//             font-size: 1rem;
//             font-weight: 600;
//             border-radius: 8px;
//             cursor: pointer;
//             transition: all 0.2s;
//             width: 100%;
//             margin-bottom: 15px;

//             &:hover {
//                 background: #1a5f8b;
//                 transform: translateY(-2px);
//             }
//         }

//         .login-prompt {
//             color: #e53e3e;
//             font-size: 0.9rem;
//             margin-bottom: 15px;
//             text-align: center;
            
//             a {
//                 color: #2d8cd4;
//                 text-decoration: underline;
//                 margin: 0 4px;
//             }
//         }

//         .contact-info {
//             font-size: 0.95rem;
//             color: #4a5568;
//             margin: 0;

//             span {
//                 color: #2d8cd4;
//                 font-weight: 500;
//             }
//         }
//     }
// `;

// const HeroSection = styled.section`
//     position: relative;
//     height: 300px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     text-align: center;
//     margin-top: 20px;
//     border-radius: 12px;
//     overflow: hidden;

//     &::before {
//         content: '';
//         position: absolute;
//         top: 0;
//         left: 0;
//         right: 0;
//         bottom: 0;
//         background: url('/webback.jpg') center/cover no-repeat;
//         z-index: -2;
//     }

//     .hero-overlay {
//         position: absolute;
//         top: 0;
//         left: 0;
//         right: 0;
//         bottom: 0;
//         background: rgba(0, 0, 0, 0.6);
//         z-index: -1;
//     }

//     .hero-content {
//         z-index: 1;
//         width: 100%;
//         max-width: 800px;
//         padding: 0 20px;
//     }

//     .course-info {
//         color: white;
//     }

//     .course-title {
//         font-size: 2.5rem;
//         font-weight: 700;
//         margin: 0 0 10px 0;
//         line-height: 1.2;

//         @media (max-width: 768px) {
//             font-size: 2rem;
//         }
//     }

//     .university {
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         font-size: 1.4rem;
//         font-weight: 500;
//         opacity: 0.9;

//         .icon {
//             margin-right: 10px;
//             font-size: 1.3rem;
//         }

//         @media (max-width: 768px) {
//             font-size: 1.2rem;
//         }
//     }
// `;

// export default School;

















// // import React from "react";
// // import styled from "styled-components";
// // import { useParams } from "react-router-dom";
// // import { useQuery } from "@tanstack/react-query";
// // import { getSingleHandler } from "../utils/FetchHandlers";
// // import LoadingComTwo from "../components/shared/LoadingComTwo";

// // import advancedFormat from "dayjs/plugin/advancedFormat";
// // import dayjs from "dayjs";
// // dayjs.extend(advancedFormat);

// // import { MdAccessTime } from "react-icons/md";
// // import Navbar from "../components/shared/Navbar";

// // const School = () => {
// //     const { id } = useParams();
// //     const {
// //         isLoading,
// //         isError,
// //         data: school,
// //         error,
// //     } = useQuery({
// //         queryKey: ["school", id],

// //         queryFn: () => getSingleHandler(`${import.meta.env.VITE_API_BASE_URL}/schools/${id}`),

// //     });

// //     const date = dayjs(school?.applicationDeadline).format("MMM Do, YYYY");

// //     if (isLoading) {
// //         return <LoadingComTwo />;
// //     }
// //     if (isError) {
// //         return <h2 className="">{error?.message}</h2>;
// //     }

// //     return (
// //         <>
// //             <Navbar />
// //             <Wrapper>
// //                 <div className="top-row">
// //                     <h2 className="title">
// //                         <span className="capitalize">Course: </span>
// //                         {school?.course}
// //                     </h2>
// //                     <h4 className="university">
// //                         <span className="fancy">By: </span>
// //                         {school?.university}
// //                     </h4>
// //                     <h4 className="post-date">
// //                         <MdAccessTime className="text-lg mr-1" />
// //                         {dayjs(school?.createdAt).format("MMM Do, YYYY")}
// //                     </h4>
// //                 </div>
// //                 <div className="middle-row">
// //                     <div className="description">
// //                         <h3 className="sec-title">Description</h3>
// //                         <p>{school?.courseDescription}</p>
// //                     </div>
// //                     <h4 className="deadline">
// //                         Application Deadline: <span>{date}</span>
// //                     </h4>
// //                     <h4 className="vacancy">
// //                         Open Applications: <span>{school?.applicationsRequired}</span>
// //                     </h4>
// //                     <div className="requirement">
// //                         <h3 className="sec-title">Requirements</h3>
// //                         <ul>
// //                             {school?.requirements?.map((requirement) => (
// //                                 <li key={requirement}>{requirement}</li>
// //                             ))}
// //                         </ul>
// //                     </div>
// //                     <div className="facility">
// //                         <h3 className="sec-title">Facilities</h3>
// //                         <ul>
// //                             {school?.facilities?.map((facility) => (
// //                                 <li key={facility}>{facility}</li>
// //                             ))}
// //                         </ul>
// //                     </div>
// //                     <h4 className="tuition">
// //                         Tuition: <span>{school?.tuition} USD</span>
// //                     </h4>
// //                     {/* <div className="apply">
// //                         <h3 className="sec-title">To Apply</h3>
// //                         <p className="intro">Send your CV/Resume</p>
// //                         <p className="info">Email: {school?.contact}</p>
// //                     </div> */}

// //                     <div className="apply">
// //                         <h3 className="sec-title">To Apply</h3>
// //                         <p className="intro">Send your CV/Resume</p>
// //                         <p className="info">Email: {school?.contact}</p>
// //                         <a href={`mailto:${school?.contact}`} className="apply-button">
// //                             Apply Now
// //                         </a>
// //                     </div>
// //                 </div>
// //             </Wrapper>
// //         </>
// //     );
// // };






// // // const Wrapper = styled.section`
// // //     padding: 2rem 0;
// // //     max-width: 1000px;
// // //     margin: 0 auto;
// // //     margin-bottom: calc(20px + 1vw);
// // //     width: 100%;

// // //     .top-row {
// // //         margin-bottom: calc(30px + 1vw);
// // //     }
// // //     .top-row .title {
// // //         font-size: calc(14px + 1vw);
// // //         text-align: center;
// // //     }
// // //     .top-row .company {
// // //         font-size: calc(11px + 0.35vw);
// // //         text-align: center;
// // //         text-transform: capitalize;
// // //         font-weight: 600;
// // //         margin-top: 4px;
// // //         opacity: 0.75;
// // //     }
// // //     .top-row .post-date {
// // //         font-size: 11px;
// // //         font-weight: 600;
// // //         text-transform: capitalize;
// // //         text-align: center;
// // //         opacity: 0.75;
// // //         margin-top: 8px;
// // //         display: flex;
// // //         justify-content: center;
// // //         align-items: center;
// // //     }
// // //     .middle-row .description h3 {
// // //         font-size: calc(14px + 0.15vw);
// // //         font-weight: 600;
// // //         text-transform: capitalize;
// // //         opacity: 0.8;
// // //         text-decoration: underline;
// // //     }
// // //     .middle-row .description p {
// // //         margin-top: 6px;
// // //         font-size: calc(12px + 0.15vw);
// // //         font-weight: 400;
// // //         opacity: 0.95;
// // //         text-align: justify;
// // //         line-height: 23px;
// // //     }
// // //     .middle-row .deadline {
// // //         font-size: calc(13px + 0.1vw);
// // //         font-weight: 600;
// // //         opacity: 0.8;
// // //         margin-top: calc(10px + 0.3vw);
// // //     }
// // //     .middle-row .vacancy {
// // //         font-size: calc(13px + 0.1vw);
// // //         font-weight: 600;
// // //         opacity: 0.8;
// // //         margin-top: 4px;
// // //         margin-bottom: calc(10px + 0.3vw);
// // //     }
// // //     .middle-row .requirement {
// // //         margin-bottom: calc(10px + 0.3vw);
// // //     }
// // //     .middle-row .requirement .sec-title {
// // //         font-size: calc(14px + 0.15vw);
// // //         font-weight: 600;
// // //         text-transform: capitalize;
// // //         opacity: 0.8;
// // //         text-decoration: underline;
// // //     }
// // //     .middle-row .requirement p {
// // //         margin-top: 6px;
// // //         font-size: calc(12px + 0.15vw);
// // //         font-weight: 400;
// // //         opacity: 0.95;
// // //         text-align: justify;
// // //         line-height: 23px;
// // //     }
// // //     .middle-row .requirement ul {
// // //         margin-top: 6px;
// // //         list-style: circle;
// // //         margin-left: calc(30px + 0.5vw);
// // //     }
// // //     .middle-row .requirement ul li {
// // //         font-size: calc(12px + 0.15vw);
// // //         font-weight: 400;
// // //         opacity: 0.95;
// // //         text-transform: capitalize;
// // //         padding: 2px 0;
// // //     }

// // //     .middle-row .facility .sec-title {
// // //         font-size: calc(14px + 0.15vw);
// // //         font-weight: 600;
// // //         text-transform: capitalize;
// // //         opacity: 0.8;
// // //         text-decoration: underline;
// // //     }
// // //     .middle-row .facility {
// // //         margin-bottom: calc(10px + 0.3vw);
// // //     }
// // //     .middle-row .facility p {
// // //         margin-top: 6px;
// // //         font-size: calc(12px + 0.15vw);
// // //         font-weight: 400;
// // //         opacity: 0.95;
// // //         text-align: justify;
// // //         line-height: 23px;
// // //     }
// // //     .middle-row .facility ul {
// // //         margin-top: 6px;
// // //         list-style: circle;
// // //         margin-left: calc(30px + 0.5vw);
// // //     }
// // //     .middle-row .facility ul li {
// // //         font-size: calc(12px + 0.15vw);
// // //         font-weight: 400;
// // //         opacity: 0.95;
// // //         text-transform: capitalize;
// // //         padding: 2px 0;
// // //     }
// // //     .middle-row .salary {
// // //         font-size: calc(14px + 0.1vw);
// // //         font-weight: 600;
// // //         opacity: 0.85;
// // //         margin-bottom: calc(10px + 0.3vw);
// // //     }
// // //     .middle-row .apply h3 {
// // //         font-size: calc(14px + 0.15vw);
// // //         font-weight: 600;
// // //         text-transform: capitalize;
// // //         opacity: 0.8;
// // //         text-decoration: underline;
// // //     }
// // //     .middle-row .apply p {
// // //         margin-top: 6px;
// // //         font-size: calc(12px + 0.15vw);
// // //         font-weight: 400;
// // //         opacity: 0.95;
// // //     }
// // //     .middle-row .apply p.intro {
// // //         text-transform: capitalize;
// // //     }
// // //     .middle-row .apply p.info {
// // //         font-weight: 600;
// // //         opacity: 0.8;
// // //     }
// // // `;


// // const Wrapper = styled.section`
// //     padding: 2rem 1rem;
// //     max-width: 1000px;
// //     margin: 0 auto;
// //     margin-bottom: calc(20px + 1vw);
// //     width: 100%;
// //     font-family: 'Poppins', sans-serif;

// //     .top-row {
// //         margin-bottom: calc(30px + 1vw);
// //         text-align: center;
// //         background: linear-gradient(135deg, #6a11cb, #2575fc);
// //         padding: 2rem;
// //         border-radius: 12px;
// //         color: white;
// //         box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// //     }
// //     .top-row .title {
// //         font-size: calc(20px + 1vw);
// //         font-weight: 600;
// //         margin-bottom: 0.5rem;
// //     }
// //     .top-row .university {
// //         font-size: calc(14px + 0.5vw);
// //         font-weight: 500;
// //         opacity: 0.9;
// //     }
// //     .top-row .post-date {
// //         font-size: 14px;
// //         font-weight: 500;
// //         opacity: 0.8;
// //         margin-top: 8px;
// //         display: flex;
// //         justify-content: center;
// //         align-items: center;
// //     }

// //     .middle-row {
// //         background: white;
// //         padding: 2rem;
// //         border-radius: 12px;
// //         box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// //         margin-top: 2rem;
// //     }
// //     .middle-row .description h3 {
// //         font-size: calc(18px + 0.15vw);
// //         font-weight: 600;
// //         color: #333;
// //         margin-bottom: 1rem;
// //     }
// //     .middle-row .description p {
// //         font-size: calc(14px + 0.15vw);
// //         line-height: 1.6;
// //         color: #555;
// //     }
// //     .middle-row .deadline,
// //     .middle-row .vacancy,
// //     .middle-row .tuition {
// //         font-size: calc(16px + 0.1vw);
// //         font-weight: 600;
// //         color: #333;
// //         margin: 1.5rem 0;
// //     }
// //     .middle-row .deadline span,
// //     .middle-row .vacancy span,
// //     .middle-row .tuition span {
// //         color: #2575fc;
// //     }
// //     .middle-row .requirement,
// //     .middle-row .facility {
// //         margin-bottom: 2rem;
// //     }
// //     .middle-row .requirement h3,
// //     .middle-row .facility h3 {
// //         font-size: calc(18px + 0.15vw);
// //         font-weight: 600;
// //         color: #333;
// //         margin-bottom: 1rem;
// //     }
// //     .middle-row .requirement ul,
// //     .middle-row .facility ul {
// //         list-style: none;
// //         padding-left: 1.5rem;
// //     }
// //     .middle-row .requirement ul li,
// //     .middle-row .facility ul li {
// //         font-size: calc(14px + 0.15vw);
// //         color: #555;
// //         margin-bottom: 0.5rem;
// //         position: relative;
// //     }
// //     .middle-row .requirement ul li::before,
// //     .middle-row .facility ul li::before {
// //         content: "•";
// //         color: #2575fc;
// //         font-size: 1.2rem;
// //         position: absolute;
// //         left: -1.5rem;
// //         top: 50%;
// //         transform: translateY(-50%);
// //     }
// //     .middle-row .apply {
// //         margin-top: 2rem;
// //     }
// //     .middle-row .apply h3 {
// //         font-size: calc(18px + 0.15vw);
// //         font-weight: 600;
// //         color: #333;
// //         margin-bottom: 1rem;
// //     }
// //     .middle-row .apply p {
// //         font-size: calc(14px + 0.15vw);
// //         color: #555;
// //         margin-bottom: 0.5rem;
// //     }
// //     .middle-row .apply p.info {
// //         font-weight: 600;
// //         color: #2575fc;
// //     }

// //     .apply-button {
// //     display: inline-block;
// //     margin-top: 1rem;
// //     padding: 0.75rem 1.5rem;
// //     background: linear-gradient(135deg, #6a11cb, #2575fc);
// //     color: white;
// //     text-decoration: none;
// //     border-radius: 8px;
// //     font-weight: 600;
// //     transition: transform 0.2s, box-shadow 0.2s;
// //     }
// //     .apply-button:hover {
// //         transform: translateY(-2px);
// //         box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
// //     }
// // `;

// // export default School;















// // import React from "react";
// // import styled from "styled-components";
// // import { useParams } from "react-router-dom";
// // import { useQuery } from "@tanstack/react-query";
// // import { getSingleHandler } from "../utils/FetchHandlers";
// // import LoadingComTwo from "../components/shared/LoadingComTwo";

// // import advancedFormat from "dayjs/plugin/advancedFormat";
// // import dayjs from "dayjs";
// // dayjs.extend(advancedFormat);

// // import { MdAccessTime } from "react-icons/md";
// // import Navbar from "../components/shared/Navbar";

// // const School = () => {
// //     const { id } = useParams();
// //     const {
// //         isLoading,
// //         isError,
// //         data: school,
// //         error,
// //     } = useQuery({
// //         queryKey: ["school", id],

// //         queryFn: () => getSingleHandler(`${import.meta.env.VITE_API_BASE_URL}/schools/${id}`),

// //     });

// //     const date = dayjs(school?.applicationDeadline).format("MMM Do, YYYY");

// //     if (isLoading) {
// //         return <LoadingComTwo />;
// //     }
// //     if (isError) {
// //         return <h2 className="">{error?.message}</h2>;
// //     }

// //     return (
// //         <>
// //             <Navbar />
// //             <Wrapper>
// //                 <div className="top-row">
// //                     <h2 className="title">
// //                         <span className="capitalize">Course: </span>
// //                         {school?.course}
// //                     </h2>
// //                     <h4 className="university">
// //                         <span className="fancy">By: </span>
// //                         {school?.university}
// //                     </h4>
// //                     <h4 className="post-date">
// //                         <MdAccessTime className="text-lg mr-1" />
// //                         {dayjs(school?.createdAt).format("MMM Do, YYYY")}
// //                     </h4>
// //                 </div>
// //                 <div className="middle-row">
// //                     <div className="description">
// //                         <h3 className="sec-title">Description</h3>
// //                         <p>{school?.courseDescription}</p>
// //                     </div>
// //                     <h4 className="deadline">
// //                         Application Deadline: <span>{date}</span>
// //                     </h4>
// //                     <h4 className="vacancy">
// //                         Open Applications: <span>{school?.applicationsRequired}</span>
// //                     </h4>
// //                     <div className="requirement">
// //                         <h3 className="sec-title">Requirements</h3>
// //                         <ul>
// //                             {school?.requirements?.map((requirement) => (
// //                                 <li key={requirement}>{requirement}</li>
// //                             ))}
// //                         </ul>
// //                     </div>
// //                     <div className="facility">
// //                         <h3 className="sec-title">Facilities</h3>
// //                         <ul>
// //                             {school?.facilities?.map((facility) => (
// //                                 <li key={facility}>{facility}</li>
// //                             ))}
// //                         </ul>
// //                     </div>
// //                     <h4 className="tuition">
// //                         Tuition: <span>{school?.tuition} USD</span>
// //                     </h4>
// //                     <div className="apply">
// //                         <h3 className="sec-title">To Apply</h3>
// //                         <p className="intro">Send your CV/Resume</p>
// //                         <p className="info">Email: {school?.contact}</p>
// //                     </div>
// //                 </div>
// //             </Wrapper>
// //         </>
// //     );
// // };






// // const Wrapper = styled.section`
// //     padding: 2rem 0;
// //     max-width: 1000px;
// //     margin: 0 auto;
// //     margin-bottom: calc(20px + 1vw);
// //     width: 100%;

// //     .top-row {
// //         margin-bottom: calc(30px + 1vw);
// //     }
// //     .top-row .title {
// //         font-size: calc(14px + 1vw);
// //         text-align: center;
// //     }
// //     .top-row .company {
// //         font-size: calc(11px + 0.35vw);
// //         text-align: center;
// //         text-transform: capitalize;
// //         font-weight: 600;
// //         margin-top: 4px;
// //         opacity: 0.75;
// //     }
// //     .top-row .post-date {
// //         font-size: 11px;
// //         font-weight: 600;
// //         text-transform: capitalize;
// //         text-align: center;
// //         opacity: 0.75;
// //         margin-top: 8px;
// //         display: flex;
// //         justify-content: center;
// //         align-items: center;
// //     }
// //     .middle-row .description h3 {
// //         font-size: calc(14px + 0.15vw);
// //         font-weight: 600;
// //         text-transform: capitalize;
// //         opacity: 0.8;
// //         text-decoration: underline;
// //     }
// //     .middle-row .description p {
// //         margin-top: 6px;
// //         font-size: calc(12px + 0.15vw);
// //         font-weight: 400;
// //         opacity: 0.95;
// //         text-align: justify;
// //         line-height: 23px;
// //     }
// //     .middle-row .deadline {
// //         font-size: calc(13px + 0.1vw);
// //         font-weight: 600;
// //         opacity: 0.8;
// //         margin-top: calc(10px + 0.3vw);
// //     }
// //     .middle-row .vacancy {
// //         font-size: calc(13px + 0.1vw);
// //         font-weight: 600;
// //         opacity: 0.8;
// //         margin-top: 4px;
// //         margin-bottom: calc(10px + 0.3vw);
// //     }
// //     .middle-row .requirement {
// //         margin-bottom: calc(10px + 0.3vw);
// //     }
// //     .middle-row .requirement .sec-title {
// //         font-size: calc(14px + 0.15vw);
// //         font-weight: 600;
// //         text-transform: capitalize;
// //         opacity: 0.8;
// //         text-decoration: underline;
// //     }
// //     .middle-row .requirement p {
// //         margin-top: 6px;
// //         font-size: calc(12px + 0.15vw);
// //         font-weight: 400;
// //         opacity: 0.95;
// //         text-align: justify;
// //         line-height: 23px;
// //     }
// //     .middle-row .requirement ul {
// //         margin-top: 6px;
// //         list-style: circle;
// //         margin-left: calc(30px + 0.5vw);
// //     }
// //     .middle-row .requirement ul li {
// //         font-size: calc(12px + 0.15vw);
// //         font-weight: 400;
// //         opacity: 0.95;
// //         text-transform: capitalize;
// //         padding: 2px 0;
// //     }

// //     .middle-row .facility .sec-title {
// //         font-size: calc(14px + 0.15vw);
// //         font-weight: 600;
// //         text-transform: capitalize;
// //         opacity: 0.8;
// //         text-decoration: underline;
// //     }
// //     .middle-row .facility {
// //         margin-bottom: calc(10px + 0.3vw);
// //     }
// //     .middle-row .facility p {
// //         margin-top: 6px;
// //         font-size: calc(12px + 0.15vw);
// //         font-weight: 400;
// //         opacity: 0.95;
// //         text-align: justify;
// //         line-height: 23px;
// //     }
// //     .middle-row .facility ul {
// //         margin-top: 6px;
// //         list-style: circle;
// //         margin-left: calc(30px + 0.5vw);
// //     }
// //     .middle-row .facility ul li {
// //         font-size: calc(12px + 0.15vw);
// //         font-weight: 400;
// //         opacity: 0.95;
// //         text-transform: capitalize;
// //         padding: 2px 0;
// //     }
// //     .middle-row .salary {
// //         font-size: calc(14px + 0.1vw);
// //         font-weight: 600;
// //         opacity: 0.85;
// //         margin-bottom: calc(10px + 0.3vw);
// //     }
// //     .middle-row .apply h3 {
// //         font-size: calc(14px + 0.15vw);
// //         font-weight: 600;
// //         text-transform: capitalize;
// //         opacity: 0.8;
// //         text-decoration: underline;
// //     }
// //     .middle-row .apply p {
// //         margin-top: 6px;
// //         font-size: calc(12px + 0.15vw);
// //         font-weight: 400;
// //         opacity: 0.95;
// //     }
// //     .middle-row .apply p.intro {
// //         text-transform: capitalize;
// //     }
// //     .middle-row .apply p.info {
// //         font-weight: 600;
// //         opacity: 0.8;
// //     }
// // `;

// // export default School;











// // import React, { useState } from "react";
// // import styled from "styled-components";
// // import { useParams } from "react-router-dom";

// // import { useQuery } from "@tanstack/react-query";
// // import { getSingleHandler } from "../utils/FetchHandlers";
// // import LoadingComTwo from "../components/shared/LoadingComTwo";

// // import advancedFormat from "dayjs/plugin/advancedFormat";
// // import dayjs from "dayjs";
// // dayjs.extend(advancedFormat);

// // import { MdAccessTime } from "react-icons/md";
// // import Navbar from "../components/shared/Navbar";

// // // import advancedFormat from "dayjs/plugin/advancedFormat";
// // // import dayjs from "dayjs";
// // dayjs.extend(advancedFormat);

// // const School = () => {
// //     const { id } = useParams();
// //     const {
// //         isLoading,
// //         isError,
// //         data: school,
// //         error,
// //     } = useQuery({
// //         queryKey: ["job"],
// //         queryFn: () =>
// //             getSingleHandler(
// //                 `${import.meta.env.VITE_API_BASE_URL}/schools/${id}`
// //             ),
// //     });

// //     const date = dayjs(job?.applicationDeadline).format("MMM Do, YYYY");

// //     if (isLoading) {
// //         return <LoadingComTwo />;
// //     }
// //     if (isError) {
// //         return <h2 className="">{error?.message}</h2>;
// //     }
// //     // if (job) {
// //     //     console.log(job.result);
// //     // }
// //     return (
// //         <>
// //             <Navbar />
// //             <Wrapper>
// //                 <div className="top-row">
// //                     <h2 className="title">
// //                         <span className="capitalize ">course: </span>
// //                         {job?.course}
// //                     </h2>
// //                     <h4 className="company">
// //                         <span className="fancy"> by: </span>
// //                         {job?.university}
// //                     </h4>
// //                     <h4 className="post-date">
// //                         <MdAccessTime className="text-lg mr-1" />
// //                         {dayjs(job?.result?.createdAt).format("MMM Do, YYYY")}
// //                     </h4>
// //                 </div>
// //                 <div className="middle-row">
// //                     <div className="description">
// //                         <h3 className="sec-title">description</h3>
// //                         <p className="">{job?.courseDescription}</p>
// //                     </div>
// //                     <h4 className="deadline">
// //                         Application Deadline: <span className="">{date}</span>
// //                     </h4>
// //                     <h4 className="vacancy">
// //                          Open Apllications: <span className="">{job?.applicationsRequired}</span>
// //                     </h4>
// //                     <div className="requirement">
// //                         <h3 className="sec-title">Requirements</h3>
// //                         <ul>
// //                             {job?.requirements?.map((skill) => (
// //                                 <li key={skill}>{skill}</li>
// //                             ))}
// //                         </ul>
// //                     </div>
// //                     <div className="facility">
// //                         <h3 className="sec-title">Facilities</h3>
// //                         <ul>
// //                             {job?.facilities?.map((facility) => (
// //                                 <li key={facility}>{facility}</li>
// //                             ))}
// //                         </ul>
// //                     </div>
// //                     <h4 className="salary">
// //                         Tuition: <span className="">{job?.tuition} USD</span>
// //                     </h4>
// //                     <div className="apply">
// //                         <h3 className="sec-title">To apply</h3>

// //                         <p className="intro">send your cv/resume</p>
// //                         <p className="info">Email: {job?.contact}</p>
// //                     </div>
// //                 </div>
// //             </Wrapper>
// //         </>
// //     );
// // };
