declare global {
  type Feature = {
    name: string;
    value: string;
  };

  type Component = {
    quantity: number;
    name: string;
  };

  type Spell = {
    ownerId: string;
    id: string;

    name: string;
    summary: string;
    features: Feature[];
    components: Component[];
    procedure: string;
    notes: string;
  };
}

export {};
