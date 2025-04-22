import React, { useState } from "react";

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState("program-types");
  const [expandedItems, setExpandedItems] = useState({});

  const tabs = [
    { id: "program-types", label: "Program Types" },
    { id: "why", label: "Why" },
    { id: "benefits", label: "Benefits" },
    { id: "funding", label: "Funding" }
  ];

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const content = {
    "program-types": {
      title: "Types of Study Abroad Programs",
      description: "There are three common types of study abroad programs:",
      items: [
        {
          id: "direct",
          title: "Direct enrollment",
          shortDesc: "Study abroad in an international university often alongside local students.",
          fullDesc: "This is a program where you study abroad in an international university often alongside local students. Your courses choices may be limited to classes in English, classes for international students, or classes designed for study abroad students like language and area studies. In some cases you might be able to choose any courses offered at the university. These programs are ideal for any student and usually the desired choice for upperclassman who need classes in their major."
        },
        {
          id: "exchange",
          title: "Exchange Programs",
          shortDesc: "Participate in reciprocal agreements between universities.",
          fullDesc: "These programs involve agreements between your home university and partner institutions abroad. You'll pay tuition to your home university while studying at the partner institution. Exchange programs often have limited spots and competitive application processes, but provide an authentic experience of student life in another country."
        },
        {
          id: "provider",
          title: "Provider Programs",
          shortDesc: "Study through specialized third-party organizations.",
          fullDesc: "These programs are managed by organizations that specialize in creating study abroad experiences. They handle everything from course registration to housing and often include cultural excursions and additional support services. Provider programs are ideal for students who want more structure and support during their international experience."
        }
      ]
    },
    "why": {
      title: "Why Study Abroad?",
      description: "Studying abroad offers transformative benefits:",
      items: [
        {
          title: "Global Perspective",
          description: "Gain a broader understanding of world cultures and international issues that will serve you throughout your life and career."
        },
        {
          title: "Academic Enrichment",
          description: "Access unique courses, research opportunities, and teaching methods not available at your home institution."
        }
      ]
    },
    "benefits": {
      title: "Key Benefits",
      description: "Students gain significant advantages:",
      items: [
        {
          title: "Career Advancement",
          description: "Employers highly value international experience, which demonstrates adaptability and cross-cultural communication skills."
        },
        {
          title: "Personal Growth",
          description: "Living abroad builds independence, problem-solving skills, and self-confidence that will benefit all areas of your life."
        }
      ]
    },
    "funding": {
      title: "Funding Options",
      description: "Multiple ways to finance your study abroad:",
      items: [
        {
          title: "Scholarships",
          description: "Many universities and organizations offer scholarships specifically for study abroad programs."
        },
        {
          title: "Financial Aid",
          description: "Federal and institutional aid can often be applied to approved study abroad programs."
        }
      ]
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">How Study Abroad Works</h2>
        
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 font-medium text-base text-center transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {content[activeTab].title}
          </h3>
          
          <p className="text-gray-600 mb-6">{content[activeTab].description}</p>
          
          <div className="space-y-6">
            {content[activeTab].items.map((item) => (
              <div key={item.id || item.title} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
                </h4>
                {activeTab === "program-types" ? (
                  <>
                    <p className="text-gray-600">
                      {expandedItems[item.id] ? item.fullDesc : item.shortDesc}
                    </p>
                    <button 
                      onClick={() => toggleExpand(item.id)}
                      className="text-blue-600 font-medium mt-2 hover:underline"
                    >
                      {expandedItems[item.id] ? "Read Less" : "Read More"}
                    </button>
                  </>
                ) : (
                  <p className="text-gray-600">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;






// import React, { useState } from "react";

// const HowItWorks = () => {
//   const [activeTab, setActiveTab] = useState("program-types");
//   const [expandedItems, setExpandedItems] = useState({});

//   const tabs = [
//     { id: "program-types", label: "Program Types" },
//     { id: "why", label: "Why" },
//     { id: "benefits", label: "Benefits" },
//     { id: "funding", label: "Funding" }
//   ];

//   const toggleExpand = (id) => {
//     setExpandedItems(prev => ({
//       ...prev,
//       [id]: !prev[id]
//     }));
//   };

//   const content = {
//     "program-types": {
//       title: "Types of Study Abroad Programs",
//       description: "There are three common types of study abroad programs:",
//       items: [
//         {
//           id: "direct",
//           title: "Direct enrollment",
//           shortDesc: "Study abroad in an international university often alongside local students.",
//           fullDesc: "This is a program where you study abroad in an international university often alongside local students. Your courses choices may be limited to classes in English, classes for international students, or classes designed for study abroad students like language and area studies. In some cases you might be able to choose any courses offered at the university. These programs are ideal for any student and usually the desired choice for upperclassman who need classes in their major."
//         },
//         {
//           id: "exchange",
//           title: "Exchange Programs",
//           shortDesc: "Participate in reciprocal agreements between universities.",
//           fullDesc: "These programs involve agreements between your home university and partner institutions abroad. You'll pay tuition to your home university while studying at the partner institution. Exchange programs often have limited spots and competitive application processes, but provide an authentic experience of student life in another country."
//         },
//         {
//           id: "provider",
//           title: "Provider Programs",
//           shortDesc: "Study through specialized third-party organizations.",
//           fullDesc: "These programs are managed by organizations that specialize in creating study abroad experiences. They handle everything from course registration to housing and often include cultural excursions and additional support services. Provider programs are ideal for students who want more structure and support during their international experience."
//         }
//       ]
//     },
//     "why": {
//       title: "Why Study Abroad?",
//       description: "Studying abroad offers transformative benefits:",
//       items: [
//         {
//           title: "Global Perspective",
//           description: "Gain a broader understanding of world cultures and international issues that will serve you throughout your life and career."
//         },
//         {
//           title: "Academic Enrichment",
//           description: "Access unique courses, research opportunities, and teaching methods not available at your home institution."
//         }
//       ]
//     },
//     "benefits": {
//       title: "Key Benefits",
//       description: "Students gain significant advantages:",
//       items: [
//         {
//           title: "Career Advancement",
//           description: "Employers highly value international experience, which demonstrates adaptability and cross-cultural communication skills."
//         },
//         {
//           title: "Personal Growth",
//           description: "Living abroad builds independence, problem-solving skills, and self-confidence that will benefit all areas of your life."
//         }
//       ]
//     },
//     "funding": {
//       title: "Funding Options",
//       description: "Multiple ways to finance your study abroad:",
//       items: [
//         {
//           title: "Scholarships",
//           description: "Many universities and organizations offer scholarships specifically for study abroad programs."
//         },
//         {
//           title: "Financial Aid",
//           description: "Federal and institutional aid can often be applied to approved study abroad programs."
//         }
//       ]
//     }
//   };

//   return (
//     <section className="py-16 bg-white">
//       <div className="max-w-4xl mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">How to Study Abroad</h2>
        
//         {/* Tab Navigation */}
//         <div className="flex border-b border-gray-200 mb-8">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex-1 py-4 font-medium text-center transition-colors ${
//                 activeTab === tab.id
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {/* Content Area */}
//         <div className="border border-gray-200 rounded-lg p-6">
//           <h3 className="text-2xl font-bold text-gray-800 mb-4">
//             {content[activeTab].title}
//           </h3>
          
//           <p className="text-gray-600 mb-6">{content[activeTab].description}</p>
          
//           <div className="space-y-6">
//             {content[activeTab].items.map((item) => (
//               <div key={item.id || item.title} className="p-4 bg-gray-50 rounded-lg">
//                 <h4 className="text-xl font-semibold text-gray-800 mb-2">
//                   {item.title}
//                 </h4>
//                 {activeTab === "program-types" ? (
//                   <>
//                     <p className="text-gray-600">
//                       {expandedItems[item.id] ? item.fullDesc : item.shortDesc}
//                     </p>
//                     <button 
//                       onClick={() => toggleExpand(item.id)}
//                       className="text-blue-600 font-medium mt-2 hover:underline"
//                     >
//                       {expandedItems[item.id] ? "Read Less" : "Read More"}
//                     </button>
//                   </>
//                 ) : (
//                   <p className="text-gray-600">{item.description}</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HowItWorks;