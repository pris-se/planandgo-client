import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader } from "../../components/Loader";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { categories } from "../../data/data";
import { Task, TaskResolver } from "../../interfaces";
import { useAppSelector } from "../../redux/hooks";
import { TaskSchema } from "../../schemas/taskSchemas";
import { tagsFilter } from "../../utils/tagsFilter";

import { ReactComponent as BinIcon } from "../../assets/img/bin.svg";
import { TextArea } from "../../components/ui/TextArea";
import { getImageUrl, objectToFormData } from "../../utils/helpers";
import { LoaderPage } from '../common/LoaderPage';

interface TaskFormProps {
	task?: Task | null;
	handleSubmitProps: (formData: FormData) => any;
	setTaskPreview?: any
}

export const TaskForm = ({ task, handleSubmitProps, setTaskPreview }: TaskFormProps) => {

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<TaskResolver>({
		resolver: yupResolver(TaskSchema),
	});

	useEffect(() => {
		setValue("title", task?.title as never);
		setValue("description", task?.description as never);
		setValue("category", task?.category as never);
		setValue("img", task?.img as never);
	}, [task])

	const isLoading = useAppSelector((state) => state.task.isLoading);

	const [image, setImage] = useState<File | string>(task?.img || "");
	// const [prompt, setPrompt] = useState(task?.description || "");

	const submitHandler = async (data: TaskResolver) => {
		console.log(data);

		const formData = objectToFormData(data)
		formData.delete("img")

		const filteredTags = tagsFilter(data.description);
		formData.append('tags', JSON.stringify(filteredTags));

		if (image instanceof File) {
			formData.append('img', image);
		}
		if (typeof image === "string" && image !== task?.img) {
			formData.append('img', image);
		}
		if (!image) {
			formData.append('img', "");
		}
		handleSubmitProps(formData)
	};

	const removeImageHanler = () => {
		setValue("img", "");
		setImage("");
	}

	const changeHandler = (name: string, value: File | string | number) => {
		setTaskPreview((prev: any) => ({ ...prev, [name]: value }))
	}

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
		return <LoaderPage />;
	}

	return (
		<form className="form-group" onSubmit={handleSubmit(submitHandler)}>
			<div className="row row--md">
				<div className="col-12">
					<div className="upload-image-wrapper">
						{
							image &&
							<Button
								className="btn btn--danger rounded-full btn--sm btn--square"
								onClick={removeImageHanler}
							>
								<BinIcon />
							</Button>
						}
						<label className="form-group w-full cursor-pointer text-center mb-4">
							<div className="upload-image mb-2">
								<img
									src={image ? getImageUrl(image) : "../../img/placeholder.png"}
									alt={image ? image.toString() : "placeholder"}
								/>
							</div>
							<div className="text-primary font-semibold">
								{!image ? "Upload a task’s photo" : "Change a photo"}
							</div>
							<input
								type="file"
								className="hidden"
								{...register("img")}
								onChange={(e) => {
									register("img").onChange(e)
									setImage(e.target?.files?.[0] || "")
									changeHandler("img", e.target?.files?.[0] || "")
								}}
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
						title="Task title"
						error={errors?.title?.message}
						{...register("title")}
						onChange={(e) => {
							register("title").onChange(e)
							changeHandler("title", e.target.value)
						}}
					/>
				</div>
				{/* description */}
				<div className="col-12">
					<TextArea
						title="Task description"
						{...register("description")}
						onChange={(e) => {
							register("description").onChange(e)
							changeHandler("description", e.target.value)
						}}
					/>
				</div>
				{/* labels */}
				<div className="col-12">
					<div className="col-group gap--sm">
						<label className="label fs--sm">Task category</label>
						<div className="row row--sm mb-1">
							{categories &&
								categories.map((value) => (
									<div className="col-4" key={value}>
										<label>
											<input
												type="radio"
												className="hidden"
												{...register("category")}
												onChange={(e) => {
													register("category").onChange(e)
													changeHandler("category", e.target.value)
												}}
												value={value}
											/>
											<div className="badge">{value}</div>
										</label>
									</div>
								))}
						</div>
						{errors?.category && <p className="error mb-3 -mt-2">{errors?.category?.message}</p>}
					</div>
				</div>
				<div className="col-12">
					<div className="flex gap-2">
						<Button type="submit">Save</Button>
					</div>
				</div>
			</div>
		</form>
	);
};

