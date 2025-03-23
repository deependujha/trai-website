"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // console.log("Session Data:", session);
  // console.log("Status:", status);

  useEffect(() => {
    if (!session && status !== "loading") {
      router.push("/");
    }
  }, [session, status, router]);

  if (status === "loading")
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );

  if (!session) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-semibold">Welcome, {session.user?.name}!</h2>

      {session.user?.image && (
        <Image
          src={session.user.image}
          alt="Profile"
          width={96}
          height={96}
          priority
          className="rounded-full mt-4 shadow-lg"
        />
      )}

      <p className="mt-2 text-lg text-gray-700">Email: {session.user?.email}</p>

      <button
        onClick={() => signOut()}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
}
