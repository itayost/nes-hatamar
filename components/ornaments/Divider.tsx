export default function Divider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex justify-center items-center my-8 ${className}`}>
      <div className="flex-grow h-px bg-gradient-to-r from-transparent via-border to-border"></div>
      <div className="mx-4">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-gold"
        >
          {/* Center diamond */}
          <path
            d="M20 10 L25 20 L20 30 L15 20 Z"
            fill="currentColor"
            opacity="0.6"
          />
          {/* Side decorations */}
          <circle cx="10" cy="20" r="2" fill="currentColor" opacity="0.4" />
          <circle cx="30" cy="20" r="2" fill="currentColor" opacity="0.4" />
          {/* Leaf details */}
          <path
            d="M12 18 Q14 19 14 20 Q14 21 12 22"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
          />
          <path
            d="M28 18 Q26 19 26 20 Q26 21 28 22"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
          />
        </svg>
      </div>
      <div className="flex-grow h-px bg-gradient-to-l from-transparent via-border to-border"></div>
    </div>
  );
}
