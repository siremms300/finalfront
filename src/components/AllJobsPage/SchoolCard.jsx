import React from "react";
import { TfiLocationPin } from "react-icons/tfi";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import dayjs from "dayjs";

const SchoolCard = ({ school }) => {
  const { user } = useUserContext();
  const date = dayjs(school?.applicationDeadline).format("MMM Do, YYYY");

  return (
    <div style={styles.card}>
      <Link to={`/school/${school._id}`} style={styles.link}>
        <h3 style={styles.title}>{school?.course}</h3>
        <div style={styles.university}>{school?.university}</div>
        <div style={styles.info}>
          <span style={styles.infoItem}>
            <TfiLocationPin style={styles.icon} />
            {school?.location}
          </span>
          <span style={styles.infoItem}>
            <BsFillBriefcaseFill style={styles.icon} />
            {school?.courseType}
          </span>
          <span style={styles.infoItem}>
            <FaRegCalendarAlt style={styles.icon} />
            {date}
          </span>
        </div>
        {school?.scholarship && (
          <div style={styles.scholarship}>
            Scholarship Available: {school?.scholarship ? "Yes" : "No"}
          </div>
        )}
        <div style={styles.degree}>
          <strong>Degree: </strong>
          {school?.schoolStatus}
        </div>
      </Link>
      <div style={styles.actions}>
        <Link to={`/school/${school._id}`} style={styles.detailsButton}>
          Details
        </Link>
        {user?.role === "user" && (
          <button
            style={styles.applyButton}
            onClick={() => handleApply(school._id)}
          >
            Apply
          </button>
        )}
        {user?._id === school?.createdBy && (
          <Link to={`/dashboard/edit-school/${school._id}`} style={styles.editButton}>
            Edit
          </Link>
        )}
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    margin: "16px auto",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s, box-shadow 0.3s",
    width: "100%",
    maxWidth: "600px",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
    },
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  title: {
    fontSize: "24px",
    color: "#1a0dab",
    marginBottom: "8px",
    fontWeight: "600",
  },
  university: {
    fontSize: "16px",
    color: "#006621",
    marginBottom: "12px",
    fontWeight: "500",
  },
  info: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    fontSize: "14px",
    color: "#545454",
    marginBottom: "16px",
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  icon: {
    color: "#757575",
  },
  scholarship: {
    fontSize: "14px",
    color: "#008000",
    marginBottom: "8px",
    fontWeight: "500",
  },
  degree: {
    fontSize: "14px",
    color: "#333",
    marginBottom: "16px",
  },
  actions: {
    display: "flex",
    gap: "12px",
    marginTop: "16px",
  },
  detailsButton: {
    fontSize: "14px",
    padding: "8px 16px",
    borderRadius: "6px",
    border: "1px solid #dadce0",
    backgroundColor: "#f8f9fa",
    color: "#1a73e8",
    textDecoration: "none",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s",
    "&:hover": {
      backgroundColor: "#1a73e8",
      color: "#fff",
    },
  },
  applyButton: {
    fontSize: "14px",
    padding: "8px 16px",
    borderRadius: "6px",
    border: "1px solid #1a73e8",
    backgroundColor: "#1a73e8",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#1557b0",
    },
  },
  editButton: {
    fontSize: "14px",
    padding: "8px 16px",
    borderRadius: "6px",
    border: "1px solid #34a853",
    backgroundColor: "#34a853",
    color: "#fff",
    textDecoration: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#2a8a46",
    },
  },
};

export default SchoolCard;












// import React from "react";
// import { TfiLocationPin } from "react-icons/tfi";
// import { BsFillBriefcaseFill } from "react-icons/bs";
// import { FaRegCalendarAlt } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { useUserContext } from "../../context/UserContext";
// import dayjs from "dayjs";

// const SchoolCard = ({ school }) => {
//   const { user } = useUserContext();
//   const date = dayjs(school?.applicationDeadline).format("MMM Do, YYYY");

