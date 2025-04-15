"use client"; // ✅ Esto se ejecuta en el cliente

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ComponentsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/components/CTA"); // Redirige a /components/buttons
  }, [router]);

  return null; // No renderiza nada, ya que redirige automáticamente
}