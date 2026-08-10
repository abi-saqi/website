/**
 * Client-side gating MIRRORS server policy — it never replaces it.
 * Assume any check here can be bypassed; the API must enforce the same
 * rule independently. Components declare the permission they require
 * via `<Can permission="...">` rather than inlining role checks.
 */
export type Permission = `${string}:${"read" | "write" | "admin"}`;

export interface AuthContext {
  tenantId: string;
  userId: string;
  permissions: Permission[];
}

export function hasPermission(ctx: AuthContext, required: Permission): boolean {
  return ctx.permissions.includes(required);
}
