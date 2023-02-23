import { useEffect, useMemo, useState } from "react";
import { AxiosError } from "axios";

import { API_RESOURCE } from "../../../shared/constant";
import { useAxios } from "../../../shared/context";
import { Person } from "../model";

interface PeopleQueryState {
  loading: boolean;
  data?: {
    people: Person[],
    totalCount: number,
  };
  error?: AxiosError;
}

type Order = "ascending" | "descending";

interface SortConfig {
  sortBy: string;
  order: Order;
}

type SetState<T> = React.Dispatch<React.SetStateAction<T>>

type PaginationConfig = {
  currentPage: number,
  peoplePerPage: number,
}

export const usePeopleQuery = (): {
  value: PeopleQueryState;
  useSort: () => {
    sortConfig: SortConfig,
    sort: (_: string) => void,
  },
  useFilter: () => {
    filter: string,
    setFilter: (_: string) => void,
  },
  usePagination: () => {
    paginationConfig: PaginationConfig,
    setPaginationConfig: SetState<PaginationConfig>
  },
} => {
  const axios = useAxios();
  const [state, setState] = useState<PeopleQueryState>({
    data: {
      people: [],
      totalCount: 0,
    },
    loading: false,
  });
  const [filter, setFilter] = useState('');
  const [paginationConfig, setPaginationConfig] = useState({
    currentPage: 0,
    peoplePerPage: 10,
  })
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    sortBy: "name",
    order: "ascending",
  });

  const sort = (header: string) => {
    let newOrder: Order = "ascending";
    if (header === sortConfig.sortBy && sortConfig.order === "ascending") {
      newOrder = "descending";
    }
    setSortConfig({
      sortBy: header,
      order: newOrder,
    });
  };

  const fetchPeople = async () => {
    try {
      const { data } = await axios.get<{people: Person[], totalCount: number}>(`/${API_RESOURCE.PEOPLE}`, {
        params: {
          from: paginationConfig.currentPage * paginationConfig.peoplePerPage,
          to: (paginationConfig.currentPage + 1) * paginationConfig.peoplePerPage - 1,
          sortBy: sortConfig.sortBy,
          order: sortConfig.order,
          filter: filter,
        },
      });
      setState({
        data,
        loading: false,
        error: undefined,
      });
    } catch (error) {
      setState({
        data: undefined,
        loading: false,
      });
    }
  };

  useEffect(() => {
    setState({
      ...state,
      loading: true,
    });

    fetchPeople();
  }, [sortConfig, filter, paginationConfig]);

  useEffect(() => {
    setPaginationConfig({
      ...paginationConfig,
      currentPage: 0,
    })
  }, [filter]);

  const value = useMemo(() => state, [state]);

  return {
    value,
    useSort: () => ({
      sortConfig,
      sort,
    }),
    useFilter: () => ({
      filter,
      setFilter: (filter: string) => setFilter(filter),
    }),
    usePagination: () => ({
      paginationConfig,
      setPaginationConfig
    })
  };
};
