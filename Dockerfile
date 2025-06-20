FROM node:22.14.0-slim as base

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile && yarn cache clean
COPY . .
RUN yarn build

FROM node:22.14.0-slim

WORKDIR /app

RUN apt-get update && \
    apt-get install -y --no-install-recommends curl ca-certificates gnupg && \
    curl -fsSL -o /tmp/get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 && \
    chmod +x /tmp/get_helm.sh && \
    /tmp/get_helm.sh && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/get_helm.sh

COPY --from=base /app/package.json /app/yarn.lock ./
COPY --from=base /app/node_modules ./node_modules

COPY --from=base /app/.next .next

CMD ["yarn", "start"]

