import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Spinner } from "../../components/ui/Spinner";
import { getMe, updateUser } from "../../redux/features/profile";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { UserResolver, UserSchema } from "../../schemas/authSchemas";
import { getImageUrl, objectToFormData } from "../../utils/helpers";
import { LoaderPage } from "../common/LoaderPage";

import { ReactComponent as BinIcon } from "../../assets/img/bin.svg";

export const Settings = () => {
    const { isLoading, me } = useAppSelector((state) => state.profile);
    const [image, setImage] = useState<File | string>(me?.avatar || "");


    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<UserResolver>({
        resolver: yupResolver(UserSchema),
    });

    useEffect(() => {
        setValue("username", me?.username as never);
        setValue("email", me?.email as never);
        setValue("password", me?.password as never);
        setValue("_id", me?._id as never);
        setValue("avatar", image as never);
    }, [me])

    useEffect(() => {
        if (!me && !isLoading) {
            navigate("/")
        }
    }, [me, isLoading])

    const submitHandler = async (data: UserResolver) => {
        if (!me?._id) {
            return;
        }
        const formData = objectToFormData(data)
        formData.delete("avatar")
        console.log(image, typeof image);
        
        if (image instanceof File) {
            formData.append('avatar', image);
        }
        if (typeof image === "string" && image !== me?.avatar) {
            formData.append('avatar', image);
        }
        if (!image) {
            formData.append('avatar', "");
        }


        try {
            const res = await dispatch(updateUser({ formData, _id: me?._id })).unwrap()
            if (res && !isLoading) {
                navigate(`/users/${me._id}` ?? "error");
            }
        } catch (error) {
            console.log(error);
        }

    };


    const removeImageHanler = () => {
        setValue("avatar", "");
        setImage("");
    }

    if (isLoading) {
        return <LoaderPage />
    }

    return (
        <section>
            <div className="container">
                <form
                    className="form-group max-w-[360px] mx-auto mt-8"
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
                                            src={image ? getImageUrl(image) : "../../img/placeholder.png"}
                                            alt={image ? image.toString() : "placeholder"}
                                        />
                                    </div>
                                    <div className="text-primary font-semibold">
                                        {!image ? "Upload a photo" : "Change a photo"}
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
                        {/* <Input
                            title="Password"
                            type="password"
                            error={errors?.password?.message}
                            {...register("password")}
                        /> */}
                        <div className="col-12">
                            {
                                !isLoading ? (
                                    <Button type="submit">Save</Button>
                                ) : (
                                    <Button disabled={true}><Spinner /></Button>
                                )
                            }
                        </div>
                    </div>
                </form >
            </div>
        </section>
    )
}
