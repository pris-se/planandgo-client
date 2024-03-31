import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Spinner } from "../../components/ui/Spinner";
import { getMe, login, resetPassword } from "../../redux/features/profile";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export const SignIn = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useAppDispatch()
    const { me, status, isLoading } = useAppSelector(state => state.profile)
    const navigate = useNavigate()


    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
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
    const resetPasswordHandler = () => {
        if (password === "1111") {
            dispatch(resetPassword(email))
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
						!isLoading ? (
							<Button type="submit">Sign up</Button>
						) : (
							<Button disabled={true}><Spinner /></Button>
						)
					}
                    <Button
                        onClick={resetPasswordHandler}
                        classes="link link--primary"
                    >
                        Forgot password?
                    </Button>
                </div>
            </div>
        </form>
    );
};
