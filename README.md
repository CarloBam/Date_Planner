# Cape Date

Step-by-step instructions to build the Cape Town Date Planner.

---

## Step 1: Install Antigravity

Download and install from: https://antigravity.google/download
Sign in with your personal Gmail account (free tier is sufficient).

---

## Step 2: Create Your Project Folder

Create a folder on your computer, for example:
```
Documents/
  cape-date/
```

Open Antigravity → File → Open Folder → select your `cape-date` folder.

---

## Step 3: Add the Project Files

Copy both files into your `cape-date` folder:
- `instructions.md`
- `rules.md`

These files tell the agent exactly what to build and how to behave.

---

## Step 4: Set Up Supabase (Free)

1. Go to https://supabase.com and create a free account
2. Create a new project (pick a region close to South Africa — choose Frankfurt)
3. Once created, go to Project Settings → API
4. Copy your **Project URL** and **anon public key**
5. Create a file called `.env` in your project folder:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

---

## Step 5: Launch the Agent

In Antigravity, open the **Agent Manager** view (the second tab).

Paste this as your first prompt:

```
I want to build a full-stack web application called Cape Date.

Please read instructions.md and rules.md in this folder first.

Then confirm you have understood the full spec by listing:
1. The tech stack you will use
2. The 6 main screens you will build
3. The first 3 build steps you will take

Wait for my approval before starting to build.
```

Review the agent's plan, then type:
```
Approved. Please begin building from step 1.
```

---

## Step 6: Iterating

As the agent builds, it will ask questions and show you screenshots.

Useful follow-up prompts to keep in mind:

- If something looks wrong visually:
  `"The [component] doesn't match the dark navy design. Fix the colours to use #040d1c background and #00c9ff as the primary accent."`

- If drag and drop isn't working:
  `"The drag and drop on the planner screen is not working. Debug it and show me a browser recording of it working."`

- If you want to adjust costs:
  `"Update the cost for Table Mountain Cable Car to R420 per person."`

- To add something not in the spec:
  `"Add a 'Random Date' button on the explore page that picks 3 surprise activities within budget."`

---

## Step 7: Deploy

Once the agent confirms the app is working locally:

**Frontend (Vercel — free):**
1. Push code to GitHub (the agent can do this — prompt: `"Push all code to a new GitHub repo called cape-date"`)
2. Go to https://vercel.com → Import your GitHub repo
3. Add your `.env` variables in Vercel's Environment Variables settings
4. Deploy

**That's it. Your Cape Date app will be live.**

---

## Estimated Build Time

With Antigravity's agent doing the coding: approximately 15–30 minutes of prompting.
The agent handles all the code — you review and approve.

---

## Support

If the agent hits a rate limit (out of quota), wait 1 hour and continue.
Save your prompt history so you can resume where you left off.
