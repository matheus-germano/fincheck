import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { authService } from '../../../app/services/authService';

import { SignUpParams } from '../../../app/services/authService/signUp';
import { useAuth } from '../../../app/hooks/useAuth';

const schema = z.object({
  name: z.string().nonempty('Nome é obrigatório'),
  email: z.string().nonempty('E-mail é obrigatório').email('Insira um e-mail válido'),
  password: z.string().nonempty('Senha é obrigatório').min(8, 'Senha deve conter pelo menos 8 dígitos')
});

type FormData = z.infer<typeof schema>;

export function useSignUpController() {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onSubmit',
    resolver: zodResolver(schema)
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ['signUp'],
    mutationFn: async (data: SignUpParams) => {
      return authService.signUp(data);
    }
  });

  const { signIn } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      signIn(accessToken);
    } catch {
      toast.error('Ocorreu um erro ao criar sua conta');
    }
  });

  return { handleSubmit, register, errors, isLoading };
}