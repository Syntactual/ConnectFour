import { NgModule } from '@angular/core';

@NgModule({
    providers: []
  })

export class PositionService{

    testPosition(row: number, column: number, board: Array<Array<number>>){
        if(row <= 5 && row >= 0 && column <= 6 && column >= 0){
            if(typeof(board[row][column]) === 'undefined' && row === 5){
                return true;
            }else if(typeof(board[row][column]) === 'undefined' && row !== 5 && typeof(board[row + 1][column]) !=='undefined'){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
        
        
    }

    updatePlayerPositions(row: number, column : number, playerPositions: Array<Array<number>>){
        return new Promise((res,rej) => {       
            playerPositions.push([row, column]);
            res();    
          });
        }

    }