import React from 'react';

export const Cow = ({ className = '', size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2a2 2 0 0 0-2 2v1c0 1.1-.9 2-2 2H4.5c-.5 0-.9.4-.9.9v1.2c0 .5.4.9.9.9H8c1.1 0 2 .9 2 2v8c0 1.1.9 2 2 2s2-.9 2-2v-8c0-1.1.9-2 2-2h3.5c.5 0 .9-.4.9-.9V7.9c0-.5-.4-.9-.9-.9H16c-1.1 0-2-.9-2-2V4c0-1.1-.9-2-2-2z" />
    <circle cx="8" cy="8" r="1" />
    <circle cx="16" cy="8" r="1" />
  </svg>
);