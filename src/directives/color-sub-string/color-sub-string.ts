import { Directive,ElementRef,Renderer } from '@angular/core';

/**
 * Generated class for the ColorSubStringDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[color-sub-string]' // Attribute selector
})
export class ColorSubStringDirective {

  constructor(private el: ElementRef,
    private renderer: Renderer) {
//noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'gray');
}
}
