// /* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import styled from "styled-components";
// import { CiSquarePlus } from "react-icons/ci";

// import { School_Status, Course_Type } from "../utils/SchoolData"; 


// import { useForm } from "react-hook-form";
// import axios from "axios";
// import Swal from "sweetalert2";

// // import ReactQuill from "react-quill";
// // import "react-quill/dist/quill.snow.css";

// // import { DayPicker } from "react-day-picker";
// // import { format } from "date-fns";
// // import "react-day-picker/dist/style.css";

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// import { TagsInput } from "react-tag-input-component";


// const AddSchool = () => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [deadline, setDeadline] = useState(new Date());
//     const [requirements, setRequirements] = useState([]); // formerly 'skills'
//     const [facilities, setFacilities] = useState([]);
  
//     const {
//       register,
//       handleSubmit,
//       reset,
//       formState: { errors },
//     } = useForm();
  
//     const onSubmit = async (data) => {
//       setIsLoading(true);
//       const newSchool = {
//         university: data?.university, // School name
//         course: data?.course, // Course
//         schoolStatus: data?.schoolStatus, // School status
//         courseType: data?.courseType, // Course type (full-time/part-time)
//         location: data?.location, // Location of the university
//         tuition: data?.tuition, // Tuition fee
//         applicationDeadline: deadline + "", // Application deadline
//         description: data?.description, // Course description
//         requirements: requirements, // Course requirements
//         facilities: facilities, // School facilities
//         contact: data?.contact, // Contact information
//         scholarship: data?.scholarship, // Whether scholarships are available
//       };
      
//     console.log(newSchool);
//     try {
//       const response = await axios.post(
//         "${import.meta.env.VITE_API_BASE_URL}/schools", // Adjust the endpoint
//         newSchool,
//         {
//           withCredentials: true,
//         }
//       );
//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: response?.data?.message,
//       });

//       reset();
//       setDeadline(new Date());
//       setRequirements([]);
//       setFacilities([]);
//     } catch (error) {
//       console.error(error);
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: error?.response?.data,
//       });
//     }
//     setIsLoading(false);
//   };



// // const AddJob = () => {
// //     const [isLoading, setIsLoading] = useState(false);
// //     const [deadline, setDeadline] = useState(new Date());
// //     const [skills, setSkills] = useState([]);
// //     const [facilities, setFacilities] = useState([]);

// //     const {
// //         register,
// //         handleSubmit,
// //         reset,
// //         formState: { errors },
// //     } = useForm();

// //     const onSubmit = async (data) => {
// //         setIsLoading(true);
// //         const newJob = {
// //             university: data?.university,  //status and type could give error
// //             course: data?.course,
// //             courseStatus: data?.status,
// //             courseMode: data?.type,
// //             location: data?.location,
// //             applicationsRequired: data?.vacancy, //vacancy
// //             tuition: data?.tuition,
// //             applicationDeadline: deadline + "",
// //             courseDescription: data?.description,
// //             requirements: skills,
// //             facilities: facilities,
// //             contact: data?.contact,
// //         };

// //         console.log(newJob)
// //         // posting;
// //         try {
// //             const response = await axios.post(
// //                 "${import.meta.env.VITE_API_BASE_URL}/jobs",
// //                 newJob,
// //                 {
// //                     withCredentials: true,
// //                 }
// //             );
// //             Swal.fire({
// //                 icon: "success",
// //                 title: "Done...",
// //                 text: response?.data?.message,
// //             });

// //             reset();
// //             setDeadline(new Date());
// //             setSkills([]);
// //             setFacilities([]);
// //             // navigate("/");
// //         } catch (error) {
// //             console.log(error);
// //             Swal.fire({
// //                 icon: "error",
// //                 title: "Oops...",
// //                 text: error?.response?.data,
// //             });
// //         }
// //         setIsLoading(false);
// //     };

