import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components/ui/Spinner";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { registration } from "../../redux/thunks/authThunk";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ReactComponent as ImageUploadIcon } from "../../assets/img/image-upload.svg";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File | string>("");
  const dispatch = useAppDispatch();

  const { isLoading, me } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const submitHandler = () => {
    try {
      const data = new FormData();
      console.log(email, username, password, image);

      data.append("email", email);
      data.append("username", username);
      data.append("password", password);
      data.append("image", image);
      console.log(data);

      dispatch(registration(data));
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

  return (
    <form
      className="form-group mt-8"
      action="#"
      method="POST"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="rounded-md shadow-sm mb-5">
        <label className="form-group w-full cursor-pointer text-center mb-4">
          <div className="upload-image mb-2">
            {image && (
              <img
                src={URL.createObjectURL(image as Blob)}
                alt={image.toString()}
              />
            )}
          </div>
          <div className="text-primary font-semibold">
            {!image ? "Upload a task’s photo" : "Change a photo"}
          </div>
          <input
            type="file"
            className="hidden"
            onChange={(e) => setImage(e.target?.files?.[0] || "")}
          />
        </label>
        <Input
          handler={(e) => setUsername(e.currentTarget.value)}
          value={username}
          title="User Name"
        />
        <Input
          handler={(e) => setEmail(e.currentTarget.value)}
          value={email}
          title="Email"
        />
        <Input
          handler={(e) => setPassword(e.currentTarget.value)}
          value={password}
          title="Password"
          type="password"
        />
      </div>
      {!isLoading ? (
        <Button onClick={submitHandler}>Sign in</Button>
      ) : (
        <Button children={<Spinner />} onClick={submitHandler} />
      )}
    </form>
  );
};
