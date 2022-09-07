# exit on error
set -e

echo "Killing previous containers"
docker-compose down

echo "Preparing services for deployment on development server"
CURR_DIR=$(pwd)

cd $CURR_DIR/backend

# building backend image
docker build -t olyndha_backend .

echo "Starting images"
docker-compose up -d