//     return (
//         <Wrapper>
//             <div className="">
//                 <div className="title-row">
//                     Create Course
//                     <CiSquarePlus className="ml-1 text-xl md:text-2xl" />
//                 </div>
//                 <div className="content-row">
//                     <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
//                         <div className="form">
//                             {/* Position */}
//                             <div className="row">
//                                 <label htmlFor="position">Course</label>
//                                 <input
//                                     type="text"
//                                     id="course"
//                                     name="course"
//                                     placeholder="Course Name"
//                                     {...register("course", {
//                                         required: {
//                                             value: true,
//                                             message: "Course Name is required",
//                                         },
//                                         maxLength: {
//                                             value: 100,
//                                             message: "Too long (max 100char)",
//                                         },
//                                         minLength: {
//                                             value: 3,
//                                             message: "Too short (max 3char)",
//                                         },
//                                     })}
//                                 />
//                                 {errors?.course && (
//                                     <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
//                                         {errors?.course?.message}
//                                     </span>
//                                 )}
//                             </div>

//                             {/* Company */}
//                             <div className="row">
//                                 <label htmlFor="company">University</label>
//                                 <input
//                                     type="text"
//                                     id="university"
//                                     name="university"
//                                     placeholder="University Name"
//                                     {...register("university", {
//                                         required: {
//                                             value: true,
//                                             message: "University Name is required",
//                                         },
//                                         maxLength: {
//                                             value: 100,
//                                             message: "Too long (max 100char)",
//                                         },
//                                         minLength: {
//                                             value: 3,
//                                             message: "Too short (max 3char)",
//                                         },
//                                     })}
//                                 />
//                                 {errors?.university && (
//                                     <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
//                                         {errors?.university?.message}
//                                     </span>
//                                 )}
//                             </div>

//                             {/* Location */}
//                             <div className="row">
//                                 <label htmlFor="location">Location</label>
//                                 <input
//                                     type="text"
//                                     id="location"
//                                     name="location"
//                                     placeholder="Location"
//                                     {...register("location", {
//                                         required: {
//                                             value: true,
//                                             message: " Location is required",
//                                         },
//                                         maxLength: {
//                                             value: 100,
//                                             message: "Too long (max 100char)",
//                                         },
//                                         minLength: {
//                                             value: 3,
//                                             message: "Too short (max 3char)",
//                                         },
//                                     })}
//                                 />
//                                 {errors?.location && (
//                                     <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
//                                         {errors?.location?.message}
//                                     </span>
//                                 )}
//                             </div>

//                             {/* Status */}
//                             <div className="row">
//                                 <label htmlFor="status">Course Status</label>
//                                 <select
//                                     defaultValue={"none"}
//                                     name="status"
//                                     id="stauts"
//                                     {...register("status", {
//                                         required: {
//                                             value: true,
//                                             message: " Status is required",
//                                         },
//                                         validate: {
//                                             valueType: (value) => {
//                                                 return (
//                                                     value !== "none" ||
//                                                     " Status is required"
//                                                 );
//                                             },
//                                         },
//                                     })}
//                                 >
//                                     <option disabled value="none">
//                                         Select a Course Status
//                                     </option>

//                                     {School_Status?.map((school, index) => (
//                                         <option value={school} key={index + school}>
//                                             {school}
//                                         </option>
//                                     ))}
//                                 </select>
//                                 {errors?.status && (
//                                     <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
//                                         {errors?.status?.message}
//                                     </span>
//                                 )}
//                             </div>

//                             {/* Type */}
//                             <div className="row">
//                                 <label htmlFor="type">Course Mode</label>
//                                 <select
//                                     defaultValue={"none"}
//                                     name="type"
//                                     id="type"
//                                     {...register("type", {
//                                         required: {
//                                             value: true,
//                                             message: " Type is required",
//                                         },
//                                         validate: {
//                                             valueType: (value) => {
//                                                 return (
//                                                     value !== "none" ||
//                                                     " Type is required"
//                                                 );
//                                             },
//                                         },
//                                     })}
//                                 >
//                                     <option disabled value="none">
//                                         Select a Course Type
//                                     </option>
//                                     {Course_Type?.map((school, index) => (
//                                         <option value={school} key={index + school}>
//                                             {job}
//                                         </option>
//                                     ))}
//                                 </select>
//                                 {errors?.type && (
//                                     <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
//                                         {errors?.type?.message}
//                                     </span>
//                                 )}
//                             </div>

