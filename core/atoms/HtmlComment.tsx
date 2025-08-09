export type HtmlCommentProps = {
    comment: string;
}

export default function HTMLComment( props: HtmlCommentProps ) {
  const html = `<!-- ${props.comment} -->`;
  const callback = (instance : any ) => {
      if (instance && instance.outerHTML && instance.parent) {
          instance.outerHTML = html;
      }
  };
  return (<script ref={callback} type="text/comment" dangerouslySetInnerHTML={{__html: html}} />);
}