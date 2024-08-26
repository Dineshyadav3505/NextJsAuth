"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ButtonSec = ({ label, link }) => {
  const pathname = usePathname();

  return (
    <Link href={link} className={`${pathname === link ? " bg-[rgba(114,112,112,0.2)] " : " "} py-1 px-4 text-base rounded-full capitalize`}
    >
      {label}
    </Link>
  );
};

export default ButtonSec;