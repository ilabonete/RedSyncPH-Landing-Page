# RedSync PH APK Download Setup

## Instructions for APK File Placement

To enable automatic APK downloads on your landing page:

1. **Place your APK file in this folder** (`/assets/`) with the name `RedSync-PH.apk`
2. **Alternative naming options:**
   - `redsync-ph.apk`
   - `RedSync.apk`
   - Or update the filename in `script.js` line 54

## Current Behavior

- **If APK file is present**: Direct download will start when users click "Download APK"
- **If APK file is missing**: A contact modal will appear with instructions to request the APK

## To Update the APK File Path

Edit the `script.js` file and modify line 54:
```javascript
const apkUrl = './assets/YOUR-APK-FILENAME.apk';
```

## APK File Requirements

- **Format**: `.apk` file
- **Target**: Android devices (API level 23+)
- **Size**: Recommended under 50MB for better download experience
- **Signing**: Ensure the APK is properly signed

## Testing the Download

1. Place your APK file in this folder
2. Open the landing page in a browser
3. Click the "Download APK" button
4. Verify the download starts automatically

## Security Notes

- Only host verified and signed APK files
- Consider using a CDN for larger files
- Implement virus scanning for uploaded APKs
- Keep APK files updated with latest app versions

## Alternative Distribution Methods

If you prefer not to host the APK directly:
1. Use Google Drive, Dropbox, or similar cloud storage
2. Update the `apkUrl` variable to point to the external URL
3. Ensure the external URL allows direct downloads

## Contact Information

Update the contact information in the modal by modifying the `showDownloadInstructions()` function in `script.js`.
