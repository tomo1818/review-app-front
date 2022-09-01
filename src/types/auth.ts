export type SignInParams = {
  email: string
  password: string
}

export type SignUpParams = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export type HeadersItem = string | number | boolean
