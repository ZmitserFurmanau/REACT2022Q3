export interface NameInputProps {
  forwardRef: React.RefObject<HTMLInputElement>;
  errorsArr: string[];
  errReset: (e: React.ChangeEvent) => void;
}
