import NextLink from 'next/link';
import { CMSLinkField } from '../types/Fields';

interface LinkProps {
  link: CMSLinkField;
  children?: React.ReactNode;
  className?: string;
}

export const CMSLink = (props: LinkProps) => {
  
  const effectiveHref = props.link.href || '#';
  const linkText = props.children || props.link.title || effectiveHref;

  return (
    <NextLink href={effectiveHref.toLowerCase()} prefetch={false} className={props.className}>
      {linkText}
    </NextLink>
  );
};
