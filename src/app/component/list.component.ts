export abstract class ListComponent<T> {
  lista: T[];
  cols: any;
  loading = false;

  protected constructor() {
  }
}
