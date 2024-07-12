import {
  EmployeeStatus,
  KindOfDocumentType,
  RoleScreenItem,
  StaffType,
} from "@/shared/store/auth/index.types";

export interface AuthLoginPayloadInterface {
  pin: string;
  password: string;
  deviceKey?: string;
  file?: string;
}

export interface AuthLoginResultInterface {
  sessionId: string;
  needChangePassword: string;
}
interface AccessRightUIElementItemInterface {
  uiElementId: string;
  isActive: boolean;
  name?: string;
  number: number;
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
