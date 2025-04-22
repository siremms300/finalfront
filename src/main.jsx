import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import './App.css'
import router from "./Router/Routes";
import { RouterProvider } from "react-router-dom";

import { SchoolContext } from "./context/SchoolContext"; // Import  
import { ApplicationProvider } from "./context/ApplicationContext"; // Import ApplicationProvider 
import { WebinarProvider } from "./context/WebinarContext"; // Add this import
import { SATProvider } from "./context/SatContext";
import { VisitorProvider } from "./context/VisitorContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { UserContext } from "./context/UserContext";
import axios from "axios";
 
axios.defaults.withCredentials = true;

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode> 
        <QueryClientProvider client={queryClient}>
            <UserContext>
                {/* <RouterProvider router={router}></RouterProvider>    */}
                {/* ///////////////////// THE BLOCK BELOW WAS THE ADDITION AND THE LINE ABOVE WAS WHAT WAS BEING USED*/}
                <SchoolContext >
                    <ApplicationProvider>          
                        <WebinarProvider> {/* Add WebinarProvider here */}
                            <SATProvider>
                                <VisitorProvider>                                    
                                    <RouterProvider router={router}></RouterProvider>
                                </VisitorProvider> 
                            </SATProvider>
                        </WebinarProvider> 
                        {/* <RouterProvider router={router}></RouterProvider> */}
                    </ApplicationProvider>
                </SchoolContext >
                {/* //////////// THE BLOCK ABOVE WAS THE ADDITION //////// */}
            </UserContext>
        </QueryClientProvider>
    </React.StrictMode>
);










// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import './App.css'
// import router from "./Router/Routes";
// import { RouterProvider } from "react-router-dom";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { UserContext } from "./context/UserContext";
// import axios from "axios";

// axios.defaults.withCredentials = true;

// // Create a client
// const queryClient = new QueryClient();

// ReactDOM.createRoot(document.getElementById("root")).render(
//     <React.StrictMode>
//         {/* <UserContext>
//             <RouterProvider router={router}></RouterProvider>
//         </UserContext> */}

//         <QueryClientProvider client={queryClient}>
//             <UserContext>
//                 <RouterProvider router={router}></RouterProvider>
//             </UserContext>
//         </QueryClientProvider>
//     </React.StrictMode>
// );
