# CipherScore �?Encrypted Peer Review MVP

CipherScore is an FHE-enabled peer review workflow that lets teammates exchange anonymous performance scores. Contributors encrypt their ratings locally, the smart contract aggregates everything on-chain, and only authorised parties can decrypt insights.

**Status**: Core contract implementation completed, frontend development in progress.

## Quick links

- Production dApp: [heart-lock.vercel.app](https://heart-lock.vercel.app/)
- Preview build: [heart-lock-git-master-waws-projects-2bccbfbd.vercel.app](https://heart-lock-git-master-waws-projects-2bccbfbd.vercel.app)
- Demo video (~6 MB): [private.mp4](./private.mp4)
- Core contract: [`contracts/EncryptedPeerReview.sol`](contracts/EncryptedPeerReview.sol)
- GitHub repository: [https://github.com/Hornby5415/heart-lock](https://github.com/Hornby5415/heart-lock)

## System overview

- **Client-side FHE encryption** �?scores are turned into `euint32` ciphertexts before they ever leave the browser.
- **On-chain aggregation** �?the contract keeps encrypted totals and averages, safely handling score resubmissions.
- **Self-service decryptions** �?reviewers decrypt their own submissions and the global average with explicit access grants.
- **Manager audit trail** �?authorised managers may still unlock the encrypted total via CLI tooling when required.
- **RainbowKit UX** �?Rainbow, WalletConnect, and MetaMask connectors are bundled with custom CipherScore branding inspired by `@zama-9`.

### Architecture at a glance

```
web1/
├── contracts/EncryptedPeerReview.sol      # Core FHE smart contract
├── deploy/deploy.ts                       # Hardhat deploy script
├── tasks/EncryptedPeerReview.ts           # CLI utilities for encryption/decryption flows
├── test/                                  # Unit + Sepolia integration specs
├── frontend/                              # Next.js app (RainbowKit + wagmi)
└── deployments/                           # Generated deployment manifests (via hardhat-deploy)
```

### Deployment snapshot

| Network | Address | Notes |
| --- | --- | --- |
| Sepolia (`11155111`) | `0xB67a588e550673b1EfF8bCc0ed14c9A15F305c77` | Production preview used by the Vercel build |
| Hardhat (`31337`) | `0x5FbDB2315678afecb367f032d93F642f64180aa3` | Auto-generated when running the local node |

Refer to `frontend/abi/EncryptedPeerReviewAddresses.ts` for regenerated artefacts after each deploy.

## Encryption and decryption flow

### Core encryption workflow

1. **Client-side encryption** �?users enter a score (0�?00) in the frontend. The FHEVM SDK encrypts this value into an `euint32` ciphertext before transmission.
2. **Submit to contract** �?the encrypted score handle and proof are sent to `submitScore()`. The contract:
   - Converts the external handle to an internal `euint32` via `FHE.fromExternal()`
   - Subtracts the previous score (if updating) from `_encryptedTotal`
   - Adds the new score to `_encryptedTotal`
   - Recomputes `_encryptedAverage = _encryptedTotal / _participantCount`
   - Issues decryption permissions via `FHE.allow()` to the submitter and manager
3. **Personal audit** �?reviewers call `requestMyScoreAccess()` + `getMyScore()` and decrypt the ciphertext in-browser via the FHEVM SDK.
4. **Team insight** �?participants (or the manager) call `requestAverageAccess()` + `getEncryptedAverage()`, then decrypt the encrypted average client-side.
5. **Manager oversight** �?if required, the designated manager can call `requestTotalAccess()` and decrypt `_encryptedTotal` from the CLI without exposing it in the UI.

### Key encryption logic in the contract

The contract maintains three encrypted state variables:

- `euint32 _encryptedTotal` �?running sum of all submitted scores
- `euint32 _encryptedAverage` �?computed as `_encryptedTotal / _participantCount`
- `mapping(address => euint32) _scores` �?individual encrypted scores per participant

```52:83:contracts/EncryptedPeerReview.sol
function submitScore(externalEuint32 scoreHandle, bytes calldata scoreProof) external {
    euint32 score = FHE.fromExternal(scoreHandle, scoreProof);

    bool wasUpdate = _hasSubmitted[msg.sender];

    if (wasUpdate) {
        euint32 previousScore = _scores[msg.sender];
        _encryptedTotal = FHE.sub(_encryptedTotal, previousScore);
    } else {
        _hasSubmitted[msg.sender] = true;
        _participantCount += 1;
    }

    _scores[msg.sender] = score;
    _encryptedTotal = FHE.add(_encryptedTotal, score);

    if (_participantCount > 0) {
        _encryptedAverage = FHE.div(_encryptedTotal, _participantCount);
    }

    FHE.allowThis(_scores[msg.sender]);
    FHE.allow(_scores[msg.sender], msg.sender);

    FHE.allowThis(_encryptedTotal);
    FHE.allowThis(_encryptedAverage);

    FHE.allow(_encryptedTotal, manager);
    FHE.allow(_encryptedAverage, manager);
    FHE.allow(_encryptedAverage, msg.sender);

    emit ScoreSubmitted(msg.sender, wasUpdate);
}
```

### Decryption access control

Access to encrypted data is managed via `FHE.allow()`:

```101:113:contracts/EncryptedPeerReview.sol
function requestAverageAccess() external {
    require(_participantCount > 0, "PeerReview: no scores");
    require(msg.sender == manager || _hasSubmitted[msg.sender], "PeerReview: unauthorized");

    FHE.allow(_encryptedAverage, msg.sender);
}

function requestTotalAccess() external {
    require(msg.sender == manager, "PeerReview: only manager");

    FHE.allow(_encryptedTotal, msg.sender);
}
```

Only addresses with explicit `FHE.allow()` grants can decrypt the corresponding ciphertext using the FHEVM gateway.

## Complete contract source

The full contract source is available at [`contracts/EncryptedPeerReview.sol`](contracts/EncryptedPeerReview.sol). Key features include:

- **Encrypted state variables**: `_encryptedTotal`, `_encryptedAverage`, and per-participant `_scores`
- **FHE operations**: `FHE.add()`, `FHE.sub()`, `FHE.div()` for homomorphic arithmetic
- **Access control**: `FHE.allow()` grants decryption rights to specific addresses
- **Score updates**: participants can resubmit scores; the contract automatically adjusts totals and averages
- **Manager privileges**: only the manager can access the encrypted total via `getEncryptedTotal()`

```1:145:contracts/EncryptedPeerReview.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {FHE, euint32, externalEuint32} from "@fhevm/solidity/lib/FHE.sol";
import {SepoliaConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

/// @title Encrypted peer review contract for anonymous performance evaluations
/// @author web1
/// @notice Handles encrypted score submissions, keeps an encrypted running total,
/// and exposes encrypted aggregates for authorized decryptors.
contract EncryptedPeerReview is SepoliaConfig {
    /// @notice Address with permission to retrieve the encrypted total score.
    address public immutable manager;

    /// @dev Encrypted running total of all submitted scores.
    euint32 private _encryptedTotal;

    /// @dev Encrypted average score, recomputed at every submission.
    euint32 private _encryptedAverage;

    /// @dev Number of unique participants that submitted a score.
    uint32 private _participantCount;

    /// @dev Tracks the encrypted score submitted by each participant.
    mapping(address => euint32) private _scores;

    /// @dev Marks whether a participant has already submitted a score.
    mapping(address => bool) private _hasSubmitted;

    /// @notice Emitted whenever a participant submits or updates their score.
    /// @param reviewer Address of the participant submitting the score.
    /// @param updated Indicates whether the submission overwrote a previous score.
    event ScoreSubmitted(address indexed reviewer, bool updated);

    /// @notice Sets the contract deployer as the manager and initialises totals.
    constructor() {
        manager = msg.sender;

        _encryptedTotal = FHE.asEuint32(0);
        _encryptedAverage = FHE.asEuint32(0);

        FHE.allowThis(_encryptedTotal);
        FHE.allowThis(_encryptedAverage);

        FHE.allow(_encryptedTotal, manager);
        FHE.allow(_encryptedAverage, manager);
    }

    /// @notice Submit or update an encrypted performance score.
    /// @param scoreHandle Handle pointing to the encrypted score.
    /// @param scoreProof Proof validating the encrypted score handle.
    function submitScore(externalEuint32 scoreHandle, bytes calldata scoreProof) external {
        euint32 score = FHE.fromExternal(scoreHandle, scoreProof);

        bool wasUpdate = _hasSubmitted[msg.sender];

        if (wasUpdate) {
            euint32 previousScore = _scores[msg.sender];
            _encryptedTotal = FHE.sub(_encryptedTotal, previousScore);
        } else {
            _hasSubmitted[msg.sender] = true;
            _participantCount += 1;
        }

        _scores[msg.sender] = score;
        _encryptedTotal = FHE.add(_encryptedTotal, score);

        if (_participantCount > 0) {
            _encryptedAverage = FHE.div(_encryptedTotal, _participantCount);
        }

        FHE.allowThis(_scores[msg.sender]);
        FHE.allow(_scores[msg.sender], msg.sender);

        FHE.allowThis(_encryptedTotal);
        FHE.allowThis(_encryptedAverage);

        FHE.allow(_encryptedTotal, manager);
        FHE.allow(_encryptedAverage, manager);
        FHE.allow(_encryptedAverage, msg.sender);

        emit ScoreSubmitted(msg.sender, wasUpdate);
    }

    /// @notice Reissues decryption rights for the caller's encrypted score.
    function requestMyScoreAccess() external {
        require(_hasSubmitted[msg.sender], "PeerReview: score not submitted");

        FHE.allow(_scores[msg.sender], msg.sender);
    }

    /// @notice Returns the caller's encrypted score.
    /// @return encryptedScore The encrypted score linked to the caller.
    function getMyScore() external view returns (euint32 encryptedScore) {
        require(_hasSubmitted[msg.sender], "PeerReview: score not submitted");

        return _scores[msg.sender];
    }

    /// @notice Ensures the caller can decrypt the encrypted average.
    function requestAverageAccess() external {
        require(_participantCount > 0, "PeerReview: no scores");
        require(msg.sender == manager || _hasSubmitted[msg.sender], "PeerReview: unauthorized");

        FHE.allow(_encryptedAverage, msg.sender);
    }

    /// @notice Ensures the manager can decrypt the encrypted total.
    function requestTotalAccess() external {
        require(msg.sender == manager, "PeerReview: only manager");

        FHE.allow(_encryptedTotal, msg.sender);
    }

    /// @notice Returns the encrypted total score. Only manager may read it.
    /// @return total The encrypted aggregate of all submitted scores.
    /// @return count The number of unique score submitters.
    function getEncryptedTotal() external view returns (euint32 total, uint32 count) {
        require(msg.sender == manager, "PeerReview: only manager");
        return (_encryptedTotal, _participantCount);
    }

    /// @notice Returns the encrypted average score calculated on-chain.
    /// @return average The encrypted average of all scores.
    /// @return count The number of unique score submitters.
    function getEncryptedAverage() external view returns (euint32 average, uint32 count) {
        require(_participantCount > 0, "PeerReview: no scores");
        require(msg.sender == manager || _hasSubmitted[msg.sender], "PeerReview: unauthorized");

        return (_encryptedAverage, _participantCount);
    }

    /// @notice Indicates whether an address has already submitted a score.
    /// @param reviewer The address to check.
    /// @return True if the reviewer has an active submission.
    function hasSubmitted(address reviewer) external view returns (bool) {
        return _hasSubmitted[reviewer];
    }

    /// @notice Returns the count of participants who have submitted scores.
    /// @return The number of unique reviewers.
    function participantCount() external view returns (uint32) {
        return _participantCount;
    }
}
```

## Prerequisites

- Node.js **20.x** or newer (tested on v22.x)
- npm **10.x**
- For Sepolia usage: mnemonic or private key, an RPC URL (Infura/Alchemy/etc.), and a WalletConnect Project ID

## 1. Install dependencies

From the Hardhat root:

```bash
cd web1
npm install
```

Then install frontend dependencies:

```bash
cd frontend
npm install
```

## 2. Local development flow

1. **Start the FHE-ready Hardhat node**
   ```bash
   cd web1
   npx hardhat node
   ```

2. **Deploy the contract to localhost (31337)**
   ```bash
   npx hardhat deploy --network localhost
   ```

3. **Generate frontend ABI + addresses**
   ```bash
   cd frontend
   npm run genabi
   ```

4. **Launch the dashboard in mock mode (auto checks the Hardhat node)**
   ```bash
   npm run dev:mock
   ```

5. **Connect with Rainbow**
   - The Connect Button sits top-right.
   - RainbowKit works with Hardhat accounts out of the box; ensure your browser wallet is pointed at `127.0.0.1:8545`.

## 3. Sepolia deployment

1. Configure secrets once:
   ```bash
   npx hardhat vars set MNEMONIC             # or use PRIVATE_KEY
   npx hardhat vars set INFURA_API_KEY       # or another RPC provider key
   npx hardhat vars set ETHERSCAN_API_KEY    # optional, for verification
   ```

2. Deploy and collect the address:
   ```bash
   npx hardhat deploy --network sepolia
   ```

3. Update the frontend ABI registry:
   ```bash
   cd frontend
   npm run genabi
   ```

4. Provide RainbowKit with credentials (create `.env.local` in `frontend/`):
   ```env
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_id
   NEXT_PUBLIC_SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/<api-key>
   ```

5. Start the UI with `npm run dev` and connect via Rainbow.

## 4. Hardhat scripts & tasks

- `npx hardhat test` �?executes the mock-unit test suite.
- `npx hardhat test --network sepolia` �?runs the integration spec (requires live deployment).
- `npx hardhat --network localhost peer:submit --value 72` �?CLI score submission.
- `npx hardhat --network localhost peer:average` �?decrypt the team average.
- `npx hardhat --network localhost peer:total` �?manager-only aggregate total (not exposed in the UI).

## 5. Frontend usage cheatsheet

| Section | Action |
| --- | --- |
| Submit score | pick 0�?00, click **Submit encrypted score** |
| My submission | **Decrypt my score** re-requests access + decrypts locally |
| Team average | available to participants & manager; button handles permission + decryption |

Status and FHE runtime diagnostics surface at the bottom of the dashboard.

## 6. Running tests

```bash
cd web1
npx hardhat test
```

Front-end unit tests are untouched from the template; run `npm run test` in `frontend/` if needed.

## 7. Linting

```bash
cd web1/frontend
npm run lint
```

## Additional references

- [Zama FHEVM Documentation](https://docs.zama.ai/protocol)
- [RainbowKit Docs](https://www.rainbowkit.com/docs/introduction)
- [wagmi Docs](https://wagmi.sh)

---

CipherScore demonstrates an end-to-end encrypted performance review loop �?submissions, reviews, and decryption permissions now live entirely on-chain while keeping sensitive metrics private.

