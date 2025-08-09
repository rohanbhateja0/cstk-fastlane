'use client';

import { useState } from 'react';
import {
  Accordion as UIAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/core/ui/accordion';
import { AccordionProps } from '@/core/types/Props';
import { AccordionItemFields } from '@/core/types/components/Accordion';
import parse from 'html-react-parser';

export default function Accordion(props: AccordionProps) {

  const [openItems, setOpenItems] = useState<string[]>([]);
  const items = props.accordion.accordion_items;

  const handleValueChange = (value: string) => {
    setOpenItems(value ? [value] : []);
  };

  return (
    <div>
      <UIAccordion
        type="single"
        collapsible
        className="w-full font-satoshi"
        onValueChange={handleValueChange}
      >
        {items.map((item: AccordionItemFields, accordionIndex: number) => (
          <AccordionItem
            key={accordionIndex}
            value={`item-${accordionIndex}`}
            className="border-b border-muted"
          >
            <AccordionTrigger className="text-p font-medium hover:no-underline !font-satoshi" {...(item?.$?.header ?? {} )}>
              {item.header}
            </AccordionTrigger>
            <AccordionContent forceMount>
              <div
                className={`transition-all duration-200 ease-in-out ${
                  openItems.includes(`item-${accordionIndex}`)
                    ? 'opacity-100 max-h-screen'
                    : 'opacity-0 max-h-0 overflow-hidden'
                }`}
              >
                <div className='mb-6' {...(item?.$?.content ?? {} )}>
                {parse(item.content)}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </UIAccordion>
    </div>
  );
};

