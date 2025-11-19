# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/a33cb7bb-2fe8-4b2c-9737-70c7a2a272c0

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/a33cb7bb-2fe8-4b2c-9737-70c7a2a272c0) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Backend & environment setup

This repo now ships with an Express/Nodemailer/MongoDB backend that stores internship, mock-interview, and feedback submissions while emailing both the applicant and `info.vrisetechnogroup@gmail.com`.

1. Duplicate `env.example` to `.env` and replace the placeholders with your real secrets.  
   ```
   MONGODB_URI=mongodb+srv://vrisetechno...
   EMAIL_USER=vrisetechnogroup@gmail.com
   EMAIL_PASSWORD=wick vdjg ujid domg
   EMAIL_FROM=vrisetechnogroup@gmail.com
   NOTIFY_EMAIL=info.vrisetechnogroup@gmail.com
   CLIENT_ORIGIN=http://localhost:5173
   PORT=4000
   ```
2. Install dependencies (already done after cloning):
   ```sh
   npm install
   ```
3. Run the backend:
   ```sh
   npm run server
   ```
4. In another terminal, run the Vite dev server (as before):
   ```sh
   npm run dev
   ```
5. If you deploy the backend separately, expose the API URL via `VITE_API_BASE_URL` so the React app can talk to it.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a33cb7bb-2fe8-4b2c-9737-70c7a2a272c0) and click on Share -> Publish. Make sure your backend is running and accessible at the URL defined in `VITE_API_BASE_URL`.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
