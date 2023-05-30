/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-23 19:51:25
 * @LastEditTime: 2023-05-29 18:23:04
 * @FilePath: /guangqi/client/src/data-provider/react-query-service.ts
 * @Description:
 *
 * By passing t.TUserStats to QueryObserverResult, you're saying that the data property of this result object will be of type t.TUserStats.
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */

// @ts-ignore
//TODO: ANY BUG?
import {
  UseQueryOptions,
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
  QueryObserverResult
} from '@tanstack/react-query';
import * as t from './types';
import * as dataService from './data-service';
export enum QueryKeys {
  messages = 'messsages',
  allConversations = 'allConversations',
  conversation = 'conversation',
  searchEnabled = 'searchEnabled',
  user = 'user',
  endpoints = 'endpoints',
  presets = 'presets',
  searchResults = 'searchResults',
  tokenCount = 'tokenCount',
  userStats = 'userStats'
}

export const useAbortRequestWithMessage = (): UseMutationResult<
  void,
  Error,
  { endpoint: string; abortKey: string; message: string }
> => {
  return useMutation(({ endpoint, abortKey, message }) =>
    dataService.abortRequestWithMessage(endpoint, abortKey, message)
  );
};

export const useGetUserQuery = (
  config?: UseQueryOptions<t.TUser>
): QueryObserverResult<t.TUser> => {
  return useQuery<t.TUser>([QueryKeys.user], () => dataService.getUser(), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
    ...config
  });
};

export const useGetMessagesByConvoId = (
  id: string,
  config?: UseQueryOptions<t.TMessage[]>
): QueryObserverResult<t.TMessage[]> => {
  return useQuery<t.TMessage[]>(
    [QueryKeys.messages, id],
    () => dataService.getMessagesByConvoId(id),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      ...config
    }
  );
};

export const useGetConversationByIdQuery = (
  id: string,
  config?: UseQueryOptions<t.TConversation>
): QueryObserverResult<t.TConversation> => {
  return useQuery<t.TConversation>(
    [QueryKeys.conversation, id],
    () => dataService.getConversationById(id),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      ...config
    }
  );
};

//This isn't ideal because its just a query and we're using mutation, but it was the only way
//to make it work with how the Chat component is structured
export const useGetConversationByIdMutation = (id: string): UseMutationResult<t.TConversation> => {
  const queryClient = useQueryClient();
  return useMutation(() => dataService.getConversationById(id), {
    onSuccess: (res: t.TConversation) => {
      queryClient.invalidateQueries([QueryKeys.conversation, id]);
    }
  });
};

export const useUpdateConversationMutation = (
  id: string
): UseMutationResult<
  t.TUpdateConversationResponse,
  unknown,
  t.TUpdateConversationRequest,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation(
    (payload: t.TUpdateConversationRequest) => dataService.updateConversation(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.conversation, id]);
        queryClient.invalidateQueries([QueryKeys.allConversations]);
      }
    }
  );
};

export const useDeleteConversationMutation = (
  id?: string
): UseMutationResult<
  t.TDeleteConversationResponse,
  unknown,
  t.TDeleteConversationRequest,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation(
    (payload: t.TDeleteConversationRequest) => dataService.deleteConversation(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.conversation, id]);
        queryClient.invalidateQueries([QueryKeys.allConversations]);
      }
    }
  );
};

export const useClearConversationsMutation = (): UseMutationResult<unknown> => {
  const queryClient = useQueryClient();
  return useMutation(() => dataService.clearAllConversations(), {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.allConversations]);
    }
  });
};

export const useGetConversationsQuery = (
  pageNumber: string,
  config?: UseQueryOptions<t.TConversation[]>
): QueryObserverResult<t.TConversation[]> => {
  // @ts-ignore
  return useQuery<t.TConversation[]>(
    [QueryKeys.allConversations, pageNumber],
    // @ts-ignore
    () => dataService.getConversations(pageNumber),
    {
      refetchOnReconnect: false,
      refetchOnMount: false,
      retry: 1,
      ...config
    }
  );
};

