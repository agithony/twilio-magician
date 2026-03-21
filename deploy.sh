#!/bin/bash
set -e

echo "========================================="
echo "  The Twilio Magician - Azure Deployment"
echo "========================================="
echo ""

# Defaults
DEFAULT_RG="rg-twilio-magician"
DEFAULT_APP="twilio-magician"
DEFAULT_LOCATION="centralus"
DEFAULT_ACR="twiliomagician"
DEFAULT_ENV="cae-twilio-magician"

read -p "Resource Group [$DEFAULT_RG]: " RESOURCE_GROUP
RESOURCE_GROUP=${RESOURCE_GROUP:-$DEFAULT_RG}

read -p "App Name [$DEFAULT_APP]: " APP_NAME
APP_NAME=${APP_NAME:-$DEFAULT_APP}

read -p "Location [$DEFAULT_LOCATION]: " LOCATION
LOCATION=${LOCATION:-$DEFAULT_LOCATION}

read -p "ACR Name [$DEFAULT_ACR]: " ACR_NAME
ACR_NAME=${ACR_NAME:-$DEFAULT_ACR}

read -p "Container Apps Environment [$DEFAULT_ENV]: " ENV_NAME
ENV_NAME=${ENV_NAME:-$DEFAULT_ENV}

IMAGE_TAG="$APP_NAME:$(git rev-parse --short HEAD 2>/dev/null || echo latest)"

echo ""
echo "Creating infrastructure..."

# Resource Group
az group create --name "$RESOURCE_GROUP" --location "$LOCATION" --output none 2>/dev/null || true

# Container Registry
az acr show --name "$ACR_NAME" --resource-group "$RESOURCE_GROUP" --output none 2>/dev/null || \
  az acr create --name "$ACR_NAME" --resource-group "$RESOURCE_GROUP" --sku Basic --admin-enabled true --output none

# Container Apps Environment
az containerapp env show --name "$ENV_NAME" --resource-group "$RESOURCE_GROUP" --output none 2>/dev/null || \
  az containerapp env create --name "$ENV_NAME" --resource-group "$RESOURCE_GROUP" --location "$LOCATION" --output none

echo "Building and pushing image..."
az acr build --registry "$ACR_NAME" --image "$IMAGE_TAG" . --output none

ACR_SERVER=$(az acr show --name "$ACR_NAME" --query loginServer -o tsv)
ACR_USER=$(az acr credential show --name "$ACR_NAME" --query username -o tsv)
ACR_PASS=$(az acr credential show --name "$ACR_NAME" --query 'passwords[0].value' -o tsv)

echo "Deploying container app..."
az containerapp show --name "$APP_NAME" --resource-group "$RESOURCE_GROUP" --output none 2>/dev/null && \
  az containerapp update \
    --name "$APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --image "$ACR_SERVER/$IMAGE_TAG" \
    --output none || \
  az containerapp create \
    --name "$APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --environment "$ENV_NAME" \
    --image "$ACR_SERVER/$IMAGE_TAG" \
    --registry-server "$ACR_SERVER" \
    --registry-username "$ACR_USER" \
    --registry-password "$ACR_PASS" \
    --target-port 8080 \
    --ingress external \
    --min-replicas 1 \
    --max-replicas 1 \
    --output none

az containerapp update \
  --name "$APP_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --set-env-vars PORT=8080 NODE_ENV=production \
  --output none

FQDN=$(az containerapp show --name "$APP_NAME" --resource-group "$RESOURCE_GROUP" --query properties.configuration.ingress.fqdn -o tsv)

echo ""
echo "========================================="
echo "  Deployment Complete!"
echo "  URL: https://$FQDN"
echo "========================================="
