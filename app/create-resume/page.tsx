'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CreateResumePage() {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('infyskill_token');
    if (!token) {
      window.location.href = '/login';
    }
  }, []);

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <>
      <Navbar />
      
      <section className="resume-hero">
        <div className="container">
          <div className="resume-hero-content">
            <h1>Create Your Professional Resume</h1>
            <p className="subtitle">Build a stunning resume in minutes with our easy-to-use builder</p>
            <div className="resume-features">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-file-alt"></i>
                </div>
                <h3>Professional Templates</h3>
                <p>Choose from multiple designs</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-download"></i>
                </div>
                <h3>Download PDF</h3>
                <p>Export in multiple formats</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-edit"></i>
                </div>
                <h3>Easy to Edit</h3>
                <p>Update anytime, anywhere</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <h3>Mobile Friendly</h3>
                <p>Works on all devices</p>
              </div>
            </div>
          </div>
          <div className="resume-hero-image">
            <img src="/images/image24.jpg" alt="Resume Builder" />
          </div>
        </div>
      </section>

      <section className="resume-builder">
        <div className="container">
          <div className="builder-container">
            <div className="builder-header">
              <h2>Build Your Resume</h2>
              <p>Fill in your details step by step</p>
            </div>

            <div className="builder-steps">
              <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
                <span>1</span>
                <p>Personal</p>
              </div>
              <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
                <span>2</span>
                <p>Education</p>
              </div>
              <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
                <span>3</span>
                <p>Experience</p>
              </div>
              <div className={`step ${currentStep >= 4 ? 'active' : ''}`}>
                <span>4</span>
                <p>Skills</p>
              </div>
            </div>

            <form className="resume-form">
              {currentStep === 1 && (
                <div className="form-step active">
                  <h3>Personal Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input type="text" placeholder="John Doe" required />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" placeholder="john@example.com" required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone</label>
                      <input type="tel" placeholder="+91 9876543210" required />
                    </div>
                    <div className="form-group">
                      <label>Location</label>
                      <input type="text" placeholder="City, State" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Professional Summary</label>
                    <textarea placeholder="Brief description about yourself" rows={4}></textarea>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="form-step active">
                  <h3>Education</h3>
                  <div className="form-group">
                    <label>Degree</label>
                    <input type="text" placeholder="Bachelor of Technology" required />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Institution</label>
                      <input type="text" placeholder="University Name" required />
                    </div>
                    <div className="form-group">
                      <label>Year</label>
                      <input type="text" placeholder="2020-2024" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Grade/Percentage</label>
                    <input type="text" placeholder="8.5 CGPA or 85%" required />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="form-step active">
                  <h3>Work Experience</h3>
                  <div className="form-group">
                    <label>Job Title</label>
                    <input type="text" placeholder="Software Developer" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Company</label>
                      <input type="text" placeholder="Company Name" />
                    </div>
                    <div className="form-group">
                      <label>Duration</label>
                      <input type="text" placeholder="Jan 2023 - Present" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea placeholder="Describe your responsibilities and achievements" rows={4}></textarea>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="form-step active">
                  <h3>Skills</h3>
                  <div className="form-group">
                    <label>Technical Skills</label>
                    <input type="text" placeholder="React, Node.js, Python, etc." required />
                  </div>
                  <div className="form-group">
                    <label>Soft Skills</label>
                    <input type="text" placeholder="Communication, Leadership, etc." required />
                  </div>
                  <div className="form-group">
                    <label>Languages</label>
                    <input type="text" placeholder="English, Hindi, etc." required />
                  </div>
                  <div className="form-group">
                    <label>Certifications (Optional)</label>
                    <textarea placeholder="List your certifications" rows={3}></textarea>
                  </div>
                </div>
              )}

              <div className="form-actions">
                {currentStep > 1 && (
                  <button type="button" onClick={prevStep} className="btn btn-outline">
                    Previous
                  </button>
                )}
                {currentStep < 4 ? (
                  <button type="button" onClick={nextStep} className="btn btn-primary">
                    Next
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary">
                    Generate Resume
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="resume-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Create Your Resume?</h2>
            <p>Join thousands of students who have successfully created their professional resumes with us</p>
            <a href="#" className="btn btn-secondary">Get Started Now</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}