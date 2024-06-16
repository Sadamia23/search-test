import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FilterComponent } from './components/filter/filter.component';
import { InnerPageComponent } from './components/inner-page/inner-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';

import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { SchoolsComponent } from './components/schools/schools.component';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, FilterComponent, InnerPageComponent, SchoolsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NzModalModule,
    BrowserAnimationsModule,
    ListboxModule,
    ButtonModule,
    NzSelectModule,
    NzIconModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
