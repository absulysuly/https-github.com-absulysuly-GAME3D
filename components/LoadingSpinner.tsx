
export default function LoadingSpinner() {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-950">
      <div className="relative">
        <div className="h-20 w-20 rounded-full border-4 border-yellow-600" />
        <div className="absolute left-0 top-0 h-20 w-20 animate-spin rounded-full border-t-4 border-slate-700" />
      </div>
    </div>
  );
}
