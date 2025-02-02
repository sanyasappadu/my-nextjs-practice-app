import React from 'react';

function Footer() {
  return (
    <div className="w-full h-20 sticky bottom-0 bg-gray-300 dark:bg-gray-700 shadow-md">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <p className="text-gray-700 dark:text-gray-300 text-sm">
          © 2025 Task Manager. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href="#" className="text-gray-700 dark:text-gray-300 text-sm hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-700 dark:text-gray-300 text-sm hover:underline">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
