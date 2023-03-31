export interface IBaseEntity {
  id: number;
  addedAt: string; // ISO date string
  addedBy: number | null;
  updatedAt: string; // ISO date string
}
