"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@ngx-translate/core");
var EXPRESSION_REGEX = /(?:([^|@]*)\|)?([^|@]*)(?:@@([^|@]*))?/;
// tslint:disable directive-selector
var I18nDirective = /** @class */ (function () {
    function I18nDirective(_el, _translate) {
        this._el = _el;
        this._translate = _translate;
    }
    I18nDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (EXPRESSION_REGEX.test(this.i18n)) {
            var match = this.i18n.match(EXPRESSION_REGEX);
            var key = match[3];
            // if key not found
            if (typeof key === 'undefined') {
                // consider the default text to be the key
                key = this._el.nativeElement.innerText;
            }
            this._translate.get(key, this.translateParams).subscribe(function (translation) {
                _this._el.nativeElement.innerText = translation;
            });
        }
    };
    I18nDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: "[ngx-i18n]" },] },
    ];
    /** @nocollapse */
    I18nDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_2.TranslateService, },
    ]; };
    I18nDirective.propDecorators = {
        'i18n': [{ type: core_1.Input, args: ['ngx-i18n',] },],
        'translateParams': [{ type: core_1.Input },],
    };
    return I18nDirective;
}());
exports.I18nDirective = I18nDirective;
//# sourceMappingURL=ngx-i18n.directive.js.map