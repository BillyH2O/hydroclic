"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export function AdminButton() {
  const { user } = useUser();

  // En cours de chargement ? Rien
  if (!user) return null;

  const role = user.publicMetadata.role;

  const isAdmin = role === "admin";

  return (
    <>
      {isAdmin && (
        <Link href="/admin" className="px-4 py-2 border border-red-500 text-red-500 rounded">
            Admin
        </Link>
      )}
    </>
  );
}