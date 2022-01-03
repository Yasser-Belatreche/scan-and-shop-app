export interface ISelectedPic {
  name: string;
  type: string;
  uri: string;
}

export interface ISearchCriteria {
  product: string | null;
  logo: string | null;
  descriptiveLabel: string | null;
  dominantColor: {
    rgb: string | null;
    hex: string | null;
  };
}
