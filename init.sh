# exit on error
set -e

echo "Killing previous containers"
docker-compose down

echo "Preparing services for deployment on development server"
CURR_DIR=$(pwd)

cd $CURR_DIR/backend

# building backend image
docker build -t olyndha_backend .

cd $CURR_DIR/react-client

# building frontend image
docker build -t olyndha_frontend .

cd $CURR_DIR
echo "Starting images"
docker-compose up -d

docker exec -d olyndha_frontend npm start
docker exec -d olyndha_backend npm run start:dev
