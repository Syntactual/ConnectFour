import { Component, ElementRef } from '@angular/core';
import { Element } from '@angular/compiler';
import { ArrayType } from '@angular/compiler/src/output/output_ast';


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
  player1Positions = new Array();
  player2Positions = new Array();

  player1Points = 0;
  player2Points = 0;

  player1Wins = false;
  player2Wins = false;

 
  constructor(){
     
    for (let i = 0; i < 6; i++) {
      this.board[i] = new Array(7);
    }
      
}

public newGame(window){
  location.reload();
}
public playComputer(){

}
    private switchPlayers(){
      if(this.player1){
        this.player1 = false;
      }else{
        this.player1 = true;
      }
    }
    private updatePosition(row: number, column : number){
      if(this.player1){
        this.player1Positions.push([row, column]);
      }
      else{
        this.player2Positions.push([row, column]);
      }
    }

   playerPicked(row: number, column: number, element: any){
  if(this.player1Points === 4 || this.player2Points === 4){
    return false;
  }else{
    if(row === 5 && !this.board[5][column])
    {
      this.updateGame(row, column, element);
       
    }
    else if(row !== 5 && this.board[row + 1][column])
    {
      if(typeof(this.board[row][column]) === 'undefined'){
        this.updateGame(row, column, element);
      }
      
    }
  }
    
  
  
  }

  private updateGame(row: number, column: number, element: any){
      this.fillColor(element);
      
      this.board[row][column] = true;
      
      this.updatePosition(row, column);
      this.setScore(row, column);
      this.switchPlayers();
  }

  private fillColor(element: any){
    
      if(this.player1)
      {
        element.toElement.style.backgroundColor = "black";
           
      }
      else{
        element.toElement.style.backgroundColor = "red";
          
      }
      
  }

  private testVertical(row: number, column: number, playerPositions: Array<number>){
    let point = 1;
    for(let x = 1; x <= 3; x++)
    {
      let pointHit = false;
      for(let position of playerPositions){
        if(position[0] === row + x && position[1] === column){
          point++;
          console.log(point);
          pointHit = true;
          break;
        
        }
        
      }
      if(!pointHit){
        break;
      }
    }
    return point;
  }

  private testDiagnolRight(row: number, column: number, playerPositions: Array<number>){
    let point = 1;
    for(let x = 1; x <= 3; x++)
    {
      let pointHit = false;
      for(let position of playerPositions){
        if(position[0] === row - x && position[1] === column + x){
          point++;
          console.log(point);
          pointHit = true;
          
        }if(position[0] === row + x && position[1] === column - x ){
          point++;
          console.log(point);
          pointHit = true;
          break;
        }
         
        
      }
      if(!pointHit){
        break;
      }
    }
    return point;
  }

  private testDiagnolLeft(row: number, column: number, playerPositions: Array<number>){
    let point = 1;
    for(let x = 1; x <= 3; x++)
    {
      let pointHit = false;
      for(let position of playerPositions){
        if(position[0] === row - x && position[1] === column - x){
          point++;
          console.log(point);
          pointHit = true;
          
        }if(position[0] === row + x && position[1] === column + x ){
          point++;
          console.log(point);
          pointHit = true;
          break;
        }
         
        
      }
      if(!pointHit){
        break;
      }
    }
    return point;
  }

  private testHorizontal(row: number, column: number, playerPositions: Array<number>){
    let point = 1;
    for(let x = 1; x <= 3; x++)
    {
      let pointHit = false;
      for(let position of playerPositions){
        if(position[0] === row && position[1] === column + x){
          point++;
          console.log(point);
          pointHit = true;
          
        }if(position[0] === row && position[1] === column -x){
          point++;
          console.log(point);
          pointHit = true;
          break;
        }
        
      }
      if(!pointHit){
        break;
      }
    }
    return point;
  }

  private setScore(row: number, column: number){
    if(this.player1){
      if(this.testHorizontal(row, column, this.player1Positions) === 4 || this.testDiagnolLeft(row, column, this.player1Positions)=== 4 || this.testDiagnolRight(row, column, this.player1Positions)=== 4 || this.testVertical(row, column, this.player1Positions)=== 4)
    {
      this.player1Wins = true;
      this.player1Points = 4;
    
    }
    else{
      if(this.testHorizontal(row, column, this.player2Positions) === 4 || this.testDiagnolLeft(row, column, this.player2Positions)=== 4 || this.testDiagnolRight(row, column, this.player2Positions)=== 4 || this.testVertical(row, column, this.player2Positions)=== 4)
    {
      this.player2Wins = true;
      this.player2Points = 4
    }
    }
    
  }
  }
}