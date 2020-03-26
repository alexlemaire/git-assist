#!/bin/bash

GLOBAL_DEPS="$(npm ls -g --parseable --depth=0)"
LOCAL_PROD_DEPS="$(npm ls --prod --parseable --depth=0)"
LOCAL_DEV_DEPS="$(npm ls --dev --parseable --depth=0)"

printf "Updating git-assist, please wait...\n"

update_pkg() {
  if [[ $1 == *"node_modules/git-assist"* ]]
  then
    if [[ $(npm outdated $3 git-assist --parseable --depth=0) ]]
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

printf "\nScript ran. You may now close this window if you're done working with it!"
