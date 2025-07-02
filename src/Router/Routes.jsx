
import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import DashboardLayout from "../Layout/DashboardLayout";

// Pages
import {
    Register,
    Login,
    Landing,
    Error,
    AllSchools,
    Stats,
    Profile,
    Admin,
    EditSchool,
    AddSchool,
    ManageSchools,
    School,
    MySchools,
    EditProfile,
    ManageUsers,
    ManageSat,
    ManageWebinar,
    ManageVisitors,
    About,
    Webinar,
    UniversityWebinar,
    Sat,
    Visitor,
    Applications,
} from "../pages";

import { SearchAndFilterContext } from "../context/SearchAndFilterContext"; // Updated context

import CommonProtectRoute from "../components/shared/CommonProtectRoute";
import ProtectAdminRoute from "../components/shared/ProtectAdminRoute";
import RecruiterRoute from "../components/shared/RecruiterRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Landing />,
            },
            {
                // path: "all-schools",
                // element: (
                //     <CommonProtectRoute>
                //         <SearchAndFilterContext> {/* Updated */}
                //             <AllSchools />
                //         </SearchAndFilterContext>
                //     </CommonProtectRoute>
                // ), 

                path: "all-schools",
                element: (
                    <SearchAndFilterContext>
                        <AllSchools />
                    </SearchAndFilterContext>
                ),
            },
            {
                path: "school/:id",
                element: (
                    // <CommonProtectRoute>
                        <SearchAndFilterContext> {/* Updated */}
                            <School />
                        </SearchAndFilterContext>
                    // </CommonProtectRoute>
                ),
            },
            {
                path: "register",
                element: <Register></Register>,
            },
            {
                path: "login",
                element: <Login></Login>,
            },

            {
                path: "about-us", // Add the About Us route
                element: <About />,
            },

            {
                path: "webinar", // Add the route,
                element: <Webinar />,
            },

            {
                path: "university-webinar", // Add the route ,
                element: <UniversityWebinar />,
            },

            {
                path: "visitor", // Add the route
                element: <Visitor />,
            },

            {
                path: "sat", // 
                element: <Sat />,
            },
           
            
            {
                path: "dashboard",
                element: (
                    <CommonProtectRoute>
                        <SearchAndFilterContext> {/* Updated */}
                            <DashboardLayout></DashboardLayout>
                        </SearchAndFilterContext>
                    </CommonProtectRoute>
                ),
                children: [
                    {
                        index: true,
                        element: <Profile />,
                    },
                    {
                        path: "edit-profile/:id",
                        element: <EditProfile />,
                    },
                    {
                        path: "stats",
                        element: (
                            <ProtectAdminRoute>
                                <Stats />
                            </ProtectAdminRoute>
                        ),
                    },
                    {
                        path: "add-school",
                        element: (
                            <RecruiterRoute>
                                <AddSchool />
                            </RecruiterRoute>
                        ),
                    },
                    {
                        path: "manage-schools",
                        element: (
                            <RecruiterRoute>
                                <ManageSchools />
                            </RecruiterRoute>
                        ),
                    },
                    {
                        path: "manage-users",
                        element: (
                            <ProtectAdminRoute>
                                <ManageUsers />
                            </ProtectAdminRoute>
                        ),
                    },
                    {
                        path: "manage-sat",
                        element: (
                            <ProtectAdminRoute>
                                <ManageSat />
                            </ProtectAdminRoute>
                        ),
                    },
                    {
                        path: "manage-webinars",
                        element: (
                            <ProtectAdminRoute>
                                <ManageWebinar /> 
                            </ProtectAdminRoute>
                        ),
                    },

                    // {
                    //     path: "manage-university-webinars",
                    //     element: (
                    //         <ProtectAdminRoute>
                    //             <ManageUniversityWebinar /> 
                    //         </ProtectAdminRoute>
                    //     ),
                    // },

                    {
                        path: "manage-visitors",
                        element: (
                            <ProtectAdminRoute>
                                <ManageVisitors /> 
                            </ProtectAdminRoute>
                        ),
                    },
                    {
                        path: "applications",
                        element: (
                            <ProtectAdminRoute>
                                <Applications /> 
                            </ProtectAdminRoute>
                        ),
                    },
                    {
                        path: "admin",
                        element: (
                            <ProtectAdminRoute>
                                <Admin />
                            </ProtectAdminRoute>
                        ),
                    },
                    {
                        path: "edit-school/:id",
                        element: (
                            <RecruiterRoute>
                                <EditSchool />
                            </RecruiterRoute>
                        ),
                    },
                    {
                        path: "my-schools",
                        element: (
                            <CommonProtectRoute>
                                <MySchools />
                            </CommonProtectRoute>
                        ),
                    },
                ],
            },
        ],
    },
]);

