import { rest } from "msw";

import { API_RESOURCE } from "../../app/shared/constant";
import { PEOPLE } from "../fixtures";
import { delayedResponse } from "../utils";
import { Person } from "../../app/modules/people";

const BASE_URL = `/mock-api/${API_RESOURCE.PEOPLE}*`;

export const getPeople = rest.get(BASE_URL, (_req, _res, ctx) => {
  const from = Number(_req.url.searchParams.get("from"));
  const to = Number(_req.url.searchParams.get("to"));
  const filter = _req.url.searchParams.get("filter") ?? '';
  let result = PEOPLE;
  result = result.filter((person) => person.name.includes(filter));

  const sortBy = (_req.url.searchParams.get("sortBy") ??
    "name") as keyof Person;
  const order = _req.url.searchParams.get("order");

  if (sortBy) {
    result.sort((a, b) => {
      if (a[sortBy] > b[sortBy]) {
        return order === "ascending" ? 1 : -1;
      }
      if (a[sortBy] < b[sortBy]) {
        return order === "ascending" ? -1 : 1;
      }
      return 0;
    });
  }
  const totalCount = result.length;
  result = from || to ? result.slice(from, to + 1) : result;

  return delayedResponse(ctx.status(200), ctx.json({
    people: result,
    totalCount,
  }));
});

export const handlers = [getPeople];
