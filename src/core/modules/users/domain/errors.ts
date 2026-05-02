export type UserErrorTag = 
  | 'InvalidDomainError' 
  | 'UserNotFoundError';

export class UserDomainError extends Error {
  constructor(public readonly _tag: UserErrorTag, message?: string) {
    super(message ?? _tag);
    this.name = _tag;
  }
}