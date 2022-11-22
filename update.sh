#!/bin/bash

set -e

if [[ $# == 0 ]]; then
  echo "Missing target: cms | website"
  exit 1
fi

if [[ $1 == "cms" ]];
then
  echo "Update cms"

  git pull origin main

  cd cms

  yarn

  NODE_ENV=production yarn build

  APP="cms"

  IDS=`pm2 id $APP`

  # start the app
  if [ "$IDS" = "[]" ]; then
    pm2 start ecosystem.config.js --env production
  else
    pm2 reload ecosystem.config.js
  fi;

  cd ..

  echo "Update cms done"

elif [[ $1 == "website" ]];
then
  echo "Update website"

  git pull origin main

  cd website

  yarn

  NODE_ENV=production yarn build

  APP="website"

  IDS=`pm2 id $APP`

  # start the app
  if [ "$IDS" = "[]" ]; then
    pm2 start ecosystem.config.js --env production
  else
    pm2 reload ecosystem.config.js
  fi;

  cd ..

  echo "Update website done"

else
  echo -e "Invalid target $1.\n\nValid target: cms | website"
  exit 1
fi;
