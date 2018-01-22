import { Component, ElementRef } from '@angular/core';
import { Element } from '@angular/compiler';
import { ArrayType } from '@angular/compiler/src/output/output_ast';
import { Observable } from 'rxjs/Observable';
import { PositionService } from '../Services/positionService';
import { ComputerService } from '../Services/computerService';


@Component({
  selector: 'connectFourBoard',
  templateUrl: './connectFourBoard.component.html',
  styleUrls: ['./connectFourBoard.component.css']
})
export class ConnectFourBoard {
//game board 
  rows = [0, 1, 2, 3, 4, 5];
  columns = [0, 1, 2, 3, 4, 5, 6];
  board = new Array(6);
  player1Positions = new Array();
  player2Positions = new Array();

  constructor(public positionService: PositionService,
              public computerService: ComputerService){

    for (let i = 0; i < 6; i++) {
      this.board[i] = new Array(7);
    }     
  }

  //Game States
  GameNotReady = true;
  MakeDecision = true;
  playingHuman = false;
  chooseDifficulty = false;
  playingComputer = false;
  playingStandard = false;
  playingCunning = false;

  player1Turn = false;
  player2Turn = false;
  computerTurn = false;

  player1Wins = false;
  player2Wins = false;
  computerWins = false;
  tie = false;

  //public functions

playHuman(){
  this.playingComputer = false;
  this.playingHuman = true;
  this.player1Turn = true;
  this.MakeDecision = false;
  this.GameNotReady = false;
}

 newGame(){
   //reset without reloading the page
  location.reload();
}

playComputer(){
  this.chooseDifficulty = true;
  this.playingHuman = false;
  this.MakeDecision = false;
}

 playStandard(){
  this.playingComputer = true;
  this.playingStandard = true;
  this.chooseDifficulty = false;
  this.player1Turn = true;
  this.GameNotReady = false;
}

 playCunning(){
  this.playingCunning = true;
  this.playingComputer = true;
  this.chooseDifficulty = false;
  this.GameNotReady = false;
  this.player1Turn = true;
}

playerPicked(row: number, column: number, element){
  if(this.GameNotReady){
    return false;
  }else{
    this.playHumanTurn(row, column, element);
  }
}

private playHumanTurn(row: number, column: number, element){
  if(typeof(this.board[row][column])==='undefined')
  {
    if(row === 5){
      this.playTurn(row, column, element);
    }else if(this.board[row + 1][column]){
      this.playTurn(row, column, element);
    }
  }
}

private playComputerTurn(){
  
  setTimeout(() => {
        
        let diagonalPositions = this.computerService.GetDiagonalPositions(this.player1Positions, this.board);
        let verticalPositions = this.computerService.GetVerticalPositions(this.player1Positions, this.board);
        let horizontalPositions = this.computerService.GetHorizontalPositions(this.player1Positions, this.board);
        let playToWinPosition = this.computerService.PlayToWin(this.player2Positions, this.board);

        if(diagonalPositions.length !== 0){
          console.log("diagnol, "+ diagonalPositions);
          this.playTurn(diagonalPositions[0],diagonalPositions[1], document.getElementById(diagonalPositions[0]+ "-" + diagonalPositions[1]));
          diagonalPositions = [];
        }else if(verticalPositions.length !== 0){
          console.log("vertical, " + verticalPositions);
          this.playTurn(verticalPositions[0],verticalPositions[1], document.getElementById(verticalPositions[0]+ "-" + verticalPositions[1]));
          verticalPositions = [];
        }else if(horizontalPositions.length !== 0){
          console.log("horizontal, "+ horizontalPositions);
          this.playTurn(horizontalPositions[0],horizontalPositions[1], document.getElementById(horizontalPositions[0]+ "-" + horizontalPositions[1]));
          horizontalPositions = [];
        }else if(this.playingCunning && playToWinPosition.length !== 0){      
          console.log("Play To Win, "+ playToWinPosition);
          this.playTurn(playToWinPosition[0],playToWinPosition[1], document.getElementById(playToWinPosition[0]+ "-" + playToWinPosition[1]));
          playToWinPosition = [];
        }else{
          console.log("Random");
          this.RandomPlay();
        }

      }, 1000);
    
}

private getRandomPlay(){
    
  let row = Math.floor(Math.random() * 6);
  let column = Math.floor(Math.random() * 7);
  
  if(this.positionService.testPosition(row, column, this.board)){
    return [row, column];
  }
  else{
    this.getRandomPlay();
  } 
}


    private switchPlayers(){
      return new Promise((res)=> {
        if(this.GameNotReady){
          this.player1Turn = false;
          this.player2Turn = false;
          this.computerTurn = false;
        }
        else if(this.playingHuman){
          if(this.player1Turn){
            this.player1Turn = false;
            this.player2Turn = true;
            res();
          }else{
            this.player1Turn = true;
            this.player2Turn = false;
            res();
          }
        }else{
          if(this.player1Turn)
          {
            this.player1Turn = false;
            this.computerTurn = true;
            res();
          }else{
            this.player1Turn = true;
            this.computerTurn = false;
            res();
          }
        }
      })
    }

