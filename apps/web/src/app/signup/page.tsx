"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AuthField, AuthPanel, authButtonClassName, authInputClassName } from "@/components/auth/AuthPanel";
import { ApiError, apiRequest } from "@/lib/api";
import { AuthSession, writeSession } from "@/lib/auth";

export default function SignUpPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      const session = await apiRequest<AuthSession>("/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          displayName: displayName.trim() || undefined,
        }),
      });
      writeSession(session);
      router.push("/portal");
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : "Unable to create your account.");
    } finally {
      setPending(false);
    }
  };

  return (
    <AuthPanel
      kicker="Create account"
      title="Start a UK neuro-taper that stays with you."
      body="Your account stores locale defaults from the UK configuration. You can change country later when more markets open."
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <AuthField label="Name">
          <input
            type="text"
            autoComplete="name"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            className={authInputClassName}
          />
        </AuthField>
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
        <AuthField label="Password">
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
        {error ? <p className="text-sm text-tertiary">{error}</p> : null}
        <button type="submit" disabled={pending} className={authButtonClassName}>
          {pending ? "Creating account…" : "Create account"}
        </button>
        <p className="text-center text-[13px] text-outline">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </AuthPanel>
  );
}
