import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { name: "Find Course", href: "#" },
  { name: "Apply", href: "#" },
  { name: "Get Admitted", href: "#" },
  { name: "Resume on Campus", href: "#" },
];

const stats = [
  { name: "Universities", value: 5000 },
  { name: "Courses", value: 30000 },
  { name: "Cities", value: 90 },
  { name: "Students", value: 100000 },
];

export default function HowWorks() {
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const intervals = stats.map((stat, index) => {
      let start = 0;
      const increment = Math.ceil(stat.value / 200);
      return setInterval(() => {
        start += increment;
        if (start >= stat.value) {
          start = stat.value;
          clearInterval(intervals[index]);
        }
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = start;
          return newCounts;
        });
      }, 50);
    });
    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div className="bg-gray-900 py-10 px-4 sm:px-8 md:px-12 lg:px-16 text-white text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">How Scovers Portal Works</h2>
      <p className="text-base text-gray-300 max-w-xl mx-auto">
        Scovers Education Portal connects you to the best educational opportunities worldwide. 
        Explore thousands of courses, universities, and scholarships. Simply search, apply, and let us handle the rest!
      </p>
      
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {links.map((link) => (
          <motion.a
            key={link.name}
            href={link.href}
            whileHover={{ scale: 1.05 }}
            className="bg-blue-600 hover:bg-blue-500 transition-all duration-300 px-6 py-3 rounded-lg shadow-md text-lg font-semibold"
          >
            {link.name} <span className="text-2xl">&rarr;</span>
          </motion.a>
        ))}
      </div>
      
      <div className="mt-8 flex flex-wrap justify-center gap-6">
        {stats.map((stat, index) => (
          <motion.div 
            key={stat.name} 
            className="bg-gray-800 px-4 py-4 rounded-lg shadow-md flex flex-col items-center w-36"
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 1 }}
          >
            <motion.dd className="text-3xl font-bold text-blue-400">
              {counts[index].toLocaleString()}+
            </motion.dd>
            <dt className="text-gray-300 text-sm mt-1">{stat.name}</dt>
          </motion.div>
        ))}
      </div>
    </div>
  );
}



















// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// const links = [
//   { name: "Find Course", href: "#" },
//   { name: "Apply", href: "#" },
//   { name: "Get Admitted", href: "#" },
//   { name: "Resume on Campus", href: "#" },
// ];

// const stats = [
//   { name: "Universities", value: 5000 },
//   { name: "Courses", value: 30000 },
//   { name: "Cities", value: 90 },
//   { name: "Students", value: 100000 },
// ];

// export default function HowWorks() {
//   const [counts, setCounts] = useState(stats.map(() => 0));

//   useEffect(() => {
//     const intervals = stats.map((stat, index) => {
//       let start = 0;
//       const increment = Math.ceil(stat.value / 200);
//       return setInterval(() => {
//         start += increment;
//         if (start >= stat.value) {
//           start = stat.value;
//           clearInterval(intervals[index]);
//         }
//         setCounts((prev) => {
//           const newCounts = [...prev];
//           newCounts[index] = start;
//           return newCounts;
//         });
//       }, 50);
//     });
//     return () => intervals.forEach(clearInterval);
//   }, []);

//   return (
//     <div className="bg-gray-900 py-10 px-4 sm:px-8 md:px-12 lg:px-16 text-white text-center">
//       <h2 className="text-2xl md:text-3xl font-bold mb-4">How Scovers Portal Works</h2>
//       <p className="text-base text-gray-300 max-w-xl mx-auto">
//         Scovers Education Portal connects you to the best educational opportunities worldwide. 
//         Explore thousands of courses, universities, and scholarships. Simply search, apply, and let us handle the rest!
//       </p>
      
//       <div className="mt-6 flex flex-wrap justify-center gap-4">
//         {links.map((link) => (
//           <motion.a
//             key={link.name}
//             href={link.href}
//             whileHover={{ scale: 1.05 }}
//             className="bg-blue-600 hover:bg-blue-500 transition-all duration-300 px-6 py-3 rounded-lg shadow-md text-lg font-semibold"
//           >
//             {link.name} <span className="text-2xl">&rarr;</span>
//           </motion.a>
//         ))}
//       </div>
      
//       <div className="mt-8 flex flex-wrap justify-center gap-6">
//         {stats.map((stat, index) => (
//           <motion.div 
//             key={stat.name} 
//             className="bg-gray-800 px-4 py-4 rounded-lg shadow-md flex flex-col items-center w-36"
//             animate={{ opacity: [0, 1] }}
//             transition={{ duration: 1 }}
//           >
//             <motion.dd className="text-3xl font-bold text-blue-400">
//               {counts[index].toLocaleString()}+
//             </motion.dd>
//             <dt className="text-gray-300 text-sm mt-1">{stat.name}</dt>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }
























// const links = [
//     { name: 'Find Course', href: '#' },
//     { name: 'Apply', href: '#' },
//     { name: 'Get Admitted', href: '#' },
//     { name: 'Resume on Campus', href: '#' },
//   ]
//   const stats = [
//     { name: 'Universities', value: '5,000+' },
//     { name: 'Courses', value: '30,000+' },
//     { name: 'Cities', value: '90+' },
//     { name: 'Students', value: '100,000+' },
//   ]
  
//   export default function HowWorks() {
//     return (
//       <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
//         <img
//           src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
//           alt=""
//           className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
//         />
//         <div
//           className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
//           aria-hidden="true"
//         >
//           <div
//             className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
//             style={{
//               clipPath:
//                 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
//             }}
//           />
//         </div>
//         <div
//           className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
//           aria-hidden="true"
//         >
//           <div
//             className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
//             style={{
//               clipPath:
//                 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
//             }}
//           />
//         </div>
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">
//           <div className="mx-auto max-w-2xl lg:mx-0">
//             <h2 className="md:text-3xl text-2xl font-bold tracking-tight text-white">How Scovers Portal Works</h2>
//             <p className="mt-6 text-lg leading-8 text-gray-300">
//               Scovers Education Portal is designed to grant you access to the best educational opportunities 
//               across the globe. Thousands of courses, universities and scholarship opportunities are available on our platform.
//               Simply search, and send your application. We take it on from there. 
//             </p>
//           </div>
//           <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
//             <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
//               {links.map((link) => (
//                 <a key={link.name} href={link.href}>
//                   {link.name} <span aria-hidden="true">&rarr;</span>
//                 </a>
//               ))}
//             </div>
//             <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
//               {stats.map((stat) => (
//                 <div key={stat.name} className="flex flex-col-reverse">
//                   <dt className="text-base leading-7 text-gray-300">{stat.name}</dt>
//                   <dd className="text-2xl font-bold leading-9 tracking-tight text-white">{stat.value}</dd>
//                 </div>
//               ))}
//             </dl>
//           </div>
//         </div>
//       </div>
//     )
//   }
  