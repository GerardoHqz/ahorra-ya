import { Image } from "./Images";
import { Store } from "./Stores";

export interface Offer {
  idOffer: string;
  name: string;
  description: string;
  priceNow: number;
  priceBefore: number;
  endDate: string;
  active: boolean;
  store: Store,
}
