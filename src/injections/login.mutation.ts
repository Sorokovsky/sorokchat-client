import {CreateMutationResult, injectMutation, mutationOptions, QueryClient} from '@tanstack/angular-query-experimental';
import {User} from '@/contracts/user.contrcact';
import {LoginPayload} from '@/contracts/login-payload';
import {AuthorizationService} from '@/services/authorization.service';
import {inject} from '@angular/core';
import {QueryKeys} from '@/constants/query-keys.constants';

export function injectLoginMutation(): CreateMutationResult<User, Error, LoginPayload, User> {
  const authorizationService: AuthorizationService = inject(AuthorizationService);
  const queryClient: QueryClient = inject(QueryClient);
  return injectMutation(() => mutationOptions({
    mutationFn: authorizationService.login,
    mutationKey: [QueryKeys.LOGIN],
    async onSuccess(): Promise<void> {
      await queryClient.invalidateQueries({queryKey: [QueryKeys.PROFILE]});
    }
  }));
}
