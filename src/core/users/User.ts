import { Result, ok, err } from 'neverthrow';
import { UserDomainError } from './errors.js';

export interface UserProps {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
}

export class User {
  private constructor(private props: UserProps) {}

  public static create(name: string, email: string, id: string): Result<User, UserDomainError> {
    if (name.length < 3) {
      return err(new UserDomainError( 'InvalidDomainError',"El nombre debe tener al menos 3 caracteres."));
    }
    return ok(new User({ id, name, email, isActive: true }));
  }

  public static reconstitute(props: UserProps): User {
    return new User(props);
  }

  public toPrimitives(): UserProps {
    return { ...this.props };
  }
}