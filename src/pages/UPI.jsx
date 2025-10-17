import React, { useState, useEffect, useRef } from 'react';
import { useUPI } from '../context/UPIContext';
import Navbar from '../components/shared/Navbar';
import { 
  FaGraduationCap, 
  FaFileUpload, 
  FaCheckCircle, 
  FaClock, 
  FaUserGraduate,
  FaGlobeAmericas,
  FaChartLine,
  FaAward,
  FaShieldAlt,
  FaQuoteLeft,
  FaPlayCircle,
  FaUniversity,
  FaMoneyBillWave,
  FaExchangeAlt
} from 'react-icons/fa';

const UPI = () => {
  const { loading, error, registerForUPI } = useUPI();
  const [currentStep, setCurrentStep] = useState(1);
  const formRef = useRef(null);
  
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    dateOfBirth: '',
    nationality: '',
    email: '',
    phoneNumber: '',
    address: '',
    
    // Academic Information
    currentSchool: '',
    academicLevel: '',
    intendedMajor: '',
    targetCountries: [],
    
    // Documents
    documents: [],
    
    // Essay
    motivationEssay: '',
    
    // Financial
    financialReadiness: '',
    
    // Parental
    isMinor: 'false',
    parentName: '',
    parentEmail: '',
    parentPhone: ''
  });

  const [uploadProgress, setUploadProgress] = useState({});

  const steps = [
    { number: 1, title: 'Personal Info', icon: FaUserGraduate },
    { number: 2, title: 'Academic Info', icon: FaGraduationCap },
    { number: 3, title: 'Documents', icon: FaFileUpload },
    { number: 4, title: 'Essay', icon: FaAward },
    { number: 5, title: 'Review', icon: FaCheckCircle }
  ];

  const academicLevels = ['SS1', 'SS2', 'SS3', 'Graduate', 'Other'];
  const targetCountryOptions = ['USA', 'Canada', 'UK', 'Australia', 'Germany', 'Netherlands', 'Other'];
  const financialOptions = [
    { value: 'within_7_days', label: 'Within 7 days' },
    { value: 'within_14_days', label: 'Within 14 days' },
    { value: 'within_30_days', label: 'Within 30 days' },
    { value: 'need_financial_aid', label: 'Need financial assistance' }
  ];

  const programBenefits = [
    {
      icon: FaChartLine,
      title: 'Personalized Roadmap',
      description: 'Customized university application strategy based on your profile and goals'
    },
    {
      icon: FaGlobeAmericas,
      title: 'Global University Access',
      description: 'Direct connections with 50+ top universities worldwide'
    },
    {
      icon: FaAward,
      title: 'Scholarship Guidance',
      description: 'Expert assistance in securing scholarships and financial aid'
    },
    {
      icon: FaShieldAlt,
      title: 'Visa Support',
      description: 'Comprehensive visa application guidance and documentation support'
    }
  ];

  const processSteps = [
    {
      icon: FaUniversity,
      step: "Step 1",
      title: "Pick & Enroll",
      description: "Start one or more courses covering lower or upper division requirements. Great for completing your degree."
    },
    {
      icon: FaPlayCircle,
      step: "Step 2",
      title: "Earn College Credit",
      description: "Complete courses by watching fun video lessons, taking short quizzes and the final exam, all from home."
    },
    {
      icon: FaExchangeAlt,
      step: "Step 3",
      title: "Transfer your Credit",
      description: "Transfer earned credits to your school and graduate sooner, and at a fraction of the cost."
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      program: 'UPI Graduate 2023',
      university: 'University of Toronto',
      text: 'The UPI program transformed my application strategy. I received acceptances from 3 top Canadian universities with scholarships!'
    },
    {
      name: 'Michael Chen',
      program: 'UPI Graduate 2023',
      university: 'University of Michigan',
      text: 'The personalized guidance and document preparation helped me stand out in competitive applications.'
    }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCountryChange = (country) => {
    setFormData(prev => ({
      ...prev,
      targetCountries: prev.targetCountries.includes(country)
        ? prev.targetCountries.filter(c => c !== country)
        : [...prev.targetCountries, country]
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...files]
    }));

    // Simulate upload progress
    files.forEach(file => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(prev => ({
          ...prev,
          [file.name]: progress
        }));
        if (progress >= 100) clearInterval(interval);
      }, 100);
    });
  };

  const removeDocument = (fileName) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter(file => file.name !== fileName)
    }));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileName];
      return newProgress;
    });
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length));
    // Smooth scroll to form section instead of top
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    // Smooth scroll to form section instead of top
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submitData = new FormData();
    
    // Append all form data
    Object.keys(formData).forEach(key => {
      if (key === 'documents') {
        formData.documents.forEach(file => {
          submitData.append('documents', file);
        });
      } else if (key === 'targetCountries') {
        formData.targetCountries.forEach(country => {
          submitData.append('targetCountries', country);
        });
      } else {
        submitData.append(key, formData[key]);
      }
    });

    try {
      await registerForUPI(submitData);
      setCurrentStep(6); // Success step
    } catch (err) {
      console.error('Application error:', err);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-[#2D8CD4]">Personal Information</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D8CD4] focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D8CD4] focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nationality *
                </label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D8CD4] focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D8CD4] focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D8CD4] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Complete Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D8CD4] focus:border-transparent"
                required
              />
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="isMinor"
                  value="true"
                  checked={formData.isMinor === 'true'}
                  onChange={(e) => setFormData(prev => ({ ...prev, isMinor: e.target.checked ? 'true' : 'false' }))}
                  className="rounded border-gray-300 text-[#2D8CD4] focus:ring-[#2D8CD4]"
                />
                <span className="text-sm font-medium text-gray-700">
                  I am under 18 years old and require parental consent
                </span>
              </label>
            </div>

            {formData.isMinor === 'true' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
                <h4 className="font-semibold text-[#2D8CD4]">Parent/Guardian Information</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="parentName"
                    placeholder="Parent/Guardian Full Name"
                    value={formData.parentName}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D8CD4] focus:border-transparent"
                  />
                  <input
                    type="email"
                    name="parentEmail"
                    placeholder="Parent/Guardian Email"
                    value={formData.parentEmail}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D8CD4] focus:border-transparent"
                  />
                  <input
                    type="tel"
                    name="parentPhone"
                    placeholder="Parent/Guardian Phone"
                    value={formData.parentPhone}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D8CD4] focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-[#2D8CD4]">Academic Information</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current School *
              </label>
              <input
                type="text"
                name="currentSchool"
                value={formData.currentSchool}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D8CD4] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Academic Level *
              </label>
              <select
                name="academicLevel"
                value={formData.academicLevel}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D8CD4] focus:border-transparent"
                required
              >
                <option value="">Select your level</option>
                {academicLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Intended Major/Field of Study *
              </label>
              <input
                type="text"
                name="intendedMajor"
                value={formData.intendedMajor}
                onChange={handleChange}
                placeholder="e.g., Computer Science, Business Administration, Medicine"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D8CD4] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Target Study Countries (Select all that apply) *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {targetCountryOptions.map(country => (
                  <label key={country} className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.targetCountries.includes(country)}
                      onChange={() => handleCountryChange(country)}
                      className="rounded border-gray-300 text-[#2D8CD4] focus:ring-[#2D8CD4]"
                    />
                    <span className="text-sm">{country}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-[#2D8CD4]">Document Upload</h3>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-[#2D8CD4] mb-3">Required Documents</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                <li>Academic transcripts (SS1-SS3 or equivalent)</li>
                <li>Passport data page or national ID</li>
                <li>Recent passport photograph</li>
                <li>Any standardized test scores (if available)</li>
                <li>Letters of recommendation (if available)</li>
              </ul>
              <p className="text-xs text-gray-600 mt-3">
                Supported formats: PDF, JPEG, PNG, Word documents. Maximum file size: 10MB per file.
              </p>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <FaFileUpload className="mx-auto text-4xl text-gray-400 mb-4" />
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className="hidden"
                id="document-upload"
              />
              <label
                htmlFor="document-upload"
                className="cursor-pointer bg-[#2D8CD4] text-white px-6 py-3 rounded-lg hover:bg-[#1A5F8B] transition-colors"
              >
                Choose Files
              </label>
              <p className="text-sm text-gray-600 mt-2">
                Click to upload your documents
              </p>
            </div>

            {formData.documents.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700">Uploaded Documents</h4>
                {formData.documents.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FaFileUpload className="text-[#2D8CD4]" />
                      <span className="text-sm">{file.name}</span>
                      {uploadProgress[file.name] === 100 && (
                        <FaCheckCircle className="text-green-500" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {uploadProgress[file.name] && uploadProgress[file.name] < 100 && (
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#2D8CD4] h-2 rounded-full transition-all"
                            style={{ width: `${uploadProgress[file.name]}%` }}
                          ></div>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeDocument(file.name)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-[#2D8CD4]">Motivation Essay</h3>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-[#2D8CD4] mb-3">Essay Prompt</h4>
              <p className="text-gray-700 mb-4">
                Please write a comprehensive essay (minimum 200 characters) explaining:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                <li>Why you want to participate in the UPI program</li>
                <li>Your educational and career goals</li>
                <li>How this program will help you achieve your objectives</li>
                <li>What unique perspectives you bring to the program</li>
              </ul>
            </div>

            <div>
              <textarea
                name="motivationEssay"
                value={formData.motivationEssay}
                onChange={handleChange}
                rows="12"
                placeholder="Write your essay here..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D8CD4] focus:border-transparent resize-vertical"
                required
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Minimum 200 characters</span>
                <span>{formData.motivationEssay.length} characters</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Financial Readiness *
              </label>
              <div className="space-y-3">
                {financialOptions.map(option => (
                  <label key={option.value} className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="financialReadiness"
                      value={option.value}
                      checked={formData.financialReadiness === option.value}
                      onChange={handleChange}
                      className="text-[#2D8CD4] focus:ring-[#2D8CD4]"
                      required
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-[#2D8CD4]">Review Your Application</h3>
            
            <div className="bg-gray-50 rounded-lg p-6 space-y-6">
              {/* Personal Info Review */}
              <div>
                <h4 className="font-semibold text-lg text-[#2D8CD4] mb-3">Personal Information</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div><strong>Full Name:</strong> {formData.fullName}</div>
                  <div><strong>Date of Birth:</strong> {formData.dateOfBirth}</div>
                  <div><strong>Nationality:</strong> {formData.nationality}</div>
                  <div><strong>Email:</strong> {formData.email}</div>
                  <div><strong>Phone:</strong> {formData.phoneNumber}</div>
                  <div><strong>Under 18:</strong> {formData.isMinor === 'true' ? 'Yes' : 'No'}</div>
                </div>
                {formData.isMinor === 'true' && (
                  <div className="mt-3 text-sm">
                    <strong>Parent/Guardian:</strong> {formData.parentName} ({formData.parentEmail}, {formData.parentPhone})
                  </div>
                )}
              </div>

              {/* Academic Info Review */}
              <div>
                <h4 className="font-semibold text-lg text-[#2D8CD4] mb-3">Academic Information</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div><strong>Current School:</strong> {formData.currentSchool}</div>
                  <div><strong>Academic Level:</strong> {formData.academicLevel}</div>
                  <div><strong>Intended Major:</strong> {formData.intendedMajor}</div>
                  <div><strong>Target Countries:</strong> {formData.targetCountries.join(', ')}</div>
                </div>
              </div>

              {/* Documents Review */}
              <div>
                <h4 className="font-semibold text-lg text-[#2D8CD4] mb-3">Documents</h4>
                <div className="text-sm">
                  <strong>Files Uploaded:</strong> {formData.documents.length}
                  <ul className="list-disc list-inside mt-2">
                    {formData.documents.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Essay Review */}
              <div>
                <h4 className="font-semibold text-lg text-[#2D8CD4] mb-3">Motivation Essay</h4>
                <div className="text-sm bg-white p-4 rounded border">
                  {formData.motivationEssay || <em className="text-gray-500">No essay provided</em>}
                </div>
              </div>

              {/* Financial Review */}
              <div>
                <h4 className="font-semibold text-lg text-[#2D8CD4] mb-3">Financial Readiness</h4>
                <div className="text-sm">
                  {financialOptions.find(opt => opt.value === formData.financialReadiness)?.label}
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> By submitting this application, you confirm that all information provided is accurate and complete. 
                Incomplete or inaccurate applications may be rejected.
              </p>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="text-center py-12">
            <FaCheckCircle className="mx-auto text-6xl text-green-500 mb-6" />
            <h3 className="text-3xl font-semibold text-[#2D8CD4] mb-4">Application Submitted Successfully!</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Thank you for applying to the University Pathways International program. 
              Our team will review your application and contact you within 3-5 business days.
            </p>
            <div className="bg-blue-50 rounded-lg p-6 max-w-2xl mx-auto text-left">
              <h4 className="font-semibold text-[#2D8CD4] mb-3">What happens next?</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>Application review by our admissions team</li>
                <li>Email notification of admission decision</li>
                <li>Payment instructions (if accepted)</li>
                <li>Program orientation and materials</li>
                <li>Begin your UPI journey!</li>
              </ol>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#2D8CD4] to-[#1A5F8B] text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
          <FaGraduationCap className="mx-auto text-6xl mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            University Pathways International
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Your pathway to top global universities with personalized guidance, 
            comprehensive support, and guaranteed results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('application-form').scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-[#2D8CD4] hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Start Application
            </button>
            <button 
              onClick={() => document.getElementById('process-steps').scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white text-white hover:bg-white hover:text-[#2D8CD4] font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              How It Works
            </button>
          </div>
        </div>
      </div>

      {/* Process Steps Section */}
      <div id="process-steps" className="max-w-7xl mx-auto px-4 py-16 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Earning College Credit Via UPI Study Is Easy
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take your college courses with us, then transfer that earned credit to your current school or another school, with the help of UPI.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {processSteps.map((step, index) => (
            <div key={index} className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-[#2D8CD4] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <step.icon className="text-2xl" />
              </div>
              <div className="bg-[#2D8CD4] text-white px-4 py-1 rounded-full text-sm font-semibold inline-block mb-4">
                {step.step}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Program Benefits */}
      <div className="max-w-7xl mx-auto px-4 py-16 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Why Choose UPI?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programBenefits.map((benefit, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <benefit.icon className="mx-auto text-4xl text-[#2D8CD4] mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Success Stories
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <FaQuoteLeft className="text-4xl text-[#2D8CD4] mb-4" />
                <p className="text-gray-700 text-lg mb-6">{testimonial.text}</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-[#2D8CD4]">{testimonial.program}</p>
                  <p className="text-gray-600 text-sm">{testimonial.university}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div id="application-form" ref={formRef} className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Progress Steps */}
          <div className="bg-gradient-to-r from-[#2D8CD4] to-[#1A5F8B] p-6">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                    currentStep >= step.number ? 'bg-white text-[#2D8CD4]' : 'bg-white/20 text-white'
                  } font-semibold transition-all`}>
                    {currentStep > step.number ? (
                      <FaCheckCircle className="text-lg" />
                    ) : (
                      <step.icon className="text-lg" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-2 ${
                      currentStep > step.number ? 'bg-white' : 'bg-white/20'
                    } transition-colors`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              {steps.map(step => (
                <span 
                  key={step.number}
                  className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-white' : 'text-white/60'
                  }`}
                >
                  {step.title}
                </span>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {currentStep <= 5 && (
              <form onSubmit={handleSubmit}>
                {renderStep()}
                
                {currentStep < 5 && (
                  <div className="flex justify-between mt-8 pt-6 border-t">
                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-[#2D8CD4] text-white px-6 py-3 rounded-lg hover:bg-[#1A5F8B] transition-colors"
                    >
                      {currentStep === 4 ? 'Review Application' : 'Next Step'}
                    </button>
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="flex justify-between mt-8 pt-6 border-t">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Back to Edit
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                    >
                      {loading ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                )}
              </form>
            )}

            {currentStep === 6 && (
              <div className="text-center">
                <button
                  onClick={() => {
                    setCurrentStep(1);
                    setFormData({
                      fullName: '',
                      dateOfBirth: '',
                      nationality: '',
                      email: '',
                      phoneNumber: '',
                      address: '',
                      currentSchool: '',
                      academicLevel: '',
                      intendedMajor: '',
                      targetCountries: [],
                      documents: [],
                      motivationEssay: '',
                      financialReadiness: '',
                      isMinor: 'false',
                      parentName: '',
                      parentEmail: '',
                      parentPhone: ''
                    });
                  }}
                  className="bg-[#2D8CD4] text-white px-8 py-3 rounded-lg hover:bg-[#1A5F8B] transition-colors"
                >
                  Submit Another Application
                </button>
              </div>
            )}

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UPI;













































// import React, { useState, useEffect } from 'react';
// import { useUPI } from '../context/UPIContext';
// import Navbar from '../components/shared/Navbar';
// import { 
//   FaGraduationCap, 
//   FaFileUpload, 
//   FaCheckCircle, 
//   FaClock, 
//   FaUserGraduate,
//   FaGlobeAmericas,
//   FaChartLine,
//   FaAward,
//   FaShieldAlt,
//   FaQuoteLeft
// } from 'react-icons/fa';

// const UPI = () => {
//   const { loading, error, registerForUPI } = useUPI();
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({
//     // Personal Information
//     fullName: '',
//     dateOfBirth: '',
//     nationality: '',
//     email: '',
//     phoneNumber: '',
//     address: '',
    
//     // Academic Information
//     currentSchool: '',
//     academicLevel: '',
//     intendedMajor: '',
//     targetCountries: [],
    
//     // Documents
//     documents: [],
    
//     // Essay
//     motivationEssay: '',
    
//     // Financial
//     financialReadiness: '',
    
//     // Parental
//     isMinor: 'false',
//     parentName: '',
//     parentEmail: '',
//     parentPhone: ''
//   });

//   const [uploadProgress, setUploadProgress] = useState({});

//   const steps = [
//     { number: 1, title: 'Personal Info', icon: FaUserGraduate },
//     { number: 2, title: 'Academic Info', icon: FaGraduationCap },
//     { number: 3, title: 'Documents', icon: FaFileUpload },
//     { number: 4, title: 'Essay', icon: FaAward },
//     { number: 5, title: 'Review', icon: FaCheckCircle }
//   ];

//   const academicLevels = ['SS1', 'SS2', 'SS3', 'Graduate', 'Other'];
//   const targetCountryOptions = ['USA', 'Canada', 'UK', 'Australia', 'Germany', 'Netherlands', 'Other'];
//   const financialOptions = [
//     { value: 'within_7_days', label: 'Within 7 days' },
//     { value: 'within_14_days', label: 'Within 14 days' },
//     { value: 'within_30_days', label: 'Within 30 days' },
//     { value: 'need_financial_aid', label: 'Need financial assistance' }
//   ];

//   const programBenefits = [
//     {
//       icon: FaChartLine,
//       title: 'Personalized Roadmap',
//       description: 'Customized university application strategy based on your profile and goals'
//     },
//     {
//       icon: FaGlobeAmericas,
//       title: 'Global University Access',
//       description: 'Direct connections with 50+ top universities worldwide'
//     },
//     {
//       icon: FaAward,
//       title: 'Scholarship Guidance',
//       description: 'Expert assistance in securing scholarships and financial aid'
//     },
//     {
//       icon: FaShieldAlt,
//       title: 'Visa Support',
//       description: 'Comprehensive visa application guidance and documentation support'
//     }
//   ];

//   const testimonials = [
//     {
//       name: 'Sarah Johnson',
//       program: 'UPI Graduate 2023',
//       university: 'University of Toronto',
//       text: 'The UPI program transformed my application strategy. I received acceptances from 3 top Canadian universities with scholarships!'
//     },
//     {
//       name: 'Michael Chen',
//       program: 'UPI Graduate 2023',
//       university: 'University of Michigan',
//       text: 'The personalized guidance and document preparation helped me stand out in competitive applications.'
//     }
//   ];

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleCountryChange = (country) => {
//     setFormData(prev => ({
//       ...prev,
//       targetCountries: prev.targetCountries.includes(country)
//         ? prev.targetCountries.filter(c => c !== country)
//         : [...prev.targetCountries, country]
//     }));
//   };

//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData(prev => ({
//       ...prev,
//       documents: [...prev.documents, ...files]
//     }));

//     // Simulate upload progress
//     files.forEach(file => {
//       let progress = 0;
//       const interval = setInterval(() => {
//         progress += 10;
//         setUploadProgress(prev => ({
//           ...prev,
//           [file.name]: progress
//         }));
//         if (progress >= 100) clearInterval(interval);
//       }, 100);
//     });
//   };

//   const removeDocument = (fileName) => {
//     setFormData(prev => ({
//       ...prev,
//       documents: prev.documents.filter(file => file.name !== fileName)
//     }));
//     setUploadProgress(prev => {
//       const newProgress = { ...prev };
//       delete newProgress[fileName];
//       return newProgress;
//     });
//   };

//   const nextStep = () => {
//     setCurrentStep(prev => Math.min(prev + 1, steps.length));
//     window.scrollTo(0, 0);
//   };

//   const prevStep = () => {
//     setCurrentStep(prev => Math.max(prev - 1, 1));
//     window.scrollTo(0, 0);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const submitData = new FormData();
    
//     // Append all form data
//     Object.keys(formData).forEach(key => {
//       if (key === 'documents') {
//         formData.documents.forEach(file => {
//           submitData.append('documents', file);
//         });
//       } else if (key === 'targetCountries') {
//         formData.targetCountries.forEach(country => {
//           submitData.append('targetCountries', country);
//         });
//       } else {
//         submitData.append(key, formData[key]);
//       }
//     });

//     try {
//       await registerForUPI(submitData);
//       setCurrentStep(6); // Success step
//     } catch (err) {
//       console.error('Application error:', err);
//     }
//   };

//   const renderStep = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-semibold text-[#2D8CD4]">Personal Information</h3>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D8CD4] focus:border-transparent"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Date of Birth *
//                 </label>
//                 <input
//                   type="date"
//                   name="dateOfBirth"
//                   value={formData.dateOfBirth}
//                   onChange={handleChange}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D8CD4] focus:border-transparent"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Nationality *
//                 </label>
//                 <input
//                   type="text"
//                   name="nationality"
//                   value={formData.nationality}
//                   onChange={handleChange}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D8CD4] focus:border-transparent"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Phone Number *
//                 </label>
//                 <input
//                   type="tel"
//                   name="phoneNumber"
//                   value={formData.phoneNumber}
//                   onChange={handleChange}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D8CD4] focus:border-transparent"
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address *
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D8CD4] focus:border-transparent"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Complete Address *
//               </label>
//               <textarea
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 rows="3"
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D8CD4] focus:border-transparent"
//                 required
//               />
//             </div>

//             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//               <label className="flex items-center space-x-3">
//                 <input
//                   type="checkbox"
//                   name="isMinor"
//                   value="true"
//                   checked={formData.isMinor === 'true'}
//                   onChange={(e) => setFormData(prev => ({ ...prev, isMinor: e.target.checked ? 'true' : 'false' }))}
//                   className="rounded border-gray-300 text-[#2D8CD4] focus:ring-[#2D8CD4]"
//                 />
//                 <span className="text-sm font-medium text-gray-700">
//                   I am under 18 years old and require parental consent
//                 </span>
//               </label>
//             </div>

//             {formData.isMinor === 'true' && (
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
//                 <h4 className="font-semibold text-[#2D8CD4]">Parent/Guardian Information</h4>
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <input
//                     type="text"
//                     name="parentName"
//                     placeholder="Parent/Guardian Full Name"
//                     value={formData.parentName}
//                     onChange={handleChange}
//                     className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D8CD4] focus:border-transparent"
//                   />
//                   <input
//                     type="email"
//                     name="parentEmail"
//                     placeholder="Parent/Guardian Email"
//                     value={formData.parentEmail}
//                     onChange={handleChange}
//                     className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D8CD4] focus:border-transparent"
//                   />
//                   <input
//                     type="tel"
//                     name="parentPhone"
//                     placeholder="Parent/Guardian Phone"
//                     value={formData.parentPhone}
//                     onChange={handleChange}
//                     className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D8CD4] focus:border-transparent"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>
//         );

//       case 2:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-semibold text-[#2D8CD4]">Academic Information</h3>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Current School *
//               </label>
//               <input
//                 type="text"
//                 name="currentSchool"
//                 value={formData.currentSchool}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D8CD4] focus:border-transparent"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Current Academic Level *
//               </label>
//               <select
//                 name="academicLevel"
//                 value={formData.academicLevel}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D8CD4] focus:border-transparent"
//                 required
//               >
//                 <option value="">Select your level</option>
//                 {academicLevels.map(level => (
//                   <option key={level} value={level}>{level}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Intended Major/Field of Study *
//               </label>
//               <input
//                 type="text"
//                 name="intendedMajor"
//                 value={formData.intendedMajor}
//                 onChange={handleChange}
//                 placeholder="e.g., Computer Science, Business Administration, Medicine"
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D8CD4] focus:border-transparent"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-4">
//                 Target Study Countries (Select all that apply) *
//               </label>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                 {targetCountryOptions.map(country => (
//                   <label key={country} className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={formData.targetCountries.includes(country)}
//                       onChange={() => handleCountryChange(country)}
//                       className="rounded border-gray-300 text-[#2D8CD4] focus:ring-[#2D8CD4]"
//                     />
//                     <span className="text-sm">{country}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           </div>
//         );

//       case 3:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-semibold text-[#2D8CD4]">Document Upload</h3>
            
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
//               <h4 className="font-semibold text-[#2D8CD4] mb-3">Required Documents</h4>
//               <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
//                 <li>Academic transcripts (SS1-SS3 or equivalent)</li>
//                 <li>Passport data page or national ID</li>
//                 <li>Recent passport photograph</li>
//                 <li>Any standardized test scores (if available)</li>
//                 <li>Letters of recommendation (if available)</li>
//               </ul>
//               <p className="text-xs text-gray-600 mt-3">
//                 Supported formats: PDF, JPEG, PNG, Word documents. Maximum file size: 10MB per file.
//               </p>
//             </div>

//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
//               <FaFileUpload className="mx-auto text-4xl text-gray-400 mb-4" />
//               <input
//                 type="file"
//                 multiple
//                 onChange={handleFileUpload}
//                 accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
//                 className="hidden"
//                 id="document-upload"
//               />
//               <label
//                 htmlFor="document-upload"
//                 className="cursor-pointer bg-[#2D8CD4] text-white px-6 py-3 rounded-lg hover:bg-[#1A5F8B] transition-colors"
//               >
//                 Choose Files
//               </label>
//               <p className="text-sm text-gray-600 mt-2">
//                 Click to upload your documents
//               </p>
//             </div>

//             {formData.documents.length > 0 && (
//               <div className="space-y-3">
//                 <h4 className="font-semibold text-gray-700">Uploaded Documents</h4>
//                 {formData.documents.map((file, index) => (
//                   <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                     <div className="flex items-center space-x-3">
//                       <FaFileUpload className="text-[#2D8CD4]" />
//                       <span className="text-sm">{file.name}</span>
//                       {uploadProgress[file.name] === 100 && (
//                         <FaCheckCircle className="text-green-500" />
//                       )}
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       {uploadProgress[file.name] && uploadProgress[file.name] < 100 && (
//                         <div className="w-20 bg-gray-200 rounded-full h-2">
//                           <div 
//                             className="bg-[#2D8CD4] h-2 rounded-full transition-all"
//                             style={{ width: `${uploadProgress[file.name]}%` }}
//                           ></div>
//                         </div>
//                       )}
//                       <button
//                         type="button"
//                         onClick={() => removeDocument(file.name)}
//                         className="text-red-500 hover:text-red-700 text-sm"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         );

//       case 4:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-semibold text-[#2D8CD4]">Motivation Essay</h3>
            
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
//               <h4 className="font-semibold text-[#2D8CD4] mb-3">Essay Prompt</h4>
//               <p className="text-gray-700 mb-4">
//                 Please write a comprehensive essay (minimum 200 characters) explaining:
//               </p>
//               <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
//                 <li>Why you want to participate in the UPI program</li>
//                 <li>Your educational and career goals</li>
//                 <li>How this program will help you achieve your objectives</li>
//                 <li>What unique perspectives you bring to the program</li>
//               </ul>
//             </div>

//             <div>
//               <textarea
//                 name="motivationEssay"
//                 value={formData.motivationEssay}
//                 onChange={handleChange}
//                 rows="12"
//                 placeholder="Write your essay here..."
//                 className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D8CD4] focus:border-transparent resize-vertical"
//                 required
//               />
//               <div className="flex justify-between text-sm text-gray-500 mt-2">
//                 <span>Minimum 200 characters</span>
//                 <span>{formData.motivationEssay.length} characters</span>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-4">
//                 Financial Readiness *
//               </label>
//               <div className="space-y-3">
//                 {financialOptions.map(option => (
//                   <label key={option.value} className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
//                     <input
//                       type="radio"
//                       name="financialReadiness"
//                       value={option.value}
//                       checked={formData.financialReadiness === option.value}
//                       onChange={handleChange}
//                       className="text-[#2D8CD4] focus:ring-[#2D8CD4]"
//                       required
//                     />
//                     <span className="text-sm">{option.label}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           </div>
//         );

//       case 5:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-semibold text-[#2D8CD4]">Review Your Application</h3>
            
//             <div className="bg-gray-50 rounded-lg p-6 space-y-6">
//               {/* Personal Info Review */}
//               <div>
//                 <h4 className="font-semibold text-lg text-[#2D8CD4] mb-3">Personal Information</h4>
//                 <div className="grid md:grid-cols-2 gap-4 text-sm">
//                   <div><strong>Full Name:</strong> {formData.fullName}</div>
//                   <div><strong>Date of Birth:</strong> {formData.dateOfBirth}</div>
//                   <div><strong>Nationality:</strong> {formData.nationality}</div>
//                   <div><strong>Email:</strong> {formData.email}</div>
//                   <div><strong>Phone:</strong> {formData.phoneNumber}</div>
//                   <div><strong>Under 18:</strong> {formData.isMinor === 'true' ? 'Yes' : 'No'}</div>
//                 </div>
//                 {formData.isMinor === 'true' && (
//                   <div className="mt-3 text-sm">
//                     <strong>Parent/Guardian:</strong> {formData.parentName} ({formData.parentEmail}, {formData.parentPhone})
//                   </div>
//                 )}
//               </div>

//               {/* Academic Info Review */}
//               <div>
//                 <h4 className="font-semibold text-lg text-[#2D8CD4] mb-3">Academic Information</h4>
//                 <div className="grid md:grid-cols-2 gap-4 text-sm">
//                   <div><strong>Current School:</strong> {formData.currentSchool}</div>
//                   <div><strong>Academic Level:</strong> {formData.academicLevel}</div>
//                   <div><strong>Intended Major:</strong> {formData.intendedMajor}</div>
//                   <div><strong>Target Countries:</strong> {formData.targetCountries.join(', ')}</div>
//                 </div>
//               </div>

//               {/* Documents Review */}
//               <div>
//                 <h4 className="font-semibold text-lg text-[#2D8CD4] mb-3">Documents</h4>
//                 <div className="text-sm">
//                   <strong>Files Uploaded:</strong> {formData.documents.length}
//                   <ul className="list-disc list-inside mt-2">
//                     {formData.documents.map((file, index) => (
//                       <li key={index}>{file.name}</li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>

//               {/* Essay Review */}
//               <div>
//                 <h4 className="font-semibold text-lg text-[#2D8CD4] mb-3">Motivation Essay</h4>
//                 <div className="text-sm bg-white p-4 rounded border">
//                   {formData.motivationEssay || <em className="text-gray-500">No essay provided</em>}
//                 </div>
//               </div>

//               {/* Financial Review */}
//               <div>
//                 <h4 className="font-semibold text-lg text-[#2D8CD4] mb-3">Financial Readiness</h4>
//                 <div className="text-sm">
//                   {financialOptions.find(opt => opt.value === formData.financialReadiness)?.label}
//                 </div>
//               </div>
//             </div>

//             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//               <p className="text-sm text-yellow-800">
//                 <strong>Important:</strong> By submitting this application, you confirm that all information provided is accurate and complete. 
//                 Incomplete or inaccurate applications may be rejected.
//               </p>
//             </div>
//           </div>
//         );

//       case 6:
//         return (
//           <div className="text-center py-12">
//             <FaCheckCircle className="mx-auto text-6xl text-green-500 mb-6" />
//             <h3 className="text-3xl font-semibold text-[#2D8CD4] mb-4">Application Submitted Successfully!</h3>
//             <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
//               Thank you for applying to the University Pathways International program. 
//               Our team will review your application and contact you within 3-5 business days.
//             </p>
//             <div className="bg-blue-50 rounded-lg p-6 max-w-2xl mx-auto text-left">
//               <h4 className="font-semibold text-[#2D8CD4] mb-3">What happens next?</h4>
//               <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
//                 <li>Application review by our admissions team</li>
//                 <li>Email notification of admission decision</li>
//                 <li>Payment instructions (if accepted)</li>
//                 <li>Program orientation and materials</li>
//                 <li>Begin your UPI journey!</li>
//               </ol>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans">
//       <Navbar />
      
//       {/* Hero Section */}
//       <div className="relative bg-gradient-to-r from-[#2D8CD4] to-[#1A5F8B] text-white">
//         <div className="absolute inset-0 bg-black opacity-20"></div>
//         <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
//           <FaGraduationCap className="mx-auto text-6xl mb-6" />
//           <h1 className="text-4xl md:text-6xl font-bold mb-6">
//             University Pathways International
//           </h1>
//           <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
//             Your pathway to top global universities with personalized guidance, 
//             comprehensive support, and guaranteed results.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button 
//               onClick={() => document.getElementById('application-form').scrollIntoView({ behavior: 'smooth' })}
//               className="bg-white text-[#2D8CD4] hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors"
//             >
//               Start Application
//             </button>
//             <button className="border-2 border-white text-white hover:bg-white hover:text-[#2D8CD4] font-semibold py-3 px-8 rounded-lg transition-colors">
//               Program Details
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Program Benefits */}
//       <div className="max-w-7xl mx-auto px-4 py-16">
//         <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
//           Why Choose UPI?
//         </h2>
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {programBenefits.map((benefit, index) => (
//             <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
//               <benefit.icon className="mx-auto text-4xl text-[#2D8CD4] mb-4" />
//               <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
//               <p className="text-gray-600">{benefit.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Testimonials */}
//       <div className="bg-gray-100 py-16">
//         <div className="max-w-7xl mx-auto px-4">
//           <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
//             Success Stories
//           </h2>
//           <div className="grid md:grid-cols-2 gap-8">
//             {testimonials.map((testimonial, index) => (
//               <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
//                 <FaQuoteLeft className="text-4xl text-[#2D8CD4] mb-4" />
//                 <p className="text-gray-700 text-lg mb-6">{testimonial.text}</p>
//                 <div>
//                   <p className="font-semibold text-gray-900">{testimonial.name}</p>
//                   <p className="text-[#2D8CD4]">{testimonial.program}</p>
//                   <p className="text-gray-600 text-sm">{testimonial.university}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Application Form */}
//       <div id="application-form" className="max-w-6xl mx-auto px-4 py-16">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           {/* Progress Steps */}
//           <div className="bg-gradient-to-r from-[#2D8CD4] to-[#1A5F8B] p-6">
//             <div className="flex justify-between items-center">
//               {steps.map((step, index) => (
//                 <div key={step.number} className="flex items-center">
//                   <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
//                     currentStep >= step.number ? 'bg-white text-[#2D8CD4]' : 'bg-white/20 text-white'
//                   } font-semibold transition-all`}>
//                     {currentStep > step.number ? (
//                       <FaCheckCircle className="text-lg" />
//                     ) : (
//                       <step.icon className="text-lg" />
//                     )}
//                   </div>
//                   {index < steps.length - 1 && (
//                     <div className={`w-16 h-1 mx-2 ${
//                       currentStep > step.number ? 'bg-white' : 'bg-white/20'
//                     } transition-colors`}></div>
//                   )}
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-between mt-4">
//               {steps.map(step => (
//                 <span 
//                   key={step.number}
//                   className={`text-sm font-medium ${
//                     currentStep >= step.number ? 'text-white' : 'text-white/60'
//                   }`}
//                 >
//                   {step.title}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Form Content */}
//           <div className="p-8">
//             {currentStep <= 5 && (
//               <form onSubmit={handleSubmit}>
//                 {renderStep()}
                
//                 {currentStep < 5 && (
//                   <div className="flex justify-between mt-8 pt-6 border-t">
//                     <button
//                       type="button"
//                       onClick={prevStep}
//                       disabled={currentStep === 1}
//                       className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                     >
//                       Previous
//                     </button>
//                     <button
//                       type="button"
//                       onClick={nextStep}
//                       className="bg-[#2D8CD4] text-white px-6 py-3 rounded-lg hover:bg-[#1A5F8B] transition-colors"
//                     >
//                       {currentStep === 4 ? 'Review Application' : 'Next Step'}
//                     </button>
//                   </div>
//                 )}

//                 {currentStep === 5 && (
//                   <div className="flex justify-between mt-8 pt-6 border-t">
//                     <button
//                       type="button"
//                       onClick={prevStep}
//                       className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
//                     >
//                       Back to Edit
//                     </button>
//                     <button
//                       type="submit"
//                       disabled={loading}
//                       className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
//                     >
//                       {loading ? 'Submitting...' : 'Submit Application'}
//                     </button>
//                   </div>
//                 )}
//               </form>
//             )}

//             {currentStep === 6 && (
//               <div className="text-center">
//                 <button
//                   onClick={() => {
//                     setCurrentStep(1);
//                     setFormData({
//                       fullName: '',
//                       dateOfBirth: '',
//                       nationality: '',
//                       email: '',
//                       phoneNumber: '',
//                       address: '',
//                       currentSchool: '',
//                       academicLevel: '',
//                       intendedMajor: '',
//                       targetCountries: [],
//                       documents: [],
//                       motivationEssay: '',
//                       financialReadiness: '',
//                       isMinor: 'false',
//                       parentName: '',
//                       parentEmail: '',
//                       parentPhone: ''
//                     });
//                   }}
//                   className="bg-[#2D8CD4] text-white px-8 py-3 rounded-lg hover:bg-[#1A5F8B] transition-colors"
//                 >
//                   Submit Another Application
//                 </button>
//               </div>
//             )}

//             {error && (
//               <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
//                 <p className="text-red-700">{error}</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UPI;