import { Component, ElementRef } from '@angular/core';
import { Element } from '@angular/compiler';


@Component({
  selector: 'connectFourBoard',
  templateUrl: './connectFourBoard.component.html',
  styleUrls: ['./connectFourBoard.component.css']
})
export class ConnectFourBoard {
  rows = [0, 1, 2, 3, 4, 5];
  columns = [0, 1, 2, 3, 4, 5, 6];
  player1 = true;
  board = new Array(6);
 
  constructor(){
     
    for (let i = 0; i < 6; i++) {
      this.board[i] = new Array(7);
    }
    
}

  playerPicked(row: number, column: number, element: any){
  
    if(row === 5 && !this.board[5][column])
    {
      this.fillColor(element);
      this.board[5][column] = true;
    }
    else if(this.board[row + 1][column])
    {
      this.fillColor(element);
      this.board[row][column] = true;
    }
  
  
  }

  private fillColor(element: any){
    if(this.player1)
    {
      element.toElement.style.backgroundColor = "black";
      this.player1 = false;
    }
    else{
      element.toElement.style.backgroundColor = "red";
      this.player1 = true;
    }
  }
  


}