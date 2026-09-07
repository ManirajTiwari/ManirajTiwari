'use client';

import dynamic from 'next/dynamic';

const FirstComponent = dynamic(() => import('./component/first'), {
  ssr: false,
});

export default function Page() {
  return <FirstComponent />;
}