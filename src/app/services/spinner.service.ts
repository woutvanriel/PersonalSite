import { ComponentRef, Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { SpinnerComponent } from '../components/spinner/spinner.component';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  public overlayRef: OverlayRef | null = null;
  private componentRef: ComponentRef<SpinnerComponent> | null = null;

  constructor(private overlay: Overlay) {}

  show() {
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create();
    }
    if (!this.overlayRef.hasAttached()) {
      const spinnerOverlayPortal = new ComponentPortal(SpinnerComponent);
      this.componentRef = this.overlayRef.attach(spinnerOverlayPortal);
    }
  }

  hide() {
    if (!!this.overlayRef && this.componentRef) {
      this.componentRef.instance.opened = 'closed';
      setTimeout(() => {
        this.overlayRef!.detach();
      }, 250);
    }
  }
}
