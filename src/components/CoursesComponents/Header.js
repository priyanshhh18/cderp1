// components/CoursesComponents/Header.js (Updated DSHeader)

"use client";

import { useState, useEffect, useMemo } from "react"; // Removed useContext and Head
import styles from "@/styles/CoursesComponents/Header.module.css";
import Btnform from "@/components/HomePage/Btnform"; // Assuming Btnform is a client component

const countryCodes = [
  { code: "+91", country: "India", minLength: 10, maxLength: 10 },
  { code: "+1", country: "USA", minLength: 10, maxLength: 10 },
  { code: "+44", country: "UK", minLength: 10, maxLength: 11 },
  { code: "+61", country: "Australia", minLength: 9, maxLength: 9 },
  { code: "+81", country: "Japan", minLength: 10, maxLength: 10 },
  { code: "+49", country: "Germany", minLength: 10, maxLength: 11 },
  { code: "+33", country: "France", minLength: 9, maxLength: 9 },
  { code: "+86", country: "China", minLength: 11, maxLength: 11 },
  { code: "+7", country: "Russia", minLength: 10, maxLength: 10 },
  { code: "+39", country: "Italy", minLength: 10, maxLength: 10 },
  { code: "+55", country: "Brazil", minLength: 10, maxLength: 11 },
  { code: "+34", country: "Spain", minLength: 9, maxLength: 9 },
  { code: "+27", country: "South Africa", minLength: 9, maxLength: 9 },
  { code: "+971", country: "UAE", minLength: 9, maxLength: 9 },
  { code: "+62", country: "Indonesia", minLength: 10, maxLength: 12 },
  { code: "+90", country: "Turkey", minLength: 10, maxLength: 10 },
  { code: "+82", country: "South Korea", minLength: 9, maxLength: 10 },
  { code: "+60", country: "Malaysia", minLength: 9, maxLength: 10 },
  { code: "+31", country: "Netherlands", minLength: 9, maxLength: 9 },
  { code: "+52", country: "Mexico", minLength: 10, maxLength: 10 },
];

