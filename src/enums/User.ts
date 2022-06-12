export type CreateUserParams = {
  username: string
  password: string
  realname: string
  bsr_code: string
  car_number: string
  mobile: string
}

export type UpdateUserParams = CreateUserParams & {
  id: number
}
