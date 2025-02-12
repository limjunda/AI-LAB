#!/bin/bash

cd $(dirname $0)/..

export PROJECT_ID=prusandbx-nprd-uat-rt5044
export CLOUDRUN_SERVICE_NAME=ailab-solution-taxonomy-frontend
export CLOUDRUN_SERVICE_IMAGE_NAME=ai-solution-taxonomy/$PROJECT_ID/$CLOUDRUN_SERVICE_NAME

gcloud config set project $PROJECT_ID
gcloud auth application-default set-quota-project $PROJECT_ID

export REPO_FULL_NAME=$CLOUDRUN_SERVICE_IMAGE_NAME
gcloud builds submit \
  --config cloudbuild.yaml \
  --substitutions=REPO_FULL_NAME=$REPO_FULL_NAME .

gcloud run deploy $CLOUDRUN_SERVICE_NAME \
  --image $CLOUDRUN_SERVICE_IMAGE_NAME \
  --region asia-southeast1 \
  --port 3000 --allow-unauthenticated