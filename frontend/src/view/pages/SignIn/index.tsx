import { Link } from 'react-router-dom';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { useSignInController } from './useSignInController';

export function SignIn() {
  const { handleSubmit, register, errors, isLoading } = useSignInController();

  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
          Entre em sua conta
        </h1>
        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">
            Novo por aqui?
          </span>
          <Link
            to="/sign-up"
            className="text-teal-900 font-medium tracking-[-0.5px]"
          >
            Crie uma conta
          </Link>
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mt-[60px] flex flex-col gap-4"
      >
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
          Entrar
        </Button>
      </form>
    </>
  );
}