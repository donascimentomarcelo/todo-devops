# Building app

If you need to do any updates on the docker image version, just follow the steps bellow.

## Docker updates

### `docker build -t donascimentomarcelo/todo-app:<tag> .`

### `docker build -t donascimentomarcelo/todo-api:<tag> .`

**Note: If you need push it to docker hub**

### `docker push donascimentomarcelo/todo-app:<tag>`

### `docker push donascimentomarcelo/todo-api:<tag>`

## Run locally

### `docker-composer up`

## Kubernetes setup

At first, you have to create a namespace for that. I used a namespace called `dev`.

### `kubectl apply -f namespaces.yaml`

Now you're able to run the other commands through this namespace.

### `kubectl apply -f todo-app-deployment.yaml -n dev`

### `kubectl apply -f todo-app-service.yaml -n dev`

### `kubectl apply -f todo-api-deployment.yaml -n dev`

### `kubectl apply -f todo-api-service.yaml -n dev`

**Note: If you wanna change the namespace name, you gotta replace `dev` for `your_namespace_name`, like `prod` or etc**

