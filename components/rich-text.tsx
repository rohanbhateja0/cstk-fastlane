import React from 'react';
import { RichTextProps } from '@/core/types/Props';
import parse from 'html-react-parser';

export default function RichText(props: RichTextProps) {

  const richText = props.richText;
  
  return (
     <div {...(richText?.$?.content ?? {} )}
     className="[&_h1]:font-bold [&_h1]:mb-6 [&_h1]:mt-8
          [&_h2]:mb-4 [&_h2:first-of-type]:border-b [&_h2]:pb-2
          [&_h3]:mb-3 [&_h3]:mt-5
          [&_p]:my-4 [&_p]:leading-relaxed
          [&_ul]:list-disc [&_ul]:list-inside [&_ul]:m-6
          [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:my-4
          [&_li]:mb-2
          [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:my-4 [&_blockquote]:text-base
          [&_a]:underline [&_a:hover]:text-blue-800 [&_a]:underline-offset-4
          [&_table]:w-full [&_table]:border-collapse [&_table]:my-4
          [&_th]:border [&_th]:border-gray-300 [&_th]:bg-gray-100 [&_th]:p-2 [&_th]:text-left
          [&_td]:border [&_td]:border-gray-300 [&_td]:p-2
          [&_tr:nth-child(odd)]:bg-gray-200 [&_figure]:w-full"
         >
        {parse(richText.content)}
     </div>
  );
}