import {inject} from "@angular/core";
import {
  type CreateMutationResult,
  injectMutation,
  mutationOptions,
  QueryClient
} from '@tanstack/angular-query-experimental';
import {type ProblemDetail} from '@/contracts/utils/problem-detail.contract';
import {ToastrService} from "ngx-toastr";

export type BaseMutation<TInput, TOutput> = CreateMutationResult<TOutput, ProblemDetail, TInput, TOutput>;

export type MutationFunction<TInput, TOutput> = (data: TInput) => Promise<TOutput>;

export function injectBaseMutation<TInput, TOutput>(
  keys: string[],
  mutationFunction: MutationFunction<TInput, TOutput>,
  refetchKeys: string[]
): BaseMutation<TInput, TOutput> {
  const queryClient: QueryClient = inject(QueryClient);
  const toastService: ToastrService = inject(ToastrService);
  return injectMutation(() => mutationOptions({
    mutationKey: keys,
    mutationFn: mutationFunction,
    async onSuccess(): Promise<void> {
      await queryClient.resetQueries({queryKey: refetchKeys});
    },

    onError(error: ProblemDetail): void {
      toastService.error(error.title)
    }
  }));
}
