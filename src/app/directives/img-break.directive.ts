import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appImgBreak]'
})
export class ImgBreakDirective {
  imageUrl = "assets/errorimg.png"
  constructor(private elementRef: ElementRef, public renderer: Renderer2) {}

  @HostListener("error")
  private onError() {
    this.renderer.setAttribute(this.elementRef.nativeElement,"src",this.imageUrl)
    this.renderer.setStyle(this.elementRef.nativeElement,"max-width",'150px')
  }

}