export default router;
























// import { createBrowserRouter } from "react-router-dom";
// import HomeLayout from "../Layout/HomeLayout";
// import DashboardLayout from "../Layout/DashboardLayout";

// // Pages
// import {
//     Register,
//     Login,
//     Landing,
//     Error,
//     AllSchools,
//     Stats,
//     Profile,
//     Admin,
//     EditSchool,
//     AddSchool,
//     ManageSchools,
//     School,
//     MySchools,
//     EditProfile,
//     ManageUsers,
//     ManageSat,
//     ManageWebinar,
//     ManageVisitors,
//     About,
//     Webinar,
//     Sat,
//     Visitor,
//     Applications,
// } from "../pages";

// import { SearchAndFilterContext } from "../context/SearchAndFilterContext"; // Updated context

// import CommonProtectRoute from "../components/shared/CommonProtectRoute";
// import ProtectAdminRoute from "../components/shared/ProtectAdminRoute";
// import RecruiterRoute from "../components/shared/RecruiterRoute";

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <HomeLayout></HomeLayout>,
//         errorElement: <Error />,
//         children: [
//             {
//                 index: true,
//                 element: <Landing />,
//             },
//             {
//                 // path: "all-schools",
//                 // element: (
//                 //     <CommonProtectRoute>
//                 //         <SearchAndFilterContext> {/* Updated */}
//                 //             <AllSchools />
//                 //         </SearchAndFilterContext>
//                 //     </CommonProtectRoute>
//                 // ), 

//                 path: "all-schools",
//                 element: (
//                     <SearchAndFilterContext>
//                         <AllSchools />
//                     </SearchAndFilterContext>
//                 ),
//             },
//             {
//                 path: "school/:id",
//                 element: (
//                     // <CommonProtectRoute>
//                         <SearchAndFilterContext> {/* Updated */}
//                             <School />
//                         </SearchAndFilterContext>
//                     // </CommonProtectRoute>
//                 ),
//             },
//             {
//                 path: "register",
//                 element: <Register></Register>,
//             },
//             {
//                 path: "login",
//                 element: <Login></Login>,
//             },

//             {
//                 path: "about-us", // Add the About Us route
//                 element: <About />,
//             },

//             {
//                 path: "webinar", // Add the route
//                 element: <Webinar />,
//             },

//             {
//                 path: "visitor", // Add the route
//                 element: <Visitor />,
//             },

