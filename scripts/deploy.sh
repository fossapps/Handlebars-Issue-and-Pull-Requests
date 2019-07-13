#!/bin/sh
set -e
echo "running npm install"
npm install
echo "Deploying application"
echo "setting up now variable"
now="npx now --debug --token=$NOW_TOKEN"
echo "$ now --no-verify"
${now} -e APP_ID=${APP_ID} -e WEBHOOK_SECRET=${WEBHOOK_SECRET} -e PRIVATE_KEY_ENCODED=${PRIVATE_KEY_ENCODED}
