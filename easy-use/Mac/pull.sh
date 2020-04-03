#!/bin/bash

header_print() {
  echo $1
  echo "Tip: you can cancel this operation by pressing CTRL + C"
}

EXEC="$(npm bin -g)/git-assist"

# Pulling
header_print "Pulling from remote repository..."
$EXEC pull

printf "\nScript ran. You may now close this window if you're done working with it!"
