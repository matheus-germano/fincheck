import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { authService } from '../../../app/services/authService';
import { SignInParams } from '../../../app/services/authService/signIn';
import { useAuth } from '../../../app/hooks/useAuth';

const schema = z.object({
  email: z.string().nonempty('E-mail é obrigatório').email('Insira um e-mail válido'),
  password: z.string().nonempty('Senha é obrigatório').min(8, 'Senha deve conter pelo menos 8 dígitos')
});

type FormData = z.infer<typeof schema>;

export function useSignInController () {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onSubmit',
    resolver: zodResolver(schema)
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ['signIn'],
    mutationFn: async (data: SignInParams) => {
      return authService.signIn(data);
    }
  });

  const { signIn } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      signIn(accessToken);
    } catch {
      toast.error('Credenciais inválidas');
    }
  });

  return { handleSubmit, register, errors, isLoading };
}
