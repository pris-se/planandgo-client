import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { labels } from "../../data/data";
import { ITask } from "../../models/Task.model";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { tagsFilter } from "../../utils/tagsFilter";
import { Loader } from "../../components/Loader";
import { generateTaskImage } from "../../redux/thunks/aiThunk";
import { useForm } from "react-hook-form";
import { TaskSchema } from "../../schemas/taskSchemas";
import { yupResolver } from '@hookform/resolvers/yup';

import { ReactComponent as BinIcon } from "../../assets/img/bin.svg";

interface TaskFormProps {
	task?: ITask | null;
	submitHandlerProps: (data: ITask) => any;
}

export const TaskForm = ({ task, submitHandlerProps }: TaskFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,

	} = useForm({
		resolver: yupResolver(TaskSchema),
	});

	useEffect(() => {
		setValue("title", task?.title as never);
		setValue("description", task?.description as never);
		setValue("label", task?.label as never);
		setValue("_id", task?._id as never);
		setValue("image", task?.img as never);
	}, [])

	const isLoading = useAppSelector((state) => state.task.isLoading);

	const [newImage, setNewImage] = useState<File | string>("");
	// const [prompt, setPrompt] = useState(task?.description || "");

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const submitHandler = async (data: ITask) => {
		console.log("submit");
		console.log(data);
		const filteredTags = tagsFilter(data.description);
		console.log(filteredTags);

		try {
			const newtask = await dispatch(submitHandlerProps({ ...data, tags: filteredTags }));
			if (newtask && !isLoading) {
				navigate("/tasks/" + newtask?.payload.task._id ?? "error");
			}
		} catch (error) {
			console.log(error);
		}
	};

	// const generateHandler = async () => {
	//   if (prompt.length > 3) {
	//     try {
	//       const generated = await dispatch(generateTaskImage(prompt)).unwrap();
	//       const url = generated?.image
	//       setNewImage(url);
	//       setValue("image", url as never);
	//     } catch (error) {
	//         console.log(error);
	//     }
	//   }
	// };

	if (isLoading) {
		return <Loader />;
	}

	return (
		<form className="form-group" onSubmit={handleSubmit(submitHandler)}>
			<div className="row">
				<div className="col-12">
					<div className="upload-image-wrapper">
						{
							(task?.img || newImage) &&
							<Button
								className="btn btn--danger rounded-full btn--sm btn--square"
								onClick={() => { setNewImage("") }}
							>
								<BinIcon />
							</Button>
						}
						<label className="form-group w-full cursor-pointer text-center mb-4">
							<div className="upload-image mb-2">
								{!newImage && task?.img && (
									<img
										src={
											task.img
												? process.env.REACT_APP_BASE_IMAGE_URL! + task.img
												: "../../img/placeholder.png"
										}
										alt={task.img ? task.img.toString() : "placeholder"}
									/>
								)}
								{newImage && (
									<img
										src={
											newImage && typeof newImage === "string"
												? newImage
												: URL.createObjectURL(newImage as Blob)
										}
										alt={newImage ? newImage.toString() : newImage.toString()}
									/>
								)}
							</div>
							<div className="text-primary font-semibold">
								{(!task?.img && !newImage) ? "Upload a task’s photo" : "Change a photo"}
							</div>
							<input
								type="file"
								className="hidden"
								{...register("image")}
								onChange={(e) => setNewImage(e.target?.files?.[0] || "")}
							/>
						</label>
					</div>

				</div>
				{/* generate image */}
				{/* <div className="col-12 mb-3">
          <Button
            onClick={generateHandler}
            disabled={(prompt.length < 3)}
          >
            Generete image from description
          </Button>
        </div> */}
				{/* title */}
				<div className="col-12">
					<Input
						title="Task Name"
						error={errors?.title?.message}
						{...register("title")}
					/>
				</div>
				{/* description */}
				<div className="col-12">
					<div className="flex flex-col mb-3">
						<textarea
							className={errors?.description ? "textarea invalid" : "textarea"}
							placeholder="Task Description & Hashtags"
							{...register("description")}
						// onChange={(e) => setPrompt(e.target.value)}
						/>
					</div>
					{errors?.description && <p className="error mb-3 -mt-2">{errors?.description?.message}</p>}
				</div>
				{/* labels */}
				<div className="col-12">
					<div className="mb-3">
						<h4 className="mb-2">Labels</h4>
						<div className="row mb-1">
							{labels &&
								labels.map((value) => (
									<div className="col-4 mb-2" key={value}>
										<label>
											<input
												type="radio"
												className="hidden"
												{...register("label")}
												value={value}
											/>
											<div className="label">{value}</div>
										</label>
									</div>
								))}
						</div>
						{errors?.label && <p className="error mb-3 -mt-2">{errors?.label?.message}</p>}
					</div>
				</div>
			</div>
			<div className="flex gap-2">
				<Button type="submit">Save</Button>
			</div>
		</form>
	);
};

