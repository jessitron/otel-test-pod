# Test an OpenTelemetry Collector in Kubernetes

[Image in DockerHub](https://hub.docker.com/repository/docker/jessitron/otel-test-pod/general)

It's hard to test a collector that's deployed inside k8s,
especially when it's a daemonset and doesn't have a service in front of it.

This repository builds a Docker image that lets you run a pod
that can send a test span.

Expectation: the opentelemetry collector is running on every node, and it's listening for OTLP traces over HTTP, on its usual port, 4318.
I followed [this blog post](https://www.honeycomb.io/deploying-opentelemetry-collector-kubernetes-helm) to set that up.

Why is this so hard.

## What to do

### Create the pod

`kubectl apply -f otel-test-pod.yaml`

This spins up a pod using an image in Dockerhub. That image was built with the Dockerfile you see here.

Crucially, this yaml sets the NODE_IP environment variable, which lets the pod call into the daemonset.

### Shell into the pod

`kubectl exec otel-test-pod -i --tty -- bash`

### Try to hit the collector

This script will send a single very simple span:

`./test`

You can look at the contents of the script before running it. It sends the sample_span.json, except that it replaces the trace ID and span ID with unique ones, so that you can use it more than once.

If it works, go look for data in... wherever your collector is configured to send data.

#### more basic tests

If that one doesn't work, test connectivity generally.

`curl $NODE_IP:4318`

If this returns a 404, hooray. Otherwise, my collector isn't listening where I think it should be.

`curl $NODE_IP:4318/v1/traces`

If this returns a 405 METHOD NOT ALLOWED, hooray. Otherwise, this doesn't look like a collector is listening there.

### Delete the pod

`kubectl delete pod otel-test-pod`

## Building the image

This is for me:

`docker build -t jessitron/otel-test-pod .`

that creates the "latest"

### push to docker hub

I spent 20 minutes working on logging in to this. It finally worked, today.

`docker login -u jessitron`
and then use the access token in the password manager.

then, per version that I want to publish:

`docker tag jessitron/otel-test-pod jessitron/otel-test-pod:0.0.1`

`docker push jessitron/otel-test-pod:0.0.1`

and then if I want people to use it:

`docker push jessitron/otel-test-pod:latest`
