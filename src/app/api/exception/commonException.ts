export class CommonException {
  message: string;
  detail?: string;
  constructor(message: string, detail: string | undefined) {
    this.message = message;
    this.detail = detail;
  }
}
