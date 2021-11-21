// @ts-nocheck

export interface HTMLElementOption {
  type: string;
  classes?: string[];
  attrs?: { [key: string]: any };
  styles?: { [key: string]: any };
  props?: { [key: string]: any };
  children?: (Node | string)[];
  onCreated?(el: HTMLElement): void;
}

export function createHTMLElement(options: HTMLElementOption): HTMLElement {
  const { type, attrs, props, children, classes, styles, onCreated } = options;
  const el = document.createElement(type);

  if (attrs) {
    Object.keys(attrs).forEach((key) => {
      el.setAttribute(key, attrs[key]);
    });
  }

  if (styles) {
    Object.keys(styles).forEach((key) =>
      el.style.setProperty(key, styles[key])
    );
  }

  if (classes) {
    classes.forEach((key) => el.classList.add(key));
  }

  if (props) {
    Object.keys(props).forEach((key) => (el[key] = props[key]));
  }

  if (children) {
    children
      .filter((c) => c)
      .forEach((c) =>
        el.appendChild(
          c instanceof Node ? el.appendChild(c) : createTextNode(c)
        )
      );
  }

  if (onCreated) {
    onCreated(el);
  }

  return el;
}

export const createTextNode = (text: string) => {
  return document.createTextNode(text);
};
export const generateImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = function () {
      resolve(img);
    };
    img.onerror = function (err) {
      reject(err);
    };
  });
};

export const isMobile = () => {
  const info = navigator.userAgent;
  const agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPod",
    "iPad",
  ];
  for (let i = 0; i < agents.length; i++) {
    if (info.indexOf(agents[i]) >= 0) return true;
  }
  return false;
};
