import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../../redux/features/tasks";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { TaskForm } from "./TaskForm";

import placeholderImage from "../../assets/img/placeholder.png";
import { TaskCard } from "../../components/TaskCard";

export const CreateTaskPage = () => {

	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const isLoading = useAppSelector((state) => state.task.isLoading);

	const [taskPreview, setTaskPreview] = useState({
		"title": "",
		"description": "",
		"duration": 0,
		"views": 0,
		"tags": [],
		"img": "",
		"category": "",
		"assignCount": 0
	})

	const handleSubmit = async (formData: FormData) => {
		try {
			console.log(formData);

			// const newtask = await dispatch(submitHandlerProps({ ...data, tags: filteredTags }));
			const newtask = await dispatch(createTask(formData));
			if (newtask && !isLoading) {
				console.log(newtask?.payload.task._id);

				navigate("/tasks/" + newtask?.payload.task._id ?? "error");
			}
		} catch (error) {
			console.log(error);
		}
	};


	return (
		<div className="flex full-screen">
			<div className="section flex flex-auto h-full">
				<div className="container h-fit max-h-full my-auto overflow-auto">
					<div className="text-center">
						<h2 className="text-primary mb-8">Create a Task</h2>
					</div>
					<div className="max-w-[360px] mx-auto">
						<TaskForm handleSubmitProps={handleSubmit} setTaskPreview={setTaskPreview} />
					</div>
				</div>
			</div>
			<div className="bg-secondary hidden items-center justify-center w-2/4 flex-shrink-0 md:flex">
				<div className="h-96 w-96 pointer-events-none">
					<TaskCard task={{
						...taskPreview,
						title: taskPreview.title || "New Task Title",
						description: taskPreview.description || "New Task Description",
						_id: "preview",
						 createdBy: "preview",
						category: taskPreview.category || "Category",
					}} />
				</div>
			</div>
		</div>
	);
};
