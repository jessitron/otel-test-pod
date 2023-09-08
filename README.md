# Test an OpenTelemetry Collector in Kubernetes

It's hard to test a collector that's deployed inside k8s,
especially when it's a daemonset and doesn't have a service in front of it.

This repository will build a Docker image that lets you run a pod
that can send a test span.

Why is this so hard.

## What to do

### Create the pod

`kubectl apply -f otel-test-pod.yaml`

This uses the ordinary busybox image because it'll do.

Crucially, it sets the NODE_IP environment variable, which lets the pod call into the daemonset on the node.

### Shell into the pod

`kubectl exec otel-test-pod -i --tty -- ash`

### Try to hit the collector

`wget $NODE_IP:4318`

If this returns a 404, hooray. Otherwise, my collector isn't listening where I think it should be.

`wget $NODE_UP:4318/v1/traces`

If this returns a 405 METHOD NOT ALLOWED, hooray. Otherwise, this doesn't look like a collector is listening there.

### Delete the pod

`kubectl delete pod otel-test-pod`
