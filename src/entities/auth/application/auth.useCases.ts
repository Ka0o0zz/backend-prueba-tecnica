import { Register, Login } from "../domain/auth.entities";
import { AuthRepository } from "../infrastructure/repository/auth.reposiitory";

export class AuthUseCase {
  constructor(private readonly newsRepository: AuthRepository) {}

  public login(userToRegister: Register) {
    const newUser = this.newsRepository.register(userToRegister);
    return newUser;
  }

  public Register(userToLogin: Login) {
    const userLogin = this.newsRepository.login(userToLogin);
    return userLogin;
  }
}
