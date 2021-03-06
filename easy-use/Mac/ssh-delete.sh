#!/bin/bash

header_print() {
  echo $1
  echo "Tip: you can cancel this operation by pressing CTRL + C"
}

EXEC="$(npm bin -g)/git-assist"

# delete SSH key
header_print "Starting SSH key deletion utility..."
$EXEC ssh --delete

echo "Done!"
read -p "Press Return to exit"
