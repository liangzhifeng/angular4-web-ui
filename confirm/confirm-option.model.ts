/**
 * Confirm option
 */

export interface ConfirmOption {
  title: string;
  content: string;
  confirm: Function;
  confirmText?: string;
  cancelText?: string;
}
