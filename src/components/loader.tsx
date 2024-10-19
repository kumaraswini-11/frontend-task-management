import { Loader2 } from "lucide-react";

export const Loader = () => {
  return (
    <button type="button" className="... bg-indigo-500" disabled>
      <Loader2 />
      <span>Loading...</span>
    </button>
  );
};