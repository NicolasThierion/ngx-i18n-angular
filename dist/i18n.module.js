"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// angular
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var core_2 = require("@ngx-translate/core");
var http_loader_1 = require("@ngx-translate/http-loader");
var ngx_i18n_directive_1 = require("./ngx-i18n.directive");
var translate_store_1 = require("@ngx-translate/core/src/translate.store");
var core_3 = require("@ngx-translate/core");
var TRANSLATIONS_PATHS = new core_1.InjectionToken('translationsPaths');
/* ***
 * Factories used for module DI.
 */
function httpLoaderFactory(http, translationsPath) {
    return new http_loader_1.TranslateHttpLoader(http, translationsPath);
}
exports.httpLoaderFactory = httpLoaderFactory;
function missingTranslationLoggerFactory() {
    return {
        handle: function (params) {
            console.error("Missing translation for " + params.key);
        }
    };
}
exports.missingTranslationLoggerFactory = missingTranslationLoggerFactory;
/**
 * This module plugs in translation backed by ngx-translate
 */
var I18nModule = /** @class */ (function () {
    function I18nModule(translate) {
        translate.setDefaultLang('en');
        translate.use('en');
    }
    I18nModule.forRoot = function (translationsPath) {
        if (translationsPath === void 0) { translationsPath = 'src/assets/i18n/'; }
        return {
            ngModule: I18nModule,
            providers: [
                { provide: TRANSLATIONS_PATHS, useValue: translationsPath },
                { provide: core_2.TranslateLoader, useClass: core_2.TranslateFakeLoader },
                { provide: core_2.TranslateCompiler, useClass: core_2.TranslateFakeCompiler },
                { provide: core_2.TranslateParser, useClass: core_2.TranslateDefaultParser },
                { provide: core_2.USE_STORE, useValue: true },
                { provide: core_2.USE_DEFAULT_LANG, useValue: false },
                { provide: core_2.TranslateLoader,
                    useFactory: httpLoaderFactory,
                    deps: [http_1.HttpClient, TRANSLATIONS_PATHS] },
                {
                    provide: core_2.MissingTranslationHandler,
                    useFactory: missingTranslationLoggerFactory
                },
                { provide: translate_store_1.TranslateStore, useClass: translate_store_1.TranslateStore },
            ]
        };
    };
    I18nModule.forChild = function () {
        return {
            ngModule: I18nModule
        };
    };
    I18nModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [ngx_i18n_directive_1.I18nDirective],
                    imports: [http_1.HttpClientModule, core_2.TranslateModule],
                    exports: [core_2.TranslateModule, ngx_i18n_directive_1.I18nDirective, core_3.TranslateDirective, core_3.TranslatePipe],
                    providers: [
                        { provide: core_2.TranslateService, useClass: core_2.TranslateService },
                    ]
                },] },
    ];
    /** @nocollapse */
    I18nModule.ctorParameters = function () { return [
        { type: core_2.TranslateService, },
    ]; };
    return I18nModule;
}());
exports.I18nModule = I18nModule;
//# sourceMappingURL=i18n.module.js.map