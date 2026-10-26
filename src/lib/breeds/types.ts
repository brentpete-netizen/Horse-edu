export type Breed = {
  id: string;
  name: string;
  slug: string;
  status: string | null;
  type: string | null;
  origin: string | null;
  temperament: string | null;
  primaryUses: string[];
  typicalColors: string[];
  heightHands: string | null;
  shortDescription: string | null;
  keyCharacteristics: string | null;
  historyNotes: string | null;
  sources: string | null;
  officialAssociation: string | null;
  imageUrl: string | null;
  lastUpdated: string | null;
};

export type BreedsFetchStatus =
  | "ok"
  | "missing_credentials"
  | "error"
  | "empty";

export type BreedsResult = {
  breeds: Breed[];
  status: BreedsFetchStatus;
  message?: string;
};
