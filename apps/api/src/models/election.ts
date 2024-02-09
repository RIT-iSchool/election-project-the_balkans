/** Election table type */
export type Election = {
  id: number;
  name: string;
  /** Society ID referencing Society table */
  society_id: number;
  start_date: Date;
  end_date: Date;
  photo_url: string;
};
