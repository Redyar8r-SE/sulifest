# vendor/ — GSAP files

These two files are copied, unchanged, from the official `gsap` package on npm.
They were not taken from a CDN. `node_modules` is not committed.

| | |
|---|---|
| Package | `gsap` |
| Version | **3.15.1** (npm `latest` on 2026-11-26) |
| How we got it | `npm pack gsap@3.15.1`, then copied `package/dist/<file>` |
| npm tarball integrity | `sha512-63yjWRFWj3QRP1UOuD8kcidCcy3nxb1mMRpwHr/xJRvPfm9GtWOXFAYUiL0ro1fgPq2nY53LR+98pAgy9BumBg==` |
| Licence | GSAP Standard "no charge" licence: https://gsap.com/standard-license |

| File | Bytes | SHA-256 |
|---|---|---|
| `gsap.min.js` | 73 357 | `3d1bea374ab1b703cc5c4105358eec63c4465efdc573931dc116e34a0a190c1b` |
| `ScrollTrigger.min.js` | 44 683 | `b5bb360661f478f0ff6ffa11500d8ce5e2b6aaf6f7288237cdca3aac9548035a` |

Check the files:

```sh
sha256sum vendor/gsap.min.js vendor/ScrollTrigger.min.js
```

To update: run `npm pack gsap@<new version>` in a temporary folder, copy the two files
from `package/dist/`, and write the new version and hashes here.
