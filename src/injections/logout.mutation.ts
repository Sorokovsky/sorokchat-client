import {CreateMutationResult, injectMutation, mutationOptions, QueryClient} from '@tanstack/angular-query-experimental';
import {AuthorizationService} from '@/services/authorization.service';
import {inject} from '@angular/core';
import {QueryKeys} from '@/constants/query-keys.constants';
import {ProblemDetail} from '@/contracts/problem-detail.contract';
import {LocalAccessStorageService} from '@/services/local-access-storage.service';

export function injectLogoutMutation(): CreateMutationResult<void, ProblemDetail, void, void> {
  const authorizationService: AuthorizationService = inject(AuthorizationService);
  const localAccessTokenStorage: LocalAccessStorageService = inject(LocalAccessStorageService);
  const queryClient: QueryClient = inject(QueryClient);
  return injectMutation(() => mutationOptions({
    mutationFn: (): Promise<void> => authorizationService.logout(),
    mutationKey: [QueryKeys.LOGOUT],
    onSuccess(): void {
      localAccessTokenStorage.clearAccessKey();
      queryClient.clear();
    }
  }));
}
