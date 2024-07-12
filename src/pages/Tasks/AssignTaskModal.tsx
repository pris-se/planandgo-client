import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Duration } from "../../components/Duration";
import { Modal } from "../../components/modals/Modal";
import { Button } from "../../components/ui/Button";
import { SelectBox } from "../../components/ui/SelectBox";
import { InputDate } from "../../components/ui/InputDate";
import { Event, Task } from "../../interfaces";
import { createEvent } from "../../redux/features/events";
import { useAppDispatch } from "../../redux/hooks";
import { calcDuration, formatTime, isDateToday } from "../../utils/time";

interface IProps {
	task: Task;
	show: boolean;
	onClose: () => void
}

export const AssignTaskModal = ({ task, show, onClose }: IProps) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate()
	const [duration, setDuration] = useState<number>(task.duration);
	const [date, setDate] = useState(
		{
			start: new Date(),
			end: new Date(new Date().getTime() + (task.assignCount ? (task.duration / task.assignCount) : 0))
		});
	const [status, setStatus] = useState<Event["status"] | null>(null)
	const [priority, setPriority] = useState<Event["priority"] | null>(null)

	useEffect(() => {
		const duration = calcDuration(date.start, date.end);
		if (typeof duration === "number") {
			setDuration(duration);
		}

	}, [date]);

	const assignTaskHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!status || !priority) return;
		const formData = new FormData();
		task?._id && formData.append("taskId", task?._id);
		formData.append("start", date.start.toISOString());
		formData.append("end", date.end.toISOString());
		formData.append("status", status);
		formData.append("priority", priority);
		// task?.title && formData.append("title", task?.title);
		// const duration = calcDuration(date.start, date.end);
		// duration && formData.append("duration", duration.toString());

		if (duration > 0) {
			const event = await dispatch(createEvent(formData));
			console.log(event);
			// dispatch(getMe());
			navigate("/events")
		} else {
			toast("Durration must be > 0");
		}
	};

	const dateChangeHandler = (name: "start" | "end", value: Date | null) => {
		if (!value) return;
		if (name === "start" && date.start > date.end) {
			setDate((prev) => ({ ...prev, "end": value }))
		}
		setDate((prev) => ({ ...prev, [name]: value }))
	}

	return (
		<Modal
			show={show}
			title={task.title}
			onClose={onClose}
		>
			<form onSubmit={assignTaskHandler}>
				<div className="popup-body">
					<p className="mb-3">When you whant to do {task.title}</p>
					<div className="row row--md">
						{/* Start Time */}
						<div className="col-6">
							<InputDate
								title="Select start date"
								name="start"
								value={date.start}
								minDate={new Date()}
								minTime={isDateToday(date.start) ? new Date(new Date().getTime()) : undefined}
								maxTime={isDateToday(date.start) ? new Date(new Date().setHours(23, 55)) : undefined}
								showTimeSelect
								onChange={(date) => dateChangeHandler("start", date)}
							/>
						</div>
						{/* Ending time */}
						<div className="col-6">
							<InputDate
								title="Select end date"
								name="end"
								value={date.end}
								showTimeSelect
								onChange={(date) => dateChangeHandler("end", date)}
								minDate={date.start}
								minTime={date.start}
								maxTime={new Date(new Date().setHours(23, 59))}
							/>
						</div>
						<div className="col-6">
							<SelectBox
								selectValue={status}
								options={["todo", "in_progress", "done", "cancelled"].map((option) => ({ value: option, label: option.charAt(0).toUpperCase() + option.slice(1) }))}
								onSelect={(value) => setStatus(value ? value?.value as Event["status"] : null)}
								placeholder="Select status"
							/>
						</div>
						<div className="col-6">
							<SelectBox
								selectValue={priority}
								options={["low", "medium", "high"].map((option) => ({ value: option, label: option.charAt(0).toUpperCase() + option.slice(1) }))}
								onSelect={(value) => setPriority(value ? value?.value as Event["priority"] : null)}
								placeholder="Select priority"
							/>
						</div>
						<div className="col-12">
							<p className="fs--sm">
								Estimated Time: {" "}
								<Duration time={formatTime(duration)} />
							</p>
						</div>
					</div>
				</div>
				<div className="popup-footer">
					<Button type="submit">Confirm</Button>
					<Button onClick={onClose}>Cancel</Button>
				</div>
			</form>
		</Modal>
	);
};
