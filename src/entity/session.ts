export interface CurUser {
  username: string;
  hasLogin: boolean;
  avatar: string;
  sessionId: string;
}
export interface LoginRequest {
  username: string;
  password: string;
}
export interface RegisterRequest {
  username: string;
  password: string;
  phone: string;
}
export interface Notices {
  count: number;
}
