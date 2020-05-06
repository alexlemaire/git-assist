# Easy-use

Those scripts are mainly intended for non-developer users. It eases the process of running a basic configuration for your machine and allows you to quickly work with GitHub.

## How to get those scripts

Two solutions:
1. You can clone `git-assist` [repository](https://github.com/alexlemaire/git-assist) on your machine ([how?](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository)) to access those scripts directly
2. You will also find the latest version to download [here](https://cdn.klimapartner.net/alexis/@git-assist/easy-use.zip) as a _ZIP_ archive.

**Note:** to get OS specific scripts instead of the entire collection, head here:
- [Linux](https://cdn.klimapartner.net/alexis/@git-assist/easy-use_Linux.zip)
- [Mac](https://cdn.klimapartner.net/alexis/@git-assist/easy-use_Mac.zip)

:warning: **Warning:** for operating systems other than _Linux_, you may need to specify the default application for opening `.sh` files. :warning:

<img src="https://simpleicons.org/icons/apple.svg" width="16" height="16" alt="Apple logo"> **_Mac users_:**
1. Right-click on a file that uses the file type you'd like to change the default for (`.sh` in our case, you can use the files you've just downloaded)
2. Click on `Get Info` in the pop-up
3. Click `Open With` if the section isn't already expanded
4. Click the dropdown and choose `Terminal`
5. Click `Change All...`
6. Click `Continue` when the Finder asks you if you're sure

## How to use those scripts?

Simply double click the script you want to use! :tada:

**Important:** all scripts interacting with _GitHub_ are running in the folder where you copy them **or** the one where you copied the directory containing them. This means you have two possibilities:
1. copy the script file as standalone where you want to use it
2. copy the whole folder containing those scripts in the destination where you wanna use them. Using `copy-scripts.sh` or `delete-scripts.sh` for this purpose is highly recommended!

## Scripts

|  Script |                                `full-setup.sh`                                |                                `install.sh`                                |                                                    `machine-config.sh`                                                    |                                                          `copy-scripts.sh`                                                          |                                          `delete-scripts.sh`                                         |                  `clone.sh`                  |                                              `update.sh`                                             |                        `push.sh`                        |                     `pull.sh`                    |       `auto-pull-config.sh`       |                                         `auto-pull.sh`                                        |                        `logs-print.sh`                       |                                      `logs-watch.sh`                                     |                       `logs-purge.sh`                      |                  `ssh.sh`/`gpg.sh`                  |              `ssh-generate.sh`/`gpg.generate.sh`              |            `ssh-list.sh`/`gpg-list.sh`            |                 `ssh-delete.sh`/`gpg-delete.sh`                 |
|:-------:|:-----------------------------------------------------------------------------:|:--------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------:|:--------------------------------------------:|:----------------------------------------------------------------------------------------------------:|:-------------------------------------------------------:|:------------------------------------------------:|:---------------------------------:|:---------------------------------------------------------------------------------------------:|:------------------------------------------------------------:|:----------------------------------------------------------------------------------------:|:----------------------------------------------------------:|:---------------------------------------------------:|:-------------------------------------------------------------:|:-------------------------------------------------:|:---------------------------------------------------------------:|
| Purpose | configure your machine to work with `git-assist` (and its `easy-use` scripts) | installs both the latest Node LTS version and `git-assist` on your machine | configures your machine to work with GitHub. Generates a GPG key, an SSH key and setup your user configuration for GitHub | copies the folder containing `easy-use` scripts (prompt user for destination). It also add this folder to `.gitignore` if it exists | remove the containing folder for `easy-use` scripts and erase the entry in `.gitignore` if it exists | allows you to clone a repository from GitHub | updates the installed version of `git-assist`. Will scan for global packages but also local packages | stages, commits and pushes changes made in a repository | pulls from remote repository via interactive CLI | configures your auto-pull utility | automatically pulls from repositories according to settings created via `auto-pull-config.sh` | opens an interactive console to select a log file to display | opens an interactive console to select a log file to watch (see real time updates to it) | opens an interactive console to select a log file to purge | opens an interactive mode to work with SSH/GPG keys | generates an SSH/GPG key for `git-assist` to work with GitHub | lists all SSH/GPG keys generated via `git-assist` | deletes one or multiple SSH/GPG keys generated via `git-assist` |

## Initial machine setup

You can follow those instructions in case you are using a machine for the first time and you would like to make it work with `git-assist`

**Manual setup:**
1. Get the scripts by following the instructions [here](#how-to-get-those-scripts)
2. Run `install.sh`
3. Run `machine-config.sh`

**Automated setup:**
1. See step 1 above
2. Run `full-setup.sh`
