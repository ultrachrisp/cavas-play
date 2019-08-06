(defproject canvas-play.core "1.1.0-SNAPSHOT"
  :description "Canvas is an often overlooked feature in HTML5. Granted, it has it's downsides but it also has its strengths. I used this project to up-skill myself in the HTML canvas tag."
  :url "https://github.com/ultrachrisp/cavas-play.git"
  :license {:name "The MIT License"
            :url "https://github.com/ultrachrisp/canvas-play/blob/master/LICENSE"}

  :min-lein-version "2.7.1"

  :dependencies [[org.clojure/clojure "1.9.0"]
                 [org.clojure/clojurescript "1.10.339"]]

  :source-paths ["src"]

  :aliases {"fig"       ["trampoline" "run" "-m" "figwheel.main"]
            "fig:build" ["trampoline" "run" "-m" "figwheel.main" "-b" "dev" "-r"]
            "fig:min"   ["run" "-m" "figwheel.main" "-O" "advanced" "-bo" "dev"]
            "fig:test"  ["run" "-m" "figwheel.main" "-co" "test.cljs.edn" "-m" canvas-play.test-runner]}

  :profiles {:dev {:dependencies [[com.bhauman/figwheel-main "0.1.9"]
                                  [com.bhauman/rebel-readline-cljs "0.1.4"]]
                   }})

