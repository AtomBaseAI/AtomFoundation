"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Download,
  Archive,
  FileCode2,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  FolderTree,
  ArrowLeft,
  Lock,
} from "lucide-react";

import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const includedItems = [
  "Complete Next.js application source (src/)",
  "All page routes, API routes & React components",
  "Tailwind CSS + shadcn/ui configuration",
  "Package.json with the full dependency list",
  "TypeScript, ESLint & Next.js config files",
  "Public assets (logo, robots.txt)",
];

const excludedItems = [
  "node_modules (re-install with bun install)",
  ".next build output & .git history",
  "Environment files & runtime logs",
];

export default function DownloadPage() {
  const [downloading, setDownloading] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const onDownload = async () => {
    setDownloading(true);
    setDone(false);
    try {
      const res = await fetch("/api/download", { method: "GET" });
      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "atom-arc-foundation-source.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      setDone(true);
      toast.success("Source archive downloaded successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Could not generate the archive. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Developer Access"
        title={
          <>
            Download the{" "}
            <span className="text-gradient-brand">source code</span>
          </>
        }
        description={
          <>
            Grab a complete archive of the {site.name} website source. This page
            is unlisted — accessible only via direct URL — and intended for
            developers and maintainers.
          </>
        }
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Download" }]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button
            size="lg"
            onClick={onDownload}
            disabled={downloading}
            className="bg-gradient-brand text-white hover:opacity-90"
          >
            {downloading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Archiving…
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download source (.zip)
              </>
            )}
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to site
            </Link>
          </Button>
        </div>
      </PageHero>

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          {done && (
            <Reveal className="mx-auto mb-10 max-w-2xl">
              <div className="flex items-start gap-3 rounded-xl border border-brand-green/30 bg-brand-green/10 p-4 text-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
                <div>
                  <p className="font-semibold text-foreground">
                    Download complete
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    Unzip the archive, run{" "}
                    <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                      bun install
                    </code>{" "}
                    inside the folder, then{" "}
                    <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                      bun run dev
                    </code>{" "}
                    to start the app locally.
                  </p>
                </div>
              </div>
            </Reveal>
          )}

          <SectionHeading
            align="center"
            eyebrow="What you get"
            title="Everything needed to run the site"
            description="The archive bundles the full application source so you can run, audit or redeploy it anywhere."
            icon={Archive}
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Reveal>
              <Card className="h-full border-brand-green/30">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                    <FileCode2 className="h-5 w-5" />
                  </div>
                  <CardTitle className="mt-3">Included in the archive</CardTitle>
                  <CardDescription>
                    Source code and configuration files only.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2.5 text-sm">
                    {includedItems.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal>
              <Card className="h-full border-border/60">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <FolderTree className="h-5 w-5" />
                  </div>
                  <CardTitle className="mt-3">Excluded by design</CardTitle>
                  <CardDescription>
                    Heavy or machine-specific artefacts are skipped.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2.5 text-sm">
                    {excludedItems.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          </div>

          <Reveal className="mt-10">
            <Card className="overflow-hidden border-border/60 bg-muted/30">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-white">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-poppins text-lg font-700">
                        Ready to download?
                      </h3>
                      <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                        The archive is generated on demand from the live source
                        tree and streamed as a single zip file. No build
                        artefacts, no secrets — just clean source.
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={onDownload}
                    disabled={downloading}
                    size="lg"
                    className="bg-gradient-brand text-white hover:opacity-90"
                  >
                    {downloading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Archiving…
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Download .zip
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal className="mt-8">
            <p className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
              <Lock className="h-3.5 w-3.5" />
              This page is unlisted and not linked from the site navigation.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
