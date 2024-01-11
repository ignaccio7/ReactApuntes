
// useQuery necesita como minimo 2 parametros una key y un metodo de indicarle como tiene que recuperar la informacion

import { useInfiniteQuery } from "@tanstack/react-query";
import { User } from "../types";
import { fetchUsers } from "../services/users";

export const useUsers = () => {
    const { data,
        error,
        refetch,
        fetchNextPage,
        hasNextPage,
        isLoading
        // isFetching,
        // isFetchingNextPage,
        // status,
    } = useInfiniteQuery<{ users: User[], nextCursor: number }>({
        queryKey: ['users'],
        queryFn: fetchUsers,
        initialPsageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
        refetchOnWindowFocus: false,
    })

    return {
        loader :isLoading,
        error,
        users: (data?.pages?.flatMap(page => page.users)) ?? [],
        fetchNextPage,
        hasNextPage,
        refetch
    }
}