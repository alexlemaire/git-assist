#!/bin/bash

INFO="$(cat .info)"

if [ $INFO != "root" ]
then
  FOLDER="$(basename "$(pwd)")"
  cd ../
  echo "Removing easy-use scripts directory..."
  rm -r $FOLDER
  sed -i '' "/# Ignore folder for easy-use scripts from git-assist package/d" .gitignore
  sed -i '' "/$FOLDER\//d" .gitignore
  echo "Done! You can now close this window."
else
  echo "Cannot delete easy-use scripts from original folder!"
fi
