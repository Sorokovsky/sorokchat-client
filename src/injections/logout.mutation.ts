import {CreateMutationResult, injectMutation, mutationOptions, QueryClient} from '@tanstack/angular-query-experimental';
import {AuthorizationService} from '@/services/authorization.service';
import {inject} from '@angular/core';
import {QueryKeys} from '@/constants/query-keys.constants';
import {ProblemDetail} from '@/contracts/problem-detail.contract';

export function injectLogoutMutation(): CreateMutationResult<void, ProblemDetail, void, void> {
  const authorizationService: AuthorizationService = inject(AuthorizationService);
  const queryClient: QueryClient = inject(QueryClient);
  return injectMutation(() => mutationOptions({
    mutationFn: authorizationService.logout,
    mutationKey: [QueryKeys.LOGOUT],
    async onSuccess(): Promise<void> {
      await queryClient.invalidateQueries({queryKey: [QueryKeys.PROFILE]});
    }
  }));
}
