export type Entity = {
  id: string;
  name: string;
  category: string;
  adress: {
    state: string;
    city: string;
    street: string;
    number: string;
  };
  image: string;
};
