import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const EXPRESSION_REGEX = /(?:([^|@]*)\|)?([^|@]*)(?:@@([^|@]*))?/;
// tslint:disable directive-selector
@Directive({ selector: `[ngx-i18n]` })
export class I18nDirective implements OnChanges {
  // tslint:disable no-input-rename
  @Input('ngx-i18n')
  i18n: string;
  // tslint:enable no-input-rename

  @Input()
  translateParams: any;

  constructor(private _el: ElementRef, private _translate: TranslateService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (EXPRESSION_REGEX.test(this.i18n)) {
      const match = this.i18n.match(EXPRESSION_REGEX);
      let key = match[3];
      // if key not found
      if (typeof key === 'undefined') {
        // consider the default text to be the key
        key = this._el.nativeElement.innerText;
      }

      this._translate.get(key, this.translateParams).subscribe(translation => {
        this._el.nativeElement.innerText = translation;
      });
    }
  }

}

// tslint:enabledirective-selector
