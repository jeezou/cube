export type UserType = {
  username: string
  roles: Roles
  id?: number
  token?: string
  expires_at?: Date
}

export enum Roles {
  admin = 'ADMIN',
  user = 'USER',
}
