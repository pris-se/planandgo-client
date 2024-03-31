import { Task } from "./Task.interface";

export interface Event {
	_id: string
	userId: string,
	// taskId: { type: mongoose.Schema.Types.ObjectId, required: true },
	task: Task,
	priority: 'low' | 'medium' | 'high',
	status: 'todo' | 'in_progress' | 'done' | 'cancelled',
	start: string,
	end: string,
	recurring?: boolean,
	reminders?: string[],
}