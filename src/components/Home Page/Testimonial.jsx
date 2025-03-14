import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Testimonial = () => {
  const settings = {
    dots: true, // Show dots for navigation
    infinite: true, // Infinite looping
    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll
    autoplay: false, // Disable autoplay
    pauseOnHover: true, // Pause on hover
    nextArrow: <SampleNextArrow />, // Custom next arrow
    prevArrow: <SamplePrevArrow />, // Custom previous arrow
  };

  // Custom Next Arrow Component
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow`}
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          zIndex: 1,
          right: '-50px', // Position outside the slider
          cursor: 'pointer',
        }}
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    );
  }

  // Custom Previous Arrow Component
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow`}
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          zIndex: 1,
          left: '-50px', // Position outside the slider
          cursor: 'pointer',
        }}
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>
    );
  }

  const videos = [
    { id: 1, src: '/testimony1.mp4', title: 'Hear from Our Students' },
    { id: 2, src: '/testimony.mp4', title: 'Hear from Our Students' },
    { id: 3, src: '/testimony2.mp4', title: 'Hear from Our Students' },
    // Add more videos as needed
  ];

  return (
    <section className="relative isolate overflow-hidden bg-white px-6 py-16 sm:py-20 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="mx-auto max-w-4xl lg:max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Testimonials
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from our students and partners
          </p>
        </div>

        {/* Video Slider */}
        <div className="relative bg-gray-100 p-6 sm:p-8 rounded-2xl shadow-2xl mx-auto max-w-[800px]">
          <Slider {...settings}>
            {videos.map((video) => (
              <div key={video.id} className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
                <video
                  className="w-full h-full object-cover"
                  muted // Required for autoplay to work in most browsers
                  autoPlay // Autoplay the video
                  loop // Loop the video
                  playsInline // Required for autoplay on mobile devices
                  controls // Enable video controls
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <h2 className="text-white text-2xl sm:text-3xl font-bold text-center px-4">
                    {video.title}
                  </h2>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Additional Content */}
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600">
            Watch how Scovers has helped students achieve their dreams of studying abroad.
          </p>
        </div>
      </div>

      {/* Custom CSS to hide default arrows and style custom arrows */}
      <style jsx>{`
        .slick-prev,
        .slick-next {
          display: none !important; /* Hide default arrows */
        }
        .custom-arrow {
          display: flex !important; /* Ensure custom arrows are visible */
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          z-index: 1;
          cursor: pointer;
        }
        .custom-arrow:hover {
          background: rgba(0, 0, 0, 0.8) !important; /* Darker background on hover */
        }
        .custom-arrow svg {
          width: 24px;
          height: 24px;
        }
      `}</style>
    </section>
  );
};

export default Testimonial;



















// import React from 'react'

// const Testimonial = () => {
//   return (
//     <section className="relative isolate overflow-hidden bg-white px-6 mb-20 lg:px-8">
//       <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
//       <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
//       <div className="mx-auto max-w-2xl lg:max-w-4xl">
//         <img className="mx-auto h-12" src="/testimony.png" alt="" />
//         <figure className="mt-10">
//           <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
//             <p>
//               “Studying abroad has always been a dream Thank you Scovers for making my dreams come true.”
//             </p>
//           </blockquote>
//           <figcaption className="mt-10">
//             <img
//               className="mx-auto h-10 w-10 rounded-full"
//               src="/john.jpeg"
//               alt=""
//             />
//             <div className="mt-4 flex items-center justify-center space-x-3 text-base">
//               <div className="font-semibold text-gray-900">Judith Black</div>
//               <svg viewBox="0 0 2 2" width={3} height={3} aria-hidden="true" className="fill-gray-900">
//                 <circle cx={1} cy={1} r={1} />
//               </svg>
//               <div className="text-gray-600">Cyber Security Student at Royal Roads University, Canada</div>
//             </div>
//           </figcaption>
//         </figure>
//       </div>
//     </section>
//   )
// }

// export default Testimonial