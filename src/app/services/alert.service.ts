import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { AlertComponent } from '../components/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public overlayRef: OverlayRef | null = null;

  constructor(private overlay: Overlay) {}

  show(text: string) {
    return new Promise<void>((resolve) => {
      if (!this.overlayRef) {
        this.overlayRef = this.overlay.create();
      }
      if (!this.overlayRef.hasAttached()) {
        const overlayPortal = new ComponentPortal(AlertComponent);
        const componentRef = this.overlayRef.attach(overlayPortal);
        componentRef.instance.text = text;
        const subscription = componentRef.instance.close.subscribe((res) => {
          subscription.unsubscribe();
          resolve();
          if (!!this.overlayRef) {
            this.overlayRef.detach();
          }
        });
      }
    });
  }
}
