export interface INote {
  id: number;
  title: string;
  content: string;
  created_at: string;
}
export interface IsetIsCreating {
  setIsCreating: (value: boolean) => void;
}
