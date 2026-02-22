# Test locallly on Docker

## Build the Image
docker build -t go-calc .

## Run the Container
docker run -it -p 8080:8080 go-calc
<!--docker run -d -p 8080:8080 go-calc-->

# Test the Container
```bash
curl "http://localhost:8080/add?num1=1&num2=2"
curl "http://localhost:8080/subtract?num1=4&num2=3"
curl "http://localhost:8080/multiply?num1=10&num2=5"
curl "http://localhost:8080/divide?num1=1&num2=0"
```
