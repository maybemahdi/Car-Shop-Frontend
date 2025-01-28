/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArrowRight } from 'lucide-react';
import React from 'react';
import { cn } from '../../../lib/utils';

interface ButtonProps {
  text: string;
  isRounded?: boolean;
  arrow?: boolean;
  isFullWidth?: boolean;
  isReversed?: boolean;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  text,
  arrow,
  isFullWidth,
  handleClick,
}: ButtonProps) {
  return (
    <button
      onClick={handleClick}
      className={cn(
        'px-5 bg-transparent border border-primary text-primary h-[50px] my-3 flex items-center justify-center rounded-lg cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-100 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-primary before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-lg hover:before:left-0 hover:text-[#fff] hover:border-none', {
          "w-full" : isFullWidth,
        }
      )}
    >
      {text}
      {arrow && <ArrowRight className="ml-2 h-4 w-4" />}
    </button>
  );
}
