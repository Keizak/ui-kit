export type ActionConfirmationModalPropsType = {
  title: string;
  content: string;
  onConfirm: () => void;
  open: boolean;
  setOpen: (value: boolean) => void;
  currentAction: 'start' | 'stop' | null;
};
