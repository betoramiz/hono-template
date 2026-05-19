import { createContainer, asClass, InjectionMode, asValue } from "awilix";
import * as UserRepositoryFunction from "./persistence/repositories/user.repository.js";
import * as UserModule  from '../core/users/index.js'

export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});


container.register({
  userRepository: asValue(UserRepositoryFunction),
  createUser: asClass(UserModule.CreateUser).scoped(),
  getUserList: asClass(UserModule.GetList).scoped(),
  getUserById: asClass(UserModule.GetUserById).scoped()

});