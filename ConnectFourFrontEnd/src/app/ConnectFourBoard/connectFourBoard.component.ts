import { Component, ElementRef } from '@angular/core';
import { Element } from '@angular/compiler';
import { ArrayType } from '@angular/compiler/src/output/output_ast';
import { Observable } from 'rxjs/Observable';


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

  computerStandardNextLoc = new Array();

  playingComputer = false;
  playingHuman = true;
  chooseDifficulty = false;
  playingStandard = false;
  playingCunning = false;
 
  constructor(){
     
    for (let i = 0; i < 6; i++) {
      this.board[i] = new Array(7);
    }
      
}

public newGame(){
  location.reload();
}


public playComputer(){
  this.chooseDifficulty = true;
  this.playingHuman = false;
}

public playStandard(){
  this.playingComputer = true;
  this.playingStandard = true;
  this.chooseDifficulty = false;
}

public playMaster(){
  this.playingCunning = true;
  this.playingComputer = true;
  this.chooseDifficulty = false;
}
    private switchPlayers(){
      if(this.player1){
        this.player1 = false;
      }else{
        this.player1 = true;
      }
    }
    private updatePosition(row: number, column : number){
      return new Promise((res,rej) => {
        if(this.player1){
          this.player1Positions.push([row, column]);
          res();
        }
        else{
          this.player2Positions.push([row, column]);
          res();
        }
      });
      
    }

   playerPicked(row: number, column: number, element: any ){
  if(this.player1Points === 4 || this.player2Points === 4){
    return false;
  }else{
    if(!this.playingComputer){
      document.getElementById("playComputerButton").style.display = "none";
    }

    if(row === 5 && typeof(this.board[row][column])==='undefined')
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

   getRandomPlay() {
    
      let row = Math.floor(Math.random() * 6);
      let column = Math.floor(Math.random() * 7);
      
      //console.log([row,column]);
      
            if(typeof(this.board[row][column]) === 'undefined')
            {
              if(row !== 5){
                if(typeof(this.board[row + 1][column]) ==='undefined'){
                  this.getRandomPlay();
                }else{
                  //console.log([row, column]);
                  return [row,column];
                }
              }else{               
                //console.log([row,column]);
                return [row,column];               
              }
            }else{
              this.getRandomPlay();
            }

    
    
  }

  private updateGame(row: number, column: number, element: any){
      this.fillColor(element);
      
      this.board[row][column] = true;
      
      this.updatePosition(row, column)
      .then(()=>{
        this.setScore(row, column);
      })
      .then(()=>{
        this.switchPlayers();
        if(!this.player1 && this.playingComputer){
       
          setTimeout(() => {
            let data = new Array();
            if(this.computerStandardNextLoc.length !== 0){
              data = this.computerStandardNextLoc[0];
              this.playerPicked(data[0],data[1],document.getElementById(data[0] + '-' + data[1]) );
              this.computerStandardNextLoc.pop();
            }else{
              let valid = false;
              while(!valid){
                 data = this.getRandomPlay();
                if(typeof(data) !== 'undefined'){
                  valid = true;
                  this.playerPicked(data[0],data[1],document.getElementById(data[0] + '-' + data[1]) );
                }
              }
            }
            
             //check if player 1 has a wiinning turn next and stop it
             
           }, 1000);
           
         }
      });
      
      
 
  }

  private fillColor(element: any){
    
      if(this.player1)
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
    return point;
  }

  private testDiagnolRight(row: number, column: number, playerPositions: Array<number>){
    let point = 1;
    for(let x = 1; x <= 3; x++)
    {
      let hitPositions = new Array;
      let pointHit = false;
      for(let position of playerPositions){
        if(position[0] === row - x && position[1] === column + x){
          point++;
          console.log(point);
          hitPositions.push(position);
          pointHit = true;
          
        }
          
        if(position[0] === row + x && position[1] === column - x ){
          point++;
          console.log(point);
          pointHit = true;
          
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
      
      console.log(rows);
      for(let row of rows){
        let point = 1;
        row.sort();
        for(let i = 0; i < row.length; i++) {
          
          console.log(row[i] - row[i-1]);
          
          if(row[i] - row[i-1] == 1) {
            point++;
            console.log(point);
            if(point >= 4)
            {
              return point;
            }   
          }else{
            point = 1;
          }
          
          }
        }
        
      }
/*
      for(let x = 1; x< row0.length; x++)
    }
    
    for(let x = 1; x <= 3; x++)
    {
      let pointHit = false;
      for(let position of playerPositions){
        




        if(position[0] === row && position[1] === column + x){
          point++;
         // console.log(point);
          console.log(column + x + 1);
          pointHit = true;
          if(this.playingStandard && point === 3){
           if(column + x + 1 >= 6 ){
            
           }else{
             if(typeof(this.board[row][column + x + 1]) === 'undefined'){
              this.computerStandardNextLoc.push([row, column + x + 1]);
              console.log("winning");
             }
           }
          }
          
        }
        if(position[0] === row && position[1] === column - x){
          point++;
          console.log(point);
          console.log(column - x - 1);
          pointHit = true;
          
          if(this.playingStandard && point === 3){
            if((column - x - 1) < 0 ){
              if(column + 1 >= 6){

              }else{
                if(typeof(this.board[row][column + 1]) === 'undefined'){
                  this.computerStandardNextLoc.push([row, column + 1]);
                  console.log("winning");
                 }
              }
            }else{
              if(typeof(this.board[row][column - x - 1]) === 'undefined'){
               this.computerStandardNextLoc.push([row, column - x - 1]);
               console.log("winning");
              }
            }
           }
          }
        
      }
      if(!pointHit){
       
        break;
      }
    }
    return point;
    */
  }

  private setScore(row: number, column: number){
    return new Promise((res)=>{
      if(this.player1){
        if(this.testHorizontal(row, column, this.player1Positions) >= 4 || this.testDiagnolLeft(row, column, this.player1Positions) >= 4 || this.testDiagnolRight(row, column, this.player1Positions)>= 4 || this.testVertical(row, column, this.player1Positions) >= 4)
      {
        this.player1Wins = true;
        this.player1Points = 4;
        res();
      }else{
        res();
      }
      
      
    }
    else{
      if(this.testHorizontal(row, column, this.player2Positions) >= 4 || this.testDiagnolLeft(row, column, this.player2Positions) >= 4 || this.testDiagnolRight(row, column, this.player2Positions) >= 4 || this.testVertical(row, column, this.player2Positions) >= 4)
    {
      this.player2Wins = true;
      this.player2Points = 4
      res()
    }else{
      res()
    }
    }
    });
  
  }
}