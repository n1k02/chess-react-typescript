import './App.css'
import BoardComponent from "./components/BoardComponent";
import {useEffect, useState} from "react";
import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";
import bg from './assets/02.jpg'

function App() {

    const [board, setBoard] = useState(new Board());
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
    useEffect(() => {
        restart()
        setCurrentPlayer(whitePlayer)
    }, []);

    function restart() {
        const newBoard = new Board();
        newBoard.initCells()
        newBoard.addFigures()
        setBoard(newBoard)
    }

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }

    return (
        <div className="App">
            <img className={'background-img'} src={bg} alt=""/>
            <Timer currentPlayer={currentPlayer} restart={restart}/>
            <BoardComponent
                board={board}
                setBoard={setBoard}
                currentPlayer={currentPlayer}
                swapPlayer={swapPlayer}
            />
            <div>
                <LostFigures title={'Black figures'} figures={board.lostBlackFigures}/>
                <LostFigures title={'White figures'} figures={board.lostWhiteFigures}/>
            </div>
        </div>
    )
}

export default App
