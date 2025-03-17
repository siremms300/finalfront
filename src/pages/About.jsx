
import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Navbar from "../components/shared/Navbar";

const About = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const accordionData = [
    {
      question: "Who We Are",
      answer:
        "Scovers is a leading education platform dedicated to helping students achieve their dreams of studying abroad. We partner with top universities worldwide to provide access to the best educational opportunities.",
    },
    {
      question: "Our Mission",
      answer:
        "Our mission is to make studying abroad accessible and stress-free. We provide personalized guidance, from course selection to application submission, ensuring students maximize their potential.",
    },
    {
      question: "Why Choose Us?",
      answer:
        "With a network of experienced counselors and partner universities, we offer tailored solutions to meet your educational goals. Our platform simplifies the process, saving you time and effort.",
    },
  ];

  return (
    <>
      <Navbar />
      <Wrapper>
        {/* Image Banner Section */}
        <BannerSection>
          <div className="banner-content">
            {/* <h1>About Us</h1> */}
          </div>
        </BannerSection>

        {/* About Us Text Section */}
        <AboutTextSection>
          <h2>Welcome to Scovers</h2>
          <p>
            Scovers is a leading education platform dedicated to helping students achieve their dreams of studying abroad. We partner with top universities worldwide to provide access to the best educational opportunities. Our mission is to make studying abroad accessible and stress-free. We provide personalized guidance, from course selection to application submission, ensuring students maximize their potential.
          </p>
        </AboutTextSection>

        {/* Video Section with iframe */}
        <VideoSection>
          <div className="video-container">
            <iframe
              className="video"
              src="/testimony1.mp4"
              title="Testimonial Video"
              frameBorder="0"
              allow="autoplay; fullscreen"
            ></iframe>
          </div>
        </VideoSection>

        {/* Accordion Section */}
        <AccordionSection>
          <h2>Frequently Asked Questions</h2>
          <div className="accordion">
            {accordionData.map((item, index) => (
              <div
                key={index}
                className={`accordion-item ${
                  activeAccordion === index ? "active" : ""
                }`}
                onClick={() => toggleAccordion(index)}
              >
                <div className="accordion-question">
                  <h3>{item.question}</h3>
                  <span>{activeAccordion === index ? "-" : "+"}</span>
                </div>
                {activeAccordion === index && (
                  <motion.div
                    className="accordion-answer"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{item.answer}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </AccordionSection>

        {/* Contact Form Section */}
        <ContactSection>
          <h2>Contact Us</h2>
          <p>Have questions? Reach out to us, and we'll be happy to assist you.</p>
          <form className="contact-form">
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <textarea placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </ContactSection>
      </Wrapper>
    </>
  );
};

// Styled Components
const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

const BannerSection = styled.section`
  position: relative;
  height: 200px; /* Reduced height */
  background-image: url("/about.jpg");
  background-size: cover;
  background-position: center;
  overflow: hidden;
  width: 100%; /* Ensure it spans the full width */

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Adjust opacity here */
  }

  .banner-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    z-index: 1;

    h1 {
      font-size: 2.5rem; /* Adjusted font size */
      margin: 0;
    }
  }

  @media (max-width: 768px) {
    height: 150px;

    .banner-content h1 {
      font-size: 2rem;
    }
  }
`;

const AboutTextSection = styled.section`
  margin: 40px 0;
  text-align: center;

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
  }

  p {
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
    max-width: 800px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    margin: 20px 0;

    h2 {
      font-size: 1.8rem;
    }

    p {
      font-size: 0.9rem;
    }
  }
`;

const VideoSection = styled.section`
  margin: 40px 0;

  .video-container {
    max-width: 800px;
    margin: 0 auto;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  .video {
    width: 100%;
    height: 450px;
  }

  @media (max-width: 768px) {
    .video {
      height: 300px;
    }
  }
`;

const AccordionSection = styled.section`
  margin: 40px 0;

  h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 20px;
  }

  .accordion {
    max-width: 800px;
    margin: 0 auto;
  }

  .accordion-item {
    border-bottom: 1px solid #ddd;
    padding: 15px 0;
    cursor: pointer;
  }

  .accordion-question {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      font-size: 1.2rem;
      margin: 0;
    }

    span {
      font-size: 1.5rem;
    }
  }

  .accordion-answer {
    padding-top: 10px;
    p {
      margin: 0;
      color: #555;
    }
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.8rem;
    }

    .accordion-question h3 {
      font-size: 1rem;
    }
  }
`;

const ContactSection = styled.section`
  margin: 40px 0;

  h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 10px;
  }

  p {
    text-align: center;
    color: #555;
    margin-bottom: 20px;
  }

  .contact-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .form-group {
    margin-bottom: 15px;

    input,
    textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 1rem;
    }

    textarea {
      resize: vertical;
    }
  }

  .submit-button {
    width: 100%;
    padding: 10px;
    background: #247bf7;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: #1a5bbf;
    }
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.8rem;
    }

    p {
      font-size: 0.9rem;
    }

    .contact-form {
      padding: 15px;
    }

    .form-group input,
    .form-group textarea {
      font-size: 0.9rem;
    }
  }
`;

export default About;



























// import React, { useState } from "react";
// import styled from "styled-components";
// import { motion } from "framer-motion";
// import Navbar from "../components/shared/Navbar";

// const About = () => {
//   const [activeAccordion, setActiveAccordion] = useState(null);

//   const toggleAccordion = (index) => {
//     setActiveAccordion(activeAccordion === index ? null : index);
//   };

//   const accordionData = [
//     {
//       question: "Who We Are",
//       answer:
//         "Scovers is a leading education platform dedicated to helping students achieve their dreams of studying abroad. We partner with top universities worldwide to provide access to the best educational opportunities.",
//     },
//     {
//       question: "Our Mission",
//       answer:
//         "Our mission is to make studying abroad accessible and stress-free. We provide personalized guidance, from course selection to application submission, ensuring students maximize their potential.",
//     },
//     {
//       question: "Why Choose Us?",
//       answer:
//         "With a network of experienced counselors and partner universities, we offer tailored solutions to meet your educational goals. Our platform simplifies the process, saving you time and effort.",
//     },
//   ];

//   return (
//     <>
//       <Navbar />
//       <Wrapper>
//         {/* Image Banner Section */}
//         <BannerSection>
//           <div className="banner-content">
//             {/* <h1>About Us</h1> */}
//           </div>
//         </BannerSection>

//         {/* Video Section with iframe */}
//         <VideoSection>
//           <div className="video-container">
//             <iframe
//               className="video"
//               src="/testimony.mp4"
//               title="Testimonial Video"
//               frameBorder="0"
//               allow="autoplay; fullscreen"
//             ></iframe>
//           </div>
//         </VideoSection>

//         {/* Accordion Section */}
//         <AccordionSection>
//           <h2>Frequently Asked Questions</h2>
//           <div className="accordion">
//             {accordionData.map((item, index) => (
//               <div
//                 key={index}
//                 className={`accordion-item ${
//                   activeAccordion === index ? "active" : ""
//                 }`}
//                 onClick={() => toggleAccordion(index)}
//               >
//                 <div className="accordion-question">
//                   <h3>{item.question}</h3>
//                   <span>{activeAccordion === index ? "-" : "+"}</span>
//                 </div>
//                 {activeAccordion === index && (
//                   <motion.div
//                     className="accordion-answer"
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: "auto" }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <p>{item.answer}</p>
//                   </motion.div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </AccordionSection>

//         {/* Contact Form Section */}
//         <ContactSection>
//           <h2>Contact Us</h2>
//           <p>Have questions? Reach out to us, and we'll be happy to assist you.</p>
//           <form className="contact-form">
//             <div className="form-group">
//               <input type="text" placeholder="Your Name" required />
//             </div>
//             <div className="form-group">
//               <input type="email" placeholder="Your Email" required />
//             </div>
//             <div className="form-group">
//               <textarea placeholder="Your Message" rows="5" required></textarea>
//             </div>
//             <button type="submit" className="submit-button">
//               Send Message
//             </button>
//           </form>
//         </ContactSection>
//       </Wrapper>
//     </>
//   );
// };

// // Styled Components
// const Wrapper = styled.div`
//   width: 100%;
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 0 20px;
// `;

// const BannerSection = styled.section`
//   position: relative;
//   height: 200px; /* Reduced height */
//   background-image: url("/about.jpg");
//   background-size: cover;
//   background-position: center;
//   overflow: hidden;
//   width: 100%; /* Ensure it spans the full width */

//   &::before {
//     content: "";
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(0, 0, 0, 0.5); /* Adjust opacity here */
//   }

//   .banner-content {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     text-align: center;
//     color: white;
//     z-index: 1;

//     h1 {
//       font-size: 2.5rem; /* Adjusted font size */
//       margin: 0;
//     }
//   }
// `;

// const VideoSection = styled.section`
//   margin: 40px 0;

//   .video-container {
//     max-width: 800px;
//     margin: 0 auto;
//     border-radius: 10px;
//     overflow: hidden;
//     box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
//   }

//   .video {
//     width: 100%;
//     height: 450px;
//   }
// `;

// const AccordionSection = styled.section`
//   margin: 40px 0;

//   h2 {
//     text-align: center;
//     font-size: 2rem;
//     margin-bottom: 20px;
//   }

//   .accordion {
//     max-width: 800px;
//     margin: 0 auto;
//   }

//   .accordion-item {
//     border-bottom: 1px solid #ddd;
//     padding: 15px 0;
//     cursor: pointer;
//   }

//   .accordion-question {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;

//     h3 {
//       font-size: 1.2rem;
//       margin: 0;
//     }

//     span {
//       font-size: 1.5rem;
//     }
//   }

//   .accordion-answer {
//     padding-top: 10px;
//     p {
//       margin: 0;
//       color: #555;
//     }
//   }
// `;

// const ContactSection = styled.section`
//   margin: 40px 0;

//   h2 {
//     text-align: center;
//     font-size: 2rem;
//     margin-bottom: 10px;
//   }

//   p {
//     text-align: center;
//     color: #555;
//     margin-bottom: 20px;
//   }

//   .contact-form {
//     max-width: 600px;
//     margin: 0 auto;
//     padding: 20px;
//     background: #f9f9f9;
//     border-radius: 10px;
//     box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
//   }

//   .form-group {
//     margin-bottom: 15px;

//     input,
//     textarea {
//       width: 100%;
//       padding: 10px;
//       border: 1px solid #ddd;
//       border-radius: 5px;
//       font-size: 1rem;
//     }

//     textarea {
//       resize: vertical;
//     }
//   }

//   .submit-button {
//     width: 100%;
//     padding: 10px;
//     background: #247bf7;
//     color: white;
//     border: none;
//     border-radius: 5px;
//     font-size: 1rem;
//     cursor: pointer;
//     transition: background 0.3s ease;

//     &:hover {
//       background: #1a5bbf;
//     }
//   }
// `;

// export default About;