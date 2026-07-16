import { ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const requestKey = useRef(crypto.randomUUID());
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => setHydrated(true), []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const data = {
      ...Object.fromEntries(new FormData(e.currentTarget)),
      request_key: requestKey.current,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { success?: boolean; error?: string };
      if (json.success) {
        setStatus("success");
        formRef.current?.reset();
      } else {
        setErrorMsg(json.error ?? "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error — please try again.");
      setStatus("error");
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Your name"
            required
            maxLength={200}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@company.com"
            required
            maxLength={200}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="company">
          Company{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </Label>
        <Input
          id="company"
          name="company"
          placeholder="Your company"
          maxLength={200}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell me about your project — what you're building, what problem it solves, and what kind of help you need."
          className="min-h-[120px]"
          required
          maxLength={2000}
        />
      </div>
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex items-center gap-4">
        <span
          id="form-msg"
          role="status"
          aria-live="polite"
          className={
            status === "success"
              ? "success text-sm text-emerald-400"
              : status === "error"
                ? "error text-sm text-red-400"
                : ""
          }
        >
          {status === "success" && "Message sent — I'll be in touch soon."}
          {status === "error" && errorMsg}
        </span>
        <Button
          id="submit-btn"
          type="submit"
          disabled={status === "sending"}
          size="lg"
          data-hydrated={hydrated ? "true" : undefined}
        >
          {status === "sending" ? (
            <>
              <Loader2 className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send message
              <ArrowRight />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
