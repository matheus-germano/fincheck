import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useSignUpController } from './useSignUpController';

export function SignUp() {
  const { handleSubmit, register, errors, isLoading } = useSignUpController();

  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
          Crie sua conta
        </h1>
        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">
            Já possui uma conta?
          </span>
          <Link
            to="/sign-in"
            className="text-teal-900 font-medium tracking-[-0.5px]"
          >
            Faça login
          </Link>
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mt-[60px] flex flex-col gap-4"
      >
        <Input
          {...register('name')}
          type="text"
          placeholder="Nome"
          error={errors?.name?.message}
        />
        <Input
          {...register('email')}
          type="email"
          placeholder="E-mail"
          error={errors?.email?.message}
        />
        <Input
          {...register('password')}
          type="password"
          placeholder="Senha"
          error={errors?.password?.message}
        />
        <Button
          type="submit"
          className="mt-2"
          isLoading={isLoading}
        >
          Criar conta
        </Button>
      </form>
    </>
  );
}