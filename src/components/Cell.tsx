import type * as Types from "../types";

export default function Cell({ value, onClick }: Types.CellProps) {
    if (value === "X") {
        return <button className="cell x" onClick={onClick}>{value}</button>;
    } else {
        return <button className="cell o" onClick={onClick}>{value}</button>;
    }
}
