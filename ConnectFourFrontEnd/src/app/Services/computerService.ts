import { NgModule } from '@angular/core';
import { PositionService } from './positionService';

@NgModule({
    imports: [PositionService],
    providers: []
  })

export class ComputerService{

    constructor(public posService : PositionService){

    }

    PlayToWin(computerPositions, board){
      if(computerPositions.length === 0 ){
        for(let x = 0; x<=3; x++){
          if(this.posService.testPosition(5, 3+x, board)){
            return [5, 3+x];
          }else if(this.posService.testPosition(5, 3-x, board)){
            return [5,3-x];
          }
        }
      }else if(this.posService.testPosition(computerPositions[computerPositions.length -1][0],computerPositions[computerPositions.length -1][1]+1,board)){
          return [computerPositions[computerPositions.length -1][0],computerPositions[computerPositions.length -1][1]+1];
      }else if(this.posService.testPosition(computerPositions[computerPositions.length -1][0],computerPositions[computerPositions.length -1][1]-1,board)){
          return [computerPositions[computerPositions.length -1][0],computerPositions[computerPositions.length -1][1]-1];
      }else if(this.posService.testPosition(computerPositions[computerPositions.length -1][0]-1,computerPositions[computerPositions.length -1][1],board)){
          return [computerPositions[computerPositions.length -1][0]-1,computerPositions[computerPositions.length -1][1]];
      }else{
         for(let a = 3; a >= 1; a--){
            let nextPosition = this.GetHorizontalPositions(computerPositions, board, a);
            if(nextPosition.length !== 0){
               return nextPosition;
             }
          }
             for(let z = 3; z >=1; z--){
            let nextPosition = this.GetVerticalPositions(computerPositions, board, z);
            if(nextPosition.length !== 0){
               return nextPosition;
             }
          }
          for(let y = 3; y >= 1; y--){
             let nextPosition = this.GetDiagonalPositions(computerPositions, board, y);
             if(nextPosition.length !== 0){
               return nextPosition;
             }
          } 
       
          return [];
          
        }
      
        //if no positions on the board check middle to right or middle to left for 4 in a row possible from bottom row
        //else if go vertical on closest to middle
        //else if go up one row and try for horizontal from middle again (do this til it finds a possiblity)
        //if no win is possible just do random
        

    }

