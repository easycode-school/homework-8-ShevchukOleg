/**
 * інерфейс відповіді серверу
 */
export interface OnLoginAnswer {
  error: boolean;
  message: string;
  id?: string;
  token?: string;
}