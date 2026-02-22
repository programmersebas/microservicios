# Test locallly on Docker Compose

## Start environment
docker-compose up

# Test the Container
```bash
curl "http://localhost:8080/api/add/?num1=1&num2=2"
curl "http://localhost:8080/api/sub/?num1=1&num2=2"
curl "http://localhost:8080/api/mul/?num1=1&num2=2"
curl "http://localhost:8080/api/div/?num1=1&num2=2"
```
