FROM ubuntu:22.04

RUN apt update
RUN apt-get install -y curl

COPY ./workspace /workspace/

WORKDIR /workspace

CMD bash
