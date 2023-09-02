import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from '../../components/ui/Spinner'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { registration } from '../../redux/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { ReactComponent as ImageUploadIcon } from '../../assets/img/image-upload.svg'

export const SignUp = () => {

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
        <Input handler={e => setUsername(e.currentTarget.value)} value={username} title="User Name" />
        <Input handler={e => setEmail(e.currentTarget.value)} value={email} title="Email" />
        <Input handler={e => setPassword(e.currentTarget.value)} value={password} title="Password" type='password' />
        <div>
          {
            image &&
            <div className='py-2 mx-auto w-60 h-60 object-cover'>
              <img className='w-full h-full' src={URL.createObjectURL(image as Blob)} alt={image.toString()} />
            </div>
          }
          <label className="block text-sm font-medium text-gray-700">Cover photo
            <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
              <div className="space-y-1 text-center">
                <ImageUploadIcon />
                
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer"
                  >
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={e => setImage(e.target?.files?.[0] || '')} />
                  </label>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
            </label>
        </div>
      </div>
      {
        !isLoading
          ? <Button onClick={submitHandler} >Sign in</Button>
          : <Button children={<Spinner />} onClick={submitHandler} />
      }
    </form>
  )
}
