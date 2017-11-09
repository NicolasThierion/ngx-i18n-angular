import { ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
export declare class I18nDirective implements OnChanges {
    private _el;
    private _translate;
    i18n: string;
    translateParams: any;
    constructor(_el: ElementRef, _translate: TranslateService);
    ngOnChanges(changes: SimpleChanges): void;
}
