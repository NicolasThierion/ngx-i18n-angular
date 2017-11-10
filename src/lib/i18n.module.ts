// angular
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import {
  MissingTranslationHandler, MissingTranslationHandlerParams, TranslateDefaultParser, TranslateFakeCompiler,
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule as NgxTranslateModule, TranslateService, USE_DEFAULT_LANG, USE_STORE, TranslateCompiler,
  TranslateParser,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { I18nDirective } from './ngx-i18n.directive';
import { TranslateStore } from '@ngx-translate/core/src/translate.store';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

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
  declarations: [I18nDirective],
  imports: [HttpClientModule, NgxTranslateModule],
  exports: [NgxTranslateModule, I18nDirective, TranslateDirective, TranslatePipe]
})
export class I18nModule {
  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  static forRoot(translationsPath: string = 'src/assets/i18n/'): ModuleWithProviders {

    return {
      ngModule: I18nModule,
      providers: [
        {provide: TRANSLATIONS_PATHS, useValue: translationsPath},

        {provide: TranslateLoader , useClass: TranslateFakeLoader },
        {provide: TranslateCompiler , useClass: TranslateFakeCompiler },
        {provide: TranslateParser , useClass: TranslateDefaultParser },
        {provide: USE_STORE, useValue: true},
        {provide: USE_DEFAULT_LANG, useValue: false},
        {provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient, TRANSLATIONS_PATHS]},
        {
          provide: MissingTranslationHandler,
          useFactory: missingTranslationLoggerFactory
        },
        {provide: TranslateService, useClass: TranslateService},
        {provide: TranslateStore, useClass: TranslateStore},
      ]
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: I18nModule
    };
  }
}
