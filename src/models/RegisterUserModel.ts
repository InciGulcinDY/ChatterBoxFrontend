export interface RegisterUserModel {
    user: {
        username: string,
        email: string,
        firstname: string,
        lastname: string,
        image: string | null,
        password: string,
        roles: [
          "USER"
        ]
      }
}