import { ReservationInterface } from 'interfaces/reservation';
import { OutletInterface } from 'interfaces/outlet';
import { GetQueryInterface } from 'interfaces';

export interface ToolInterface {
  id?: string;
  name: string;
  availability_status: boolean;
  outlet_id: string;
  created_at?: any;
  updated_at?: any;
  reservation?: ReservationInterface[];
  outlet?: OutletInterface;
  _count?: {
    reservation?: number;
  };
}

export interface ToolGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  outlet_id?: string;
}
