import { Draft } from "./draft.types";

export interface Season {
  _id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  draft?: Draft;
  invitedUserIds: string[];
  teams: string[];
}
