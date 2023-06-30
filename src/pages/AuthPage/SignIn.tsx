import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components/ui/Spinner";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { login, resetPassword } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export const SignIn = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()
  const { user, isLoading } = useAppSelector(state => state.auth)
  const navigate = useNavigate()


  const submitHandler = () => {
    if (email && password) {
      try {
        dispatch(login({ email, password }))
        setEmail('')
        setPassword('')
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    console.log(user);
    if (user && !isLoading) {
      navigate('/')
    }
  }, [user, navigate, isLoading])


  return (
        <form className="mt-8" action="#" method="POST" onSubmit={(e) => e.preventDefault()}>
          <div className="rounded-md shadow-sm mb-5">
            <Input handler={e => setEmail(e.currentTarget.value)} value={email} title="Email" name="email" type="email"/>
            <Input handler={e => setPassword(e.currentTarget.value)} value={password} title="Password" type="password" />
          </div>
          {
            !isLoading
              ? <Button onClick={submitHandler}>Sign in</Button>
              : <Button onClick={submitHandler} >
                  <Spinner />
                </Button>
          }
          <button onClick={() => dispatch(resetPassword("admin@admin.com"))}>Forgot password?</button>
        </form>
  );
};
