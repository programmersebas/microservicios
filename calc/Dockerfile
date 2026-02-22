# Build Stage
FROM golang:1.24-alpine AS builder

WORKDIR /app
COPY main.go .
RUN go build main.go

# Final Stage
FROM alpine:3.21

WORKDIR /root/
COPY --from=builder /app/main .

EXPOSE 8080

CMD ["./main"]
