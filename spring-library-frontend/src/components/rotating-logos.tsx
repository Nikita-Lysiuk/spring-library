import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';

const RotatingLogos = () => {
  const baseLogos = [
    '/umcs-logo.png',
    '/amazon-logo.png',
    '/notion-logo.png',
    '/hubspot-logo.png',
    '/dribble-logo.png',
  ];

  const [logos, setLogos] = useState([...baseLogos, ...baseLogos]);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateLogos = () => {
      const screenWidth = window.innerWidth;
      const logoWidth = 192 + 64;
      const minLogos = Math.ceil(screenWidth / logoWidth) * 2;

      const repeatedLogos = [];
      for (let i = 0; i < Math.max(minLogos, baseLogos.length * 2); i++) {
        repeatedLogos.push(baseLogos[i % baseLogos.length]);
      }

      setLogos(repeatedLogos);
    };

    updateLogos();
    window.addEventListener('resize', updateLogos);
    return () => window.removeEventListener('resize', updateLogos);
  }, []);

  return (
    <div className="w-full overflow-hidden relative" ref={containerRef}>
      <motion.div
        className="flex"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 15,
          ease: 'linear',
        }}
        style={{
          willChange: 'transform',
          display: 'inline-flex',
          gap: '64px',
        }}
      >
        {logos.map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt={`Logo ${index}`}
            className="w-48 h-auto object-contain flex-shrink-0"
            initial={{ opacity: 0.7 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default RotatingLogos;
