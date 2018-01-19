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
 
  constructor() {    
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
  if(this.player1Points >= 4 || this.player2Points >= 4){
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
            
            if(this.computerTestVertical(this.player1Positions).length !== 0 && this.computerTestVertical(this.player1Positions)[0]>=0){
              //use last location
              let position = this.computerTestVertical(this.player1Positions);
             
              this.playerPicked(position[0], position[1], document.getElementById(position[0] + '-' + position[1]));
              console.log("vertical");
            }else{
              //check player 1 for 3 in a row; if they have one see if it can play the winning slot
              //use last location and also test for last missing slot

              let positions = this.computerHorizontal(this.player1Positions);
              console.log(positions);
              if(positions.length !== 0){
                let pickedMove = new Array();
                for(let position of positions){
                  //test for not being on row 5
                   
                  if(position[1]<=6 && position[1]>= 0 && typeof(this.board[position[0]][position[1]])==='undefined'){
                    if(position[0] !== 5 && this.board[position[0]+ 1][position[1]] || position[0]===5){
                      pickedMove.push([position[0],position[1]]);
                      console.log("horizontal");
                      break;
                    }
                    
                  }
                  
                }
                if(pickedMove.length !== 0){
                  this.playerPicked(pickedMove[0][0], pickedMove[0][1], document.getElementById(pickedMove[0][0] + '-' + pickedMove[0][1]));
                }else{
                  this.RandomPlay();
                  console.log("Random");
                }
                
                
              }else{
                this.RandomPlay();
                console.log("Random");
              }
              /*
                if(locations[1] <= 6 ){
                  if((typeof(this.board[locations[2]][locations[1]]) === 'undefined' && locations[2] === 5)|| (typeof(this.board[locations[2]][locations[1]]) === 'undefined' && this.board[locations[2] + 1][locations[1]])) {
                    console.log("first spot");
                    console.log(locations[2]+ " "+ locations[1]);
                    this.playerPicked(locations[2], locations[1], document.getElementById(locations[2] + '-' + locations[1]));
                  }else{
                    this.RandomPlay();
                  console.log("random");
                  }
                                   
                }else if(locations[0] >= 0){
                  if((typeof((this.board[locations[2]][locations[0]])) === 'undefined' && locations[2] === 5)|| (typeof(this.board[locations[2]][locations[0]]) === 'undefined' && this.board[locations[2]+1][locations[0]])) {
                    console.log("second spot");
                    this.playerPicked(locations[2], locations[0], document.getElementById(locations[2] + '-' + locations[0]));
                  }else{
                    this.RandomPlay();
                  console.log("random");
                  }
                }*/
               
               
            }
            
           
           
/*
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
            */
             //check if player 1 has a wiinning turn next and stop it
             
           }, 1000);
           
         }
      });
      
      
 
  }

  private RandomPlay(){
    
    console.log("random");
    let data = new Array();
    let valid = false;
    while(!valid){
       data = this.getRandomPlay();
      if(typeof(data) !== 'undefined' ){
        valid = true;
        this.playerPicked(data[0],data[1],document.getElementById(data[0] + '-' + data[1]) );
      }

      
    }
  }

  private computerTestVertical(playerPositions: Array<number>){

    
    let lastPosition = playerPositions[playerPositions.length-1];
    let newPosition = new Array();
    let point = 1;
    for(let x = 1; x <= 2; x++)
    {
      let pointHit = false;
      for(let position of playerPositions){
        if(position[0] === lastPosition[0] + x && position[1] === lastPosition[1]){
          point++;
          //console.log(point);
          pointHit = true;
          if(point === 3){
            newPosition = [lastPosition[0]-1,lastPosition[1]];
            //console.log(newPosition);
            return newPosition;
          }
          break;
        
        }
        
      }
     
      /*
      if(!pointHit){
        break;
      }
    }
    if(point == 3){
      return true;
    }else{
      return false;
    }
    
  }


    
    let rowSequence = new Array();
    for(let position of playerPositions){
      rowSequence.push(position[0]);
    }
    console.log(rowSequence);
    let uniqueRowValues = Array.from(new Set(rowSequence.sort()));
    if(this.testThreeInArow(rowSequence, null)){
      let columns = new Array(7);
      for(let t = 0; t < 7; t++){
        columns[t] = new Array();
      }

      for(let position of playerPositions){
        //console.log(position[1]);
        switch(position[1]){
          case 0 : columns[0].push(position[1]);
                   break;
          case 1 : columns[1].push(position[1]);
                  break;
          case 2 : columns[2].push(position[1]);
                   break;
          case 3 : columns[3].push(position[1]);
                  break;
          case 4 : columns[4].push(position[1]);
                  break;
          case 5 : columns[5].push(position[1]);
                  break;
          case 6 : columns[6].push(position[1]);
                  break;     
        }          
      
      }
      let threeInRow = false;
      let verticalIndex = -1;
      for(let column of columns){
        verticalIndex++;
        if(column.length === 3 )
        {
          
          threeInRow = true;
          
          
         
            if(typeof(this.board[uniqueRowValues[0]-1][verticalIndex]) === 'undefined'){
              
              newPosition = [uniqueRowValues[0]-1, verticalIndex];
              //console.log(newPosition);
            }
              
            

            
          
          
          
          
        }
      }
      
      
    }
    return newPosition;
    */
    }
    return newPosition;
  }

  private computerHorizontal(playerPositions: Array<Array<number>>){
    let nextPosition = [];
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
      let index = -1;
      for(let row of rows){
        index++;
        row.sort();
        let points = 1;
        for(let i = 0; i < row.length; i++) {
          //console.log(array[i] - array[i -1]);
          if(row[i] - row[i-1] == 1) {
          points++;
        
        if(points === 3)
        {
          nextPosition.push([index,row[0]-1]);
          nextPosition.push([index,row[row.length -1]+1]);
          break;
        }   
          }else{
            points = 1;
          }

          
          }
      }
      return nextPosition;



/*
    let lastPostion = playerPositions[playerPositions.length -1];
    let points = 1;
   
    let notHitRight = false;
    let notHitLeft = false;
//get array of all column postions to look at sequencal order
//only do horizontal right and then horizontal left
for(let x = 1; x <= 2; x++)
{ 

  for(let position of playerPositions){
    if(notHitLeft && notHitRight){
      break;
    }
    if(!notHitRight){
      if(position[0] === lastPostion[0] && position[1] === lastPostion[1] + x){
        console.log("pointHorizontal");
        points++;
       // console.log(point);
      
        if(this.playingStandard && points === 3){
          nextPosition.push([position[0],position[1]+1]);
          notHitRight = true;
           }
         
        }else{
          notHitRight = true;
        }
    }
   
    if(!notHitLeft){
      if(position[0] === lastPostion[0] && position[1] === lastPostion[1] - x){
        console.log("pointHorizontal");
        points++;
        
        if(this.playingStandard && points === 3){
         
            nextPosition.push([position[0],position[1]-1]);
            notHitRight = true;
           }
            
          }else{
            notHitLeft = true;
          }
    }
   
       }

      }
    return nextPosition;
    */
  }
  

  private testForThree(playerPositions: Array<number>){
    
    //test vertical
    

      //return fourInARow;
    
    
    //test horizontal for 3
    //doesnt see row just column and assumes bottom row
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
      let threeInArow = false;
      let index = -1;
      let newSlots: Array<number> = new Array();;
    for(let row of rows){
      index++;
      newSlots = this.testThreeInArow(row.sort(), index);
      
      if(newSlots.length !== 0){
        newSlots.push(index);
        
        break;
      }
    }
    return newSlots;
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
    //fix so it has to stay in same column
    /*
    let rowSequence = new Array();
    for(let position of playerPositions){
      rowSequence.push(position[0]);
    }
    let uniqueRowValues = Array.from(new Set(rowSequence.sort()));
    if(this.testFourInArow(uniqueRowValues)){
      let columns = new Array(7);
      for(let t = 0; t < 7; t++){
        columns[t] = new Array();
      }

      for(let position of playerPositions){
        console.log(position[1]);
        switch(position[1]){
          case 0 : columns[0].push(position[1]);
                   break;
          case 1 : columns[1].push(position[1]);
                  break;
          case 2 : columns[2].push(position[1]);
                   break;
          case 3 : columns[3].push(position[1]);
                  break;
          case 4 : columns[4].push(position[1]);
                  break;
          case 5 : columns[5].push(position[1]);
                  break;
          case 6 : columns[6].push(position[1]);
                  break;     
        }          
      
      }
      let fourInARow = false;
      for(let column of columns){
        if(column.length >= 4)
        {
          fourInARow = true;
          break;
        }
      }
      return fourInARow;

    }
*/
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
    //not working; need to look more into the placement
    /*
    let rowSequence = new Array();
    for(let position of playerPositions){
      rowSequence.push(position[0]);
    }
    let fourInARow = false;
    let uniqueRowValues = Array.from(new Set(rowSequence.sort()));
    
    if(this.testFourInArow(uniqueRowValues)){
      let columnSequence = new Array();
      for(let rowValue of uniqueRowValues)
      {
        for(let position of playerPositions)
        {
          
          switch (rowValue){
            case position[0] : columnSequence.push(position[1]);
                                break;
          }

        }
      }
      
      let uniqueColumnSequence = Array.from(new Set(columnSequence.sort()));
      console.log(uniqueColumnSequence);
      if(this.testFourInArow(uniqueColumnSequence))
      {
        fourInARow = true;
      }
      
      }
      return fourInARow;
*/


    let points = 1;
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
          
        }
          
        if(position[0] === row + x && position[1] === column - x ){
          points++;
         // console.log(point);
          pointHit = true;
          
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
      
/*
      for(let x = 1; x< row.length; x++)
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
        if(this.testHorizontal(row, column, this.player1Positions) || this.testDiagnolLeft(row, column, this.player1Positions) || this.testDiagnolright(row, column, this.player1Positions) || this.testVertical(row, column, this.player1Positions))
      {
        this.player1Wins = true;
        this.player1Points = 4;
        res();
      }else{
        res();
      }
      
      
    }
    else{
      if(this.testHorizontal(row, column, this.player2Positions) || this.testDiagnolLeft(row, column, this.player2Positions) || this.testDiagnolright(row, column, this.player2Positions) || this.testVertical(row, column, this.player2Positions))
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

  private testThreeInArow(array: Array<number>, rowIndex: number){
    let points = 1;
    for(let i = 0; i < array.length; i++) {
          //console.log(array[i] - array[i -1]);
      if(array[i] - array[i-1] == 1) {
        points++;
        console.log(points);
        if(points >= 3)
        {
          break;
        }   
      }else{
        points = 1;
      }

      
      }
      if(points >= 3)
      {
        
        return [array[0] -1, array[array.length -1]+ 1];
      }
      else{
        return [];
      }
  
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