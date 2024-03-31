import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BinIcon } from "../../assets/img/bin.svg";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Spinner } from "../../components/ui/Spinner";
import { registration } from "../../redux/features/profile";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { UserResolver, UserSchema } from "../../schemas/authSchemas";
import { objectToFormData } from "../../utils/helpers";


export const SignUp = () => {
	const [image, setImage] = useState<File | string>("");
	const dispatch = useAppDispatch();

	const { isLoading, me } = useAppSelector((state) => state.profile);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,

	} = useForm<UserResolver>({
		resolver: yupResolver(UserSchema),
	});

	const submitHandler = (data: UserResolver) => {
		console.log(data);
		const formData = objectToFormData(data)
		if (data.avatar instanceof FileList && !data.avatar.length) {
			delete data.avatar
		}
		try {
			dispatch(registration(formData));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		console.log(me);
		if (me && !isLoading) {
			navigate("/");
		}
	}, [me, navigate, isLoading]);

	const removeImageHanler = () => {
		setValue("avatar", "");
		setImage("");
	}

	return (
		<form
			className="form-group mt-8"
			action="#"
			method="POST"
			onSubmit={handleSubmit(submitHandler)}
		>
			<div className="row row--sm">
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
									src={image ? URL.createObjectURL(image as Blob) : "../../img/placeholder.png"}
									alt={image ? image.toString() : "placeholder"}
								/>
							</div>
							<div className="text-primary font-semibold">
								{!image ? "Upload a task’s photo" : "Change a photo"}
							</div>
							<input
								type="file"
								className="hidden"
								{...register("avatar")}
								onChange={(e) => {
									register("avatar").onChange(e)
									setImage(e.target?.files?.[0] || "")
								}}
							/>
						</label>
					</div>
				</div>
				<div className="col-12">
					<Input
						title="User Name"
						error={errors?.username?.message}
						{...register("username")}
					/>
				</div>
				<div className="col-12">
					<Input
						title="Email"
						error={errors?.email?.message}
						{...register("email")}
					/>
				</div>
				<div className="col-12">
					<Input
						title="Password"
						type="password"
						error={errors?.password?.message}
						{...register("password")}
					/>
				</div>
				<div className="col-12">
					{
						!isLoading ? (
							<Button type="submit">Sign up</Button>
						) : (
							<Button disabled={true}><Spinner /></Button>
						)
					}
				</div>
			</div>

		</form >
	);
};
