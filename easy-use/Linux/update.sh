#!/bin/bash

main() {
  printf "Updating git-assist, please wait...\n"

  GLOBAL_DEPS="$(npm ls -g --parseable --depth=0)"
  LOCAL_PROD_DEPS="$(npm ls --prod --parseable --depth=0)"
  LOCAL_DEV_DEPS="$(npm ls --dev --parseable --depth=0)"

  update_pkg() {
    if [[ $1 == *"node_modules/git-assist"* ]]
    then
      if [[ -n $(npm outdated $3 git-assist --parseable --depth=0) ]]
      then
        npm i $2 git-assist@latest
      else
        echo "git-assist is up to date"
      fi
    fi
  }

  update_pkg $GLOBAL_DEPS -g -g
  update_pkg $LOCAL_PROD_DEPS -S
  update_pkg $LOCAL_DEV_DEPS -D

  echo "Done!"
}

export -f main

x-terminal-emulator -e bash -c "main && read -p \"Press Return to exit\""