//             {
//                 path: "sat", // 
//                 element: <Sat />,
//             },
           
            
//             {
//                 path: "dashboard",
//                 element: (
//                     <CommonProtectRoute>
//                         <SearchAndFilterContext> {/* Updated */}
//                             <DashboardLayout></DashboardLayout>
//                         </SearchAndFilterContext>
//                     </CommonProtectRoute>
//                 ),
//                 children: [
//                     {
//                         index: true,
//                         element: <Profile />,
//                     },
//                     {
//                         path: "edit-profile/:id",
//                         element: <EditProfile />,
//                     },
//                     {
//                         path: "stats",
//                         element: (
//                             <ProtectAdminRoute>
//                                 <Stats />
//                             </ProtectAdminRoute>
//                         ),
//                     },
//                     {
//                         path: "add-school",
//                         element: (
//                             <RecruiterRoute>
//                                 <AddSchool />
//                             </RecruiterRoute>
//                         ),
//                     },
//                     {
//                         path: "manage-schools",
//                         element: (
//                             <RecruiterRoute>
//                                 <ManageSchools />
//                             </RecruiterRoute>
//                         ),
//                     },
//                     {
//                         path: "manage-users",
//                         element: (
//                             <ProtectAdminRoute>
//                                 <ManageUsers />
//                             </ProtectAdminRoute>
//                         ),
//                     },
//                     {
//                         path: "manage-sat",
//                         element: (
//                             <ProtectAdminRoute>
//                                 <ManageSat />
//                             </ProtectAdminRoute>
//                         ),
//                     },
//                     {
//                         path: "manage-webinars",
//                         element: (
//                             <ProtectAdminRoute>
//                                 <ManageWebinar /> 
//                             </ProtectAdminRoute>
//                         ),
//                     },
//                     {
//                         path: "manage-visitors",
//                         element: (
//                             <ProtectAdminRoute>
//                                 <ManageVisitors /> 
//                             </ProtectAdminRoute>
//                         ),
//                     },
//                     {
//                         path: "applications",
//                         element: (
//                             <ProtectAdminRoute>
//                                 <Applications /> 
//                             </ProtectAdminRoute>
//                         ),
//                     },
//                     {
//                         path: "admin",
//                         element: (
//                             <ProtectAdminRoute>
//                                 <Admin />
//                             </ProtectAdminRoute>
//                         ),
//                     },
//                     {
//                         path: "edit-school/:id",
//                         element: (
//                             <RecruiterRoute>
//                                 <EditSchool />
//                             </RecruiterRoute>
//                         ),
//                     },
//                     {
//                         path: "my-schools",
//                         element: (
//                             <CommonProtectRoute>
//                                 <MySchools />
//                             </CommonProtectRoute>
//                         ),
//                     },
//                 ],
//             },
//         ],
//     },
// ]);

// export default router;
























// import { createBrowserRouter } from "react-router-dom";
// import HomeLayout from "../Layout/HomeLayout";
// import DashboardLayout from "../Layout/DashboardLayout";

// // Pages
// import {
//     Register,
//     Login,
//     Landing,
//     Error,
//     AllSchools,
//     Stats,
//     Profile,
//     Admin,
//     EditSchool,
//     AddSchool,
//     ManageSchools,
//     School,
//     MySchools,
//     EditProfile,
//     ManageUsers,
//     About,
// } from "../pages";

// import { SearchAndFilterContext } from "../context/SearchAndFilterContext"; // Updated context

// import CommonProtectRoute from "../components/shared/CommonProtectRoute";
// import ProtectAdminRoute from "../components/shared/ProtectAdminRoute";
// import RecruiterRoute from "../components/shared/RecruiterRoute";

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <HomeLayout></HomeLayout>,
//         errorElement: <Error />,
//         children: [
//             {
//                 index: true,
//                 element: <Landing />,
//             },
//             {
//                 // path: "all-schools",
//                 // element: (
//                 //     <CommonProtectRoute>
//                 //         <SearchAndFilterContext> {/* Updated */}
//                 //             <AllSchools />
//                 //         </SearchAndFilterContext>
//                 //     </CommonProtectRoute>
//                 // ), 

//                 path: "all-schools",
//                 element: (
//                     <SearchAndFilterContext>
//                         <AllSchools />
//                     </SearchAndFilterContext>
//                 ),
//             },
//             {
//                 path: "school/:id",
//                 element: (
//                     <CommonProtectRoute>
//                         <SearchAndFilterContext> {/* Updated */}
//                             <School />
//                         </SearchAndFilterContext>
//                     </CommonProtectRoute>
//                 ),
//             },
//             {
//                 path: "register",
//                 element: <Register></Register>,
//             },
//             {
//                 path: "login",
//                 element: <Login></Login>,
//             },

//             {
//                 path: "about-us", // Add the About Us route
//                 element: <About />,
//             },


