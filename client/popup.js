document.addEventListener(
  'DOMContentLoaded',
  () => {
    const config = {
      apiKey: 'AIzaSyDKLEwwB1-gXOZTho9-eiidUfIviLtdsKQ',
      authDomain: 'news-guard.firebaseapp.com',
      databaseURL: 'https://news-guard.firebaseio.com',
      projectId: 'news-guard',
      storageBucket: '',
      messagingSenderId: '83048333417'
    }

    firebase.initializeApp(config)

    let currentTab
  

    const database = firebase.database()
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const currentTab = tabs[0]
      database.ref("articles").once("value").then(function(snapshot){
        const flags = Object.entries(snapshot.val())
        console.log(flags[0][1])
        console.log(currentTab.url)
        flags.forEach(flag => {
            if(flag[1].url === currentTab.url){
                if (flag[1].count > 1) {
                  document.getElementById("flaggedTitle").innerHTML = `Flagged ${flag[1].count} Times`
                  show(`This could be fake news site`)
                }else{
                  verified
                  document.getElementById("cleanSite").innerHTML = `This is a trusted new site`
                  document.getElementById("verified").classList.remove('ficha')
                }
              
              
            }
        });
    })
  })


    const uuidv4 = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function( c ) {
        let r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    }

    const flagSite = (data, domain) => {
    const articlesRef = database.ref(`articles/${domain.replace(/\./g, "_")}`)
      const ip = getIP().replace(/\n/g,'')
       articlesRef.once('value').then(function(snapshot) {
          let article = snapshot.val() 
      
          if( article && article.url === data.url && !article.users.includes(ip) ){
              article.count += 1
              articlesRef.child("users").push(ip)
              return articlesRef.update(article)
          }else if (!article){
            articlesRef.set({...data,'users':[ip]})
            flaggers.set({[getIP()]:data.url})
          }
          else if(article &&  article.url === data.url && article.users.includes(ip)){
            return;
          }
          else{
            return;
          }
      });
      return ;
      
    }

    const getIP = ()=>{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://icanhazip.com/", false);
    xhr.send();
     return xhr.responseText;
    }

    const extractHostname = (url) => {
        let hostname
        //find & remove protocol (http, ftp, etc.) and get hostname

        if (url.indexOf("//") > -1) {
            hostname = url.split('/')[2]
        }
        else {
            hostname = url.split('/')[0]
        }

        //find & remove port number
        hostname = hostname.split(':')[0]
        //find & remove "?"
        hostname = hostname.split('?')[0]

        return hostname
    }

    const flag = document.getElementById("flag")
    
    flag.addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            const currentTab = tabs[0]
            const fake = {
                url: currentTab.url,
                time: new Date(),
                count: 1
            }
    
            flagSite(fake, extractHostname(currentTab.url))
            show(`${currentTab.url} has been flagged as fake news site`)
        })
    })

    const whitelist = document.getElementById("whitelist")
    whitelist.addEventListener("click", function () {
    })
  },
  false
);

const show = (message = "This site is most likely a fake news site") => {
    var time = /(..)(:..)/.exec(new Date());     
    var hour = time[1] % 12 || 12;               
    var period = time[1] < 12 ? 'a.m.' : 'p.m.'; 
    new Notification(hour + time[2] + ' ' + period, {
      icon: 'icon.png',
      body: message
    });
  }