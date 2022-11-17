import Cookies from 'js-cookie'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { SignForm } from '@/components/users/SignForm'
import { signIn } from '@/lib/api/auth'
import { userValueSelector } from '@/store/user-store'

const SignIn: NextPage = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [user, setUser] = useRecoilState(userValueSelector)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const generateParams = () => {
    const signInParams = {
      email: email,
      password: password,
    }
    return signInParams
  }

  const signInHandleSubmit = async () => {
    const params = generateParams()

    try {
      const res = await signIn(params)

      if (res.status === 200) {
        Cookies.set('_access_token', res.headers['access-token'])
        Cookies.set('_client', res.headers['client'])
        Cookies.set('_uid', res.headers['uid'])
        setUser(res.data.data)
        router.push('/')
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <SignForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      title="ログイン"
      signType="signIn"
      handleSubmit={signInHandleSubmit}
      currentUser={user}
    />
  )
}

export default SignIn