//                             {/* Vacancy */}
//                             <div className="row">
//                                 <label htmlFor="vacancy">Open Applications</label>
//                                 <input
//                                     type="text"
//                                     id="vacancy"
//                                     name="vacancy"
//                                     placeholder="Open Vacancy"
//                                     {...register("vacancy", {
//                                         required: {
//                                             value: true,
//                                             message: "Course vacancy is required",
//                                         },
//                                         max: {
//                                             value: 1000,
//                                             message:
//                                                 "Check number of job vacancy(too much)",
//                                         },
//                                         min: {
//                                             value: 1,
//                                             message:
//                                                 "Job Vacancy can't 0 or smaller",
//                                         },
//                                     })}
//                                 />
//                                 {errors?.vacancy && (
//                                     <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
//                                         {errors?.vacancy?.message}
//                                     </span>
//                                 )}
//                             </div>

//                             {/* Salary */}
//                             <div className="row">
//                                 <label htmlFor="salary">Tuition</label>
//                                 <input
//                                     type="text"
//                                     id="tuition"
//                                     name="tuition"
//                                     placeholder=" Tuition"
//                                     {...register("tuition", {
//                                         required: {
//                                             value: true,
//                                             message: "Tuition is required",
//                                         },
//                                         max: {
//                                             value: 1000000,
//                                             message:
//                                                 "Check number of tuition(too much)",
//                                         },
//                                         min: {
//                                             value: 10,
//                                             message:
//                                                 "can't 0 or smaller",
//                                         },
//                                     })}
//                                 />
//                                 {errors?.tuition && (
//                                     <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
//                                         {errors?.tuition?.message}
//                                     </span>
//                                 )}
//                             </div>

//                             {/* Deadline */}
//                             <div className="row">
//                                 <label htmlFor="deadline">Application Deadline</label>
//                                 <DatePicker
//                                     selected={deadline}
//                                     onChange={(date) => setDeadline(date)}
//                                     minDate={
//                                         new Date(
//                                             new Date().getTime() +
//                                                 3 * 24 * 60 * 60 * 1000
//                                         )
//                                     }
//                                 />
//                             </div>

//                             {/* Contact */}
//                             <div className="row">
//                                 <label htmlFor="contact">Contact Mail</label>
//                                 <input
//                                     type="text"
//                                     id="contact"
//                                     name="contact"
//                                     placeholder="Course Contact"
//                                     {...register("contact", {
//                                         required: {
//                                             value: true,
//                                             message: " contact is required",
//                                         },
//                                     })}
//                                 />
//                                 {errors?.contact && (
//                                     <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
//                                         {errors?.contact?.message}
//                                     </span>
//                                 )}
//                             </div>
//                         </div>

//                         {/* Tag inputs */}
//                         <div className="flex flex-col  min-[600px]:flex-row  justify-between items-center gap-4 mt-5">
//                             <div className="row gap-y-2">
//                                 <label htmlFor="course">
//                                     Requirements
//                                 </label>
//                                 <TagsInput
//                                     value={skills}
//                                     onChange={setSkills}
//                                     name="skills"
//                                     placeHolder="HTML, CSS"
//                                     separators={["Enter", ","]}
//                                     onRemoved={["Backspace"]}
//                                     classNames={{
//                                         tag: "tag-cls",
//                                         input: "input-cls",
//                                     }}
//                                 />
//                             </div>
//                             <div className="row gap-y-2">
//                                 <label htmlFor="position"> Facilities</label>
//                                 <TagsInput
//                                     value={facilities}
//                                     onChange={setFacilities}
//                                     name="facilities"
//                                     placeHolder="Type here"
//                                     separators={["Enter", ","]}
//                                     onRemoved={["Backspace"]}
//                                     classNames={{
//                                         tag: "tag-cls",
//                                         input: "input-cls",
//                                     }}
//                                 />
//                             </div>
//                         </div>

