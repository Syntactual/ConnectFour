import { NgModule } from '@angular/core';

@NgModule({
    providers: []
  })

export class Factories{

  getGameBoard(){
    let board = new Array(6);
    for (let i = 0; i < 6; i++) {
       board[i] = new Array(7);
    }
    
    return board;
  }

}

