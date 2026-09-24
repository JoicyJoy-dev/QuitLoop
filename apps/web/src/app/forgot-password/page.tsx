"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { AuthField, AuthPanel, authButtonClassName, authInputClassName } from "@/components/auth/AuthPanel";
import { ApiError, apiRequest } from "@/lib/api";

type ForgotResponse = {
  message: string;
  devResetToken?: string | null;
};

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<ForgotResponse | null>(null);
  const [pending, setPending] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setResult(null);
    setPending(true);
    try {
      setResult(
        await apiRequest<ForgotResponse>("/auth/forgot-password", {
          method: "POST",
          body: JSON.stringify({ email }),
        }),
      );
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : "Unable to send reset instructions.");
    } finally {
      setPending(false);
    }
  };

  return (
    <AuthPanel
      kicker="Reset password"
      title="We’ll help you back into your sanctuary."
      body="Enter the email on your QuitLoop account. If it exists, we send a one-hour reset link. In local development the token is also shown here."
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <AuthField label="Email">
          <input
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={authInputClassName}
          />
        </AuthField>
        {error ? <p className="text-sm text-tertiary">{error}</p> : null}
        {result ? (
          <div className="rounded-2xl bg-surface-container-lowest px-4 py-3 text-sm text-on-surface-variant">
            <p>{result.message}</p>
            {result.devResetToken ? (
              <p className="mt-2">
                Development reset:{" "}
                <Link
                  href={`/reset-password?token=${encodeURIComponent(result.devResetToken)}`}
                  className="text-primary hover:underline"
                >
                  set a new password
                </Link>
              </p>
            ) : null}
          </div>
        ) : null}
        <button type="submit" disabled={pending} className={authButtonClassName}>
          {pending ? "Sending…" : "Send reset instructions"}
        </button>
        <p className="text-center text-[13px] text-outline">
          <Link href="/login" className="text-primary hover:underline">
            Back to sign in
          </Link>
        </p>
      </form>
    </AuthPanel>
  );
}
