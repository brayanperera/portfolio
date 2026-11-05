"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Button variant="ghost" onClick={copy} className="w-full justify-between break-all">
      <span>{email}</span>
      {copied ? (
        <Check aria-hidden="true" className="size-4 shrink-0 text-accent" />
      ) : (
        <Copy aria-hidden="true" className="size-4 shrink-0" />
      )}
      <span role="status" className="sr-only">
        {copied ? "Email copied" : ""}
      </span>
    </Button>
  );
}
