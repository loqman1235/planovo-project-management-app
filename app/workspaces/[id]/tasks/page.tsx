import { KanbanBoard } from "./_components/KanbanBoard";
import { KanbanBoardProvider } from "./_context/KanbanBoardContext";

const TasksPage = () => {
  return (
    <div className="overflow-x-hidden">
      <KanbanBoardProvider>
        <KanbanBoard />
      </KanbanBoardProvider>
    </div>
  );
};
export default TasksPage;
