import { ReservationInterface } from 'interfaces/reservation';
import { GetQueryInterface } from 'interfaces';

export interface PromotionInterface {
  id?: string;
  name: string;
  discount_percentage: number;
  start_date: any;
  end_date: any;
  created_at?: any;
  updated_at?: any;
  reservation?: ReservationInterface[];

  _count?: {
    reservation?: number;
  };
}

export interface PromotionGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
}
