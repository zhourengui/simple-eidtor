// @ts-nocheck

export interface HTMLElementOption {
  type: string;
  attrs?: { [key: string]: any };
  styles?: { [key: string]: any };
  props?: { [key: string]: any };
  children?: (Node | string)[];
  onCreated?(el: HTMLElement): void;
}

export function createHTMLElement(options: HTMLElementOption): HTMLElement {
  const { type, attrs, props, children, styles, onCreated } = options;
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

  if (options.props) {
    Object.keys(props).forEach((key) => (el[key] = options.props[key]));
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
