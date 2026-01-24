import {CreateMutationResult, injectMutation, mutationOptions, QueryClient} from '@tanstack/angular-query-experimental';
import {AuthorizationService} from '@/services/authorization.service';
import {inject} from '@angular/core';
import {QueryKeys} from '@/constants/query-keys.constants';

export function injectLogoutMutation(): CreateMutationResult<void, Error, void, void> {
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
