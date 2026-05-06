import { cn } from "@/lib/utils";

interface FloralSVGProps {
  className?: string;
  variant?: 1 | 2;
}

const FloralSVG = ({ className, variant = 1 }: FloralSVGProps) => {
  if (variant === 2) {
    return (
      <svg
        viewBox="0 0 200 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("pointer-events-none opacity-15", className)}
      >
        <path
          d="M100 400C100 400 100 300 120 250C140 200 180 150 180 100C180 50 140 20 100 0C60 20 20 50 20 100C20 150 60 200 80 250C100 300 100 400 100 400Z"
          stroke="#B87355"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M100 350C100 350 110 320 130 300"
          stroke="#B87355"
          strokeWidth="1.5"
        />
        <path
          d="M100 300C100 300 90 270 70 250"
          stroke="#B87355"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 300 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none opacity-10", className)}
    >
      <path
        d="M50 450C50 450 80 350 150 300C220 250 250 150 250 50"
        stroke="#B87355"
        strokeWidth="1.2"
      />
      <ellipse cx="140" cy="310" rx="15" ry="30" transform="rotate(-30 140 310)" stroke="#B87355" strokeWidth="1" />
      <ellipse cx="180" cy="240" rx="12" ry="25" transform="rotate(-20 180 240)" stroke="#B87355" strokeWidth="1" />
      <ellipse cx="210" cy="160" rx="10" ry="20" transform="rotate(-15 210 160)" stroke="#B87355" strokeWidth="1" />
      <ellipse cx="60" cy="380" rx="14" ry="28" transform="rotate(20 60 380)" stroke="#B87355" strokeWidth="1" />
    </svg>
  );
};

export default FloralSVG;
