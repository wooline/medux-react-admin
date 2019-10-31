export interface CurUser {
  username: string;
  hasLogin: boolean;
  sessionId: string;
  avatar: string;
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
  messages?: string[];
}
