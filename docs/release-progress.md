# Release 0.3.0-preview progress

## Completed tasks

| Date | Task | Branch | Result |
|------|------|--------|--------|
| 2026-10-01 | Dependencies and security updates | agent/2bb89ea6-37e8-4bea-b3c2-63fe8be990a0 | 50→29 vulns (HIGH 12→3); all 17 tests green |

## Known open security issues (require breaking upgrades)

| Package | Severity | Root cause | Fix path |
|---------|----------|------------|----------|
| `next@12.3.7` | CRITICAL | CVE: cache-control / image DoS (range 0.9.9–15.5.23) | Upgrade to next@16+ (requires React 19 + build changes) |
| `postcss` (bundled in next) | HIGH | XSS / parse error (range ≤8.5.22) | Same: next@16 |
| `@ethersphere/bee-js@6.9.1` | HIGH | range ≤9.0.3 | Upgrade fdp-storage to a release using bee-js@>9.0.3 |
| `axios@0.x` (inside bee-js) | HIGH | prototype pollution | Same: fdp-storage/bee-js upgrade |
| `@metamask/sdk@0.5.6` | MODERATE | uuid chain, no fix available | SDK major upgrade |
