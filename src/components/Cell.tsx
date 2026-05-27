import type * as Types from "./types";

interface CellProps {
    value: Types.CellValue;
    onClick: () => void;
}

export default function Cell({ value, onClick }: CellProps) {
    if (value === "X") {
        return <button className="cell x" onClick={onClick}>{value}</button>;
    } else {
        return <button className="cell o" onClick={onClick}>{value}</button>;
    }
}
