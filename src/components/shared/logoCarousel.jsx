import React from "react";

const logos = [
  "/eu.png",
  "/kentucky.png",
  "/michigan.png",
  "/universityvirginia.png",
  "/eu.png",   //duplicate
  "/kentucky.png",
  "/michigan.png",
  "/universityvirginia.png",
  "/eu.png",
  "/kentucky.png",
  "/michigan.png",
  "/universityvirginia.png"
  
];


const LogoCarousel = () => {
  return (
    <div style={styles.carouselContainer}>
      <div style={styles.logoTrack}>
        {/* Duplicating the logos to create an infinite scroll effect */}
        {[...logos, ...logos].map((logo, index) => (
          <img key={index} src={logo} alt="School Logo" style={styles.logoImg} />
        ))}
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  carouselContainer: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    position: "relative",
    width: "100%",
    background: "white",
    padding: "10px 0",
  },
  logoTrack: {
    display: "flex",
    gap: "30px",
    width: "200%",
    animation: "scroll 15s linear infinite",
  },
  logoImg: {
    height: "60px",
    objectFit: "contain",
  },
};

// Inject CSS for continuous scrolling
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
  @keyframes scroll {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }
`;
document.head.appendChild(styleSheet);

export default LogoCarousel;















// import React from "react";

// const logos = [
//   "/eu.png",
//   "/kentucky.png",
//   "/michigan.png",
//   "/universityvirginia.png"
  
// ];

// const LogoCarousel = () => {
//   return (
//     <div style={styles.carouselContainer}>
//       <div style={styles.logoTrack}>
//         {logos.concat(logos).map((logo, index) => (
//           <img key={index} src={logo} alt="School Logo" style={styles.logoImg} />
//         ))}
//       </div>
//     </div>
//   );
// };

// // Inline styles
// const styles = {
//   carouselContainer: {
//     overflow: "hidden",
//     whiteSpace: "nowrap",
//     position: "relative",
//     width: "100%",
//     background: "white",
//     padding: "10px 0",
//   },
//   logoTrack: {
//     display: "flex",
//     gap: "20px",
//     animation: "scroll 20s linear infinite",
//   },
//   logoImg: {
//     height: "60px",
//     objectFit: "contain",
//   },
// };

// // Inject CSS for animation
// const styleSheet = document.createElement("style");
// styleSheet.type = "text/css";
// styleSheet.innerText = `
//   @keyframes scroll {
//     from {
//       transform: translateX(0);
//     }
//     to {
//       transform: translateX(-100%);
//     }
//   }
// `;
// document.head.appendChild(styleSheet);

// export default LogoCarousel;
