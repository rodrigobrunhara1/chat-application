export interface Message {
  userId: number;
  name: string;
  description: string;
  room?: string;
  createdAt?: Date;
  typeUser?: number;
}