import React from 'react';
import { CMSLink } from '@/core/atoms/Link';
import { FooterLinkRowProps } from '@/core/types/components/Footer';

const FooterLinkRow = ({ data, className }: FooterLinkRowProps) => {
  return (
    <div className="flex flex-wrap justify-center items-center space-x-2">
      {data.length > 0 ? (
        data.map((link, index) => (
          <div key={index} className="flex items-center">
            <CMSLink
              href={link.href}
              className={`text-blue-600 hover:text-green-700 transition-colors ${className}`}
            >
              {link.title}
            </CMSLink>
            {index < data.length - 1 && <span className="ml-2 text-gray-400">•</span>}
          </div>
        ))
      ) : (
        <div className="text-gray-400">No links available</div>
      )}
    </div>
  );
};

export default FooterLinkRow;
