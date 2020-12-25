import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    await this.validateEmail(user.id, email);

    if (password) {
      await this.validateOldPassword(user.password, old_password);
      user.password = await this.hashProvider.generateHash(password);
    }

    user.name = name;
    user.email = email;

    return this.usersRepository.save(user);
  }

  private async validateEmail(user_id: string, email: string): Promise<void> {
    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('E-mail already in use');
    }
  }

  private async validateOldPassword(
    current_password: string,
    old_password?: string,
  ): Promise<void> {
    if (!old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password.',
      );
    }

    const isOldPasswordValid = await this.hashProvider.compareHash(
      old_password,
      current_password,
    );

    if (!isOldPasswordValid) {
      throw new AppError('Old password does not match.');
    }
  }
}

export default UpdateProfileService;
