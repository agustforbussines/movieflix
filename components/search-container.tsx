'use client'

import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'
import { fetcher } from '@/fetcher/movie'
import { useEffect } from 'react'
import InfiniteScroll from './infinite-scroll'
import MovieCard from './movie-card'
import Loading from '@/app/(home)/search/loading'

import type { MovieResponse } from '@/types'
import MovieList from './movie-list'

type Props = {
  initialMovies: InfiniteData<MovieResponse>
  searchParams: {
    query: string | string[] | undefined
  }
}

function SearchContainer({ initialMovies, searchParams }: Props) {
  const query = useInfiniteQuery<MovieResponse>({
    queryKey: ['movies'],
    queryFn: ({ pageParam = 1 }) =>
      fetcher(`/search/movie?query=${searchParams.query}&page=${pageParam}`),

    initialData: initialMovies,
    staleTime: 0,
    refetchInterval: Infinity,
    refetchOnWindowFocus: false,

    getNextPageParam: (currentMovie) => {
      const currentPage = currentMovie.page
      return currentMovie.total_pages >= currentPage
        ? currentPage + 1
        : undefined
    },
  })

  useEffect(() => {
    query.refetch()
  }, [searchParams])

  if (query.isFetching && !query.isFetchingNextPage) {
    return <Loading />
  }

  return (
    <MovieList>
      <InfiniteScroll query={query} className="col-span-full">
        {(response: MovieResponse) =>
          response.results.map((res) => <MovieCard key={res.id} movie={res} />)
        }
      </InfiniteScroll>
    </MovieList>
  )
}

export default SearchContainer
