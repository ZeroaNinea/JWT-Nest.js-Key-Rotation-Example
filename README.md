# JWT Nest.js Key Rotation Example (RS256)

This project demonstrates how to implement JWT authentication with **asymmetric key rotation** in a Nest.js application using `RS256`.

## 🔐 Why Key Rotation?

Key rotation improves security by:

- Reducing the risk window if a private key is compromised
- Allowing seamless replacement of signing keys
- Supporting verification of previously issued tokens

This implementation supports:

- Signing tokens with the latest private key
- Verifying tokens signed with previous keys
- Graceful rotation without invalidating active sessions

---

## 🏗 Architecture Overview

### 1. Key Storage

Keys are stored in: `dist/keys`

Each key pair contains of:

- `<kid>.public.pem`
- `<kid>.private.pem`

The `key-map.json` file tracks available keys:

```json
{
  "2026-02-23": "THE_KEY",
  "2026-02-24": "THE_OTHER_KEY"
}
```

### 2. Signing Flow

`keyStorageService.getCurrentPrivateKey()`:

- Loads `key-map.json`;
- Sorts all available `kid`s;
- Uses its private key to sign new tokens.

### 3. Verification Flow

`JwtStrategy`:

- Extracts the `kid` from the JWT header;
- Loads the corresponding public key;
- Verifies the token using `RS256`.

If the public key exists, the token is valid — even if it was signed with an older key.

This enables backward compatibility after rotation.

## 🔄 How Your Key Rotation Works

### 1. Rotation Trigger Logic

There is used a time-based rotation strategy:

```ts
const rotationPeriodMs = 24 * 60 * 60 * 1000; // 1 day.
```

So rotation is scheduled every 24 hours based on the last `kid` date.

The code extracts the latest `kid`:

```ts
const existingKids = Object.keys(keyMap).sort();
const latestKid = existingKids.at(-1);
```

Because the `kid` format is:

```ts
const newKid = now.toISOString().split('T')[0];
```

Example:

```plaintext
2026-02-23
2026-02-24
```

ISO date strings sort lexicographically in chronological order.

### 2. Rotation Decision

If a previous key exists:

```ts
const lastDate = new Date(latestKid);
const nextRotationDate = new Date(lastDate.getTime() + rotationPeriodMs);
shouldRotate = new Date() >= nextRotationDate;
```

So:

- If today >= last rotation + 1 day -> rotate.
- Else -> skip.

This prevents unnecessary key generation.
