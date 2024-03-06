export interface IUser {
  token: string;
  roleName: string;
  roleId: string;
  login: string;
  fullName: string;
  accessRequestIds: string[];
  readOnlyBlockIds: string[];
  language: string;
  fidoAuth: boolean;
}
export type ILoginResultSuccess = IUser;

export interface ILoginResultFail {
  error: string;
  errorCode: string;
  localizatedErrorCode: string;
}

export interface ILogin {
  pin: string;
  password: string;
}

export interface AuthState {
  user: IUser | null;

  isLoading: boolean;
  isLoggedIn: boolean;
  fidoAuth: boolean;
  theme?: any;
  accessRequestIds: {
    [key: string]: boolean;
  };
  availableLanguages?: any;
  currentUser: AuthGetProfileResultInterface;
  needChangePassword: boolean;
  roleScreensObj: {};
  sipAccount: {
    login: string;
    password: string;
  };
}
export interface makeAssertionOptionsType {
  challenge: any;
  timeout: number;
  rpId: string;
  allowCredentials: {
    type: number;
    id: any;
    transports: string;
  }[];
  userVerification: number;
  extensions: {
    example: string;
    appID: string;
    authenticatorSelection: string;
    extensions: string;
    userVerificationMethod: boolean;
  };
  status: string;
  errorMessage: string;
}

export interface publicKeyCredentialRequestOptions
  extends PublicKeyCredentialRequestOptions {
  status?: string;
  errorMessage?: string;
}

export interface publicKeyCredential extends PublicKeyCredential {
  credentialId?: string;
  counter?: number;
  status?: string;
  errorMessage?: string;
  token: string;
}

export interface publicKeyCredentialCreationOptions
  extends PublicKeyCredentialCreationOptions {
  status?: string;
  errorMessage?: string;
}

export interface AuthGetProfileResultInterface {
  id: number;
  number: number;
  firstName?: string;
  lastName?: string;
  patronymicName?: string;
  login?: string;
  email?: string;
  phone?: string;
  interfaceLanguage?: number;
  employeeStatus?: EmployeeStatus;
  workingTime: any;
  isCreditAdmin: boolean;
  role?: string;
  roleId: string;
  staff: StaffType;
  pin?: string;
  passportNumber?: string;
  passportSerial?: string;
  issuingAuthority?: string;
  dateOfIssue?: string;
  expirationDate?: string;
  residenceAddress?: string;
  registrationAddress?: string;
  dateOfBirth?: string;
  serverDateTime: string;
  organizationId: string;
  organizationName?: string;
  organizationNumber: number;
  filialId?: string;
  filialName?: string;
  organizationFilialNumber: number;
  accessRightId: string;
  kindOfDocument: KindOfDocumentType;
  uiElements?: AccessRightUIElementItemInterface[];
  isBlocked: boolean;
  makeChangePassword: boolean;
  telegramAccountId?: string;
  agreeToBeGuarantor: boolean;
  selectedFinancialInstitutionIds?: string[];
  memberOfCommittee: boolean;
  isTrained: boolean;
  roleScreens: RoleScreenItem;
  financialInstitutionAccess: {
    notDisplayClientSignatureInContract: boolean;
  };
  useSip: boolean;
}

export enum EmployeeStatus {
  NONE = 0,
  WORK = 1900,
  QUIT = 1901,
  ON_HOLIDAY = 1902,
  BLOCKED = 1903,
}

export enum StaffType {
  NONE = 0,
  EMPLOYEE_TO = 5000,
  EMPLOYEE_TUMAR_SOFT = 5001,
  EMPLOYEE_FI = 5002,
}

export enum KindOfDocumentType {
  NONE = 0,
  PASSPORT = 5300,
  RESIDENCE_PERMIT,
  PASSPORT_OF_FOREIGN_CITIZEN,
}

interface AccessRightUIElementItemInterface {
  uiElementId: string;
  isActive: boolean;
  name?: string;
  number: number;
}

export interface RoleScreenItem {
  id: string;
  isVisible: boolean;
}
