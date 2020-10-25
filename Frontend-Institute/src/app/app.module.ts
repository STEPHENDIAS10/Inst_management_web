import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InstituteRegisterComponent } from './institute-register/institute-register.component';

import { CoreModule } from './core/core.module';
import { StateService } from './state.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzIconModule } from 'ng-zorro-antd/icon';





@NgModule({
  declarations: [
    AppComponent,
    InstituteRegisterComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NzToolTipModule,
    NzNotificationModule,
    BrowserAnimationsModule,
    NzIconModule

  ],
  providers: [StateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
