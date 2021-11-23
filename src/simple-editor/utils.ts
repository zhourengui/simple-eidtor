import { NodeType } from "./constant";

export interface HTMLElementOption {
  type: string;
  classes?: string[];
  attrs?: { [key: string]: any };
  styles?: { [key: string]: any };
  children?: (Node | string)[];
  onCreated?(el: HTMLElement): void;
}

export function createHTMLElement(options: HTMLElementOption): HTMLElement {
  const { type, attrs, children, classes, styles, onCreated } = options;
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

  if (children) {
    children
      .filter((c) => c)
      .forEach((c) =>
        el.appendChild(
          c instanceof Node
            ? el.appendChild(c)
            : // @ts-ignore
              createTextNode(typeof c === "object" ? c.data : c)
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

/**
 * 获取某个元素下的所有文本节点
 * @param {ParentNode | null} node
 * @returns {string[]}
 */
export const getAllTextNodeFromElement = (node: ParentNode | null) => {
  const textNodes: string[] = [];
  const rec = (node: ParentNode | ChildNode | null) => {
    if (node) {
      const childNodes = node.childNodes;
      childNodes.forEach((childNode) => {
        const nodeType = childNode.nodeType;
        if (nodeType === NodeType.TEXT) {
          textNodes.push(childNode.nodeValue as string);
        } else if (nodeType === NodeType.Element) {
          rec(childNode);
        }
      });
    }
  };
  rec(node);
  return textNodes;
};

/**
 * 操作某个元素下的所有文本节点
 * @param {ParentNode} node
 * @param {(text: string) => void} handler
 * @returns {ParentNode}
 */
export const setAllTextNodeFromElement = (
  node: ParentNode,
  handler: (text: string) => string
) => {
  const rec = (node: ParentNode | ChildNode) => {
    node.childNodes.forEach((childNode) => {
      const nodeType = childNode.nodeType;
      if (nodeType === NodeType.TEXT) {
        childNode.nodeValue = handler(childNode.nodeValue as string);
      } else if (nodeType === NodeType.Element) {
        rec(childNode);
      }
    });
  };
  rec(node);
  return node;
};

export const isValidLink = (str: string) => {
  return /^(?:(http|https|fcp):\/\/)?((?:[\w-]+\.)[a-z][\w-]+)(?:(\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i.test(
    str
  );
};
