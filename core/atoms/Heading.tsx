import React, { ReactNode } from 'react';

// Define the interface for the Heading component's props
interface HeadingProps {
  level: string; 
  children: ReactNode; // Allow any valid React child (text, other components, etc.)
}

function Heading( props : HeadingProps) {
  const { level, children } = props;
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements; 

  return <Tag {...props}>{children}</Tag>;
}

export default Heading;