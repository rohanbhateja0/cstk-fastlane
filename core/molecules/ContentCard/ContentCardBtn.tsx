import { ArrowRight } from 'lucide-react';
import React from 'react';
import { CMSLink } from '@/core/atoms/Link';
import { Button } from '@/core/ui/button';
import { CardFooter } from '@/core/ui/card';
import { CMSLinkField } from '@/core/types/Fields';

type ContentCardBtnProps = {
  CalltoActionLinkMain: CMSLinkField;
  LinkType?: string;
};

const ContentCardBtn = ({ CalltoActionLinkMain, LinkType }: ContentCardBtnProps) => {
  const href = CalltoActionLinkMain.href;
  if (!href || href === '/' || !LinkType) return null;
  const defaultLink = (
    <CMSLink link={CalltoActionLinkMain} className="underline text-foreground" />
  );

  return (
    <CardFooter className="w-full">
      {LinkType === 'Button' ? (
        <Button variant="outline" className="w-full gap-6 px-3">
          <div className="flex items-center gap-2">
            <CMSLink link={CalltoActionLinkMain} className="text-foreground" />
            <ArrowRight className="w-4 h-4" />
          </div>
        </Button>
      ) : (
        defaultLink
      )}
    </CardFooter>
  );
};

export default ContentCardBtn;
