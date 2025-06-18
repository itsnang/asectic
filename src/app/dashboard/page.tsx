"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { signOut } = authClient;
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();

      toast.success("Signed out successfully! 👋", {
        description: "See you next time!",
        duration: 3000,
      });

      // Redirect to home page after successful signout
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      console.error("Signout error:", error);
      toast.error("Failed to sign out", {
        description: "Please try again.",
        duration: 3000,
      });
    } finally {
      setIsSigningOut(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome to your Dashboard!
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              You have successfully signed in to your account.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="ml-4"
          >
            {isSigningOut ? "Signing out..." : "Sign Out"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Update your personal information and preferences.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>View your order history</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Track your recent purchases and order status.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>Browse our latest collection</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Discover new products and exclusive deals.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
