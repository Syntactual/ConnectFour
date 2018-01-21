import { ComputerService } from './computerService';
import { PositionService } from './positionService';

import { Factories } from '../factories';


describe("Computer Service", () => {
    let computerService : ComputerService;
    let factories : Factories;
    beforeEach(() => {
       computerService = new ComputerService(new PositionService());
       factories = new Factories();          
    });

    it("Finds diagonal right position with just 3 sequential positions on the board and the board having the next position valid to use", () => {
        let board = factories.getGameBoard();
        board[5][2] = true;
        board[5][3] = true;
        board[5][4] = true;
        board[4][3] = true;
        board[4][4] = true;
        board[3][4] = true;

        expect(computerService.GetDiagonalPositions([[5,1],[4,2],[3,3]], board))
        .toEqual([2,4]);
    });

    it("Handles not having the slot below the next position being filled in a diagonal test",() => {
        let board = factories.getGameBoard();
        board[5][2] = true;
        board[5][3] = true;
        board[5][4] = true;
        board[4][3] = true;
        board[4][4] = true;

        expect(computerService.GetDiagonalPositions([[5,1],[4,2],[3,3]], board))
        .toEqual([]);
    });

    it("Finds diagonal left position with just 3 sequential positions on the board and the board having the next position valid to use", () => {
        let board = factories.getGameBoard();
        board[5][2] = true;
        board[5][3] = true;
        board[5][1] = true;
        board[4][2] = true;
        board[4][1] = true;
        board[3][1] = true;

        expect(computerService.GetDiagonalPositions([[5,4],[4,3],[3,2]], board))
        .toEqual([2,1]);
    });

    it("Finds diagonal right position with multiple positions on the board and having the last position played being the 3rd in a row and the board having the next position valid to use", () => {
        let board = factories.getGameBoard();
        board[5][2] = true;
        board[5][3] = true;
        board[5][4] = true;
        board[4][3] = true;
        board[4][4] = true;
        board[3][4] = true;

        expect(computerService.GetDiagonalPositions([[5,6],[4,6],[5,1],[4,2],[3,3]], board))
        .toEqual([2,4]);
    });

    it("Finds diagonal left position with multiple positions on the board and having the last position played being the 3rd in a row and the board having the next position valid to use", () => {
        let board = factories.getGameBoard();
        board[5][2] = true;
        board[5][3] = true;
        board[5][1] = true;
        board[4][2] = true;
        board[4][1] = true;
        board[3][1] = true;

        expect(computerService.GetDiagonalPositions([[5,6],[4,6],[5,4],[4,3],[3,2]], board))
        .toEqual([2,1]);
    });

    it("Finds diagonal left position with multiple positions on the board and not having the last position played being the 3rd in a row and the board having the next position valid to use", () => {
        let board = factories.getGameBoard();
        board[5][2] = true;
        board[5][3] = true;
        board[5][1] = true;
        board[4][2] = true;
        board[4][1] = true;
        board[3][1] = true;

        expect(computerService.GetDiagonalPositions([[5,6],[4,6],[5,4],[4,3],[3,2],[5,0]], board))
        .toEqual([2,1]);
    });

    it("Finds vertical position with just 3 sequentail slots played",() => {
        let board = factories.getGameBoard();
        board[5][3] = true;
        board[4][3] = true;
        board[3][3] = true;
        expect(computerService.GetVerticalPositions([[5,3],[4,3],[3,3]],board))
        .toEqual([2,3]);
    })

    it("Finds vertical position with multiple slots played and not having a position on the bottom row",() => {
        let board = factories.getGameBoard();
        board[5][2] = true;
        board[4][3] = true;
        board[3][3] = true;
        board[2][2] = true;
        expect(computerService.GetVerticalPositions([[4,2],[3,2],[2,2],[4,3],[5,4]],board))
        .toEqual([1,2]);
    })

    it("Finds vertical position with multiple slots played and not having the last position the 3rd in the row",() => {
        let board = factories.getGameBoard();
        board[5][3] = true;
        board[4][3] = true;
        board[3][3] = true;
        
        expect(computerService.GetVerticalPositions([[4,4],[5,3],[4,3],[3,3],[5,4]],board))
        .toEqual([2,3]);
    })

    it("Handles finding the vertical next position but the position is already filled in",() => {
        let board = factories.getGameBoard();
        board[5][3] = true;
        board[4][3] = true;
        board[3][3] = true;
        board[2][3] = true;
        expect(computerService.GetVerticalPositions([[4,4],[5,3],[4,3],[3,3],[5,4]],board))
        .toEqual([]);
    })

    it("Handles finding the horizontal positions but the positions are already filled in",() => {
        let board = factories.getGameBoard();
        board[5][0] = true;
        board[5][4] = true;
        board[3][3] = true;
        board[2][3] = true;
        expect(computerService.GetVerticalPositions([[4,4],[5,3],[5,2],[5,1],[4,2]],board))
        .toEqual([]);
    })

    it("Handles finding the horizontal positions but the positions under are not filled in",() => {
        let board = factories.getGameBoard();
        board[5][1] = true;
        board[3][3] = true;
        board[2][3] = true;
        expect(computerService.GetVerticalPositions([[4,4],[4,3],[4,2],[5,2],[5,3]],board))
        .toEqual([]);
    })

    it("Finds horizontal position with just 3 sequentail slots played",() => {
        let board = factories.getGameBoard();
        board[5][3] = true;
        board[4][3] = true;
        board[3][3] = true;
        expect(computerService.GetHorizontalPositions([[5,2],[5,3],[5,4]],board))
        .toEqual([5,1]);
    })

    it("Finds horizontal position with multiple slots played and not having the last slot played be the 3rd in a row",() => {
        let board = factories.getGameBoard();
        board[5][3] = true;
        board[4][3] = true;
        board[3][3] = true;
        board[5][1] = true;
        expect(computerService.GetHorizontalPositions([[3,3],[5,2],[5,3],[5,4],[4,3]],board))
        .toEqual([5,5]);
    })
    

});