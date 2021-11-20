import { debounceTime, fromEvent, Observable, Subject } from "rxjs";

export type SelectionCallback = (selection: EditorSelection) => void;

export class EditorSelection {
  private selection: Selection | null;
  private selectionSubs: Observable<EditorSelection>;
  private selectionSubject = new Subject<EditorSelection>();

  constructor(private contentDocument: Document) {
    this.selection = this.contentDocument.getSelection();
    this.selectionSubs = this.selectionSubject.asObservable();

    fromEvent(this.contentDocument, "selectionchange")
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.selectionSubject.next(this);
      });
  }
  public getRangeAt(index: number = 0) {
    if (this.selection && this.selection.rangeCount > 0) {
      return this.selection.getRangeAt(index);
    }
  }

  public surroundContents(newParent: Node) {
    this.getRangeAt()?.surroundContents(newParent);
  }

  public getContent() {
    return this.getRangeAt()?.cloneContents();
  }

  public insertNode(content: Node) {
    this.getRangeAt()?.insertNode(content);
  }

  public deleteContents() {
    this.getRangeAt()?.deleteContents();
  }

  public subscribe(callback: SelectionCallback) {
    this.selectionSubs.subscribe(() => callback(this));
  }
}
