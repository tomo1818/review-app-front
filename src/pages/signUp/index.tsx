import Cookies from 'js-cookie'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { SignForm } from '@/components/users/SignForm'
import { AuthContext } from '@/context/AuthContext'
import { signUp } from '@/lib/api/auth'

const SignUp: NextPage = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const { setIsSignedIn, setCurrentUser, currentUser } = useContext(AuthContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const generateParams = () => {
    const signUpParams = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
    }
    return signUpParams
  }

  const signUpHandleSubmit = async () => {
    const params = generateParams()

    try {
      const res = await signUp(params)
      console.log(res)

      if (res.status === 200) {
        Cookies.set('_access_token', res.headers['access-token'])
        Cookies.set('_client', res.headers['client'])
        Cookies.set('_uid', res.headers['uid'])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)
        router.push('/')
        console.log('signed in successfully')
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <SignForm
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      passwordConfirmation={passwordConfirmation}
      setPasswordConfirmation={setPasswordConfirmation}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      title="サインアップ"
      signType="signUp"
      handleSubmit={signUpHandleSubmit}
      currentUser={currentUser}
    />
  )
}

export default SignUp
