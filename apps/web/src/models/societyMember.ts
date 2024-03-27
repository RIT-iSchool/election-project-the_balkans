export type societyMember = {
  id: number;
  userId: number;
  societyId: number;
  role: 'member' | 'officer' | 'employee';
};
