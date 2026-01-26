import {CreateMutationResult, injectMutation, mutationOptions, QueryClient} from '@tanstack/angular-query-experimental';
import {User} from '@/contracts/user.contrcact';
import {LoginPayload} from '@/contracts/login-payload';
import {AuthorizationService} from '@/services/authorization.service';
import {inject} from '@angular/core';
import {QueryKeys} from '@/constants/query-keys.constants';
import {ProblemDetail} from '@/contracts/problem-detail.contract';

export function injectLoginMutation(): CreateMutationResult<User, ProblemDetail, LoginPayload, User> {
  const authorizationService: AuthorizationService = inject(AuthorizationService);
  const queryClient: QueryClient = inject(QueryClient);
  return injectMutation(() => mutationOptions({
    mutationFn: (payload: LoginPayload) => authorizationService.login(payload),
    mutationKey: [QueryKeys.LOGIN],
    async onSuccess(): Promise<void> {
      await queryClient.invalidateQueries({queryKey: [QueryKeys.PROFILE]});
    },
    onError(error) {
      console.log(error)
    }
  }));
}