//             {
//                 path: "dashboard",
//                 element: (
//                     <CommonProtectRoute>
//                         <SearchAndFilterContext> {/* Updated */}
//                             <DashboardLayout></DashboardLayout>
//                         </SearchAndFilterContext>
//                     </CommonProtectRoute>
//                 ),
//                 children: [
//                     {
//                         index: true,
//                         element: <Profile />,
//                     },
//                     {
//                         path: "edit-profile/:id",
//                         element: <EditProfile />,
//                     },
//                     {
//                         path: "stats",
//                         element: (
//                             <ProtectAdminRoute>
//                                 <Stats />
//                             </ProtectAdminRoute>
//                         ),
//                     },
//                     {
//                         path: "add-school",
//                         element: (
//                             <RecruiterRoute>
//                                 <AddSchool />
//                             </RecruiterRoute>
//                         ),
//                     },
//                     {
//                         path: "manage-schools",
//                         element: (
//                             <RecruiterRoute>
//                                 <ManageSchools />
//                             </RecruiterRoute>
//                         ),
//                     },
//                     {
//                         path: "manage-users",
//                         element: (
//                             <ProtectAdminRoute>
//                                 <ManageUsers />
//                             </ProtectAdminRoute>
//                         ),
//                     },
//                     {
//                         path: "admin",
//                         element: (
//                             <ProtectAdminRoute>
//                                 <Admin />
//                             </ProtectAdminRoute>
//                         ),
//                     },
//                     {
//                         path: "edit-school/:id",
//                         element: (
//                             <RecruiterRoute>
//                                 <EditSchool />
//                             </RecruiterRoute>
//                         ),
//                     },
//                     {
//                         path: "my-schools",
//                         element: (
//                             <CommonProtectRoute>
//                                 <MySchools />
//                             </CommonProtectRoute>
//                         ),
//                     },
//                 ],
//             },
//         ],
//     },
// ]);

// export default router;
























// import { createBrowserRouter } from "react-router-dom";
// import HomeLayout from "../Layout/HomeLayout";
// import DashboardLayout from "../Layout/DashboardLayout";

// // Pages
// import {
//     Register,
//     Login,
//     Landing,
//     Error,
//     AllSchools,
//     Stats,
//     Profile,
//     Admin,
//     EditSchool,
//     AddSchool,
//     ManageSchools,
//     School,
//     MySchools,
//     EditProfile,
//     ManageUsers,
// } from "../pages";

// import { SearchAndFilterContext } from "../context/SearchAndFilterContext"; // Updated context

// import CommonProtectRoute from "../components/shared/CommonProtectRoute";
// import ProtectAdminRoute from "../components/shared/ProtectAdminRoute";
// import RecruiterRoute from "../components/shared/RecruiterRoute";

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <HomeLayout></HomeLayout>,
//         errorElement: <Error />,
//         children: [
//             {
//                 index: true,
//                 element: <Landing />,
//             },
//             {
//                 path: "all-schools",
//                 element: (
//                     <CommonProtectRoute>
//                         <SearchAndFilterContext> {/* Updated */}
//                             <AllSchools />
//                         </SearchAndFilterContext>
//                     </CommonProtectRoute>
//                 ),
//             },
//             {
//                 path: "school/:id",
//                 element: (
//                     <CommonProtectRoute>
//                         <SearchAndFilterContext> {/* Updated */}
//                             <School />
//                         </SearchAndFilterContext>
//                     </CommonProtectRoute>
//                 ),
//             },
//             {
//                 path: "register",
//                 element: <Register></Register>,
//             },
//             {
//                 path: "login",
//                 element: <Login></Login>,
//             },
//             {
//                 path: "dashboard",
//                 element: (
//                     <CommonProtectRoute>
//                         <SearchAndFilterContext> {/* Updated */}
//                             <DashboardLayout></DashboardLayout>
//                         </SearchAndFilterContext>
//                     </CommonProtectRoute>
//                 ),
//                 children: [
//                     {
//                         index: true,
//                         element: <Profile />,
//                     },
//                     {
//                         path: "edit-profile/:id",
//                         element: <EditProfile />,
//                     },
//                     {
//                         path: "stats",
//                         element: (
//                             <ProtectAdminRoute>
//                                 <Stats />
//                             </ProtectAdminRoute>
//                         ),
//                     },
//                     {
//                         path: "add-school",
//                         element: (
//                             <RecruiterRoute>
//                                 <AddSchool />
//                             </RecruiterRoute>
//                         ),
//                     },
//                     {
//                         path: "manage-schools",
//                         element: (
//                             <RecruiterRoute>
//                                 <ManageSchools />
//                             </RecruiterRoute>
//                         ),
//                     },
//                     {
//                         path: "manage-users",
//                         element: (
//                             <ProtectAdminRoute>
//                                 <ManageUsers />
//                             </ProtectAdminRoute>
//                         ),
//                     },
//                     {
//                         path: "admin",
//                         element: (
//                             <ProtectAdminRoute>
//                                 <Admin />
//                             </ProtectAdminRoute>
//                         ),
//                     },
//                     {
//                         path: "edit-school/:id",
//                         element: (
//                             <RecruiterRoute>
//                                 <EditSchool />
//                             </RecruiterRoute>
//                         ),
//                     },
//                     {
//                         path: "my-schools",
//                         element: (
//                             <CommonProtectRoute>
//                                 <MySchools />
//                             </CommonProtectRoute>
//                         ),
//                     },
//                 ],
//             },
//         ],
//     },
// ]);

