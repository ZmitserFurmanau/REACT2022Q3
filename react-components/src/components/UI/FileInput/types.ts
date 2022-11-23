export interface FileInputProps {
  forwardRef: React.RefObject<HTMLInputElement>;
  errorsArr: string[];
  errReset: (e: React.ChangeEvent) => void;
}
