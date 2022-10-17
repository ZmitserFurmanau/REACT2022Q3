export interface CardItemModalProps {
  isActive: boolean;
  toggleActive: () => void;
  body: string;
  thumbnail: string;
  standfirst: string;
  lastModified: string;
  shortUrl: string;
}
