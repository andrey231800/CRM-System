export interface UserRegistration { 
  login: string; 
  username: string; 
  password: string; 
  email: string; 
  phoneNumber: string; 
}

export interface UserProfile { 
    id: number; 
    username: string; 
    email: string; 
    date: string; 
    isBlocked: boolean; 
    isAdmin: boolean; 
    phoneNumber: string; 
  }

export interface Token {
    accessToken: string;
}

export interface AuthData { 
  login: string; 
  password: string; 
}

export interface RefreshToken { 
  refreshToken: string; 
}