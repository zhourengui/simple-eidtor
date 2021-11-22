import { iframeHTML } from "./iframe-html";

export const iframeScript = (content: string = "") => {
  return `javascript:void(
    (function () {
      document.open();
      if('${document.domain}') {
        document.domain='${document.domain}';
      }
      document.write('${iframeHTML.replace(
        "<!-- Inject Default Content -->",
        content
      )}');
      document.close();
      window.parent.postMessage('complete','${
        document.domain ? window.location.origin : "*"
      }');
    })()
  )`;
};
