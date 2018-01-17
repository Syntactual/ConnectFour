import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ConnectFourBoard } from './ConnectFourBoard/connectFourBoard.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnectFourBoard
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
