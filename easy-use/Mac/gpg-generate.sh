#!/bin/bash

header_print() {
  echo $1
  echo "Tip: you can cancel this operation by pressing CTRL + C"
}

EXEC="$(npm bin -g)/git-assist"

# generate GPG key
header_print "Generating GPG key for GitHub..."
$EXEC gpg --generate

echo "Done!"
read -p "Press Return to exit"
