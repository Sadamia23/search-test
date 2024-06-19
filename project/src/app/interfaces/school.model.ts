export interface ISchoolRoot {
  result: ISchool[];
  totalItems: number;
}

export interface ISchool {
  id: number;
  schoolName: string;
  regionName: string;
  districtName: string;
  email: string;
  phoneNumber: string;
  schoolType: 'PUBLIC' | 'PRIVATE';
  imageAttachmentId: number;
}
