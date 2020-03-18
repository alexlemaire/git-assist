# auto pulling for repositories

This is an improved version upon a personal bash script written for that purpose

**Issues of current version:**
- runtime is way too long when there are too many repo to pull from (even for SSD)
- notification and logging actions are too frequent which probably makes the whole script slower
- no configuration possible, makes it quite rigid and opinionated
- everything is synchronous, cannot do multiple git pull operations in parallel

**App draft:**
- installed via `npm i -g <package-name>`
- configurable via `<package-name> config`:
  - allows to select folders where your repositories are located. After initial run it should still allow you to add directories
  - provide 2 modes: startup mode (default, runs on session startup) & cron mode (run with given schedule, maybe useful for machines permanently on). Maybe provide a webhook mode?
  - configure which branches we want to pull from. By default all but can exclude some for given repo. This will have to run with something like `<package-name> config --repo <repo-name> --exclude <branch-to-exclude>`
  - maybe provide a regex option for pulling from repo which matches that regex (let's say if somebody wants to auto-pull only from ABCcompany/... but not mygit/...). Or simply allow a filter by user/organization
  - all config should end up in a JSON file that is read by the app. This allows also direct manual update/extension upon existing file so that user can add features himself, etc. Should maybe expose path to file via `<package-name> config --get`
  - allow for multiple type of logging (similar as what `nyc` does for test coverage) so that users may have an HTML report generated for them (f.e.)
- can do a manual run via `<package-name> run`
- logs useful info into appropriate folder for potential debugging
- should allow log purging via `<package-name> log purge` (f.e.)
- send relevant notifications via GUI to user
- works asynchronously so it doesn't prevent user from working. May be some issues if user tries to commit for a repo which didn't get updated yet though...
