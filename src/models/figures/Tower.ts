import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import whiteLogo from "../../assets/white-tower.png";
import blackLogo from "../../assets/black-tower.png";

export class Tower extends Figure{
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.TOWER;
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target)) return false
        if(this.cell.isEmptyHorizontal(target)) return true
        if(this.cell.isEmptyVertical(target)) return true
        return false
    }
}