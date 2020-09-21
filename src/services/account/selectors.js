import { mountPoint } from "./";
import { createSelector } from "reselect";

export const getAccount = createSelector(
    (state) => state[mountPoint],
    (account) => account
);
