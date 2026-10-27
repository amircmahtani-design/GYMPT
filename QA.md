# Verification — expanded trial

## Passed

- Node built-in test suite: 22/22 passing. Includes all 32 equipment combinations, stable anchors across six weeks, at least 17 default block movements, unique 32-guide mappings, attachment opt-in, exclusion precedence, manual choices, duplicate-free circuits, interval round totals, correct work-set/rest prescriptions, progression, import validation icon dimensions, and refusal to invent load changes while increments are unconfirmed.
- JavaScript syntax checks.
- Local server returns HTTP 200.
- Desktop dashboard inspected in browser. Rendering bug found and fixed.
- 390 × 844 mobile dashboard inspected. Horizontal overflow found, corrected with constrained grid/flex sizing, and visually rechecked.
- No external dependencies, analytics, fonts, or remote image requests.
- Static build succeeds: 13 allowlisted application assets plus their hash manifest. No private records, exports or source test data are included in the deployment bundle.

## Browser end-to-end checks passed

- Start generic demo workout through accessible in-page confirmation.
- Edit and log three squat sets at synthetic 10kg × 12 with 2 RIR.
- Pause rest timer, reload, resume, and verify saved reps and paused state.
- Complete all 13 work sets in Full body A. Progress shows 1 session, 13 sets and synthetic 792kg external volume. The synthetic progression case was rerun with an explicitly configured and confirmed 2kg increment: squat becomes 12kg × 8. Without confirmation it stays at 10kg × 12 with an explanation. The demo increment was reset to unconfirmed after testing.
- Export backup to JSON, select that exact file through the supported picker, validate preview, confirm import, and verify the same journal, counts, volume and targets.
- Change training week; verify anchors remain and accessories change. Swap Monday/Tuesday; verify unchanged session content and adjacent-strength-day warning.
- Start an eight-round conditioning circuit, reload, return after time away; timer advances from preparation into the named movement and recovery phases. Logging a round does not reset the circuit timer.
- Complete a partial conditioning session through confirmation; only its one logged record adds to the journal (2 sessions, 14 logged records, unchanged external-load volume).
- At 390px width, navigate the app and inspect the weekly plan and stacked set controls without horizontal table scrolling.
- Exclude goblet squat; verify TRX assisted squat becomes the eligible anchor. Enable multi-gym plus only lat-pulldown; search the available library and see its matching guide.
- Manually choose calf raises for a leg accessory slot; change week and verify the choice persists.
- Browser error log was empty at the final interaction checkpoint.

## Verification limits

The earlier native-dialog blockage is resolved in a fresh browser session; all confirmations now use in-page dialogs. The backup file-selection operation required an approval and took unusually long, then completed successfully; it was not retried. Malformed backup rejection is covered by deterministic tests, not a second browser file upload. Actual iPhone/iPad home-screen installation, physical-device Safari suspension behavior and a hosted HTTPS origin remain untested. No hosting was created.

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

