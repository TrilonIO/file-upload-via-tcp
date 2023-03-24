# File Upload via TCP

There may come a time when you want to upload a file to an API gateway and send
it on to a TCP microservice. This repo shows how to do that.

> Note: this repo is meant to accompany a blog post on trilon.io and will not
go through everythingstep by step.

## Clone the project and move to the directory

```bash
$ git clone git@github.com:TrilonIO/file-upload-via-tcp.git
$ cd file-upload-via-tcp
```

## Running the servers

Run the TCP server first, then the API gateway

```bash
$ nest start --watch tcp-server
```

```bash
$ nest start --watch tcp-file-sending
```

## Send a file via HTTP

```bash
$ xh :3000/file file@package.json
```

Observe the output and profit