//   return (
//     <div style={styles.card}>
//       <Link to={`/school/${school._id}`} style={styles.link}>
//         <div style={styles.cardDetails}>
//           <h3 style={styles.position}>{school?.course}</h3>
//           <div style={styles.universityName}>{school?.university}</div>
//           <div style={styles.infoRow}>
//             <span style={styles.infoItem}>
//               <TfiLocationPin /> {school?.location}
//             </span>
//             <span style={styles.infoItem}>
//               <BsFillBriefcaseFill /> {school?.courseType}
//             </span>
//             <span style={styles.infoItem}>
//               <FaRegCalendarAlt /> {date}
//             </span>
//           </div>
//           {school?.scholarship && (
//             <div style={styles.scholarshipInfo}>
//               <span>Scholarship Available: {school?.scholarship ? "Yes" : "No"}</span>
//             </div>
//           )}
//           {/* New addition to display the schoolStatus */}
//           <div style={styles.statusRow}>
//             <strong>Degree: </strong>
//             <span style={styles.schoolStatus}>{school?.schoolStatus}</span>
//           </div>
//         </div>
//       </Link>
//       <div style={styles.endRow}>
//         <Link to={`/school/${school._id}`} style={styles.detailBtn}>
//           Details
//         </Link>
//         {user?.role === "user" && (
//           <button
//             style={styles.applyBtn}
//             onClick={() => handleApply(school._id)}
//           >
//             Apply
//           </button>
//         )}
//         {user?._id === school?.createdBy && (
//           <Link
//             to={`/dashboard/edit-school/${school._id}`}
//             style={styles.detailBtn}
//           >
//             Edit
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   card: {
//     margin: "16px 0",
//     padding: "16px",
//     border: "1px solid #ddd",
//     borderRadius: "8px",
//     boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//     backgroundColor: "#fff",
//     display: "flex",
//     flexDirection: "column",
//     transition: "box-shadow 0.3s",
//     cursor: "pointer",
//   },
//   link: {
//     textDecoration: "none",
//     color: "inherit",
//     display: "block",
//     marginBottom: "8px",
//   },
//   cardDetails: {
//     marginBottom: "8px",
//   },
//   position: {
//     fontSize: "18px",
//     color: "#1a0dab",
//     marginBottom: "4px",
//   },
//   universityName: {
//     color: "#006621",
//     fontSize: "14px",
//     marginBottom: "8px",
//   },
//   infoRow: {
//     color: "#545454",
//     fontSize: "13px",
//     display: "flex",
//     gap: "16px",
//   },
//   infoItem: {
//     display: "flex",
//     alignItems: "center",
//     gap: "4px",
//   },
//   scholarshipInfo: {
//     fontSize: "14px",
//     color: "#008000",
//     marginTop: "10px",
//   },
//   // New styles for the school status
//   statusRow: {
//     fontSize: "14px",
//     marginTop: "8px",
//     color: "#333",
//   },
//   schoolStatus: {
//     fontWeight: "bold",
//     color: "#ff5722",
//   },
//   endRow: {
//     display: "flex",
//     alignItems: "center",
//     gap: "8px",
//     marginTop: "auto",
//   },
//   detailBtn: {
//     color: "#1a73e8",
//     textDecoration: "none",
//     fontSize: "14px",
//     padding: "4px 8px",
//     backgroundColor: "#f8f9fa",
//     borderRadius: "4px",
//     border: "1px solid #dadce0",
//     cursor: "pointer",
//     transition: "background-color 0.3s",
//   },
//   applyBtn: {
//     color: "#fff",
//     backgroundColor: "#1a73e8",
//     borderRadius: "4px",
//     padding: "4px 8px",
//     border: "1px solid #1a73e8",
//     cursor: "pointer",
//     fontSize: "14px",
//     transition: "background-color 0.3s",
//   },
// };

// export default SchoolCard;





















// import React from "react";
// import { TfiLocationPin } from "react-icons/tfi";
// import { BsFillBriefcaseFill } from "react-icons/bs";
// import { FaRegCalendarAlt } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { useUserContext } from "../../context/UserContext";
// import dayjs from "dayjs";

// const SchoolCard = ({ school }) => {
//   const { user } = useUserContext();
//   const date = dayjs(school?.applicationDeadline).format("MMM Do, YYYY");

//   return (
//     <div style={styles.card}>
//       <Link to={`/school/${school._id}`} style={styles.link}>
//         <div style={styles.cardDetails}>
//           <h3 style={styles.position}>{school?.course}</h3>
//           <div style={styles.universityName}>{school?.university}</div>
//           <div style={styles.infoRow}>
//             <span style={styles.infoItem}>
//               <TfiLocationPin /> {school?.location}
//             </span>
//             <span style={styles.infoItem}>
//               <BsFillBriefcaseFill /> {school?.courseMode}
//             </span>
//             <span style={styles.infoItem}>
//               <FaRegCalendarAlt /> {date}
//             </span>
//           </div>
//           {school?.scholarship && (
//             <div style={styles.scholarshipInfo}>
//               <span>Scholarship Available: {school?.scholarship ? "Yes" : "No"}</span>
//             </div>
//           )}
//         </div>
//       </Link>
//       <div style={styles.endRow}>
//         <Link to={`/school/${school._id}`} style={styles.detailBtn}>
//           Details
//         </Link>
//         {user?.role === "user" && (
//           <button
//             style={styles.applyBtn}
//             onClick={() => handleApply(school._id)}
//           >
//             Apply
//           </button>
//         )}
//         {user?._id === school?.createdBy && (
//           <Link
//             to={`/dashboard/edit-school/${school._id}`}
//             style={styles.detailBtn}
//           >
//             Edit
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   card: {
//     margin: "16px 0",
//     padding: "16px",
//     border: "1px solid #ddd",
//     borderRadius: "8px",
//     boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//     backgroundColor: "#fff",
//     display: "flex",
//     flexDirection: "column",
//     transition: "box-shadow 0.3s",
//     cursor: "pointer",
//   },
//   link: {
//     textDecoration: "none",
//     color: "inherit",
//     display: "block",
//     marginBottom: "8px",
//   },
//   cardDetails: {
//     marginBottom: "8px",
//   },
//   position: {
//     fontSize: "18px",
//     color: "#1a0dab",
//     marginBottom: "4px",
//   },
//   universityName: {
//     color: "#006621",
//     fontSize: "14px",
//     marginBottom: "8px",
//   },
//   infoRow: {
//     color: "#545454",
//     fontSize: "13px",
//     display: "flex",
//     gap: "16px",
//   },
//   infoItem: {
//     display: "flex",
//     alignItems: "center",
//     gap: "4px",
//   },
//   scholarshipInfo: {
//     fontSize: "14px",
//     color: "#008000",
//     marginTop: "10px",
//   },
//   endRow: {
//     display: "flex",
//     alignItems: "center",
//     gap: "8px",
//     marginTop: "auto",
//   },
//   detailBtn: {
//     color: "#1a73e8",
//     textDecoration: "none",
//     fontSize: "14px",
//     padding: "4px 8px",
//     backgroundColor: "#f8f9fa",
//     borderRadius: "4px",
//     border: "1px solid #dadce0",
//     cursor: "pointer",
//     transition: "background-color 0.3s",
//   },
//   applyBtn: {
//     color: "#fff",
//     backgroundColor: "#1a73e8",
//     borderRadius: "4px",
//     padding: "4px 8px",
//     border: "1px solid #1a73e8",
//     cursor: "pointer",
//     fontSize: "14px",
//     transition: "background-color 0.3s",
//   },
// };

// export default SchoolCard;


















// import React from "react";
// import { TfiLocationPin } from "react-icons/tfi";
// import { BsFillBriefcaseFill } from "react-icons/bs";
// import { FaRegCalendarAlt } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { useUserContext } from "../../context/UserContext";
// import dayjs from "dayjs";



// const SchoolCard = ({ school }) => {
//   const { user } = useUserContext();
//   const date = dayjs(school?.applicationDeadline).format("MMM Do, YYYY");

//   return (
//     <div style={styles.card}>
//       <Link to={`/school/${school._id}`} style={styles.link}>
//         <div style={styles.cardDetails}>
//           <h3 style={styles.position}>{school?.course}</h3>
//           <div style={styles.universityName}>{school?.university}</div>
//           <div style={styles.infoRow}>
//             <span style={styles.infoItem}>
//               <TfiLocationPin /> {school?.location}
//             </span>
//             <span style={styles.infoItem}>
//               <BsFillBriefcaseFill /> {school?.courseMode}
//             </span>
//             <span style={styles.infoItem}>
//               <FaRegCalendarAlt /> {date}
//             </span>
//           </div>
//         </div>
//       </Link>
//       <div style={styles.endRow}>
//         <Link to={`/school/${school._id}`} style={styles.detailBtn}>
//           Details
//         </Link>
//         {user?.role === "user" && (
//           <button
//             style={styles.applyBtn}
//             onClick={() => handleApply(school._id)}
//           >
//             Apply
//           </button>
//         )}
//         {user?._id === school?.createdBy && (
//           <Link
//             to={`/dashboard/edit-school/${school._id}`}
//             style={styles.detailBtn}
//           >
//             Edit
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   card: {
//     margin: "16px 0",
//     padding: "16px",
//     border: "1px solid #ddd",
//     borderRadius: "8px",
//     boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//     backgroundColor: "#fff",
//     display: "flex",
//     flexDirection: "column",
//     transition: "box-shadow 0.3s",
//     cursor: "pointer",
//   },
//   link: {
//     textDecoration: "none",
//     color: "inherit",
//     display: "block",
//     marginBottom: "8px",
//   },
//   cardDetails: {
//     marginBottom: "8px",
//   },
//   position: {
//     fontSize: "18px",
//     color: "#1a0dab",
//     marginBottom: "4px",
//   },
//   universityName: {
//     color: "#006621",
//     fontSize: "14px",
//     marginBottom: "8px",
//   },
//   infoRow: {
//     color: "#545454",
//     fontSize: "13px",
//     display: "flex",
//     gap: "16px",
//   },
//   infoItem: {
//     display: "flex",
//     alignItems: "center",
//     gap: "4px",
//   },
//   endRow: {
//     display: "flex",
//     alignItems: "center",
//     gap: "8px",
//     marginTop: "auto",
//   },
//   detailBtn: {
//     color: "#1a73e8",
//     textDecoration: "none",
//     fontSize: "14px",
//     padding: "4px 8px",
//     backgroundColor: "#f8f9fa",
//     borderRadius: "4px",
//     border: "1px solid #dadce0",
//     cursor: "pointer",
//     transition: "background-color 0.3s",
//   },
//   applyBtn: {
//     color: "#fff",
//     backgroundColor: "#1a73e8",
//     borderRadius: "4px",
//     padding: "4px 8px",
//     border: "1px solid #1a73e8",
//     cursor: "pointer",
//     fontSize: "14px",
//     transition: "background-color 0.3s",
//   },

  
 
// };

// export default SchoolCard;




