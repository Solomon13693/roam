import ErrorMessage from "./ErrorMessage";
import Typography from "../typography";

interface FieldMessageProps {
  error?: string;
  hint?: string;
}

// The line under a field: the red error when there is one, otherwise the grey hint.
export default function FieldMessage({ error, hint }: FieldMessageProps) {
  if (error) return <ErrorMessage error={error} />;
  if (!hint) return null;
  return <Typography className="mt-1.5 text-xs font-medium leading-4 text-ink-muted">{hint}</Typography>;
}
