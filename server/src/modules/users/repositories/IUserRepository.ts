import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindAllDTO from '../dtos/IFindAllDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  findAll(data: IFindAllDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
