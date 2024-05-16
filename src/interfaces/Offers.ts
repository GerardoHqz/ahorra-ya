import { Image } from "./Images";
import { Store } from "./Stores";

export interface Offer {
  id: string;
  product_name: string;
  description: string;
  actual_price: number;
  previous_price: number;
  offer_duration: string;
  active: boolean;
  images: Image[],
  store: Store,
}
