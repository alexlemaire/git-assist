#!/bin/bash

header_print() {
  echo $1
  echo "Tip: you can cancel this operation by pressing CTRL + C"
}

EXEC="$(npm bin -g)/git-assist"

# generate SSH key
header_print "Generating SSH key for GitHub..."
$EXEC ssh --generate

echo "Done!"
read -p "Press Return to exit"
