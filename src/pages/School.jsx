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
//                 `http://localhost:3000/api/v1/schools/${id}`
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
        queryFn: () => getSingleHandler(`http://195.35.25.14:3000/api/v1/schools/${id}`),
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
                    <div className="apply">
                        <h3 className="sec-title">To Apply</h3>
                        <p className="intro">Send your CV/Resume</p>
                        <p className="info">Email: {school?.contact}</p>
                    </div>
                </div>
            </Wrapper>
        </>
    );
};






const Wrapper = styled.section`
    padding: 2rem 0;
    max-width: 1000px;
    margin: 0 auto;
    margin-bottom: calc(20px + 1vw);
    width: 100%;

    .top-row {
        margin-bottom: calc(30px + 1vw);
    }
    .top-row .title {
        font-size: calc(14px + 1vw);
        text-align: center;
    }
    .top-row .company {
        font-size: calc(11px + 0.35vw);
        text-align: center;
        text-transform: capitalize;
        font-weight: 600;
        margin-top: 4px;
        opacity: 0.75;
    }
    .top-row .post-date {
        font-size: 11px;
        font-weight: 600;
        text-transform: capitalize;
        text-align: center;
        opacity: 0.75;
        margin-top: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .middle-row .description h3 {
        font-size: calc(14px + 0.15vw);
        font-weight: 600;
        text-transform: capitalize;
        opacity: 0.8;
        text-decoration: underline;
    }
    .middle-row .description p {
        margin-top: 6px;
        font-size: calc(12px + 0.15vw);
        font-weight: 400;
        opacity: 0.95;
        text-align: justify;
        line-height: 23px;
    }
    .middle-row .deadline {
        font-size: calc(13px + 0.1vw);
        font-weight: 600;
        opacity: 0.8;
        margin-top: calc(10px + 0.3vw);
    }
    .middle-row .vacancy {
        font-size: calc(13px + 0.1vw);
        font-weight: 600;
        opacity: 0.8;
        margin-top: 4px;
        margin-bottom: calc(10px + 0.3vw);
    }
    .middle-row .requirement {
        margin-bottom: calc(10px + 0.3vw);
    }
    .middle-row .requirement .sec-title {
        font-size: calc(14px + 0.15vw);
        font-weight: 600;
        text-transform: capitalize;
        opacity: 0.8;
        text-decoration: underline;
    }
    .middle-row .requirement p {
        margin-top: 6px;
        font-size: calc(12px + 0.15vw);
        font-weight: 400;
        opacity: 0.95;
        text-align: justify;
        line-height: 23px;
    }
    .middle-row .requirement ul {
        margin-top: 6px;
        list-style: circle;
        margin-left: calc(30px + 0.5vw);
    }
    .middle-row .requirement ul li {
        font-size: calc(12px + 0.15vw);
        font-weight: 400;
        opacity: 0.95;
        text-transform: capitalize;
        padding: 2px 0;
    }

    .middle-row .facility .sec-title {
        font-size: calc(14px + 0.15vw);
        font-weight: 600;
        text-transform: capitalize;
        opacity: 0.8;
        text-decoration: underline;
    }
    .middle-row .facility {
        margin-bottom: calc(10px + 0.3vw);
    }
    .middle-row .facility p {
        margin-top: 6px;
        font-size: calc(12px + 0.15vw);
        font-weight: 400;
        opacity: 0.95;
        text-align: justify;
        line-height: 23px;
    }
    .middle-row .facility ul {
        margin-top: 6px;
        list-style: circle;
        margin-left: calc(30px + 0.5vw);
    }
    .middle-row .facility ul li {
        font-size: calc(12px + 0.15vw);
        font-weight: 400;
        opacity: 0.95;
        text-transform: capitalize;
        padding: 2px 0;
    }
    .middle-row .salary {
        font-size: calc(14px + 0.1vw);
        font-weight: 600;
        opacity: 0.85;
        margin-bottom: calc(10px + 0.3vw);
    }
    .middle-row .apply h3 {
        font-size: calc(14px + 0.15vw);
        font-weight: 600;
        text-transform: capitalize;
        opacity: 0.8;
        text-decoration: underline;
    }
    .middle-row .apply p {
        margin-top: 6px;
        font-size: calc(12px + 0.15vw);
        font-weight: 400;
        opacity: 0.95;
    }
    .middle-row .apply p.intro {
        text-transform: capitalize;
    }
    .middle-row .apply p.info {
        font-weight: 600;
        opacity: 0.8;
    }
`;

export default School;
