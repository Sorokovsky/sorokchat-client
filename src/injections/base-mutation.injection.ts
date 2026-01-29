import {inject} from "@angular/core";
import {CreateMutationResult, injectMutation, mutationOptions, QueryClient} from '@tanstack/angular-query-experimental';
import {ProblemDetail} from '@/contracts/problem-detail.contract';

export type BaseMutation<TInput, TOutput> = CreateMutationResult<TOutput, ProblemDetail, TInput, TOutput>;

export type MutationFunction<TInput, TOutput> = (data: TInput) => Promise<TOutput>;

export function injectBaseMutation<TInput, TOutput>(
  keys: string[],
  mutationFunction: MutationFunction<TInput, TOutput>,
  refetchKeys: string[]
): BaseMutation<TInput, TOutput> {
  const queryClient: QueryClient = inject(QueryClient);
  return injectMutation(() => mutationOptions({
    mutationKey: keys,
    mutationFn: mutationFunction,
    async onSuccess(): Promise<void> {
      await queryClient.resetQueries({queryKey: refetchKeys});
    }
  }));
}
