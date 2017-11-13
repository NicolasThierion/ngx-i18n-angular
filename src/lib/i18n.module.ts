// angular
import { InjectionToken, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  MissingTranslationHandler, MissingTranslationHandlerParams, TranslateDefaultParser, TranslateFakeCompiler,
  TranslateLoader,
  TranslateModule, TranslateService, USE_DEFAULT_LANG, USE_STORE, TranslateCompiler,
  TranslateParser, TranslateModuleConfig
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { I18nDirective } from './ngx-i18n.directive';
import { TranslateStore } from '@ngx-translate/core/src/translate.store';

const TRANSLATIONS_PATHS = new InjectionToken<string>('translationsPaths');

/* ***
 * Factories used for module DI.
 */

export function httpLoaderFactory(http: HttpClient, translationsPath: string): TranslateLoader {
  return new TranslateHttpLoader(http, translationsPath);
}

export function missingTranslationLoggerFactory(): MissingTranslationHandler {
  return {
    handle(params: MissingTranslationHandlerParams): any {
      console.error(`Missing translation for ${params.key}`);
    }
  };
}

/**
 * This module plugs in translation backed by ngx-translate
 */
@NgModule({
  declarations: [ I18nDirective ],
  exports: [ TranslateModule, I18nDirective ]
})
export class I18nModule {
  constructor(@Optional() @SkipSelf() _parentModule?: I18nModule,
              @Optional() _translateService?: TranslateService
  ) {
    // if root module instantiation
    if (!_parentModule && _translateService) {
      _translateService.setDefaultLang('en');
      _translateService.use('en');
    }

  }

  static forRoot(translationsPath: string = 'src/assets/i18n/'): ModuleWithProviders {

    return {
      ngModule: I18nModule,
      providers: [
        {provide: TRANSLATIONS_PATHS, useValue: translationsPath},
        {provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient, TRANSLATIONS_PATHS]},
        {
          provide: MissingTranslationHandler,
          useFactory: missingTranslationLoggerFactory
        },
      ]
    };
  }

  static forChild(config?: TranslateModuleConfig): ModuleWithProviders {
    return {
      ngModule: I18nModule,
      providers: [
        ...TranslateModule.forChild(config).providers,
        {provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient, TRANSLATIONS_PATHS]},
        {
          provide: MissingTranslationHandler,
          useFactory: missingTranslationLoggerFactory
        },
        {provide: TranslateService, useClass: TranslateService},
        {provide: TranslateStore, useClass: TranslateStore}
      ]
    };
  }
}
