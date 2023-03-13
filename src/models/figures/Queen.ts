import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import whiteLogo from "../../assets/white-queen.png";
import blackLogo from "../../assets/black-queen.png";

export class Queen extends Figure{
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.QUEEN;
    }
}