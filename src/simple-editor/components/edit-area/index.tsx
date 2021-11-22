import { useRef, memo, useLayoutEffect } from "react";
import { fromEvent } from "rxjs";
import { iframeScript } from "./iframe-script";

export interface EditAreaProps {
  content?: string;
  onIframeMounted: (contentDocument: Document) => void;
}

const EditArea = (props: EditAreaProps) => {
  const { content, onIframeMounted } = props;
  const iframeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!iframeRef?.current?.firstChild) {
      const iframe = document.createElement("iframe");
      iframe.src = iframeScript(content);
      iframe.style.width = "100%";
      iframe.style.border = "none";
      iframe.style.display = "black";
      iframe.style.minHeight = "100%";
      if (iframeRef.current) {
        iframeRef.current.appendChild(iframe);
      }
      fromEvent(window, "message").subscribe((e: Event) => {
        const event = e as MessageEvent;
        if (event.data === "complete") {
          if (iframe.contentDocument) {
            onIframeMounted(iframe.contentDocument);
          }
        }
      });
    }
  }, [content, onIframeMounted]);

  return <div className="edit-area" ref={iframeRef}></div>;
};

export default memo(EditArea);
