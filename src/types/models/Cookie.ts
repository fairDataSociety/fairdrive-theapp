/** Represents information about an HTTP cookie. */
export interface Cookie {
  /** The domain of the cookie (e.g. "www.google.com", "example.com"). */
  domain: string;
  /** The name of the cookie. */
  name: string;
  /** The ID of the cookie store containing this cookie, as provided in getAllCookieStores(). */
  storeId: string;
  /** The value of the cookie. */
  value: string;
  /** True if the cookie is a session cookie, as opposed to a persistent cookie with an expiration date. */
  session: boolean;
  /** True if the cookie is a host-only cookie (i.e. a request's host must exactly match the domain of the cookie). */
  hostOnly: boolean;
  /** Optional. The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.  */
  expirationDate?: number | undefined;
  /** The path of the cookie. */
  path: string;
  /** True if the cookie is marked as HttpOnly (i.e. the cookie is inaccessible to client-side scripts). */
  httpOnly: boolean;
  /** True if the cookie is marked as Secure (i.e. its scope is limited to secure channels, typically HTTPS). */
  secure: boolean;
}
