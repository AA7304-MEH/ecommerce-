'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Redirect page to maintain TechNova brand identity
// All customer-facing content should showcase TechNova products
export default function AliExpressRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to TechNova featured products page
    router.replace('/featured');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="text-center text-white">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold">Redirecting to TechNova Collection...</h2>
      </div>
    </div>
  );
}