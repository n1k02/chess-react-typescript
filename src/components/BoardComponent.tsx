import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import CellComponent from "./CellComponent";
import {Cell} from "../models/Cell";
import {Player} from "../models/Player";
import {FigureNames} from "../models/figures/Figure";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;

}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);


    useEffect(() => {
        highlightCells()
    }, [selectedCell]);

    function click(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell)

            board.cells.forEach(row => {
                row.forEach(c => {
                    if(cell.figure?.canMove(c) && c.figure?.name == FigureNames.KING && cell.figure?.color !== c.figure.color) {
                        console.log('check')

                    }
                })
            })

            setSelectedCell(null)
            swapPlayer()
            updateBoard()
        } else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            }
        }
    }

    function highlightCells() {
        board.highlightCells(selectedCell)
        updateBoard()
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    return (
        <div>
            <h3>Player: {currentPlayer?.color}</h3>
            <div className={'board'}>
                {board.cells.map((row, index) => (
                    <div>
                        <React.Fragment key={index}>
                            {row.map(cell =>
                                <CellComponent
                                    cell={cell}
                                    key={cell.id}
                                    selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                                    click={click}
                                />
                            )}
                        </React.Fragment>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BoardComponent;