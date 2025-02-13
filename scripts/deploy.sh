#!/bin/bash

# Build Docker Image
docker build --no-cache -t ai-solution .

# Tag Docker Image
docker tag ai-solution asisa-southeast1-docker.pkg.dev/prusandbx-nprd-uat-rt5044/ailab-solution-taxonomy/ai-solution:latest

# Push Docker Image to Artifact Registry
docker push asia-southeast1-docker.pkg.dev/prusandbx-nprd-uat-rt5044/ailab-solution-taxonomy/ai-solution:latest

# Deploy to Cloud Run
gcloud run deploy ailab-solution-taxonomy --image asia-southeast1-docker.pkg.dev/prusandbx-nprd-uat-rt5044/ailab-solution-taxonomy/ai-solution:latest --platform managed --region asia-southeast1
