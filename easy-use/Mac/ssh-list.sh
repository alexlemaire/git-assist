#!/bin/bash

header_print() {
  echo $1
  echo "Tip: you can cancel this operation by pressing CTRL + C"
}

EXEC="$(npm bin -g)/git-assist"

# list SSH keys
header_print "Starting SSH keys listing utility..."
$EXEC ssh --list

echo "Done!"
read -p "Press Return to exit"
