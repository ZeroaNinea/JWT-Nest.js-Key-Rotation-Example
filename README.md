# JWT Nest.js Key Rotation Example (RS256)

This project demonstrates how to implement JWT authentication with **asymmetric key rotation** in a Nest.js application using the `RS256` algorithm.

It supports:

- Signing tokens with the latest private key;
- Verifying tokens signed with previous keys;
- Automatic time-based key rotation;
- Controlled key retention.

## 🔐 Why Key Rotation?

Key rotation improves security by:

- Reducing the impact window if a private key is compromised;
- Allowing seamless replacement of signing keys;
- Limiting long-term token validity at the cryptographic level;
- Enforcing controlled key lifecycle management.

## 🏗 Architecture Overview

### 1. Key Storage

Keys are stored in:

```plaintext
dist/keys
```

Each key pair consists of:

- `<kid>.private.pem`
- `<kid>.public.pem`

The `key-map.json` file tracks active key IDs:

```json
{
  "2026-02-23": "PUBLIC_KEY_CONTENT",
  "2026-02-24": "PUBLIC_KEY_CONTENT"
}
```

The `kid` (Key ID) is derived from the current date in ISO format:

```ts
const newKid = now.toISOString().split('T')[0];
```

Example:

```plaintext
2026-02-23
2026-02-24
```

Because ISO date strings sort lexicographically, the newest key can always be determined by sorting.

## ✍️ Signing Flow

`KeyStoreService.getCurrentPrivateKey()`:

1. Loads `key-map.json`;
2. Sorts available `kid`s;
3. Selects the latest one;
4. Loads its corresponding private key;
5. Uses it to sign new tokens.

All newly issued tokens are signed with the most recent private key.

## 🔎 Verification Flow

`JwtStrategy`:

1. Extracts the `kid` from the JWT header;
2. Loads the corresponding public key file;
3. Verifies the token using `RS256`.

If the public key exists, the token is considered valid — even if it was signed with an older key.

This provides backward compatibility during rotation.

## 🔄 Key Rotation Mechanism

### 1. Time-Based Rotation

Rotation is triggered once per day:

```ts
const rotationPeriodMs = 24 * 60 * 60 * 1000; // 1 day
```

The system:

- Reads the latest existing `kid`;
- Computes the next rotation date;
- Rotates only if 24 hours have passed.

This prevents unnecessary key generation.

### 2. Key Generation

When rotation is required, the system generates a new RSA key pair:

```ts
crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});
```

The generated keys:

- Use 2048-bit RSA;
- Public key: `spki` format;
- Private key: `pkcs8` format;
- Stored as PEM files.

### 3. Key Retention Policy

Only the three newest keys are retained:

```ts
while (sorted.length > 3) {
```

Older keys are:

- Removed from `key-map.json`;
- Deleted from the filesystem.

## ⏳ Token Validity Window

Because rotation occurs daily and only 3 keys are retained:

- Tokens signed today -> ✅ valid;
- Tokens signed yesterday -> ✅ valid;
- Tokens signed 2 days ago -> ✅ valid;
- Tokens older than ~3 days -> ❌ invalid.

Even if the JWT `exp` claim has not expired, the token becomes invalid once its public key is deleted.

This provides an additional cryptographic expiration layer beyond JWT claims.

## 🛡 Security Characteristics

- Uses asymmetric cryptography (`RS256`);
- Private keys are never exposed during verification;
- Supports multi-key verification;
- Enforces automatic key lifecycle cleanup;
- Limits long-term token validity.

## ⚠️ Production Considerations

For real production environments:

- Store keys outside the `dist` directory;
- Use persistent storage or a centralized key management service (e.g., AWS KMS);
- Ensure rotation is coordinated across multiple instances;
- Consider caching public keys in memory for performance.

## 🚀 Summary

This implementation demonstrates:

✅ Secure RS256 authentication
✅ Automatic daily key rotation
✅ Backward-compatible token verification
✅ Controlled 3-day cryptographic validity window
✅ Clean and deterministic key management

It provides a practical example of implementing secure, production-oriented JWT key rotation in Nest.js.
