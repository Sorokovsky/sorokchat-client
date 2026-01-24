import {inject} from '@angular/core';
import {AuthorizationService} from '@/services/authorization.service';
import {CreateMutationResult, injectMutation, mutationOptions, QueryClient} from '@tanstack/angular-query-experimental';
import {RegisterPayload} from '@/contracts/register-payload.contract';
import {User} from '@/contracts/user.contrcact';
import {QueryKeys} from '@/constants/query-keys.constants';
import {ProblemDetail} from '@/contracts/problem-detail.contract';

export function injectRegisterMutation(): CreateMutationResult<User, ProblemDetail, RegisterPayload, User> {
  const authorizationService: AuthorizationService = inject(AuthorizationService);
  const queryClient: QueryClient = inject(QueryClient);

  return injectMutation(() => mutationOptions({
    mutationFn: authorizationService.register,
    mutationKey: [QueryKeys.REGISTER],
    async onSuccess(): Promise<void> {
      await queryClient.invalidateQueries({queryKey: [QueryKeys.PROFILE]});
    }
  }));
}
