import Typography from "../typography";

interface ErrorMessageProps {
  error?: string;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return null;

  return (
    <Typography className="mt-1.5 text-xs font-medium leading-4 text-danger">
      {error}
    </Typography>
  );
}
