# Verification

## Passed

- Node built-in test suite: 11/11 passing (weekly balance, stable anchors, deliberate variation, exclusions, swaps, progression, unlogged sets, timer recovery/pause/completion, import rejection and round-trip, visual mappings, PNG dimensions).
- JavaScript syntax checks.
- Local server returns HTTP 200.
- Desktop dashboard inspected in browser. Rendering bug found and fixed.
- 390 x 844 mobile dashboard inspected. Horizontal overflow found, corrected with constrained grid/flex sizing, and visually rechecked.
- No external dependencies, analytics, fonts, or remote image requests.

## Verification limits

The initial browser interaction test reached a native demo confirmation and the browser control API timed out. Native confirmations were subsequently replaced by in-page accessible dialogs. New preview tabs render, but automated clicks did not change the UI while the original native dialog remained blocked. Therefore session completion, import/export file-picker flow, in-browser reload persistence are not claimed as end-to-end passed. The corresponding deterministic core logic is covered by tests. Real iOS home-screen installation and Safari background behavior remain untested.

## Manual acceptance path

1. Open a fresh browser session at the local preview. Check Today, Plan, Train, Progress, Equipment at desktop and 390px width.
2. Select a week, swap days, confirm anchors remain and adjacent strength-day warning appears.
3. Enter generic test loads, begin a demo session, edit actual reps/RIR, log a set; reload and resume.
4. Start rest, pause/resume, background the browser and return; verify elapsed time recovers.
5. Finish a partial session through the in-page confirmation. Confirm Progress shows only logged sets.
6. Export, import and confirm replacement. Reject malformed, unknown-version and negative-load files.
7. Exclude an exercise and disable equipment. Confirm the next plan removes them and flags missing movements.
8. Inspect iPhone/iPad Add to Home Screen icons on an approved HTTPS deployment.

No personal workout history was used for testing or committed.