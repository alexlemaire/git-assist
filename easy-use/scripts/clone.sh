#!/bin/bash

header_print() {
  echo $1
  echo "Tip: you can cancel this operation by pressing CTRL + C"
}

# clone repo
header_print "Cloning a new repository..."
$1 clone

printf "\nScript ran. You may now close this window if you're done working with it!"
