import { ModuleWithProviders } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MissingTranslationHandler, TranslateLoader, TranslateService } from '@ngx-translate/core';
export declare function httpLoaderFactory(http: HttpClient, translationsPath: string): TranslateLoader;
export declare function missingTranslationLoggerFactory(): MissingTranslationHandler;
/**
 * This module plugs in translation backed by ngx-translate
 */
export declare class I18nModule {
    constructor(_parentModule?: I18nModule, _translateService?: TranslateService);
    static forRoot(translationsPath?: string): ModuleWithProviders;
    static forChild(): ModuleWithProviders;
}
