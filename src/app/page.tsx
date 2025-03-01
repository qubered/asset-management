import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-4xl font-bold">Asset Management</h1>
        <p className="text-lg">A new Theatre focused asset management system</p>
      </div>
    </main>
  );
}
