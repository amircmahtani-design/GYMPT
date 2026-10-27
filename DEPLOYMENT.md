# Trial handoff

## Ready before connecting hosting

Run `node --test` and `node build.mjs`. The `dist/` directory is the complete static app. There is no dependency installation, server backend, build service or secret to configure. Publish the contents of `dist/` at the root of a distinct HTTPS origin after hosting is approved. Do not deploy the project directory wholesale: it may contain private local backups or test data.

No hosting site has been created, and no costs or access settings have been changed. The app does not connect to any existing personal-training application.

## On the chosen hosting provider

- Use `node build.mjs` as the build command and `dist` as the publish directory, or upload the prepared static archive.
- Serve `.mjs` files as JavaScript, `.webmanifest` as `application/manifest+json`, and `.png` as `image/png`.
- Use a separate origin for GymPT. Browser workout storage is scoped to origin; switching from localhost to production does not migrate records automatically.
- Test Today, Plan, Train, Progress and Equipment after the live URL is available. Verify the icons and Add to Home Screen on an actual iPhone/iPad.
- For moving local trial records, export and import intentionally. Never place exports in the deployed directory or public repository.

## Still requires real-world confirmation

Exact weights/increments, multi-gym stations, usable TRX anchoring and current exercise restrictions. The available defaults are generic demo choices. Choosing a goal does not constitute a personalised or medically assessed programme. No secure backend or cross-device sync is configured.

The static bundle can be deployed without further implementation. Actual hosting connection and physical-device testing are deliberately left for the authorised destination/device.
