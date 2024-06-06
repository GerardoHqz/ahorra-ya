export interface Store {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number
  departament: string;
  municipality: string;
  direction: string;
  ownerName: string | undefined;
  website: string | undefined;
  phone: string | undefined;
  email: string | undefined;
}
