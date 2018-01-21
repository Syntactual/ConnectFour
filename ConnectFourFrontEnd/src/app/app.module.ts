import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PositionService } from './Services/positionService';
import { ComputerService } from './Services/computerService';
import { Factories } from './factories';

import { AppComponent } from './app.component';
import { ConnectFourBoard } from './ConnectFourBoard/connectFourBoard.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnectFourBoard
  ],
  imports: [
    BrowserModule,
    PositionService,
    ComputerService,
    Factories
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
