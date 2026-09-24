"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { AuthField, AuthPanel, authButtonClassName, authInputClassName } from "@/components/auth/AuthPanel";
import { ApiError, apiRequest } from "@/lib/api";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenFromQuery = searchParams.get("token") ?? "";
  const [token, setToken] = useState(tokenFromQuery);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setPending(true);
    try {
      await apiRequest<{ message: string }>("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password }),
      });
      router.push("/login");
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : "Unable to update your password.");
    } finally {
      setPending(false);
    }
  };

  return (
    <AuthPanel
      kicker="New password"
      title="Choose a password only you know."
      body="This link expires after an hour and signs you out of other devices once the password is changed."
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        {tokenFromQuery ? null : (
          <AuthField label="Reset token">
            <input
              required
              type="text"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              className={authInputClassName}
            />
          </AuthField>
        )}
        <AuthField label="New password">
          <input
            required
            type="password"
            minLength={8}
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={authInputClassName}
          />
        </AuthField>
        <AuthField label="Confirm password">
          <input
            required
            type="password"
            minLength={8}
            autoComplete="new-password"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            className={authInputClassName}
          />
        </AuthField>
        {error ? <p className="text-sm text-tertiary">{error}</p> : null}
        <button type="submit" disabled={pending} className={authButtonClassName}>
          {pending ? "Updating…" : "Update password"}
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="px-6 py-12 text-sm text-on-surface-variant">Loading…</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
