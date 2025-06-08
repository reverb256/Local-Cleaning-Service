import wjsLogo from "@assets/wjs-logo-windows.png";

interface LogoProps {
  className?: string;
  variant?: "default" | "header" | "footer";
}

export default function Logo({ className = "", variant = "default" }: LogoProps) {
  const getSize = () => {
    switch (variant) {
      case "header":
        return "h-12 w-auto";
      case "footer":
        return "h-10 w-auto";
      default:
        return "h-16 w-auto";
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={wjsLogo} 
        alt="Workplace Janitorial Services" 
        className={`${getSize()} object-contain`}
      />
    </div>
  );
}