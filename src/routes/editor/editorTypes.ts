export type Feature = {
  name: string;
  value: string;
};

export type Component = {
  quantity: number;
  name: string;
};

export type Spell = {
  ownerId: string;
  id: string;

  name: string;
  summary: string;
  features: Feature[];
  components: Component[];
  procedure: string;
  notes: string;
};
