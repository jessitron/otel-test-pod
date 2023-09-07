# Test an OpenTelemetry Collector in Kubernetes

It's hard to test a collector that's deployed inside k8s,
especially when it's a daemonset and doesn't have a service in front of it.

This repository will build a Docker image that lets you run a pod
that can send a test span.

Why is this so hard.
