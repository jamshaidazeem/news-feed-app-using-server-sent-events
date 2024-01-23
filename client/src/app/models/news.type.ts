export type TypeNews = {
  section: string;
  subsection: string;
  title: string;
  abstract: string;
  published_date: string; // 2024-01-22T11:48:06-05:00
  multimedia: TypeMultimedia[];
  isSent: boolean;
};

export type TypeMultimedia = {
  url: string;
  format: string;
  height: number;
  width: number;
  type: string; // image
  subtype: string;
  caption: string;
  copyright: string;
};
