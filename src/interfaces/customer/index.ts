import { ReservationInterface } from 'interfaces/reservation';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CustomerInterface {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  reservation?: ReservationInterface[];
  user?: UserInterface;
  _count?: {
    reservation?: number;
  };
}

export interface CustomerGetQueryInterface extends GetQueryInterface {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  user_id?: string;
}
