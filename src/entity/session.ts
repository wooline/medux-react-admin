export const guest: CurUser = {
  id: '',
  username: '游客',
  hasLogin: false,
  avatar: `${initEnv.staticPath}imgs/u1.jpg`,
};
export interface CurUser {
  id: string;
  username: string;
  hasLogin: boolean;
  avatar: string;
  expired?: number;
}
export interface LoginRequest {
  username: string;
  password: string;
  keep?: boolean;
}

export interface RegisterRequest {
  username: string;
  password: string;
}
export interface Notices {
  count: number;
}
