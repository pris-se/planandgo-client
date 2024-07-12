import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { getMe, login, resetPassword } from "../../redux/features/profile";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export const SignIn = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useAppDispatch()
    const { me, status, isLoading } = useAppSelector(state => state.profile)
    const navigate = useNavigate()


    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (email && password) {
            try {
                const res = await dispatch(login({ email, password })).unwrap()
            } catch (error: any) {
                console.log(error);
            }
        }
    }
    const resetPasswordHandler = () => {
        if (password === "1111") {
            try {
                dispatch(resetPassword(email))
            } catch (error: any) {
                console.log(error);
                alert(error.message)
            }
        }
    }
    useEffect(() => {
        if (!me) {
            dispatch(getMe())
        }

    }, [])

    useEffect(() => {
        if (me && !isLoading) {
            navigate('/')
            setEmail('')
            setPassword('')
        }
        toast(status);
        console.log(me);
    }, [me, navigate, isLoading])


    return (
        <form className="mt-8" action="#" method="POST" onSubmit={submitHandler}>
            <div className="row row--sm">
                <div className="col-12">
                    <Input
                        handler={value => setEmail(value)}
                        value={email}
                        title="Email"
                        name="email"
                        type="email"
                        disabled={isLoading}
                    />
                </div>
                <div className="col-12">
                    <Input
                        handler={value => setPassword(value)}
                        value={password}
                        title="Password"
                        type="password"
                        disabled={isLoading}
                    />
                </div>
                <div className="col-12">
                    {
                        <Button type="submit" isLoading={isLoading}>Sign in</Button>
                    }
                    <div className="mt-2 row-group justify-start">
                        <Button
                            onClick={resetPasswordHandler}
                            classes="link link--primary"
                        >
                            Forgot password?
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
};
