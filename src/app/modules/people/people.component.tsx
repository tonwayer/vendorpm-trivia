import React from "react";
import { Person } from "./model";
import { usePeopleQuery } from "./query";

import "./people.css";

type HeaderKey = "name" | "show" | "actor" | "dob" | "movies";
type Header = {
  key: HeaderKey;
  value: string;
  sortAble: Boolean;
};

const headers: Header[] = [
  {
    key: "name",
    value: "Name",
    sortAble: true,
  },
  {
    key: "show",
    value: "Show",
    sortAble: true,
  },
  {
    key: "actor",
    value: "Actor/Actress",
    sortAble: true,
  },
  {
    key: "dob",
    value: "Date of birth",
    sortAble: true,
  },
  {
    key: "movies",
    value: "Movies",
    sortAble: false,
  },
];

export function People() {
  const { value, useSort, useFilter, usePagination } =
    usePeopleQuery();
  const { filter, setFilter } = useFilter();
  const { paginationConfig, setPaginationConfig } = usePagination();
  const { sortConfig, sort } = useSort();
  const { data, loading, error } = value;

  if (data === undefined || error) {
    return <h2>Oops! looks like something went wrong!</h2>;
  }

  const { people, totalCount } = data;

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const PeopleTable = () => {
    if (loading) {
      return <p>Fetching People...</p>;
    }

    const renderCells = ({ name, show, actor, movies, dob }: Person) => (
      <>
        <td>{name}</td>
        <td>{show}</td>
        <td>{actor}</td>
        <td>{dob}</td>
        <td
          dangerouslySetInnerHTML={{
            __html: movies.map(({ title }) => title).join(", "),
          }}
        ></td>
      </>
    );

    if (people === undefined || people.length === 0) {
      return <p>No People Available.</p>;
    }

    const onHeaderClick = (header: Header) => {
      if (header.sortAble) {
        sort(header.key);
      }
    };

    const renderHeaderCell = (header: Header) => (
      <th
        key={header.key}
        aria-label={header.value}
        aria-sort={header.key === sortConfig.sortBy ? sortConfig.order : "none"}
        onClick={() => onHeaderClick(header)}
      >
        {header.value}
        {header.key === sortConfig.sortBy
          ? sortConfig.order === "ascending"
            ? "↓"
            : "↑"
          : null}
      </th>
    );

    return (
      <table>
        <thead>
          <tr>{headers.map((header) => renderHeaderCell(header))}</tr>
        </thead>
        <tbody>
          {people.map((people: Person, index: number) => (
            <tr key={index}>{renderCells(people)}</tr>
          ))}
        </tbody>
      </table>
    );
  };

  const Pagination = () => {
    const totalPages = Math.ceil(totalCount / paginationConfig.peoplePerPage);
    const handlePeoplePerPageChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      setPaginationConfig({
        ...paginationConfig,
        peoplePerPage: Number(event.target.value),
      });
    };

    return (
      <div>
        <div>
          <span>
            Showing{" "}
            {paginationConfig.currentPage * paginationConfig.peoplePerPage + 1}-
            {(paginationConfig.currentPage + 1) * paginationConfig.peoplePerPage} of{" "}
            {totalCount}
          </span>
        </div>
        <div>
          <button
            aria-label="First"
            disabled={paginationConfig.currentPage === 0}
            onClick={() =>
              setPaginationConfig({
                ...paginationConfig,
                currentPage: 0,
              })
            }
          >
            {"<<"}
          </button>
          <button
            aria-label="Previous"
            disabled={paginationConfig.currentPage <= 0}
            onClick={() =>
              setPaginationConfig({
                ...paginationConfig,
                currentPage: paginationConfig.currentPage - 1,
              })
            }
          >
            {"<"}
          </button>
          <button
            aria-label="Next"
            disabled={paginationConfig.currentPage >= totalPages - 1}
            onClick={() =>
              setPaginationConfig({
                ...paginationConfig,
                currentPage: paginationConfig.currentPage + 1,
              })
            }
          >
            {">"}
          </button>
          <button
            aria-label="Last"
            disabled={paginationConfig.currentPage === totalPages - 1}
            onClick={() =>
              setPaginationConfig({
                ...paginationConfig,
                currentPage: totalPages - 1,
              })
            }
          >
            {">>"}
          </button>
        </div>
        <select
          onChange={handlePeoplePerPageChange}
          value={paginationConfig.peoplePerPage}
        >
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>
    );
  };

  return (
    <div>
      <input
        aria-label="Search"
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Search Name"
      />
      <PeopleTable />
      <Pagination />
    </div>
  );
}
