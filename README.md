# Test an OpenTelemetry Collector in Kubernetes

[Image in DockerHub](https://hub.docker.com/repository/docker/jessitron/otel-test-pod/general)

It's hard to test a collector that's deployed inside k8s,
especially when it's a daemonset and doesn't have a service in front of it.

This repository will build a Docker image that lets you run a pod
that can send a test span.

Why is this so hard.

## What to do

### Create the pod

`kubectl apply -f otel-test-pod.yaml`

Crucially, this sets the NODE_IP environment variable, which lets the pod call into the daemonset on the node.

### Shell into the pod

`kubectl exec otel-test-pod -i --tty -- ash`

### Try to hit the collector

`wget $NODE_IP:4318`

If this returns a 404, hooray. Otherwise, my collector isn't listening where I think it should be.

`wget $NODE_UP:4318/v1/traces`

If this returns a 405 METHOD NOT ALLOWED, hooray. Otherwise, this doesn't look like a collector is listening there.

### Delete the pod

`kubectl delete pod otel-test-pod`

## Building the image

`docker build -t jessitron/otel-test-pod .`

that creates the "latest"

then, per version that I want to publish:

`docker tag jessitron/otel-test-pod jessitron/otel-test-pod:0.0.1`

`docker push jessitron/otel-test-pod:0.0.1`

and then if I want people to use it:

`docker push jessitron/otel-test-pod:latest`

### push to docker hub

I spent 20 minutes working on logging in to this. It may have worked.

`docker login -u jessitron`
and then use the access token in the password manager.


