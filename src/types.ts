import { cellState } from "./utils";

export type CellValue = (typeof cellState)[keyof typeof cellState]