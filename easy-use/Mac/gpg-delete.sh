#!/bin/bash

header_print() {
  echo $1
  echo "Tip: you can cancel this operation by pressing CTRL + C"
}

EXEC="$(npm bin -g)/git-assist"

# delete GPG key
header_print "Starting GPG key deletion utility..."
$EXEC gpg --delete

echo "Done!"
read -p "Press Return to exit"
