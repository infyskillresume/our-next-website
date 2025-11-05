'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      gsap.utils.toArray('.info-card').forEach((card: any) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: 'How do I enroll in a course?',
      answer: 'You can enroll in any of our courses by visiting the Courses page, selecting your desired course, and clicking the "Enroll Now" button. You\'ll be guided through the payment and registration process.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit/debit cards, net banking, UPI payments (Google Pay, PhonePe, etc.).'
    },
    {
      question: 'Do you provide placement assistance?',
      answer: 'Yes, we have a dedicated placement cell that helps students with resume building, interview preparation, and connecting with our hiring partners.'
    },
    {
      question: 'Are your certificates recognized by employers?',
      answer: 'Our certificates are industry-recognized and valued by our hiring partners. Many of our students have secured jobs at top companies using our certifications.'
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Contact Hero */}
      <section className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you</p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="contact-info">
        <div className="container">
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3>Our Location</h3>
              <p>P822+6W9 Visakhapatnam, Andhra Pradesh</p>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-phone-alt"></i>
              </div>
              <h3>Phone Number</h3>
              <p>+91 9080087187<br />+91 9347140822</p>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <h3>Email Address</h3>
              <p>infyskilledutech@gmail.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form - Map Section */}
      <section className="contact-form-section">
        <div className="map-container" style={{ textAlign: 'center' }}>
          <h2>Find Us on Map</h2>
          <div className="map-wrapper" style={{ marginLeft: '300px', marginRight: '300px' }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d237.55838206525155!2d83.3022558615644!3d17.700572362199587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDQyJzAxLjkiTiA4M8KwMTgnMDguNSJF!5e0!3m2!1sen!2sin!4v1753033542220!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Contact Success */}
      {showSuccess && (
        <div className="contact-success" id="contactSuccess" style={{ display: 'block' }}>
          <div className="container">
            <div className="success-content">
              <i className="fas fa-check-circle"></i>
              <h3>Message Sent Successfully!</h3>
              <p>Thank you for contacting us. We'll get back to you shortly.</p>
              <a href="/" className="btn btn-secondary">Back to Home</a>
            </div>
          </div>
        </div>
      )}

    

      <Footer />
    </>
  );
}