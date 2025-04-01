const RotatingLogos = () => {
  const logos = [
    '/umcs-logo.png',
    '/amazon-logo.png',
    '/notion-logo.png',
    '/hubspot-logo.png',
    '/dribble-logo.png',
    '/umcs-logo.png',
    '/amazon-logo.png',
    '/notion-logo.png',
    '/hubspot-logo.png',
    '/dribble-logo.png',
  ];

  return (
    <div className="w-full overflow-hidden py-8">
      <div className="flex animate-loop-scroll space-x-16">
        {logos.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Company Logo ${index + 1}`}
            className="w-48 h-auto object-contain flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default RotatingLogos;
