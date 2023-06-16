import { CustomerInterface } from 'interfaces/customer';
import { ToolInterface } from 'interfaces/tool';
import { PromotionInterface } from 'interfaces/promotion';
import { GetQueryInterface } from 'interfaces';

export interface ReservationInterface {
  id?: string;
  start_date: any;
  end_date: any;
  customer_id: string;
  tool_id: string;
  price: number;
  promotion_id?: string;
  created_at?: any;
  updated_at?: any;

  customer?: CustomerInterface;
  tool?: ToolInterface;
  promotion?: PromotionInterface;
  _count?: {};
}

export interface ReservationGetQueryInterface extends GetQueryInterface {
  id?: string;
  customer_id?: string;
  tool_id?: string;
  promotion_id?: string;
}
