'use client';

import { useRouter } from 'next/navigation';

interface ClientButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export function ClientButton({ 
  href, 
  onClick, 
  children, 
  className = '', 
  variant = 'primary' 
}: ClientButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else if (onClick) {
      onClick();
    }
  };

  const buttonClass = `btn ${variant === 'primary' ? 'btn-primary' : 'btn-secondary'} ${className}`;

  return (
    <button onClick={handleClick} className={buttonClass}>
      {children}
    </button>
  );
}