// export default router;















// import { createBrowserRouter } from "react-router-dom";
// import HomeLayout from "../Layout/HomeLayout";
// import DashboardLayout from "../Layout/DashboardLayout";

// // Pages
// import {
//     Register,
//     Login,
//     Landing,
//     Error,
//     AllSchools,
//     Stats,
//     Profile,
//     Admin,
//     EditSchool,
//     AddSchool,
//     ManageSchools,
//     School,
//     MySchools,
//     EditProfile,
//     ManageUsers,
// } from "../pages";

// import { SchoolContext } from "../context/SchoolContext";

// import CommonProtectRoute from "../components/shared/CommonProtectRoute";
// import ProtectAdminRoute from "../components/shared/ProtectAdminRoute";
// import RecruiterRoute from "../components/shared/RecruiterRoute";

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <HomeLayout></HomeLayout>,
//         errorElement: <Error />,
//         children: [
//             {
//                 index: true,
//                 element: <Landing />,
//             },
//             {
//                 path: "all-schools",
//                 element: (
//                     <CommonProtectRoute>
//                         <SchoolContext>
//                             <AllSchools />
//                         </SchoolContext>
//                     </CommonProtectRoute>
//                 ),
//             },
//             {
//                 path: "school/:id",
//                 element: (
//                     <CommonProtectRoute>
//                         <SchoolContext>
//                             <School />
//                         </SchoolContext>
//                     </CommonProtectRoute>
//                 ),
//             },
//             {
//                 path: "register",
//                 element: <Register></Register>,
//             },
//             {
//                 path: "login",
//                 element: <Login></Login>,
//             },
//             {
//                 path: "dashboard",
//                 element: (
//                     <CommonProtectRoute>
//                         <SchoolContext>
//                             <DashboardLayout></DashboardLayout>
//                         </SchoolContext>
//                     </CommonProtectRoute>
//                 ),
//                 children: [
//                     {
//                         index: true,
//                         element: <Profile />,
//                     },
//                     {
//                         path: "edit-profile/:id",
//                         element: <EditProfile />,
//                     },
//                     {
//                         path: "stats",
//                         element: (
//                             <ProtectAdminRoute>
//                                 <Stats />
//                             </ProtectAdminRoute>
//                         ),
//                     },
//                     {
//                         path: "add-school",
//                         element: (
//                             <RecruiterRoute>
//                                 <AddSchool />
//                             </RecruiterRoute>
//                         ),
//                     },
//                     {
//                         path: "manage-schools",
//                         element: (
//                             <RecruiterRoute>
//                                 <ManageSchools />
//                             </RecruiterRoute>
//                         ),
//                     },
//                     {
//                         path: "manage-users",
//                         element: (
//                             <ProtectAdminRoute>
//                                 <ManageUsers />
//                             </ProtectAdminRoute>
//                         ),
//                     },
//                     {
//                         path: "admin",
//                         element: (
//                             <ProtectAdminRoute>
//                                 <Admin />
//                             </ProtectAdminRoute>
//                         ),
//                     },
//                     {
//                         path: "edit-school/:id",
//                         element: (
//                             <RecruiterRoute>
//                                 <EditSchool />
//                             </RecruiterRoute>
//                         ),
//                     },
//                     {
//                         path: "my-schools",
//                         element: (
//                             <CommonProtectRoute>
//                                 <MySchools />
//                             </CommonProtectRoute>
//                         ),
//                     },
//                 ],
//             },
//         ],
//     },
// ]);

