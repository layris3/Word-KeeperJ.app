import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  toasts: any[] = [];

  public show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }

  showSuccess(textOrTpl: string | TemplateRef<any>, delay = 1500) {
    this.show(textOrTpl, { classname: 'bg-success text-light', delay: delay });
  }

  showDanger(textOrTpl: string | TemplateRef<any>, delay = 1500) {
    this.show(textOrTpl, { classname: 'bg-danger text-light', delay: delay });
  }
}
