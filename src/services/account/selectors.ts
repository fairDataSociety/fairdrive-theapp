import { mountPoint } from ".";
import { createSelector } from "reselect";

export const getAccount = createSelector(
    (state:any) => state[mountPoint],
    (account) => account
);
