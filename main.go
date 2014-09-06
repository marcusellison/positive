package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    //"os"
    "html/template"
    "log"
    "gopkg.in/mgo.v2"
    "gopkg.in/mgo.v2/bson"
    "time"
    //"bytes"
)

type StreamItem struct {
        ID        bson.ObjectId `bson:"_id,omitempty"`
        Text      string
        Location  string
        Timestamp time.Time
        Vibes     int
}

func main() {
    http.HandleFunc("/", index)
    http.HandleFunc("/createStreamItem", createStreamItem)
    http.HandleFunc("/getStreamItems", getStreamItems)

    http.Handle("/images/", http.StripPrefix("/images/", http.FileServer(http.Dir("images"))))
    http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("js"))))
	  http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("css"))))
    http.Handle("/fonts/", http.StripPrefix("/fonts/", http.FileServer(http.Dir("fonts"))))
    var err error
    fmt.Println("initiating db stuff")

    session, err := mgo.Dial("localhost:27017")
    if err != nil {
      panic(err)
    }
    defer session.Close()

    // Optional. Switch the session to a monotonic behavior.
    session.SetMode(mgo.Monotonic, true)

    //define posts collection as 'c'
    c := session.DB("test").C("posts")

    // insert a new entry
    err = c.Insert(&StreamItem{Text: "The wind is a long desert to freedom.", Location: "Mexico", Timestamp: time.Now(),Vibes: 1 })
    if err != nil {
            log.Fatal(err)
    }

    // starting the server
    fmt.Println("listening...")
  	err = http.ListenAndServe(":4000", nil)
  	if err != nil {
  		log.Fatal(err)
  	}

}

func index(w http.ResponseWriter, req *http.Request) {
    // just load the index page and let the magic happen!
    template.Must(template.ParseFiles("index.html")).Execute(w, nil)
}

func createStreamItem(w http.ResponseWriter, req *http.Request) {

    decoder := json.NewDecoder(req.Body)
    var item StreamItem
    err := decoder.Decode(&item)
    if err != nil {
        log.Println("something went wrong")
    }
    log.Println(item.Text)

    session, err := mgo.Dial("localhost:27017")
    if err != nil {
            panic(err)
    }
    defer session.Close()


    // Optional. Switch the session to a monotonic behavior.
    session.SetMode(mgo.Monotonic, true)

    // connect ot the posts collections of the test database
    c := session.DB("test").C("posts")

    // insert the new stream item
    err = c.Insert(&StreamItem{Text: "The wind is a long desert to freedom.", Location: "Mexico", Timestamp: time.Now(),Vibes: 1 })
    if err != nil {
            log.Fatal(err)
    }

}

func getStreamItems(w http.ResponseWriter, req *http.Request) {

    // connect to mongo
    session, err := mgo.Dial("localhost:27017")
    if err != nil {
            panic(err)
    }
    defer session.Close()

    // Optional. Switch the session to a monotonic behavior.
    session.SetMode(mgo.Monotonic, true)

    //define posts collection as 'c'
    c := session.DB("test").C("posts")

    //define results variable as a StreamItem slice
    results := []StreamItem{}

    // update results variable with array of bson objects that match query
    err = c.Find(bson.M{"location": "New York"}).Sort("-timestamp").All(&results)
    if err != nil {
        fmt.Println("Query failed")
        log.Fatal(err)
    }

    // Marshal data (convert from go to json)
    data, _ := json.Marshal(results)

    w.Write(data)

}
