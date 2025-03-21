export interface Season {
  _id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  draft?: string;
  invitedUserIds: string[];
  teams: string[];
}
