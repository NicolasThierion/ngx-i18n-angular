"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// angular
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var core_2 = require("@ngx-translate/core");
var http_loader_1 = require("@ngx-translate/http-loader");
var ngx_i18n_directive_1 = require("./ngx-i18n.directive");
var translate_store_1 = require("@ngx-translate/core/src/translate.store");
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
    function I18nModule(_parentModule, _translateService) {
        // if root module instantiation
        if (!_parentModule && _translateService) {
            _translateService.setDefaultLang('en');
            _translateService.use('en');
        }
    }
    I18nModule.forRoot = function (translationsPath) {
        if (translationsPath === void 0) { translationsPath = 'src/assets/i18n/'; }
        return {
            ngModule: I18nModule,
            providers: [
                { provide: TRANSLATIONS_PATHS, useValue: translationsPath },
                { provide: core_2.TranslateLoader,
                    useFactory: httpLoaderFactory,
                    deps: [http_1.HttpClient, TRANSLATIONS_PATHS] },
                {
                    provide: core_2.MissingTranslationHandler,
                    useFactory: missingTranslationLoggerFactory
                },
            ]
        };
    };
    I18nModule.forChild = function (config) {
        return {
            ngModule: I18nModule,
            providers: core_2.TranslateModule.forChild(config).providers.concat([
                { provide: core_2.TranslateLoader,
                    useFactory: httpLoaderFactory,
                    deps: [http_1.HttpClient, TRANSLATIONS_PATHS] },
                {
                    provide: core_2.MissingTranslationHandler,
                    useFactory: missingTranslationLoggerFactory
                },
                { provide: core_2.TranslateService, useClass: core_2.TranslateService },
                { provide: translate_store_1.TranslateStore, useClass: translate_store_1.TranslateStore }
            ])
        };
    };
    I18nModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [ngx_i18n_directive_1.I18nDirective],
                    exports: [core_2.TranslateModule, ngx_i18n_directive_1.I18nDirective]
                },] },
    ];
    /** @nocollapse */
    I18nModule.ctorParameters = function () { return [
        { type: I18nModule, decorators: [{ type: core_1.Optional }, { type: core_1.SkipSelf },] },
        { type: core_2.TranslateService, decorators: [{ type: core_1.Optional },] },
    ]; };
    return I18nModule;
}());
exports.I18nModule = I18nModule;
//# sourceMappingURL=i18n.module.js.map