import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Navbar from "../components/shared/Navbar";
import LogoCarousel from "../components/shared/logoCarousel";
import PopularCategory from "../components/Home Page/PopularCategory";
import HowWorks from "../components/Home Page/HowWorks";
// import Team from "../components/Home Page/Team";
import Brands from "../components/Home Page/Brands";
import Testimonial from "../components/Home Page/Testimonial";
import hero from "../assets/media/LandingPage/hero.jpg";
import hero1 from "../assets/media/LandingPage/hero1.jpg";
import hero2 from "../assets/media/LandingPage/hero2.jpg";
import hero3 from "../assets/media/LandingPage/hero3.jpg";

const Landing = () => {
    const navbarRef = useRef(null);

    return (
        <>
            <Navbar navbarRef={navbarRef} />
            <HeroSection>
                <Overlay />
                <ContentWrapper>
                    <TextContent>
                        <h1>
                            Study abroad, <span className="highlight">made easy</span>
                        </h1>
                        <p>
                            Scovers education portal is the leading web directory 
                            for finding and applying to top universities across the globe.
                            Search thousands of universities and courses, send your application, 
                            and let us handle the rest.
                        </p>
                        <Link className="cta-button" to="/all-schools">
                            Apply Now
                        </Link>
                    </TextContent>
                </ContentWrapper>
            </HeroSection>

            {/* Other sections */}
            <LogoCarousel />
            <PopularCategory />
            <HowWorks />
            {/* <Team /> */}
            <Testimonial />
            <Brands />
        </>
    );
};

export default Landing;

// Keyframes for fading background transitions
const fadeBackgrounds = keyframes`
    0%, 100% { background-image: url(${hero}); opacity: 1; }
    25% { background-image: url(${hero1}); opacity: 1; }
    50% { background-image: url(${hero2}); opacity: 1; }
    75% { background-image: url(${hero3}); opacity: 1; }
`;

// Styled Components
const HeroSection = styled.section`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    padding: 2rem;
    color: white;
    text-align: center;
    animation: ${fadeBackgrounds} 12s infinite ease-in-out; /* Adjust timing */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

// Dark overlay for text readability
const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
`;

const ContentWrapper = styled.div`
    position: relative;
    z-index: 2;
    max-width: 800px;
    width: 90%;
`;

const TextContent = styled.div`
    h1 {
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
    }

    .highlight {
        color: #247BF7; /* Highlight color */
    }

    p {
        font-size: 1.1rem;
        margin-bottom: 1.5rem;
    }

    .cta-button {
        display: inline-block;
        background: #247BF7;
        color: white;
        padding: 0.8rem 1.5rem;
        text-decoration: none;
        font-weight: bold;
        border-radius: 5px;
        transition: background 0.3s ease;

        &:hover {
            background: #1a5fcb;
        }
    }

    @media (max-width: 768px) {
        h1 {
            font-size: 2rem;
        }

        p {
            font-size: 1rem;
        }

        .cta-button {
            padding: 0.7rem 1.2rem;
        }
    }
`;














// import React, { useEffect, useRef } from "react";
// import Wrapper from "../assets/css/wrappers/LandingPage";
// import { Link } from "react-router-dom";
// import photo from "../assets/media/LandingPage/hero.png";
// import Navbar from "../components/shared/Navbar";
// import PopularCategory from "../components/Home Page/PopularCategory";
// import HowWorks from "../components/Home Page/HowWorks";
// import Team from "../components/Home Page/Team";
// import Brands from "../components/Home Page/Brands";
// import Testimonial from "../components/Home Page/Testimonial";

// const Landing = () => {
//     const navbarRef = useRef(null);
//     const heroRef = useRef(null);

//     useEffect(() => {
//         const navbarHeight = navbarRef.current.getBoundingClientRect().height;
//         heroRef.current.style.minHeight = `calc(100vh - ${navbarHeight}px)`;
//     }, []);
//     return (
//         <>
//             <Navbar navbarRef={navbarRef} />
//             <Wrapper ref={heroRef}>
//                 <div className="hero-content">
//                     <div className="text-content">
//                         <h1>
//                             Get Your <span className="fancy">Dream Course </span> 
//                             Today!
//                         </h1>
//                         <p>
//                         Scovers education portal is the leading web directory 
//                             for finding and applying to leading universities across the globe.
//                             Search through thousands of univertities and courses to find your preferred course,
//                             send your application and let us handle the rest.
//                         </p>
//                         <div className="btn-grp">
//                             <Link className="btn" to="/all-schools">
//                                 Apply Now
//                             </Link>
//                         </div>
//                     </div>
//                     <div className="placeholder">
//                         <img src={photo} alt="job viva photo" />
//                     </div>
//                 </div>
//             </Wrapper>
//             <div>
//             <PopularCategory/>
//             <HowWorks/>
//             <Team/>
//             <Testimonial/>
//             <Brands/>
//             </div>
//         </>
//     );
// };

// export default Landing;
