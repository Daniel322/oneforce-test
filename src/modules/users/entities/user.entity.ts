import { Item } from 'dynamoose/dist/Item';

export interface User extends Item {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender:
    | 'Female'
    | 'Genderfluid'
    | 'Male'
    | 'Polygender'
    | 'Bigender'
    | 'Agender'
    | 'Non-binary'
    | 'Genderqueer';
  ipAddress: string;
  dateJoined: number;
}
