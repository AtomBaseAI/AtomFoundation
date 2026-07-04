"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Atom, Lock, Mail, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";

export default function CmsLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error("Login failed", { description: json.error || "Invalid credentials." });
        return;
      }
      toast.success("Welcome back!", { description: "Redirecting to dashboard…" });
      const redirect = searchParams.get("redirect") || "/cms";
      router.push(redirect);
      router.refresh();
    } catch {
      toast.error("Something went wrong", { description: "Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 px-4">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/30">
            <Atom className="h-7 w-7" />
          </span>
          <div>
            <h1 className="font-poppins text-xl font-bold text-white">Atom Arc Foundation</h1>
            <p className="mt-1 text-sm text-zinc-400">Content Management System</p>
          </div>
        </div>

        <Card className="border-zinc-800 bg-zinc-900/80 backdrop-blur-xl">
          <CardHeader className="pb-4">
            <h2 className="font-poppins text-lg font-semibold text-white">Admin Login</h2>
            <p className="text-sm text-zinc-400">Sign in to manage your website content</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300">Email</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@atomfoundations.org"
                    className="border-zinc-700 bg-zinc-800/50 pl-10 text-white placeholder:text-zinc-600 focus:border-blue-500"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-zinc-300">Password</Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="border-zinc-700 bg-zinc-800/50 pl-10 text-white placeholder:text-zinc-600 focus:border-blue-500"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in…
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>

            <div className="mt-6 border-t border-zinc-800 pt-4">
              <a
                href="/"
                className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to website
              </a>
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} Atom Arc Foundation. All rights reserved.
        </p>
      </div>
    </div>
  );
}
