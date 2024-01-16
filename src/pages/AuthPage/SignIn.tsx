import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components/ui/Spinner";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { login } from "../../redux/thunks/authThunk";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toast } from "react-toastify";

export const SignIn = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useAppDispatch()
    const { me, status, isLoading } = useAppSelector(state => state.auth)
    const navigate = useNavigate()


    const submitHandler = (e:React.FormEvent<HTMLFormElement>) => {
        console.log(email, password);
        e.preventDefault()
        if (email && password) {
            try {
                dispatch(login({ email, password }))
             
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        if (me && !isLoading) {
            navigate('/')
            setEmail('')
            setPassword('')
        }
        toast(status);
    }, [me, navigate, isLoading])


    return (
        <form className="mt-8" action="#" method="POST" onSubmit={submitHandler}>
            <div className="rounded-md shadow-sm mb-5">
                <Input handler={e => setEmail(e.currentTarget.value)} value={email} title="Email" name="email" type="email" />
                <Input handler={e => setPassword(e.currentTarget.value)} value={password} title="Password" type="password" />
            </div>
            <Button type="submit" classes={`btn--primary btn--md radius w-full ${isLoading ? "disabled" : ""}`} >
                {isLoading ? <Spinner /> : "Sign in"}
            </Button>
            {/* <button onClick={() => dispatch(resetPassword("admin@admin.com"))}>Forgot password?</button> */}
        </form>
    );
};
