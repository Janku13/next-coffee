import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
export default function Store() {
  const router = useRouter();

  return (
    <div>
      MyStore
      <Link href="/">
        <a> back</a>
      </Link>
    </div>
  );
}
