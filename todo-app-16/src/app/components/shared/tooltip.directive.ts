import {booleanAttribute, Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnInit {
  @Input() appTooltip!: string;
  @Input({transform: booleanAttribute}) showTooltip: boolean = true;
  @Input() offsetY = 20;
  @Input() shiftToMiddle = false;
  @Input() colorBackground = '#333';

  private tooltipElement!: HTMLElement;


  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    if (this.showTooltip) {
      this.renderer.setStyle(this.tooltipElement, 'display', 'block');
      const { top, left, width } = this.el.nativeElement.getBoundingClientRect();
      this.renderer.setStyle(this.tooltipElement, 'top', `${top + window.scrollY + this.offsetY}px`);
      this.renderer.setStyle(this.tooltipElement, 'left', `${left + window.scrollX + (this.shiftToMiddle ? width / 2 : 0) - this.tooltipElement.offsetWidth / 2}px`);
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.tooltipElement, 'display', 'none');
  }
  ngOnInit() {
    // Создаем элемент тултипа
    this.tooltipElement = this.renderer.createElement('span');
    this.renderer.appendChild(
      this.tooltipElement,
      this.renderer.createText(this.appTooltip)
    );
    this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
    this.renderer.setStyle(this.tooltipElement, 'backgroundColor', this.colorBackground);
    this.renderer.setStyle(this.tooltipElement, 'color', '#FFF');
    this.renderer.setStyle(this.tooltipElement, 'padding', '8px 16px');
    this.renderer.setStyle(this.tooltipElement, 'borderRadius', '4px');
    this.renderer.setStyle(this.tooltipElement, 'zIndex', '1000');
    this.renderer.setStyle(this.tooltipElement, 'display', 'none');

    this.renderer.appendChild(document.body, this.tooltipElement);
  }

  ngOnDestroy() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
    }
  }
}
