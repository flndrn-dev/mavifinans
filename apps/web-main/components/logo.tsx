import Image from 'next/image';
import Link from 'next/link';

export function Logo({ size = 32 }: { size?: number }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image src="/icon.svg" alt="mavi finans" width={size} height={size} />
      <span
        className="text-lg font-bold font-display"
        style={{
          color: 'var(--mavi-text)',
          fontFamily: "'Clash Display', sans-serif",
        }}
      >
        mavi finans
      </span>
    </Link>
  );
}
