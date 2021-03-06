#!/bin/bash

header_print() {
  echo $1
  echo "Tip: you can cancel this operation by pressing CTRL + C"
}

EXEC="$(npm bin -g)/git-assist"

# list GPG keys
header_print "Starting GPG keys listing utility..."
$EXEC gpg --list

echo "Done!"
read -p "Press Return to exit"
