export interface Task {
  id: string;
  columnId: string;
  title: string;
}

export interface Column {
  id: string;
  title: string;
  type: "todo" | "inProgress" | "inReview" | "done";
}

export enum ColumnType {
  todo = "todo",
  inProgress = "inProgress",
  inReview = "inReview",
  done = "done",
}
