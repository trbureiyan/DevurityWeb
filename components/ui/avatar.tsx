"use client";

import * as React from "react";
import Image from "next/image";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

interface AvatarImageProps {
  src?: string;
  alt?: string;
  className?: string;
}

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative flex size-8 shrink-0 overflow-hidden rounded-full ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Avatar.displayName = "Avatar";

function AvatarImage({ className = "", src, alt }: AvatarImageProps) {
  if (!src) return null;
  return (
    <Image
      src={src}
      alt={alt ?? ""}
      fill
      sizes="192px"
      className={`aspect-square size-full object-cover ${className}`}
    />
  );
}

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-gray-200 flex size-full items-center justify-center rounded-full ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  },
);

AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
