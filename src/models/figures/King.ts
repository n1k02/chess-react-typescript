import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import whiteLogo from "../../assets/white-king.png";
import blackLogo from "../../assets/black-king.png";

export class King extends Figure{
    isCheck: boolean
    isCheckMate: boolean

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.KING;

        this.isCheck = false
        this.isCheckMate = false
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target)) return false
        const dx = Math.abs(this.cell.x - target.x)
        const dy = Math.abs(this.cell.y - target.y)
        if(dx < 2 && dy < 2) return true
        return false
    }
}