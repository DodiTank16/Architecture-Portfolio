export default function LoadingSpinner({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px] gap-6">
      {/* Spinning border ring */}
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 border border-dark-400 rounded-full" />
        <div
          className="absolute inset-0 border-t border-accent rounded-full"
          style={{ animation: 'spin 1.2s linear infinite' }}
        />
      </div>
      <span className="text-muted text-xs tracking-[0.25em] uppercase font-sans">{label}</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
