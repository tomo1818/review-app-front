import { createContext, useState, useEffect, ReactNode } from 'react'
import { getCurrentUser } from '@/lib/api/auth'
import { User } from '@/types/user'

interface IAuthContext {
  currentUser: User | null | undefined
  setCurrentUser: (value: User | undefined | null) => void
  isSignedIn: boolean
  setIsSignedIn: (value: boolean) => void
  loading: boolean
  setLoading: (value: boolean) => void
}

type Props = {
  children: ReactNode
}

const AuthContext = createContext<IAuthContext>({
  currentUser: undefined,
  setCurrentUser: () => undefined,
  isSignedIn: false,
  setIsSignedIn: () => undefined,
  loading: true,
  setLoading: () => undefined,
})

function AuthProvider(props: Props) {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>()
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()

      if (res?.data.isLogin === true) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.data)
        console.log(res?.data.data)
      } else {
        console.log('no current user')
      }
    } catch (e) {
      console.log(e, 'error')
    }

    setLoading(false)
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isSignedIn,
        setIsSignedIn,
        loading,
        setLoading,
      }}
    >
      {!loading && props.children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
