export interface Activity {
  id: string;
  title: string;
  sections: ActivitySection[];
}

export interface ActivitySection {
  key: string;
  label: string;
  blocks: ActivityBlock[];
}

export interface ActivityBlock {
  heading?: string;
  body?: string;
  list?: string[];

  table?: {
    headers: string[];
    rows: string[][];
  };

   statusList?: {
    label: string;
    checked: boolean;
  }[];

  linkGrid?: {
    text: string;
    href: string;
  }[];
}