    private startNextTurn(){
      let undefinedCounter = 0;
      for(let spot of this.board){
        if(typeof(spot)==='undefined'){
          undefinedCounter++;
        }
      }
      if(undefinedCounter === 0){
        this.GameNotReady = true;
        this.player1Turn = false;
        this.player2Turn = false;
        this.computerTurn = false;
        this.tie = true;
      }else if(this.computerTurn){
        this.playComputerTurn();
      }else{
        return false;
      }
    }

  private async playTurn(row: number, column: number, element: any){
    
    this.board[row][column] = true;
    this.fillColor(element);
      
    if(this.player1Turn){
      await this.positionService.updatePlayerPositions(row, column, this.player1Positions);
    }else{
      await this.positionService.updatePlayerPositions(row, column, this.player2Positions);
    }  
    await this.setScore(row, column);
    await this.switchPlayers();
    
    this.startNextTurn();
    
    
  }

  private RandomPlay(){
    
    console.log("random");
    let data = new Array();
    let valid = false;
    while(!valid){
       data = this.getRandomPlay();
      if(typeof(data) !== 'undefined' ){
        if(this.positionService.testPosition(data[0],data[1], this.board)){
          valid = true;
          this.playTurn(data[0],data[1],document.getElementById(data[0] + '-' + data[1]));
        }
        
      }

      
    }
  }

  private fillColor(element: any){
    
      if(this.player1Turn)
      {
        element.toElement.style.backgroundColor = "black";
           
      }
      else{
        if(this.playingComputer){
          element.style.backgroundColor = "red";
        }else{
          element.toElement.style.backgroundColor = "red";
        }
        
          
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
    if(point >= 4){
      return true;
    }else{
      return false;
    }
    
  }


  private testDiagnolright(row: number, column: number, playerPositions: Array<number>){
    
    let points = 1;
    let pointNotHitUp = false;
    let pointNothitDown = false;
    for(let x = 1; x <= 3; x++)
    {
      let hitPositions = new Array;
      let pointHit = false;
      for(let position of playerPositions){
        
        if(position[0] === row - x && position[1] === column + x){
          points++;
          //console.log(point);
          hitPositions.push(position);
          pointHit = true;
          
        }else{
          pointNotHitUp = true;
        }
          
        if(position[0] === row + x && position[1] === column - x){
          points++;
         // console.log(point);
          pointHit = true;
          
        }else{
          pointNothitDown = true;
        }
              
      }
      if(!pointHit){
        break;
      }
    }
    if (points >= 4){
      return true;
    }else{
      return false;
    }
    
    
  }

  private testDiagnolLeft(row: number, column: number, playerPositions: Array<number>){
    let points = 1;


    for(let x = 1; x <= 3; x++)
    {
      let pointHit = false;
      for(let position of playerPositions){
        if(position[0] === row - x && position[1] === column - x){
          points++;
         
          pointHit = true;
          
        }if(position[0] === row + x && position[1] === column + x ){
          points++;
         
          pointHit = true;
          break;
        }
        
      }
      if(!pointHit){
        break;
      }
    }
    if (points >= 4){
      return true;
    }else{
      return false;
    }
  }

  private testHorizontal(row: number, column: number, playerPositions: Array<number>){
    
    let rows = new Array(6);
    for(let t = 0; t < 6; t++){
      rows[t] = new Array();
    }
   
      for(let position of playerPositions){
        
        switch(position[0]){
          case 0 : rows[0].push(position[1]);
                   break;
          case 1 : rows[1].push(position[1]);
                  break;
          case 2 : rows[2].push(position[1]);
                   break;
          case 3 : rows[3].push(position[1]);
                  break;
          case 4 : rows[4].push(position[1]);
                  break;
          case 5 : rows[5].push(position[1]);
                  break;
                
        }          
      
      }
      let fourInARow = false;
    for(let row of rows){
      if(this.testFourInArow(row.sort())){
         fourInARow = true;
      }
    }
    return fourInARow;
      

  }

  private setScore(row: number, column: number){
    return new Promise((res)=>{
      if(this.player1Turn){
        if(this.testHorizontal(row, column, this.player1Positions) || this.testDiagnolLeft(row, column, this.player1Positions) || this.testDiagnolright(row, column, this.player1Positions) || this.testVertical(row, column, this.player1Positions))
      {
        this.player1Wins = true;
        this.GameNotReady = true;
        
        res();
      }else{
        res();
      }
      
      
    }
    else{
      if(this.testHorizontal(row, column, this.player2Positions) || this.testDiagnolLeft(row, column, this.player2Positions) || this.testDiagnolright(row, column, this.player2Positions) || this.testVertical(row, column, this.player2Positions))
    {
      this.player2Wins = true;
      this.GameNotReady = true;
     
      res()
    }else{
      res()
    }
    }
    });
  
  }

  private testFourInArow(array: Array<number>){
    let points = 1;
    for(let i = 0; i < array.length; i++) {
          //console.log(array[i] - array[i -1]);
      if(array[i] - array[i-1] == 1) {
        points++;
        
        if(points >= 4)
        {
          break;
        }   
      }else{
        points = 1;
      }

      
      }
      if(points >= 4)
      {
        return true;
      }
      else{
        return false;
      }
  }
}