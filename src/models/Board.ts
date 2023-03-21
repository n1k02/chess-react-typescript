import {Cell} from "./Cell";
import {Colors} from "./Colors";
import {Pawn} from "./figures/Pawn";
import {King} from "./figures/King";
import {Queen} from "./figures/Queen";
import {Horse} from "./figures/Horse";
import {Tower} from "./figures/Tower";
import {Bishop} from "./figures/Bishop";

export class Board {
    cells: Cell[][] = []


    public initCells() {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = []
            for (let j = 0; j < 8; j++) {
                if((i+j)% 2 !== 0) {
                    row.push(new Cell(this, i, j, Colors.BLACK, null)) // black cell
                } else {
                    row.push(new Cell(this, i, j, Colors.WHITE, null)) // white cell
                }
            }
            this.cells.push(row);
        }
    }

    public getCopyBoard (): Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        return newBoard;
    }

    public highlightCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target  = row[j];
                target.available = !!selectedCell?.figure?.canMove(target)
            }

        }
    }

    public getCell(x:number, y:number) {
        return this.cells[x][y];
    }
    private addPawns () {
        for (let i = 0; i < 8; i++) {
            new Pawn(Colors.BLACK, this.getCell(i, 1) )
            new Pawn(Colors.WHITE, this.getCell(i,6) )
        }
    }
    private addKings () {
        new King(Colors.BLACK, this.getCell(4, 0) )
        new King(Colors.WHITE, this.getCell(4,7) )
    }
    private addQueens() {
        new Queen(Colors.BLACK, this.getCell(3, 0) )
        new Queen(Colors.WHITE, this.getCell(3,7) )
    }
    private addHorses () {
        new Horse(Colors.BLACK, this.getCell(1, 0) )
        new Horse(Colors.WHITE, this.getCell(1,7) )
        new Horse(Colors.BLACK, this.getCell(6, 0) )
        new Horse(Colors.WHITE, this.getCell(6,7) )
    }
    private addTowers () {
        new Tower(Colors.BLACK, this.getCell(0, 0) )
        new Tower(Colors.WHITE, this.getCell(7,7) )
        new Tower(Colors.BLACK, this.getCell(7, 0) )
        new Tower(Colors.WHITE, this.getCell(0,7) )
    }
    private addBishops () {
        new Bishop(Colors.BLACK, this.getCell(2, 0) )
        new Bishop(Colors.WHITE, this.getCell(2,7) )
        new Bishop(Colors.BLACK, this.getCell(5, 0) )
        new Bishop(Colors.WHITE, this.getCell(5,7) )
    }

    public addFigures() {
        this.addBishops()
        this.addHorses()
        this.addKings()
        this.addPawns()
        this.addQueens()
        this.addTowers()
    }
}