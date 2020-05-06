#!/bin/bash

header_print() {
  echo $1
  echo "Tip: you can cancel this operation by pressing CTRL + C"
}

EXEC="$(npm bin -g)/git-assist"

# interactive GPG utility
header_print "Starting interactive GPG utility..."
$EXEC gpg

echo "Done!"
read -p "Press Return to exit"
