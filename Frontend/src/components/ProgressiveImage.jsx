import React, { useState, useEffect, useRef } from 'react';
import './ProgressiveImage.css';

function ProgressiveImage({ src, alt, className = '', aspectRatio = '1/1' }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={imgRef} 
      className={`progressive-image-wrapper ${className}`}
    >
      {!isLoaded && <div className="image-placeholder skeleton"></div>}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`progressive-image ${isLoaded ? 'loaded' : ''}`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      )}
    </div>
  );
}

export default ProgressiveImage;