//                         {/* Description */}
//                         <div className="row  mt-5">
//                             <label htmlFor="description">Course Description</label>
//                             <textarea
//                                 type="text"
//                                 id="description"
//                                 name="description"
//                                 placeholder="Course Description"
//                                 className="w-full max-w-none"
//                                 {...register("description", {
//                                     required: {
//                                         value: true,
//                                         message: " description is required",
//                                     },
//                                     maxLength: {
//                                         value: 2000,
//                                         message: "Too long (max 2000char)",
//                                     },
//                                     minLength: {
//                                         value: 10,
//                                         message: "Too short (max 10char)",
//                                     },
//                                 })}
//                             />
//                             {errors?.description && (
//                                 <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
//                                     {errors?.description?.message}
//                                 </span>
//                             )}
//                         </div>

//                         <div className="row mt-4 sm:mt-0">
//                             <label htmlFor="" className="invisible">
//                                 delete
//                             </label>
//                             <input
//                                 type="submit"
//                                 value="submit"
//                                 className="btn"
//                             />
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </Wrapper>
//     );
// }; 



/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styled from "styled-components";
import { CiSquarePlus } from "react-icons/ci";

import { School_Status, Course_Type } from "../utils/SchoolData"; 

import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { TagsInput } from "react-tag-input-component";


