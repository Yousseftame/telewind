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

export interface CategoryTranslation {
  locale: string;
  title: string;
  description: string;
}

export interface Category {
  id: number;
  image: string;
  icon: string;
  translations: CategoryTranslation[];
  creationDate?: string;
}


export interface EventTranslation {
  locale: string;
  title: string;
  description: string;
  location: string;
  details: string;
}

export interface Event {
  id: number;
  date: string;
  type: string;
  translations: EventTranslation[];
  creationDate?: string;
}


export interface CertificationTranslation {
  locale: string;
  title: string;
}

export interface Certification {
  id: number;
  image: string;
  translations: CertificationTranslation[];
  creationDate?: string;
}

export interface AnnouncementTranslation {
  locale: string;
  title: string;
  description: string;
}

export interface Announcement {
  id: number;
  slug: string;
  date: string;
  type: string;
  translations: AnnouncementTranslation[];
  creationDate?: string;
}

export interface PartnerTranslation {
  locale: string;
  name: string;
  region: string;
  country: string;
  contact: string;
  focus: string[];
}

export interface Partner {
  id: number;
  email: string;
  type: string;
  phone: string;
  website: string;
  translations: PartnerTranslation[];
  creationDate?: string;
}
export interface Product {
  id: number;
  image: string;
  supported_bands:string[]
  translations: PartnerTranslation[];
  creationDate?: string;
}