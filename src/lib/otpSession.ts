import type { ConfirmationResult } from 'firebase/auth';

/**
 * Holds the in-memory verification session between routes.
 * ConfirmationResult cannot be passed through route params, so the verify
 * screen reads it from this module-level store.
 */
export type OtpSession = {
  /** E.164 number, e.g. +923001234567 */
  e164: string;
  /** Pretty display, e.g. +92 300 1234567 */
  display: string;
  confirmation: ConfirmationResult | null;
  sentAt: number;
};

let session: OtpSession | null = null;

export function setOtpSession(next: OtpSession): void {
  session = next;
}

export function getOtpSession(): OtpSession | null {
  return session;
}

export function updateConfirmation(confirmation: ConfirmationResult): void {
  if (session) {
    session.confirmation = confirmation;
    session.sentAt = Date.now();
  }
}

export function clearOtpSession(): void {
  session = null;
}
