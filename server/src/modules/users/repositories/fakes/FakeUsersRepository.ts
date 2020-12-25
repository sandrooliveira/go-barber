import IUsersRepository from '@modules/users/repositories/IUserRepository';
import { uuid } from 'uuidv4';

import User from '@modules/users/infra/typeorm/entities/User';
import ICreateAppointmentDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllDTO from '../../dtos/IFindAllDTO';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findAll({ except_user_id }: IFindAllDTO): Promise<User[]> {
    if (except_user_id) {
      return this.users.filter(user => user.id !== except_user_id);
    }

    return this.users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const foundUser = this.users.find(user => user.id === id);

    return foundUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const foundUser = this.users.find(user => user.email === email);

    return foundUser;
  }

  public async create(userData: ICreateAppointmentDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const foundIndex = this.users.findIndex(
      findUser => findUser.id === user.id,
    );

    this.users[foundIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