// DSHeader now directly receives the 'data' prop (already processed with city placeholders replaced)
const DSHeader = ({ data, currentCityName, courseSlug }) => {
  const [formData, setFormData] = useState({ countryCode: "+91", contact: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });
  const [showForm, setShowForm] = useState(false);

  // Clear status message after 5 seconds
  useEffect(() => {
    if (statusMessage.text) {
      const timer = setTimeout(() => {
        setStatusMessage({ text: "", type: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  // If data is null or undefined, render a loading/error state
  if (!data) {
    return (
      <div className={styles.containerItDsHeader}>
        <p>Loading header data...</p> {/* Or a proper loader/error message */}
      </div>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "contact") {
      const digitsOnly = value.replace(/\D/g, "");
      setFormData((prevData) => ({ ...prevData, [name]: digitsOnly }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.contact) {
      setStatusMessage({
        text: "Please fill all required fields",
        type: "error",
      });
      return false;
    }

    const selectedCountry = countryCodes.find(
      (country) => country.code === formData.countryCode
    );

    if (!selectedCountry) {
      setStatusMessage({
        text: "Invalid country code",
        type: "error",
      });
      return false;
    }

    const { minLength, maxLength } = selectedCountry;

    if (
      formData.contact.length < minLength ||
      formData.contact.length > maxLength
    ) {
      setStatusMessage({
        text: `Phone number for ${selectedCountry.country} must be between ${minLength} and ${maxLength} digits`,
        type: "error",
      });
      return false;
    }

    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(formData.contact)) {
      setStatusMessage({
        text: "Phone number must contain only digits",
        type: "error",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatusMessage({
        text: "Please enter a valid email address",
        type: "error",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setStatusMessage({ text: "", type: "" });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/submit`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        // Try to extract JSON error if available, else use text
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const errData = await response.json();
          throw new Error(errData?.message || "Submission failed. Please try again.");
        } else {
          const errText = await response.text();
          throw new Error(errText || "Submission failed. Please try again.");
        }
      }

      // Only parse JSON if server returns JSON
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        await response.json();
      }

      setStatusMessage({
        text: "Form submitted successfully!",
        type: "success",
      });

      setFormData({
        name: "",
        email: "",
        course: "", // You might want to pre-fill this based on 'data' prop
        countryCode: "+91",
        contact: "",
      });
    } catch (error) {
      setStatusMessage({
        text: error.message || "An error occurred. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleButtonClick = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  // List of online cities where we need to modify the description
  const onlineCitySlugs = new Set([
    "delhi",
    "kolkata",
    "chennai",
    "bangalore",
    "hyderabad",
    "ahmedabad",
    "jaipur",
    "lucknow",
    "kanpur",
    "nagpur",
    "patna",
    "indore",
    "bhopal",
    "visakhapatnam",
    "vadodara",
    "ludhiana",
    "agra",
    "nashik",
    "rajkot",
    "varanasi",
    "kerala",
    "surat",
    "dehradun",
    "madurai",
    "mysore",
    "pondicherry",
    "ranchi",
    "coimbatore",
    "chandigarh",
    "bhubaneswar",
    "tirupati",
    "vizag",
    "trivandrum",
    "jalandhar",
    "mohali",
    "raipur",
    "cochin",
    "mangalore",
  ]);

  // Function to modify description for online cities
  const getModifiedDescription = () => {
    if (!data?.description || !currentCityName || !courseSlug) return data?.description;

    // Check if current city is in the online cities list
    const citySlug = currentCityName.toLowerCase().replace(/\s+/g, '-');
    if (!onlineCitySlugs.has(citySlug)) return data.description;

    // Extract course name from courseSlug
    if (courseSlug) {
      // Try multiple approaches to extract course name
      let courseName = courseSlug.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      
      // Alternative course name formats - more comprehensive
      const alternativeCourseNames = [
        courseName,
        courseSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        courseSlug.toUpperCase().replace(/-/g, ' '),
        courseSlug.replace(/-/g, '').toUpperCase(),
        // Add specific patterns for common course types
        courseSlug.includes('data') ? 'Data Visualization' : null,
        courseSlug.includes('hr') ? 'HR Training' : null,
        courseSlug.includes('sap') ? 'SAP' : null,
        courseSlug.includes('digital') ? 'Digital Marketing' : null,
        // Additional patterns for better detection
        courseSlug.includes('data') && courseSlug.includes('visualization') ? 'Data Visualization Course' : null,
        courseSlug.includes('hr') && courseSlug.includes('training') ? 'HR Training Course' : null,
        courseSlug.includes('sap') && courseSlug.includes('fico') ? 'SAP FICO Course' : null,
        courseSlug.includes('digital') && courseSlug.includes('marketing') ? 'Digital Marketing Course' : null
      ].filter(Boolean); // Remove null values

      // Priority rule: insert "online" only before patterns like
      // "[Course Name] course" or "[Course Name] training"
      for (const altCourseName of alternativeCourseNames) {
        const escapedAlt = altCourseName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const pairRegex = new RegExp(`\\b(?!online\\s)(${escapedAlt})(\\s+(course|training))\\b`, 'i');
        if (pairRegex.test(data.description)) {
          // Replace only the first occurrence to avoid over-insertion
          const modified = data.description.replace(pairRegex, 'online $1$2');
          return modified;
        }
      }

      // Secondary rule: if description already contains a generic course phrase like
      // "[something] course" or "[something] training" without "online", insert it there
      const genericPairRegex = /(\b(?!online\s)[A-Za-z][A-Za-z\s]{0,50}?)(\s+(course|training))\b/i;
      if (genericPairRegex.test(data.description) && !/\bonline\b/i.test(data.description)) {
        return data.description.replace(genericPairRegex, 'online $1$2');
      }
    }

    return data.description;
  };

  // Get the modified description
  const displayDescription = getModifiedDescription();
  
  // Debug logging
  if (process.env.NODE_ENV === 'development') {
    console.log('Header Component Debug:', {
      currentCityName,
      courseSlug,
      originalDescription: data?.description,
      modifiedDescription: displayDescription,
      citySlug: currentCityName?.toLowerCase().replace(/\s+/g, '-'),
      isOnlineCity: currentCityName ? onlineCitySlugs.has(currentCityName.toLowerCase().replace(/\s+/g, '-')) : false,
      alternativeCourseNames: courseSlug ? [
        courseSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        courseSlug.includes('data') ? 'Data Visualization' : null,
        courseSlug.includes('hr') ? 'HR Training' : null,
        courseSlug.includes('sap') ? 'SAP' : null,
        courseSlug.includes('digital') ? 'Digital Marketing' : null
      ].filter(Boolean) : []
    });
  }

  return (
    <div className={styles.containerItDsHeader}>
      {/* Removed <Head> component here as metadata is handled by page.js */}

      {/* 🔹 Background Video */}
      <video
        className={styles.backgroundVideo}
        src={data.backgroundVideo} // Use data from props
        autoPlay
        loop
        muted
        playsInline
      />

      <div className={styles.leftSectionItDs}>
        <h1>
          <span className={styles.dsHeaderSpan}>{data.title}</span>
        </h1>
        <h2>
          <span className={styles.dsHeaderSpan2}>{data.subtitle}</span>
        </h2>
        <p dangerouslySetInnerHTML={{ __html: displayDescription }} />
        <ul className={styles.featuresItDs}>
          {data.features.map((feature, index) => (
            <li className={styles.featuresItDsli} key={index}>
              {feature}
            </li>
          ))}
        </ul>
        <div className={styles.alumniItDs}>
          <span>Find our Alumni at -</span>
          <div className={styles.alumniLogosItDs}>
            {data.alumni.map((company, index) => (
              <img
                key={index}
                src={company.logo}
                alt={`${company.name} logo`}
              />
            ))}
          </div>
        </div>
        <div className={styles.buttons}>
          {data.buttons.map((button, index) => (
            <button
              key={index}
              className={
                index === 0 ? styles.buttonStyle1 : styles.buttonStyle2
              }
              onClick={handleButtonClick}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.rightSectionItDs}>
        <h3>{data.form.title}</h3>

        {statusMessage.text && (
          <div
            className={`${styles.statusMessage} ${styles[statusMessage.type]}`}
          >
            {statusMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          {data.form?.inputs?.map((input, index) => {
            if (input.countryCode) {
              const selectedCountry = countryCodes.find(
                (country) => country.code === formData.countryCode
              );
              const maxLength = selectedCountry?.maxLength || 10;

              return (
                <div key={index} className={styles.phoneInputItDs}>
                  <div className={styles.countryCodeWrapper}>
                    <select
                      id="countryCode"
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className={styles.selectCountryCode}
                      disabled={isSubmitting}
                    >
                      {countryCodes.map(({ code, country }) => (
                        <option key={code} value={code}>
                          {code} ({country})
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    type="tel"
                    id="contact"
                    name="contact"
                    placeholder="Enter your phone number"
                    value={formData.contact}
                    onChange={handleChange}
                    maxLength={maxLength}
                    required
                    disabled={isSubmitting}
                  />
                </div>
              );
            } else {
              return (
                <input
                  key={index}
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                  className={styles.input}
                  value={formData[input.name] || ""}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                />
              );
            }
          })}

          <button
            type="submit"
            className={`${styles.submitButtonItDs} ${isSubmitting ? styles.loading : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className={styles.buttonText}>Submitting</span>
                <span className={styles.buttonLoader}></span>
              </>
            ) : (
              data.form.submitText
            )}
          </button>
        </form>
      </div>

      {showForm && <Btnform onClose={handleCloseForm} />}
    </div>
  );
};

export default DSHeader;
