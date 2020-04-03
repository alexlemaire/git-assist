#!/bin/bash

read -p "Please provide the path to the repository you would like to copy the scripts to (absolute path): " DEST

# Copy easy-use scripts folder
DEST="$(sed "s@~@$HOME@g" <<<$DEST)"
SRC="$(pwd)"
FOLDER="$(basename "$SRC")"
cp -r $SRC $DEST

# Update .gitignore to not commit easy-use scripts in new repo
cd $DEST
FILE=".gitignore"
if [ -f "$FILE" ]; then
  echo "# Ignore folder for easy-use scripts from git-assist package" >> $FILE
  echo "$FOLDER/" >> $FILE
fi

# Update .info to specify that we're not in root anymore
cd $FOLDER
echo "copy" > .info

echo "Done!"
read -p "Press Return to exit"
