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
    "github.com/gorilla/mux"
    //"bytes"
)

type StreamItem struct {
        ID        bson.ObjectId `bson:"_id,omitempty"`
        Text      string
        Location  string
        Time      string `moment date-object: "time"`
        Vibes     int
        Type      string
        Timestamp time.Time `json:"time"`
}

func main() {
    r := mux.NewRouter()

     r.HandleFunc("/", IndexHandler)
    r.HandleFunc("/getStreamItems", getStreamItems)
    r.HandleFunc("/streamItem", createStreamItem)
    r.HandleFunc("/streamItem/{id}", deleteStreamItem).Methods("DELETE")
    r.HandleFunc("/streamItem/{id}", updateStreamItem).Methods("PUT")

    http.Handle("/", r)

    http.Handle("/images/", http.StripPrefix("/images/", http.FileServer(http.Dir("images"))))
    http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("js"))))
	  http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("css"))))
    http.Handle("/fonts/", http.StripPrefix("/fonts/", http.FileServer(http.Dir("fonts"))))
    var err error

    // starting the server

  	err = http.ListenAndServe(":4000", nil)
  	if err != nil {
  		log.Fatal(err)
  	}

}

func IndexHandler(w http.ResponseWriter, req *http.Request) {
    // just load the index page and let the magic happen!
    template.Must(template.ParseFiles("index.html")).Execute(w, nil)
}

func createStreamItem(w http.ResponseWriter, req *http.Request) {

    decoder := json.NewDecoder(req.Body)
    var item StreamItem
    err := decoder.Decode(&item)
    if err != nil {
        log.Println("json decoder failed")
    }

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
    err = c.Insert(&StreamItem{Text: item.Text, Location: item.Location, Time: item.Time, Vibes: 1, Timestamp: time.Now() })
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
    err = c.Find(bson.M{"type": ""}).Sort("-timestamp").All(&results)
    if err != nil {
        fmt.Println("Query failed")
        log.Fatal(err)
    }

    // Marshal data (convert from go to json)
    data, _ := json.Marshal(results)

    w.Write(data)

}

func updateStreamItem(w http.ResponseWriter, req *http.Request) {

    vars := mux.Vars(req)
    id := (vars["id"])

    decoder := json.NewDecoder(req.Body)
    var item StreamItem
    err := decoder.Decode(&item)
    if err != nil {
        log.Println("json decoder failed")
    }

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

    // Update
    update := bson.M{"$set": bson.M{"vibes": item.Vibes}}
    err = c.UpdateId(bson.ObjectIdHex(id), update )
  	if err != nil {
      fmt.Println("Update post failed")
      log.Fatal(err)
  	}

    w.Write([]byte("Post Updated"))

}

func deleteStreamItem(w http.ResponseWriter, req *http.Request) {

    vars := mux.Vars(req)

    id := (vars["id"])

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

    // update results variable with array of bson objects that match query

    err = c.RemoveId(bson.ObjectIdHex(id))
    if err != nil {
        fmt.Println("Remove _id failed")
        log.Fatal(err)
    }

    w.Write([]byte("Post Removed"))

}
