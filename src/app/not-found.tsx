import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          404
        </h1>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
          Page Not Found
        </h2>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. The
          page might have been removed, renamed, or doesn&apos;t exist.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/shop">Go to Shop</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
