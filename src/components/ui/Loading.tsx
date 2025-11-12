import { Spinner } from "./Spinner";

export function Loading() {
  return <div className="flex justify-center py-10"><Spinner size={48} /></div>;
}