    GetDiagonalPositions(playerPositions: Array<Array<number>>, gameBoard: Array<Array<number>>, pointLimit = 3){
        let pointNotHitUp = false;
        let pointNothitDown = false;
        let lastPosition = playerPositions[playerPositions.length - 1];
        let nextPosition : Array<number> = [];
      
    for(let positionA of playerPositions){
      let points = 1;
      let pointHit = false;
      for(let x = 1; x <= 3; x++){
        for(let position of playerPositions){
            
          if(position[0] === positionA[0] - x && position[1] === positionA[1] + x){
            points++;
            //console.log(point);
            if(points === pointLimit && this.posService.testPosition(positionA[0]+1, positionA[1]-1, gameBoard)){
                nextPosition = [positionA[0]+1, positionA[1]-1];
                
            }else if(points === pointLimit && this.posService.testPosition(positionA[0]-pointLimit, positionA[1]+pointLimit, gameBoard)){
                nextPosition = [positionA[0]-pointLimit, positionA[1]+pointLimit];
            }
            pointNotHitUp = true;
            pointHit = true;
            
          }else{
            pointNotHitUp = true;
          }
            
          if(position[0] === positionA[0] + x && position[1] === positionA[1] - x){
            points++;
           // console.log(point);
            pointHit = true;
            if(points === pointLimit && this.posService.testPosition(positionA[0]-1, positionA[1]+1, gameBoard)){
                nextPosition = [positionA[0]-1, positionA[1]+1];
            }
            else if(points === pointLimit && this.posService.testPosition(positionA[0]+pointLimit, positionA[1]-pointLimit, gameBoard)){
                    nextPosition = [positionA[0]+pointLimit, positionA[1]-pointLimit];
                }
              
              
              pointNothitDown = true;
              break;
            }
          
                
        }
        if(nextPosition.length !== 0){
          break;
        }
      }
      if(nextPosition.length !== 0){
        break;
    }
    
          
      }
      //go left 
      for(let positionA of playerPositions){
        let points = 1;
        let pointHit = false;
        for(let x = 1; x <= 3; x++){
          for(let position of playerPositions){
              
            if(position[0] === positionA[0] - x && position[1] === positionA[1] - x){
              points++;
              //console.log(point);
              if(points === pointLimit && this.posService.testPosition(positionA[0]+1, positionA[1]+1, gameBoard)){
                  nextPosition = [positionA[0]+1, positionA[1]+1];
                  
              }else if(points === pointLimit && this.posService.testPosition(positionA[0]-pointLimit, positionA[1]-pointLimit, gameBoard)){
                  nextPosition = [positionA[0]-pointLimit, positionA[1]-pointLimit];
              }
              pointNotHitUp = true;
              pointHit = true;
              
            }else{
              pointNotHitUp = true;
            }
              
            if(position[0] === positionA[0] + x && position[1] === positionA[1] + x){
              points++;
             // console.log(point);
              pointHit = true;
              if(points === pointLimit && this.posService.testPosition(positionA[0]-1, positionA[1]-1, gameBoard)){
                  nextPosition = [positionA[0]-1, positionA[1]-1];
              }
              else if(points === pointLimit && this.posService.testPosition(positionA[0]+pointLimit, positionA[1]+pointLimit, gameBoard)){
                      nextPosition = [positionA[0]+pointLimit, positionA[1]+pointLimit];
                  }
                
                
                pointNothitDown = true;
                break;
              }
            
                  
          }
          if(nextPosition.length !== 0){
            break;
          }
        }
        if(nextPosition.length !== 0){
          break;
      }
      
            
        }

      if(nextPosition.length !== 0){
    //test positions and then pass up
      }
      return nextPosition;
    }

    GetVerticalPositions(playerPositions: Array<Array<number>>, board: Array<Array<number>>, pointLimit = 3) {
       
        let newPosition = new Array();
       
        for(let positionA of playerPositions){
            let point = 1;
            for(let x = 1; x <= 3; x++)
            {
              let pointHit = false;
              for(let position of playerPositions){
                if(position[0] === positionA[0] + x && position[1] === positionA[1]){
                  point++;
                  //console.log(point);
                  pointHit = true;
                  if(point === pointLimit){
                      if(this.posService.testPosition(positionA[0]-1,positionA[1], board)){
                        newPosition = [positionA[0]-1,positionA[1]];
                        return newPosition;
                      }
                    
                    //console.log(newPosition);
                    
                  }
                  //break;
                
                }
                
              }
            }
        }
       
        return newPosition;
    }

    GetHorizontalPositions(playerPositions: Array<Array<number>>, board: Array<Array<number>>, pointLimit = 3){
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
            
              if(points === pointLimit)
              {
                if(this.posService.testPosition(index, row[0]-1, board)){
                    nextPosition = [index,row[0]-1];
                    break;
                }else if(this.posService.testPosition(index, row[row.length -1]+1,board)){
                    nextPosition = [index,row[row.length-1]+1];
                    break;
                }
                
              }   
            }else if(points === 2 && row[i] - row[i-1] == 2 && this.posService.testPosition(index, row[0]+2, board)){
              
                points++;
                nextPosition = [index,row[0]+2];
                  break;
              
            }else{
                points = 1;
              }
    
              }
              if(points !== pointLimit){
                row.reverse();
            let points = 1;
            for(let i = 0; i < row.length; i++) {
              //console.log(array[i] - array[i -1]);
              if(row[i] - row[i+1] == 1) {
              points++;
            
              
            }else if(points === 2 && row[i] - row[i+1] == 2 && this.posService.testPosition(index, row[0]-2, board)){
              
                points++;
               
                  nextPosition = [index,row[0]-2];
                  break;
                
                  
                }else{
                points = 1;
              }
    
              
              }
              }
          }
          return nextPosition;
    
    }
}