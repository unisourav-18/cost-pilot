export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-emerald-500" />
    </div>
  );
}