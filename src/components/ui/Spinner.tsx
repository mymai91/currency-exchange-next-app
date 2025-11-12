import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

interface Props {
  size?: number;
  className?: string;
}

export function Spinner({ size = 32, className }: Props) {
  return (
    <Loader2
      size={size}
      className={clsx('animate-spin text-gray-600', className)}
    />
  );
}
