import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserServices';
import CreateUserService from './CreateUserService';
import AppError from '../../../shared/errors/AppError';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('Authenticate User', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await createUserService.execute({
      name: 'Jhon Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const response = authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(response).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUserService.execute({
      name: 'Jhon Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = authenticateUser.execute({
      email: 'johndoe@example.com',
      password: 'wrong-password',
    });

    await expect(response).rejects.toBeInstanceOf(AppError);
  });
});
