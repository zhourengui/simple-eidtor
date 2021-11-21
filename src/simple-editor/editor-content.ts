import { Observable, Subject } from "rxjs";

export type ContentCallback = (editorContent: EditorContent) => void;

export type SubjectNextParams = {
  mutationsList: MutationRecord[];
  observer: MutationObserver;
};

export class EditorContent {
  private editorWidth: number = 0;
  private editorBody: HTMLElement;
  private observer: MutationObserver;
  private contentSubs: Observable<SubjectNextParams>;
  private contentSubject = new Subject<SubjectNextParams>();

  constructor(private contentDocument: Document) {
    this.editorBody = this.contentDocument.body;
    this.editorWidth = this.editorBody.clientWidth;

    this.contentSubs = this.contentSubject.asObservable();

    this.observer = new MutationObserver((mutationsList, observer) => {
      // 监听文档变化，可以做相应的的处理
      this.contentSubject.next({ mutationsList, observer });
    });

    this.observer.observe(this.editorBody, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  }

  public getEditorWidth() {
    return this.editorWidth || 0;
  }

  public getEditorBody() {
    return this.editorBody;
  }

  public subscribe(callback: ContentCallback) {
    this.contentSubs.subscribe(() => callback(this));
  }

  public dispose() {
    this.observer.disconnect();
  }
}
