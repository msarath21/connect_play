# Tic-Tac-Toe Email Notification Feature

This feature sends email notifications to the user after completing a Tic-Tac-Toe game. The email includes information about:
- Game result (win/loss/draw)
- Opponent's name
- Overall game statistics

## Setup Instructions

### 1. Server Configuration

1. Make sure you have installed the `nodemailer` package:
   ```bash
   npm install --save nodemailer
   ```

2. Open `LocalServerSetup.js` and update the email configuration:
   ```javascript
   const transporter = nodemailer.createTransport({
     service: 'gmail', // e.g., 'gmail', 'outlook', etc.
     auth: {
       user: 'your-email@gmail.com', // replace with your email
       pass: 'your-app-password' // replace with your app password
     }
   });
   
   // Also update the "from" field in the mailOptions
   const mailOptions = {
     from: '"TicTacToe Game" <your-email@gmail.com>', // same email as above
     // other options...
   };
   ```

   **Important Notes for Gmail Users:**
   - You'll need to use an "App Password" rather than your regular Gmail password
   - To create an App Password:
     1. Enable 2-Step Verification on your Google Account
     2. Go to [Google Account Security](https://myaccount.google.com/security)
     3. Under "Signing in to Google," select "App passwords"
     4. Generate a new app password for "Mail" and "Other (Custom name)"
     5. Use this password in the server configuration

### 2. User Email Configuration

For the email notification feature to work, ensure that:
1. Users have a valid email address in their Firebase Authentication account
2. The app has the necessary permissions to send emails via the server

### 3. Starting the Server

Always make sure the local server is running before expecting email notifications to work:

```bash
node LocalServerSetup.js
```

The server will display its local IP address when started. Make note of this address as you may need it for troubleshooting.

## How It Works

1. When a Tic-Tac-Toe game completes, the `saveGameResult` function is called
2. This function:
   - Saves the game result to Firebase
   - Updates user statistics
   - Sends an email notification via the local server

3. The email includes:
   - Game result (win/loss/draw)
   - Opponent's name
   - Overall game statistics (games played, wins, win rate)

## Troubleshooting

### Server Connection Issues

If you see "Network request failed" errors:

1. **Verify Server is Running**
   - Make sure `node LocalServerSetup.js` is running
   - Check that there are no errors in the server console

2. **Check Server URL Configuration**
   - Open the drawer menu and configure the server URL
   - Use the correct IP address shown when starting the server
   - Make sure to include the port: `http://YOUR_IP:3000`

3. **Test Server Connectivity**
   - Open a browser on your device and try accessing `http://YOUR_IP:3000/test`
   - You should see a JSON response if the server is reachable

4. **Network Connectivity**
   - Ensure your device and server are on the same network
   - Check firewall settings that might block the connection
   - Try disabling any VPN services temporarily

5. **Debug Mode**
   - Check the app logs for detailed connection attempts
   - The app will automatically try several common IP addresses to find the server

### Email Sending Issues

If the server is connected but emails aren't sending:

1. Check server logs for errors
2. Verify email configuration in `LocalServerSetup.js`
3. Ensure the user has a valid email address in Firebase Authentication
4. Check if your email provider is blocking automated emails
5. If using Gmail, verify your App Password is correct

## Customization

You can customize the email template in the `LocalServerSetup.js` file:
- Change the HTML template to modify the appearance
- Update the content to include additional information
- Modify the subject line format 