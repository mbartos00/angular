export class Task {
  private _id: number;
  private _title: string;
  private _details: string;

  constructor(obj: any) {
    obj && Object.assign(this, obj);
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get details() {
    return this._details;
  }
}
