#!/bin/bash

if [ -d logs ]
then
  echo "Logs folder already exists, not creating..."
else
  mkdir logs
fi
