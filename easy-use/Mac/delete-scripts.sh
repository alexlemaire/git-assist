#!/bin/bash

INFO="$(cat .info)"

if [ $INFO != "root" ]
then
  FOLDER="$(basename "$(pwd)")"
  cd ../
  echo "Removing easy-use scripts directory..."
  rm -r $FOLDER
  FILE=".gitignore"
  if [ -f "$FILE" ]; then
    sed -i '' "/# Ignore folder for easy-use scripts from git-assist package/d" .gitignore
    sed -i '' "/$FOLDER\//d" .gitignore
  fi
  echo "Done!"
else
  echo "Cannot delete easy-use scripts from original folder!"
fi

read -p "Press Return to exit"
