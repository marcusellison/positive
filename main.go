package main

import (
    "fmt"
    "net/http"
    //"os"
    "html/template"
    "log"
)

func main() {
    http.HandleFunc("/", index)
    http.Handle("/images/", http.StripPrefix("/images/", http.FileServer(http.Dir("images"))))
    http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("js"))))
	  http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("css"))))
    http.Handle("/fonts/", http.StripPrefix("/fonts/", http.FileServer(http.Dir("fonts"))))
    var err error
    fmt.Println("listening...")
  	err = http.ListenAndServe(":4000", nil)
  	if err != nil {
  		log.Fatal(err)
  	}
}

func index(w http.ResponseWriter, req *http.Request) {
    template.Must(template.ParseFiles("index.html")).Execute(w, nil)
}
