export interface Store {
  id: string;
  name: string;
  description: string;
  //geom: ?,
  department: string;
  town: string;
  address: string;
  owner_name: string | undefined;
  website: string | undefined;
  phone: string | undefined;
  email: string | undefined;
}
