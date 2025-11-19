export type FullUserDataType = {
  id: number;
  userName: string;
  email: string;
  phoneNumber: string;
  country: string;
  imagePath: string | null;
  isActivated: boolean;
  isVerified: boolean;
  creationDate: string;
  modificationDate: string;
  group: {
    name: string;
    id: number;
  };
};

export interface AuthTokenData {
  token: string;
}

export interface AuthContextType {
  loginData: AuthTokenData | null;
  setLoginData: React.Dispatch<React.SetStateAction<AuthTokenData | null>>;
  saveLoginData: () => void;
  isLoading: boolean;
  fullUserData: FullUserDataType | null;
  setFullUserData: React.Dispatch<React.SetStateAction<FullUserDataType | null>>;
  logOutUser: () => void;
}

export interface FormLoginProps {
  email: string;
  password: string;
}
