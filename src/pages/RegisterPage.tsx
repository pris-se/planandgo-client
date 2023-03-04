import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Buffer } from '../components/ui/Buffer'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { registration } from '../redux/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'

export const RegisterPage = () => {

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [image, setImage] = useState<File | string>('')
  const dispatch = useAppDispatch()

  const { isLoading, user } = useAppSelector(state => state.auth)
  const navigate = useNavigate()

  const submitHandler = () => {
    try {
      const data = new FormData()
      console.log(email, username, password, image);

      data.append('email', email)
      data.append('username', username)
      data.append('password', password)
      data.append('image', image)
      console.log(data);

      dispatch(registration(data))

    } catch (error) {
      console.log(error);
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
        <Input handler={e => setUsername(e.currentTarget.value)} title="User Name" />
        <Input handler={e => setEmail(e.currentTarget.value)} title="Email" />
        <Input handler={e => setPassword(e.currentTarget.value)} title="Password" type='password' />
        <div>
          {
            image &&
            <div className='py-2 mx-auto w-60 h-60 object-cover'>
              <img className='w-full h-full' src={URL.createObjectURL(image as Blob)} alt={image.toString()} />
            </div>
          }
          <label className="block text-sm font-medium text-gray-700">Cover photo</label>
          <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={e => setImage(e.target?.files?.[0] || '')} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
      </div>
      {
        !isLoading
          ? <Button title="Sign in" onClick={submitHandler} />
          : <Button children={<Buffer />} onClick={submitHandler} />
      }
    </form>
  )
}
