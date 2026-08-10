/**
 * Typed client generated from the platform's OpenAPI 3.1 spec (`pnpm generate`).
 * Nothing in apps/ should hand-write a fetch call to the API — a breaking
 * change to the spec must fail typecheck here, not surface as a runtime bug.
 *
 * Until the backend spec exists, this package exports a placeholder so apps
 * can wire up the dependency; swap in the generated client when ready.
 */
export type ApiClient = Record<string, never>;

export function createApiClient(_baseUrl: string): ApiClient {
  throw new Error("createApiClient: replace with the generated client (pnpm generate)");
}