// export default router;











// import { createBrowserRouter } from "react-router-dom";
// import HomeLayout from "../Layout/HomeLayout";
// import DashboardLayout from "../Layout/DashboardLayout";

// // Pages
// import {
//     Register,
//     Login,
//     Landing,
//     Error,
//     AllJobs,
//     Stats,
//     Profile,
//     Admin,
//     EditJob,
//     AddJob,
//     ManageJobs,
//     Job,
//     MyJobs,
//     EditProfile,
//     ManageUsers,
// } from "../pages";

// import { JobContext } from "../context/JobContext";

// import CommonProtectRoute from "../components/shared/CommonProtectRoute";
// import ProtectAdminRoute from "../components/shared/ProtectAdminRoute";
// import RecruiterRoute from "../components/shared/RecruiterRoute";

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <HomeLayout></HomeLayout>,
//         errorElement: <Error />,
//         children: [
//             {
//                 index: true,
//                 element: <Landing />,
//             },
//             {
//                 path: "all-jobs",
//                 element: (
//                     <CommonProtectRoute>
//                         <JobContext>
//                             <AllJobs />
//                         </JobContext>
//                     </CommonProtectRoute>
//                 ),
//             },
//             {
//                 path: "job/:id",
//                 element: (
//                     <CommonProtectRoute>
//                         <JobContext>
//                             <Job />
//                         </JobContext>
//                     </CommonProtectRoute>
//                 ),
//             },
//             {
//                 path: "register",
//                 element: <Register></Register>,
//             },
//             {
//                 path: "login",
//                 element: <Login></Login>,
//             },
//             {
//                 path: "dashboard",
//                 element: (
//                     <CommonProtectRoute>
//                         <JobContext>
//                             <DashboardLayout></DashboardLayout>
//                         </JobContext>
//                     </CommonProtectRoute>
//                 ),
//                 children: [
//                     {
//                         index: true,
//                         element: <Profile />,
//                     },
//                     {
//                         path: "edit-profile/:id",
//                         element: <EditProfile />,
//                     },
//                     {
//                         path: "stats",
//                         element: (
//                             <ProtectAdminRoute>
//                                 <Stats />
//                             </ProtectAdminRoute>
//                         ),
//                     },
//                     {
//                         path: "add-jobs",
//                         element: (
//                             <RecruiterRoute>
//                                 <AddJob />
//                             </RecruiterRoute>
//                         ),
//                     },
//                     {
//                         path: "manage-jobs",
//                         element: (
//                             <RecruiterRoute>
//                                 <ManageJobs />
//                             </RecruiterRoute>
//                         ),
//                     },
//                     {
//                         path: "manage-users",
//                         element: (
//                             <ProtectAdminRoute>
//                                 <ManageUsers />
//                             </ProtectAdminRoute>
//                         ),
//                     },
//                     {
//                         path: "admin",
//                         element: (
//                             <ProtectAdminRoute>
//                                 <Admin />
//                             </ProtectAdminRoute>
//                         ),
//                     },
//                     {
//                         path: "edit-job/:id",
//                         element: (
//                             <RecruiterRoute>
//                                 <EditJob />
//                             </RecruiterRoute>
//                         ),
//                     },
//                     {
//                         path: "my-jobs",
//                         element: (
//                             <CommonProtectRoute>
//                                 <MyJobs />
//                             </CommonProtectRoute>
//                         ),
//                     },
//                 ],
//             },
//         ],
//     },
// ]);

// export default router;
