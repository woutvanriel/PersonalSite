import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { ConfirmComponent } from '../components/confirm/confirm.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  public overlayRef: OverlayRef | null = null;

  constructor(private overlay: Overlay) {}

  show(text: string) {
    return new Promise<boolean>((resolve) => {
      if (!this.overlayRef) {
        this.overlayRef = this.overlay.create();
      }
      if (!this.overlayRef.hasAttached()) {
        const overlayPortal = new ComponentPortal(ConfirmComponent);
        const componentRef = this.overlayRef.attach(overlayPortal);
        componentRef.instance.text = text;
        const subscription = componentRef.instance.chosen.subscribe((res) => {
          subscription.unsubscribe();
          resolve(res);
          if (!!this.overlayRef) {
            this.overlayRef.detach();
          }
        });
      }
    });
  }
}