export const useGetSearchEnabledQuery = (
  config?: UseQueryOptions<boolean>
): QueryObserverResult<boolean> => {
  return useQuery<boolean>([QueryKeys.searchEnabled], () => dataService.getSearchEnabled(), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    ...config
  });
};

export const useGetEndpointsQuery = (): QueryObserverResult<t.TEndpoints> => {
  return useQuery([QueryKeys.endpoints], () => dataService.getAIEndpoints(), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false
  });
};

export const useCreatePresetMutation = (): UseMutationResult<
  t.TPreset[],
  unknown,
  t.TPreset,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation((payload: t.TPreset) => dataService.createPreset(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.presets]);
    }
  });
};

export const useUpdatePresetMutation = (): UseMutationResult<
  t.TPreset[],
  unknown,
  t.TPreset,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation((payload: t.TPreset) => dataService.updatePreset(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.presets]);
    }
  });
};

export const useGetPresetsQuery = (
  config?: UseQueryOptions<t.TPreset[]>
): QueryObserverResult<t.TPreset[], unknown> => {
  return useQuery<t.TPreset[]>([QueryKeys.presets], () => dataService.getPresets(), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    ...config
  });
};

export const useDeletePresetMutation = (): UseMutationResult<
  t.TPreset[],
  unknown,
  t.TPreset | {},
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation((payload: t.TPreset | {}) => dataService.deletePreset(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.presets]);
    }
  });
};

export const useSearchQuery = (
  searchQuery: string,
  pageNumber: string,
  config?: UseQueryOptions<t.TSearchResults>
): QueryObserverResult<t.TSearchResults> => {
  return useQuery<t.TSearchResults>(
    [QueryKeys.searchResults, pageNumber, searchQuery],
    () => dataService.searchConversations(searchQuery, pageNumber),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      ...config
    }
  );
};

export const useUpdateTokenCountMutation = (): UseMutationResult<
  t.TUpdateTokenCountResponse,
  unknown,
  string,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation((text: string) => dataService.updateTokenCount(text), {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.tokenCount]);
    }
  });
};

export const useLoginUserMutation = (): UseMutationResult<
  // @ts-ignore
  t.TLoginUserResponse,
  unknown,
  // @ts-ignore
  t.TLoginUserRequest,
  unknown
> => {
  const queryClient = useQueryClient();
  // @ts-ignore
  return useMutation((payload: t.TLoginUserRequest) => dataService.login(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.user]);
    }
  });
};

export const useRegisterUserMutation = (): UseMutationResult<
  // @ts-ignore
  t.TRegisterUserResponse,
  unknown,
  t.TRegisterUser,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation((payload: t.TRegisterUser) => dataService.register(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.user]);
    }
  });
};

export const useLogoutUserMutation = (): UseMutationResult<unknown> => {
  const queryClient = useQueryClient();
  return useMutation(() => dataService.logout(), {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.user]);
    }
  });
};

export const useRefreshTokenMutation = (): UseMutationResult<
  // @ts-ignore
  t.TRefreshTokenResponse,
  unknown,
  unknown,
  unknown
> => {
  return useMutation(() => dataService.refreshToken(), {});
};

// @ts-ignore
export const useRequestPasswordResetMutation = (): UseMutationResult<unknown> => {
  // @ts-ignore
  return useMutation((payload: t.TRequestPasswordReset) =>
    dataService.requestPasswordReset(payload)
  );
};

export const useResetPasswordMutation = (): UseMutationResult<unknown> => {
  // @ts-ignore
  return useMutation((payload: t.TResetPassword) => dataService.resetPassword(payload));
};

export const useGetUserStatsQuery = (
  config?: UseQueryOptions<t.TUserStats>
): QueryObserverResult<t.TUserStats> => {
  return useQuery<t.TUserStats>([QueryKeys.userStats], () => dataService.getUserStats(), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
    ...config
  });
};