const AddSchool = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [deadline, setDeadline] = useState(new Date());
    const [requirements, setRequirements] = useState([]); // Course requirements
    const [facilities, setFacilities] = useState([]); // School facilities
  
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();
  
    const onSubmit = async (data) => {
      setIsLoading(true);
      const newSchool = {
        university: data?.university, // School name
        course: data?.course, // Course
        schoolStatus: data?.schoolStatus, // School status
        courseType: data?.courseType, // Course type (full-time/part-time)
        location: data?.location, // Location of the university
        tuition: data?.tuition, // Tuition fee
        applicationDeadline: deadline + "", // Application deadline
        description: data?.description, // Course description
        requirements: requirements, // Course requirements
        facilities: facilities, // School facilities
        contact: data?.contact, // Contact information
        scholarship: data?.scholarship, // Whether scholarships are available

        // UPDATE 
        // phone: data?.phone, // Phone number
        // email: data?.email, // Email address
        greScore: data?.greScore, // GRE score
        satScore: data?.satScore, // SAT score
        toeflScore: data?.toeflScore, // TOEFL score
        studentAidAvailable: data?.studentAidAvailable, // Student aid availability
      };
      
      console.log(newSchool);
      try {

        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/schools`, // Adjust the endpoint

          newSchool,
          {
            withCredentials: true,
          }
        );
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: response?.data?.message,
        });

        reset();
        setDeadline(new Date());
        setRequirements([]);
        setFacilities([]);
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error?.response?.data,
        });
      }
      setIsLoading(false);
    };

    return (
        <Wrapper>
            <div className="">
                <div className="title-row">
                    Create Course
                    <CiSquarePlus className="ml-1 text-xl md:text-2xl" />
                </div>
                <div className="content-row">
                    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form">
                            {/* Course Name */}
                            <div className="row">
                                <label htmlFor="course">Course</label>
                                <input
                                    type="text"
                                    id="course"
                                    name="course"
                                    placeholder="Course Name"
                                    {...register("course", {
                                        required: {
                                            value: true,
                                            message: "Course Name is required",
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "Too long (max 100 characters)",
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "Too short (min 3 characters)",
                                        },
                                    })}
                                />
                                {errors?.course && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.course?.message}
                                    </span>
                                )}
                            </div>

                            {/* University Name */}
                            <div className="row">
                                <label htmlFor="university">University</label>
                                <input
                                    type="text"
                                    id="university"
                                    name="university"
                                    placeholder="University Name"
                                    {...register("university", {
                                        required: {
                                            value: true,
                                            message: "University Name is required",
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "Too long (max 100 characters)",
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "Too short (min 3 characters)",
                                        },
                                    })}
                                />
                                {errors?.university && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.university?.message}
                                    </span>
                                )}
                            </div>

                            {/* Location */}
                            <div className="row">
                                <label htmlFor="location">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    placeholder="Location"
                                    {...register("location", {
                                        required: {
                                            value: true,
                                            message: "Location is required",
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "Too long (max 100 characters)",
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "Too short (min 3 characters)",
                                        },
                                    })}
                                />
                                {errors?.location && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.location?.message}
                                    </span>
                                )}
                            </div>

                            {/* School Status */}
                            <div className="row">
                                <label htmlFor="schoolStatus">Degree Type</label>
                                <select
                                    defaultValue={"none"}
                                    name="schoolStatus"
                                    id="schoolStatus"
                                    {...register("schoolStatus", {
                                        required: {
                                            value: true,
                                            message: "Degree type is required",
                                        },
                                        validate: {
                                            valueType: (value) => {
                                                return (
                                                    value !== "none" ||
                                                    "Degree type is required"
                                                );
                                            },
                                        },
                                    })}
                                >
                                    <option disabled value="none">
                                        Select a Degree Type
                                    </option>

                                    {School_Status?.map((status, index) => (
                                        <option value={status} key={index + status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                                {errors?.schoolStatus && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.schoolStatus?.message}
                                    </span>
                                )}
                            </div>

                            {/* Course Type */}
                            <div className="row">
                                <label htmlFor="courseType">Course Type</label>
                                <select
                                    defaultValue={"none"}
                                    name="courseType"
                                    id="courseType"
                                    {...register("courseType", {
                                        required: {
                                            value: true,
                                            message: "Course Type is required",
                                        },
                                        validate: {
                                            valueType: (value) => {
                                                return (
                                                    value !== "none" ||
                                                    "Course Type is required"
                                                );
                                            },
                                        },
                                    })}
                                >
                                    <option disabled value="none">
                                        Select a Course Type
                                    </option>
                                    {Course_Type?.map((type, index) => (
                                        <option value={type} key={index + type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                                {errors?.courseType && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.courseType?.message}
                                    </span>
                                )}
                            </div>

                            {/* Tuition */}
                            <div className="row">
                                <label htmlFor="tuition">Tuition</label>
                                <input
                                    type="text"
                                    id="tuition"
                                    name="tuition"
                                    placeholder="Tuition Fee"
                                    {...register("tuition", {
                                        required: {
                                            value: true,
                                            message: "Tuition is required",
                                        },
                                        max: {
                                            value: 1000000,
                                            message:
                                                "Check the number (too high)",
                                        },
                                        min: {
                                            value: 10,
                                            message:
                                                "Tuition can't be 0 or smaller",
                                        },
                                    })}
                                />
                                {errors?.tuition && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.tuition?.message}
                                    </span>
                                )}
                            </div>

                            {/* Application Deadline */}
                            <div className="row">
                                <label htmlFor="applicationDeadline">Application Deadline</label>
                                <DatePicker
                                    selected={deadline}
                                    onChange={(date) => setDeadline(date)}
                                    minDate={
                                        new Date(
                                            new Date().getTime() +
                                                3 * 24 * 60 * 60 * 1000
                                        )
                                    }
                                />
                            </div>

                            {/* Contact Information */}
                            <div className="row">
                                <label htmlFor="contact">Contact Email</label>
                                <input
                                    type="text"
                                    id="contact"
                                    name="contact"
                                    placeholder="Contact Email"
                                    {...register("contact", {
                                        required: {
                                            value: true,
                                            message: "Contact Email is required",
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "Too long (max 100 characters)",
                                        },
                                        minLength: {
                                            value: 5,
                                            message: "Too short (min 5 characters)",
                                        },
                                    })}
                                />
                                {errors?.contact && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.contact?.message}
                                    </span>
                                )}
                            </div>

                            {/* Requirements */}
                            <div className="row">
                                <label htmlFor="requirements">Requirements</label>
                                <TagsInput
                                    value={requirements}
                                    onChange={setRequirements}
                                    name="requirements"
                                    placeHolder="Add course requirements"
                                />
                            </div>

                            {/* Facilities */}
                            <div className="row">
                                <label htmlFor="facilities">Facilities</label>
                                <TagsInput
                                    value={facilities}
                                    onChange={setFacilities}
                                    name="facilities"
                                    placeHolder="Add facilities"
                                />
                            </div>

                            {/* Description */}
                            <div className="row">
                                <label htmlFor="description">Course Description</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    cols="30"
                                    rows="5"
                                    {...register("description", {
                                        required: {
                                            value: true,
                                            message: "Description is required",
                                        },
                                    })}
                                ></textarea>
                                {errors?.description && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.description?.message}
                                    </span>
                                )}
                            </div>

                            {/* Scholarship */}
                            <div className="row">
                                <label htmlFor="scholarship">Scholarship Available?</label>
                                <select
                                    defaultValue={"none"}
                                    name="scholarship"
                                    id="scholarship"
                                    {...register("scholarship", {
                                        required: {
                                            value: true,
                                            message: "Scholarship selection is required",
                                        },
                                    })}
                                >
                                    <option disabled value="none">
                                        Select an option
                                    </option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                                {errors?.scholarship && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.scholarship?.message}
                                    </span>
                                )}
                            </div>







                            {/* UPDATE   */} 


                            {/* Add Phone Number */}
                            {/* <div className="row">
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                type="text"
                                id="phone"
                                name="phone"
                                placeholder="Phone Number"
                                {...register("phone", {
                                    required: {
                                    value: true,
                                    message: "Phone Number is required",
                                    },
                                    pattern: {
                                    value: /^[0-9+() -]{6,20}$/,
                                    message: "Invalid phone number format",
                                    },
                                })}
                                />
                                {errors?.phone && (
                                <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                    {errors?.phone?.message}
                                </span>
                                )}
                            </div> */}

                            {/* Add Email Address */}
                            {/* <div className="row">
                                <label htmlFor="email">Email Address</label>
                                <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email Address"
                                {...register("email", {
                                    required: {
                                    value: true,
                                    message: "Email Address is required",
                                    },
                                    pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email format",
                                    },
                                })}
                                />
                                {errors?.email && (
                                <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                    {errors?.email?.message}
                                </span>
                                )}
                            </div> */}

                            {/* Add GRE Score */}
                            <div className="row">
                                <label htmlFor="grescore">GRE Score</label>
                                <input
                                type="number"
                                id="grescore"
                                name="grescore"
                                placeholder="GRE Score"
                                {...register("grescore", {
                                    required: {
                                    value: true,
                                    message: "GRE Score is required",
                                    },
                                    min: {
                                    value: 260,
                                    message: "GRE Score cannot be below 260",
                                    },
                                    max: {
                                    value: 340,
                                    message: "GRE Score cannot exceed 340",
                                    },
                                })}
                                />
                                {errors?.grescore && (
                                <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                    {errors?.grescore?.message}
                                </span>
                                )}
                            </div>

                            {/* Add SAT Score */}
                            <div className="row">
                                <label htmlFor="satscore">SAT Score</label>
                                <input
                                type="number"
                                id="satscore"
                                name="satscore"
                                placeholder="SAT Score"
                                {...register("satscore", {
                                    required: {
                                    value: true,
                                    message: "SAT Score is required",
                                    },
                                    min: {
                                    value: 400,
                                    message: "SAT Score cannot be below 400",
                                    },
                                    max: {
                                    value: 1600,
                                    message: "SAT Score cannot exceed 1600",
                                    },
                                })}
                                />
                                {errors?.satscore && (
                                <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                    {errors?.satscore?.message}
                                </span>
                                )}
                            </div>

                            {/* Add TOEFL Score */}
                            <div className="row">
                                <label htmlFor="toeflscore">TOEFL Score</label>
                                <input
                                type="number"
                                id="toeflscore"
                                name="toeflscore"
                                placeholder="TOEFL Score"
                                {...register("toeflscore", {
                                    required: {
                                    value: true,
                                    message: "TOEFL Score is required",
                                    },
                                    min: {
                                    value: 0,
                                    message: "TOEFL Score cannot be negative",
                                    },
                                    max: {
                                    value: 120,
                                    message: "TOEFL Score cannot exceed 120",
                                    },
                                })}
                                />
                                {errors?.toeflscore && (
                                <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                    {errors?.toeflscore?.message}
                                </span>
                                )}
                            </div>

                            {/* Add Student Aid Availability */}
                            <div className="row">
                                <label htmlFor="studentAid">Student Aid Available?</label>
                                <select
                                defaultValue={"none"}
                                name="studentAid"
                                id="studentAid"
                                {...register("studentAid", {
                                    required: {
                                    value: true,
                                    message: "Student Aid selection is required",
                                    },
                                })}
                                >
                                <option disabled value="none">
                                    Select an option
                                </option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                                </select>
                                {errors?.studentAid && (
                                <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                    {errors?.studentAid?.message}
                                </span>
                                )}
                            </div>





                            

                            <div className="row flex justify-center w-full">
                                <button
                                    className="submit-btn"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Submitting..." : "Submit"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Wrapper>
    );
};



const Wrapper = styled.section`
    .title-row {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: calc(0.9rem + 0.4vw);
        text-transform: capitalize;
        letter-spacing: 1px;
        font-weight: 600;
        opacity: 0.85;
        color: var(--color-black);
        position: relative;
    }
    .title-row:before {
        content: "";
        position: absolute;
        bottom: -4px;
        left: 0;
        width: calc(30px + 0.7vw);
        height: calc(2px + 0.1vw);
        background-color: var(--color-primary);
    }
    .content-row {
        margin-top: calc(2rem + 0.5vw);
    }
    .form {
        margin-top: calc(30px + 1vw);
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        justify-content: space-between;
        align-items: center;
        grid-gap: calc(1rem + 0.5vw);
    }
    @media screen and (max-width: 1000px) {
        .form {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    @media screen and (max-width: 600px) {
        .form {
            grid-template-columns: 1fr;
        }
    }
    .row {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .row label {
        font-size: 11.3px;
        font-weight: 600;
        letter-spacing: 1px;
        color: var(--color-black);
        opacity: 0.95;
    }
    input,
    select,
    textarea {
        width: 100%;
        max-width: 500px;
        padding: 8px 14px;
        margin-top: 6px;
        display: inline-block;
        border: 1px solid #0000004a;
        border-radius: 4px;
        box-sizing: border-box;
        font-size: calc(0.8rem + 0.1vw);
        outline: none;
        color: var(--color-black);
    }
    textarea {
        max-width: none;
        min-height: 100px;
    }
    select {
        padding-left: 2px;
        text-transform: capitalize;
    }
    input:focus,
    select:focus,
    textarea:focus {
        outline: none;
        border: 1px solid #00000086;
    }
    .input-cls {
        max-width: none;
        width: 100%;
        font-size: 13px;
        padding: 5px 10px;
    }
    .tag-cls {
        font-size: 14px;
    }
    /* .rti--container {
        border: 1px solid #00000086;
    } */
    .btn {
        width: 100%;
        max-width: 150px;
        height: 100%;
        display: inline-block;
        background-color: var(--color-black);
        color: var(--color-white);
        cursor: pointer;
        transition: all 0.3s linear;
        text-transform: capitalize;
        font-size: calc(0.9rem + 0.1vw);
    }
    .btn:hover {
        background-color: var(--color-primary);
    }
    @media screen and (max-width: 600px) {
        .btn {
            margin: 0 auto;
            margin-top: -6px;
        }
    }


    .submit-btn {
    background-color: #1e90ff; /* Blue color */
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  
    &:hover {
      background-color: #1c86ee; /* Darker blue on hover */
      transform: scale(1.05); /* Slightly enlarge the button on hover */
    }

    &:disabled {
      background-color: #cccccc; /* Grey when disabled */
      cursor: not-allowed;
    }
`;
export default AddSchool;
