## 🔁 Reusable Workflow (Using `master` as Default Branch)

### Phase 1: Prepare the main repo and start a feature branch

```bash
cd ~/projects/traccar

# Ensure local master is up‑to‑date with upstream
git checkout master
git pull upstream master
git push origin master               # sync your fork (optional)

# Create a feature branch for the main repo (backend, config, etc.)
git checkout -b feature/your-backend-change
```

### Phase 2: Work on the frontend (submodule) – separate branch & merge

```bash
cd traccar-web

# Start a feature branch for the frontend
git checkout -b feature/your-frontend-change

# Make your frontend changes (edit JSX, CSS, etc.)
git add .
git commit -m "feat: describe frontend change"

# Push the frontend feature branch to your fork
git push origin feature/your-frontend-change
```

Now, **merge that frontend feature branch into the submodule’s own `master`** (because you want the stable reference later):

```bash
git checkout master
git pull origin master               # ensure master is up‑to‑date (from your fork)
git merge feature/your-frontend-change
git push origin master

# (Optional) Delete the frontend feature branch
git branch -d feature/your-frontend-change
git push origin --delete feature/your-frontend-change
```

> **Why merge into the submodule’s `master` first?**  
> Because the main repo will later point to a specific commit in the submodule’s **master branch**. This keeps your main repo always referencing a stable, merged frontend version.

### Phase 3: Update the main repo’s submodule reference

Go back to the main repo. The submodule directory now contains the merged frontend code (because you switched to `master` in the submodule and pulled the merged changes).

```bash
cd ~/projects/traccar

# Stage the new submodule commit hash (now pointing to your submodule’s master)
git add traccar-web
git commit -m "feat: update traccar-web submodule to latest master (includes frontend feature X)"
```

### Phase 4: Work on the backend (if needed) and finish the main repo feature branch

```bash
# Make any backend changes (Java, debug.xml, etc.)
git add .
git commit -m "feat: describe backend change"
```

Now **merge the main repo feature branch into its own `master`**:

```bash
git checkout master
git pull upstream master            # bring in latest upstream changes (if any)
git merge feature/your-backend-change
git push origin master

# Delete the feature branch (optional)
git branch -d feature/your-backend-change
git push origin --delete feature/your-backend-change
```

---

## 📋 Summary of the Order (Using `master`)

| Step | Repository | Action |
|------|------------|--------|
| 1 | `traccar-web` | Create feature branch, commit, push, merge into its `master` |
| 2 | `traccar-web` | Delete feature branch (optional) |
| 3 | `traccar` (main) | Stage the submodule change (`git add traccar-web`) |
| 4 | `traccar` | Commit the submodule update (separate commit) |
| 5 | `traccar` | Make backend changes on the same feature branch, commit |
| 6 | `traccar` | Merge feature branch into its `master`, push |

> **Why this order?**  
> - The main repo’s `feature/your-backend-change` branch must include the **updated submodule reference** (pointing to the frontend’s `master`).  
> - That way, when you later merge the backend feature branch into `master`, the `master` branch of the main repo will immediately have the correct frontend version.

---

## 🧪 Example for Your Current Customisations (using `master`)

### Frontend side (traccar-web)
```bash
cd traccar-web
git checkout -b feature/ui-title-button
git add .
git commit -m "feat: custom login button and browser tab title"
git push origin feature/ui-title-button
git checkout master
git pull origin master
git merge feature/ui-title-button
git push origin master
git branch -d feature/ui-title-button
```

### Main repo side
```bash
cd ..
git checkout -b feature/ui-and-title
git add traccar-web                     # submodule reference update
git commit -m "feat: update submodule to include UI changes"
# Now add backend change (debug.xml)
git add debug.xml
git commit -m "feat: set web.title in debug.xml"
git push origin feature/ui-and-title
git checkout master
git pull upstream master
git merge feature/ui-and-title
git push origin master
```

---

## ✅ Benefits of This Workflow

- **Clean history** – each repo’s `master` always contains fully merged features.
- **No broken references** – the main repo never points to an unstable frontend branch.
- **Easy rollback** – you can revert the main repo’s submodule pointer to a previous commit.
- **Ready for upstream contributions** – you can open PRs from your feature branches to the original repositories.

Would you like me to help you apply this workflow to your current custom changes now?