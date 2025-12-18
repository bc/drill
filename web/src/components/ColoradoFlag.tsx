export function ColoradoFlag({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 60 40" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Blue stripe */}
      <rect width="60" height="13.33" fill="#002868"/>
      
      {/* White stripe */}
      <rect y="13.33" width="60" height="13.33" fill="#FFFFFF"/>
      
      {/* Blue stripe */}
      <rect y="26.66" width="60" height="13.33" fill="#002868"/>
      
      {/* Red C */}
      <circle cx="20" cy="20" r="10" fill="#BF0A30"/>
      <circle cx="20" cy="20" r="7.5" fill="transparent"/>
      
      {/* Gold disk inside C */}
      <circle cx="20" cy="20" r="5" fill="#FFD700"/>
    </svg>
  );
}
