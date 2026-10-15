#!/usr/bin/env bash
# One-time root setup: nginx vhost + Let's Encrypt certificate.
# Run on the server:  sudo bash ~/apps/sanchblackcar/setup-nginx.sh
set -euo pipefail

DOMAIN=sanchblackcarservices.com
SRC="$(dirname "$(readlink -f "$0")")/nginx-$DOMAIN.conf"

cp "$SRC" "/etc/nginx/sites-available/$DOMAIN"
ln -sfn "/etc/nginx/sites-available/$DOMAIN" "/etc/nginx/sites-enabled/$DOMAIN"
nginx -t
systemctl reload nginx

certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --redirect --non-interactive --agree-tos \
  --register-unsafely-without-email --keep-until-expiring
systemctl reload nginx

echo "https://$DOMAIN is live"
