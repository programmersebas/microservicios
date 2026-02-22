package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

type Response struct {
	Resultado float64 `json:"resultado"`
	Error     string  `json: "error,omitempty"`
}

func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Content-Type", "application/json")
		if r.Method == "OPTIONS" {
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {
	http.HandleFunc("/add", handleCalculation)
	http.HandleFunc("/subtract", handleCalculation)
	http.HandleFunc("/multiply", handleCalculation)
	http.HandleFunc("/divide", handleCalculation)
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello friend! It's calculator app! Use /add, /subtract, /multiply, or /divide endpoints with 'num1' and 'num2' query parameters.")
	})

	fmt.Println("Server starting on :8080...")
	if err := http.ListenAndServe("0.0.0.0:8080", enableCORS(http.DefaultServeMux)); err != nil {
		fmt.Println("HTTP server failed:", err)
	}

}

func handleCalculation(w http.ResponseWriter, r *http.Request) {

	// Parse query parameters
	num1Str := r.URL.Query().Get("num1")
	num2Str := r.URL.Query().Get("num2")

	// Convert strings to float64
	num1, err1 := strconv.ParseFloat(num1Str, 64)
	num2, err2 := strconv.ParseFloat(num2Str, 64)

	if err1 != nil || err2 != nil {
		http.Error(w, "Invalid numbers provided", http.StatusBadRequest)
		return
	}

	var result float64
	path := r.URL.Path

	fmt.Printf("New operation: %s\n", path)

	switch path {
	case "/add":
		result = num1 + num2
	case "/subtract":
		result = num1 - num2
	case "/multiply":
		result = num1 * num2
	case "/divide":
		if num2 == 0 {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(Response{Error: "Division by zero"})
			//http.Error(w, "Division by zero is impossible", http.StatusBadRequest)
			//	return
		}
		result = num1 / num2
	default:
		//http.Error(w, "Invalid operation", http.StatusBadRequest)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(Response{Error: "Error"})
		return
	}

	json.NewEncoder(w).Encode(Response{Resultado: result})

	//fmt.Fprintf(w, " %.f", result)
}
