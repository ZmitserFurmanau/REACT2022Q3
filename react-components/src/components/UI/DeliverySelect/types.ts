export interface DeliverySelectProps {
  forwardRef: React.RefObject<HTMLSelectElement>;
  errorsArr: string[];
  errReset: (e: React.ChangeEvent) => void;
}
