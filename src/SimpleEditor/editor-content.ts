export class EditorContent {
  private editorWidth: number = 0;
  private editorBody: HTMLElement;

  constructor(private contentDocument: Document) {
    this.editorBody = this.contentDocument.body;
    this.editorWidth = this.editorBody.clientWidth;
  }

  public getEditorWidth() {
    return this.editorWidth || 0;
  }

  public getEditorBody() {
    return this.editorBody;
  }
}
