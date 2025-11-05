'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

export default function GallerySection() {
  const images = [
    '/images/image01.jpg', '/images/image02.jpg', '/images/image03.jpg',
    '/images/image04.jpg', '/images/image05.jpg', '/images/image06.jpg',
    '/images/image07.jpg', '/images/image08.jpg', '/images/image09.jpg',
    '/images/image10.jpg', '/images/image20.jpg', '/images/image12.jpg',
    '/images/image15.jpg', '/images/image16.jpg', '/images/image17.jpg', 
    '/images/image18.jpg',
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [lastX, setLastX] = useState(0);
  const [lastTime, setLastTime] = useState(0);
  const animationFrameRef = useRef<number | null>(null);

  // Momentum scrolling
  const applyMomentum = () => {
    if (!containerRef.current || Math.abs(velocity) < 0.5) {
      setVelocity(0);
      return;
    }

    const container = containerRef.current;
    container.scrollLeft -= velocity;
    setVelocity(velocity * 0.95); // Friction
    animationFrameRef.current = requestAnimationFrame(applyMomentum);
  };

  useEffect(() => {
    if (!isDragging && Math.abs(velocity) > 0.5) {
      animationFrameRef.current = requestAnimationFrame(applyMomentum);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDragging, velocity]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    setLastX(e.pageX);
    setLastTime(Date.now());
    setVelocity(0);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();

    const currentTime = Date.now();
    const currentX = e.pageX;
    const timeDelta = currentTime - lastTime;

    if (timeDelta > 0) {
      const newVelocity = (currentX - lastX) / timeDelta * 10;
      setVelocity(newVelocity);
    }

    setLastX(currentX);
    setLastTime(currentTime);

    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Drag speed multiplier
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    setLastX(e.touches[0].pageX);
    setLastTime(Date.now());
    setVelocity(0);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const currentTime = Date.now();
    const currentX = e.touches[0].pageX;
    const timeDelta = currentTime - lastTime;

    if (timeDelta > 0) {
      const newVelocity = (currentX - lastX) / timeDelta * 10;
      setVelocity(newVelocity);
    }

    setLastX(currentX);
    setLastTime(currentTime);

    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Animate items on mount
  useEffect(() => {
    gsap.fromTo(
      '.gallery-item-card',
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
      }
    );
  }, []);

  return (
    <section className="gallery">
      <div className="container">
        <h2 className="section-title">Our Gallery</h2>
        
        <div
          ref={containerRef}
          className={`gallery-carousel-container ${isDragging ? 'dragging' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="gallery-carousel-track">
            {images.map((img, index) => (
              <div key={index} className="gallery-item-card">
                <img 
                  src={img} 
                  alt={`Gallery Image ${index + 1}`}
                  draggable={false}
                />
                <div className="gallery-item-overlay">
                  <span className="gallery-item-number">{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="gallery-hint">← Drag to scroll →</p>
      </div>
    </section>
  );
}
