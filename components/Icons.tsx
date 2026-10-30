export function Arrow({ diagonal = false, className = '' }: { diagonal?: boolean; className?: string }) {
  return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M5 19 19 5M5 5h14v14' : 'M4 12h16m-7-7 7 7-7 7'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
export function Asterisk({ className = '' }: { className?: string }) {
  return <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 1v30M3 8.5l26 15M3 23.5l26-15" stroke="currentColor" strokeWidth="2" /></svg>;
}
