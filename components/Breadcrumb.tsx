import { JSX } from 'react';
import React from 'react';
import { CMSLink } from '@/core/atoms/Link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/core/ui/breadcrumb';
import { BreadcrumbProps } from '@/core/types/Props';

const BreadCrumb = (props: BreadcrumbProps): JSX.Element => {
  const { breadcrumb } = props;
  const { breadcrumb_items, rendering_options } = breadcrumb;
  
  const showHome = rendering_options?.show_home !== false;
  const customSeparator = rendering_options?.separator;

  // Create all breadcrumb items including optional home
  const allBreadcrumbItems = [];
  
  if (showHome) {
    allBreadcrumbItems.push({
      title: 'Home',
      link: { href: '/', title: 'Home' },
      $: {}
    });
  }
  
  if (breadcrumb_items) {
    allBreadcrumbItems.push(...breadcrumb_items);
  }

  // Filter out items without titles
  const visibleBreadcrumbs = allBreadcrumbItems.filter(
    (crumb) => crumb.title
  );

  if (!visibleBreadcrumbs.length) {
    return <></>;
  }

  return (
    <div {...breadcrumb.$}>
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          {visibleBreadcrumbs.map((crumb, index: number) => (
            <React.Fragment key={`${crumb.link?.href || crumb.title}-${index}`}>
              <BreadcrumbItem>
                {index === visibleBreadcrumbs.length - 1 ? (
                  <BreadcrumbPage {...crumb.$}>
                    {crumb.title}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild {...crumb.$}>
                    <CMSLink href={crumb.link?.href?.toLowerCase() || '#'}>
                      {crumb.title}
                    </CMSLink>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < visibleBreadcrumbs.length - 1 && (
                <BreadcrumbSeparator>
                  {customSeparator && customSeparator !== '/' ? (
                    <span>{customSeparator}</span>
                  ) : undefined}
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumb;