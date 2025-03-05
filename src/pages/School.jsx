
import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSingleHandler } from "../utils/FetchHandlers";
import LoadingComTwo from "../components/shared/LoadingComTwo";

import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";
dayjs.extend(advancedFormat);

import { MdAccessTime } from "react-icons/md";
import Navbar from "../components/shared/Navbar";

const School = () => {
    const { id } = useParams();
    const {
        isLoading,
        isError,
        data: school,
        error,
    } = useQuery({
        queryKey: ["school", id],

        queryFn: () => getSingleHandler(`${import.meta.env.VITE_API_BASE_URL}/schools/${id}`),

    });

    const date = dayjs(school?.applicationDeadline).format("MMM Do, YYYY");

    if (isLoading) {
        return <LoadingComTwo />;
    }
    if (isError) {
        return <h2 className="">{error?.message}</h2>;
    }

    return (
        <>
            <Navbar />
            <Wrapper>
                <div className="top-row">
                    <h2 className="title">
                        <span className="capitalize">Course: </span>
                        {school?.course}
                    </h2>
                    <h4 className="university">
                        <span className="fancy">By: </span>
                        {school?.university}
                    </h4>
                    <h4 className="post-date">
                        <MdAccessTime className="text-lg mr-1" />
                        {dayjs(school?.createdAt).format("MMM Do, YYYY")}
                    </h4>
                </div>
                <div className="middle-row">
                    <div className="description">
                        <h3 className="sec-title">Description</h3>
                        <p>{school?.courseDescription}</p>
                    </div>
                    <h4 className="deadline">
                        Application Deadline: <span>{date}</span>
                    </h4>
                    <h4 className="vacancy">
                        Open Applications: <span>{school?.applicationsRequired}</span>
                    </h4>
                    <div className="requirement">
                        <h3 className="sec-title">Requirements</h3>
                        <ul>
                            {school?.requirements?.map((requirement) => (
                                <li key={requirement}>{requirement}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="facility">
                        <h3 className="sec-title">Facilities</h3>
                        <ul>
                            {school?.facilities?.map((facility) => (
                                <li key={facility}>{facility}</li>
                            ))}
                        </ul>
                    </div>
                    <h4 className="tuition">
                        Tuition: <span>{school?.tuition} USD</span>
                    </h4>
                    {/* <div className="apply">
                        <h3 className="sec-title">To Apply</h3>
                        <p className="intro">Send your CV/Resume</p>
                        <p className="info">Email: {school?.contact}</p>
                    </div> */}

                    <div className="apply">
                        <h3 className="sec-title">To Apply</h3>
                        <p className="intro">Send your CV/Resume</p>
                        <p className="info">Email: {school?.contact}</p>
                        <a href={`mailto:${school?.contact}`} className="apply-button">
                            Apply Now
                        </a>
                    </div>
                </div>
            </Wrapper>
        </>
    );
};






// const Wrapper = styled.section`
//     padding: 2rem 0;
//     max-width: 1000px;
//     margin: 0 auto;
//     margin-bottom: calc(20px + 1vw);
//     width: 100%;

//     .top-row {
//         margin-bottom: calc(30px + 1vw);
//     }
//     .top-row .title {
//         font-size: calc(14px + 1vw);
//         text-align: center;
//     }
//     .top-row .company {
//         font-size: calc(11px + 0.35vw);
//         text-align: center;
//         text-transform: capitalize;
//         font-weight: 600;
//         margin-top: 4px;
//         opacity: 0.75;
//     }
//     .top-row .post-date {
//         font-size: 11px;
//         font-weight: 600;
//         text-transform: capitalize;
//         text-align: center;
//         opacity: 0.75;
//         margin-top: 8px;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//     }
//     .middle-row .description h3 {
//         font-size: calc(14px + 0.15vw);
//         font-weight: 600;
//         text-transform: capitalize;
//         opacity: 0.8;
//         text-decoration: underline;
//     }
//     .middle-row .description p {
//         margin-top: 6px;
//         font-size: calc(12px + 0.15vw);
//         font-weight: 400;
//         opacity: 0.95;
//         text-align: justify;
//         line-height: 23px;
//     }
//     .middle-row .deadline {
//         font-size: calc(13px + 0.1vw);
//         font-weight: 600;
//         opacity: 0.8;
//         margin-top: calc(10px + 0.3vw);
//     }
//     .middle-row .vacancy {
//         font-size: calc(13px + 0.1vw);
//         font-weight: 600;
//         opacity: 0.8;
//         margin-top: 4px;
//         margin-bottom: calc(10px + 0.3vw);
//     }
//     .middle-row .requirement {
//         margin-bottom: calc(10px + 0.3vw);
//     }
//     .middle-row .requirement .sec-title {
//         font-size: calc(14px + 0.15vw);
//         font-weight: 600;
//         text-transform: capitalize;
//         opacity: 0.8;
//         text-decoration: underline;
//     }
//     .middle-row .requirement p {
//         margin-top: 6px;
//         font-size: calc(12px + 0.15vw);
//         font-weight: 400;
//         opacity: 0.95;
//         text-align: justify;
//         line-height: 23px;
//     }
//     .middle-row .requirement ul {
//         margin-top: 6px;
//         list-style: circle;
//         margin-left: calc(30px + 0.5vw);
//     }
//     .middle-row .requirement ul li {
//         font-size: calc(12px + 0.15vw);
//         font-weight: 400;
//         opacity: 0.95;
//         text-transform: capitalize;
//         padding: 2px 0;
//     }

//     .middle-row .facility .sec-title {
//         font-size: calc(14px + 0.15vw);
//         font-weight: 600;
//         text-transform: capitalize;
//         opacity: 0.8;
//         text-decoration: underline;
//     }
//     .middle-row .facility {
//         margin-bottom: calc(10px + 0.3vw);
//     }
//     .middle-row .facility p {
//         margin-top: 6px;
//         font-size: calc(12px + 0.15vw);
//         font-weight: 400;
//         opacity: 0.95;
//         text-align: justify;
//         line-height: 23px;
//     }
//     .middle-row .facility ul {
//         margin-top: 6px;
//         list-style: circle;
//         margin-left: calc(30px + 0.5vw);
//     }
//     .middle-row .facility ul li {
//         font-size: calc(12px + 0.15vw);
//         font-weight: 400;
//         opacity: 0.95;
//         text-transform: capitalize;
//         padding: 2px 0;
//     }
//     .middle-row .salary {
//         font-size: calc(14px + 0.1vw);
//         font-weight: 600;
//         opacity: 0.85;
//         margin-bottom: calc(10px + 0.3vw);
//     }
//     .middle-row .apply h3 {
//         font-size: calc(14px + 0.15vw);
//         font-weight: 600;
//         text-transform: capitalize;
//         opacity: 0.8;
//         text-decoration: underline;
//     }
//     .middle-row .apply p {
//         margin-top: 6px;
//         font-size: calc(12px + 0.15vw);
//         font-weight: 400;
//         opacity: 0.95;
//     }
//     .middle-row .apply p.intro {
//         text-transform: capitalize;
//     }
//     .middle-row .apply p.info {
//         font-weight: 600;
//         opacity: 0.8;
//     }
// `;


const Wrapper = styled.section`
    padding: 2rem 1rem;
    max-width: 1000px;
    margin: 0 auto;
    margin-bottom: calc(20px + 1vw);
    width: 100%;
    font-family: 'Poppins', sans-serif;

    .top-row {
        margin-bottom: calc(30px + 1vw);
        text-align: center;
        background: linear-gradient(135deg, #6a11cb, #2575fc);
        padding: 2rem;
        border-radius: 12px;
        color: white;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .top-row .title {
        font-size: calc(20px + 1vw);
        font-weight: 600;
        margin-bottom: 0.5rem;
    }
    .top-row .university {
        font-size: calc(14px + 0.5vw);
        font-weight: 500;
        opacity: 0.9;
    }
    .top-row .post-date {
        font-size: 14px;
        font-weight: 500;
        opacity: 0.8;
        margin-top: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .middle-row {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        margin-top: 2rem;
    }
    .middle-row .description h3 {
        font-size: calc(18px + 0.15vw);
        font-weight: 600;
        color: #333;
        margin-bottom: 1rem;
    }
    .middle-row .description p {
        font-size: calc(14px + 0.15vw);
        line-height: 1.6;
        color: #555;
    }
    .middle-row .deadline,
    .middle-row .vacancy,
    .middle-row .tuition {
        font-size: calc(16px + 0.1vw);
        font-weight: 600;
        color: #333;
        margin: 1.5rem 0;
    }
    .middle-row .deadline span,
    .middle-row .vacancy span,
    .middle-row .tuition span {
        color: #2575fc;
    }
    .middle-row .requirement,
    .middle-row .facility {
        margin-bottom: 2rem;
    }
    .middle-row .requirement h3,
    .middle-row .facility h3 {
        font-size: calc(18px + 0.15vw);
        font-weight: 600;
        color: #333;
        margin-bottom: 1rem;
    }
    .middle-row .requirement ul,
    .middle-row .facility ul {
        list-style: none;
        padding-left: 1.5rem;
    }
    .middle-row .requirement ul li,
    .middle-row .facility ul li {
        font-size: calc(14px + 0.15vw);
        color: #555;
        margin-bottom: 0.5rem;
        position: relative;
    }
    .middle-row .requirement ul li::before,
    .middle-row .facility ul li::before {
        content: "•";
        color: #2575fc;
        font-size: 1.2rem;
        position: absolute;
        left: -1.5rem;
        top: 50%;
        transform: translateY(-50%);
    }
    .middle-row .apply {
        margin-top: 2rem;
    }
    .middle-row .apply h3 {
        font-size: calc(18px + 0.15vw);
        font-weight: 600;
        color: #333;
        margin-bottom: 1rem;
    }
    .middle-row .apply p {
        font-size: calc(14px + 0.15vw);
        color: #555;
        margin-bottom: 0.5rem;
    }
    .middle-row .apply p.info {
        font-weight: 600;
        color: #2575fc;
    }

    .apply-button {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #6a11cb, #2575fc);
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    transition: transform 0.2s, box-shadow 0.2s;
    }
    .apply-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

export default School;















// import React from "react";
// import styled from "styled-components";
// import { useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { getSingleHandler } from "../utils/FetchHandlers";
// import LoadingComTwo from "../components/shared/LoadingComTwo";

// import advancedFormat from "dayjs/plugin/advancedFormat";
// import dayjs from "dayjs";
// dayjs.extend(advancedFormat);

// import { MdAccessTime } from "react-icons/md";
// import Navbar from "../components/shared/Navbar";

// const School = () => {
//     const { id } = useParams();
//     const {
//         isLoading,
//         isError,
//         data: school,
//         error,
//     } = useQuery({
//         queryKey: ["school", id],

//         queryFn: () => getSingleHandler(`${import.meta.env.VITE_API_BASE_URL}/schools/${id}`),

//     });

//     const date = dayjs(school?.applicationDeadline).format("MMM Do, YYYY");

//     if (isLoading) {
//         return <LoadingComTwo />;
//     }
//     if (isError) {
//         return <h2 className="">{error?.message}</h2>;
//     }

//     return (
//         <>
//             <Navbar />
//             <Wrapper>
//                 <div className="top-row">
//                     <h2 className="title">
//                         <span className="capitalize">Course: </span>
//                         {school?.course}
//                     </h2>
//                     <h4 className="university">
//                         <span className="fancy">By: </span>
//                         {school?.university}
//                     </h4>
//                     <h4 className="post-date">
//                         <MdAccessTime className="text-lg mr-1" />
//                         {dayjs(school?.createdAt).format("MMM Do, YYYY")}
//                     </h4>
//                 </div>
//                 <div className="middle-row">
//                     <div className="description">
//                         <h3 className="sec-title">Description</h3>
//                         <p>{school?.courseDescription}</p>
//                     </div>
//                     <h4 className="deadline">
//                         Application Deadline: <span>{date}</span>
//                     </h4>
//                     <h4 className="vacancy">
//                         Open Applications: <span>{school?.applicationsRequired}</span>
//                     </h4>
//                     <div className="requirement">
//                         <h3 className="sec-title">Requirements</h3>
//                         <ul>
//                             {school?.requirements?.map((requirement) => (
//                                 <li key={requirement}>{requirement}</li>
//                             ))}
//                         </ul>
//                     </div>
//                     <div className="facility">
//                         <h3 className="sec-title">Facilities</h3>
//                         <ul>
//                             {school?.facilities?.map((facility) => (
//                                 <li key={facility}>{facility}</li>
//                             ))}
//                         </ul>
//                     </div>
//                     <h4 className="tuition">
//                         Tuition: <span>{school?.tuition} USD</span>
//                     </h4>
//                     <div className="apply">
//                         <h3 className="sec-title">To Apply</h3>
//                         <p className="intro">Send your CV/Resume</p>
//                         <p className="info">Email: {school?.contact}</p>
//                     </div>
//                 </div>
//             </Wrapper>
//         </>
//     );
// };






// const Wrapper = styled.section`
//     padding: 2rem 0;
//     max-width: 1000px;
//     margin: 0 auto;
//     margin-bottom: calc(20px + 1vw);
//     width: 100%;

//     .top-row {
//         margin-bottom: calc(30px + 1vw);
//     }
//     .top-row .title {
//         font-size: calc(14px + 1vw);
//         text-align: center;
//     }
//     .top-row .company {
//         font-size: calc(11px + 0.35vw);
//         text-align: center;
//         text-transform: capitalize;
//         font-weight: 600;
//         margin-top: 4px;
//         opacity: 0.75;
//     }
//     .top-row .post-date {
//         font-size: 11px;
//         font-weight: 600;
//         text-transform: capitalize;
//         text-align: center;
//         opacity: 0.75;
//         margin-top: 8px;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//     }
//     .middle-row .description h3 {
//         font-size: calc(14px + 0.15vw);
//         font-weight: 600;
//         text-transform: capitalize;
//         opacity: 0.8;
//         text-decoration: underline;
//     }
//     .middle-row .description p {
//         margin-top: 6px;
//         font-size: calc(12px + 0.15vw);
//         font-weight: 400;
//         opacity: 0.95;
//         text-align: justify;
//         line-height: 23px;
//     }
//     .middle-row .deadline {
//         font-size: calc(13px + 0.1vw);
//         font-weight: 600;
//         opacity: 0.8;
//         margin-top: calc(10px + 0.3vw);
//     }
//     .middle-row .vacancy {
//         font-size: calc(13px + 0.1vw);
//         font-weight: 600;
//         opacity: 0.8;
//         margin-top: 4px;
//         margin-bottom: calc(10px + 0.3vw);
//     }
//     .middle-row .requirement {
//         margin-bottom: calc(10px + 0.3vw);
//     }
//     .middle-row .requirement .sec-title {
//         font-size: calc(14px + 0.15vw);
//         font-weight: 600;
//         text-transform: capitalize;
//         opacity: 0.8;
//         text-decoration: underline;
//     }
//     .middle-row .requirement p {
//         margin-top: 6px;
//         font-size: calc(12px + 0.15vw);
//         font-weight: 400;
//         opacity: 0.95;
//         text-align: justify;
//         line-height: 23px;
//     }
//     .middle-row .requirement ul {
//         margin-top: 6px;
//         list-style: circle;
//         margin-left: calc(30px + 0.5vw);
//     }
//     .middle-row .requirement ul li {
//         font-size: calc(12px + 0.15vw);
//         font-weight: 400;
//         opacity: 0.95;
//         text-transform: capitalize;
//         padding: 2px 0;
//     }

//     .middle-row .facility .sec-title {
//         font-size: calc(14px + 0.15vw);
//         font-weight: 600;
//         text-transform: capitalize;
//         opacity: 0.8;
//         text-decoration: underline;
//     }
//     .middle-row .facility {
//         margin-bottom: calc(10px + 0.3vw);
//     }
//     .middle-row .facility p {
//         margin-top: 6px;
//         font-size: calc(12px + 0.15vw);
//         font-weight: 400;
//         opacity: 0.95;
//         text-align: justify;
//         line-height: 23px;
//     }
//     .middle-row .facility ul {
//         margin-top: 6px;
//         list-style: circle;
//         margin-left: calc(30px + 0.5vw);
//     }
//     .middle-row .facility ul li {
//         font-size: calc(12px + 0.15vw);
//         font-weight: 400;
//         opacity: 0.95;
//         text-transform: capitalize;
//         padding: 2px 0;
//     }
//     .middle-row .salary {
//         font-size: calc(14px + 0.1vw);
//         font-weight: 600;
//         opacity: 0.85;
//         margin-bottom: calc(10px + 0.3vw);
//     }
//     .middle-row .apply h3 {
//         font-size: calc(14px + 0.15vw);
//         font-weight: 600;
//         text-transform: capitalize;
//         opacity: 0.8;
//         text-decoration: underline;
//     }
//     .middle-row .apply p {
//         margin-top: 6px;
//         font-size: calc(12px + 0.15vw);
//         font-weight: 400;
//         opacity: 0.95;
//     }
//     .middle-row .apply p.intro {
//         text-transform: capitalize;
//     }
//     .middle-row .apply p.info {
//         font-weight: 600;
//         opacity: 0.8;
//     }
// `;

// export default School;











// import React, { useState } from "react";
// import styled from "styled-components";
// import { useParams } from "react-router-dom";

// import { useQuery } from "@tanstack/react-query";
// import { getSingleHandler } from "../utils/FetchHandlers";
// import LoadingComTwo from "../components/shared/LoadingComTwo";

// import advancedFormat from "dayjs/plugin/advancedFormat";
// import dayjs from "dayjs";
// dayjs.extend(advancedFormat);

// import { MdAccessTime } from "react-icons/md";
// import Navbar from "../components/shared/Navbar";

// // import advancedFormat from "dayjs/plugin/advancedFormat";
// // import dayjs from "dayjs";
// dayjs.extend(advancedFormat);

// const School = () => {
//     const { id } = useParams();
//     const {
//         isLoading,
//         isError,
//         data: school,
//         error,
//     } = useQuery({
//         queryKey: ["job"],
//         queryFn: () =>
//             getSingleHandler(
//                 `${import.meta.env.VITE_API_BASE_URL}/schools/${id}`
//             ),
//     });

//     const date = dayjs(job?.applicationDeadline).format("MMM Do, YYYY");

//     if (isLoading) {
//         return <LoadingComTwo />;
//     }
//     if (isError) {
//         return <h2 className="">{error?.message}</h2>;
//     }
//     // if (job) {
//     //     console.log(job.result);
//     // }
//     return (
//         <>
//             <Navbar />
//             <Wrapper>
//                 <div className="top-row">
//                     <h2 className="title">
//                         <span className="capitalize ">course: </span>
//                         {job?.course}
//                     </h2>
//                     <h4 className="company">
//                         <span className="fancy"> by: </span>
//                         {job?.university}
//                     </h4>
//                     <h4 className="post-date">
//                         <MdAccessTime className="text-lg mr-1" />
//                         {dayjs(job?.result?.createdAt).format("MMM Do, YYYY")}
//                     </h4>
//                 </div>
//                 <div className="middle-row">
//                     <div className="description">
//                         <h3 className="sec-title">description</h3>
//                         <p className="">{job?.courseDescription}</p>
//                     </div>
//                     <h4 className="deadline">
//                         Application Deadline: <span className="">{date}</span>
//                     </h4>
//                     <h4 className="vacancy">
//                          Open Apllications: <span className="">{job?.applicationsRequired}</span>
//                     </h4>
//                     <div className="requirement">
//                         <h3 className="sec-title">Requirements</h3>
//                         <ul>
//                             {job?.requirements?.map((skill) => (
//                                 <li key={skill}>{skill}</li>
//                             ))}
//                         </ul>
//                     </div>
//                     <div className="facility">
//                         <h3 className="sec-title">Facilities</h3>
//                         <ul>
//                             {job?.facilities?.map((facility) => (
//                                 <li key={facility}>{facility}</li>
//                             ))}
//                         </ul>
//                     </div>
//                     <h4 className="salary">
//                         Tuition: <span className="">{job?.tuition} USD</span>
//                     </h4>
//                     <div className="apply">
//                         <h3 className="sec-title">To apply</h3>

//                         <p className="intro">send your cv/resume</p>
//                         <p className="info">Email: {job?.contact}</p>
//                     </div>
//                 </div>
//             </Wrapper>
//         </>
//     );
// };
