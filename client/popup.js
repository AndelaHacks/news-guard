document.addEventListener(
  'DOMContentLoaded',
  () => {
    let currentTab
    const uuidv4 = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function( c ) {
        let r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    }

    const flagSite = (data, domain) => {
      const config = {
        apiKey: 'AIzaSyDKLEwwB1-gXOZTho9-eiidUfIviLtdsKQ',
        authDomain: 'news-guard.firebaseapp.com',
        databaseURL: 'https://news-guard.firebaseio.com',
        projectId: 'news-guard',
        storageBucket: '',
        messagingSenderId: '83048333417'
      }

      firebase.initializeApp(config)

      const database = firebase.database()
      const flaggedRef = database.ref(`flagged_articles/${domain.replace(/\./g, "_")}`)
       flaggedRef.once('value').then(function(snapshot) {
          let article = snapshot.val() 
          if(article.url === data.url){
              article.count += 1
              return flaggedRef.update(article)
          }else{
            flaggedRef.set(data)
          }
      });
      return ;
      
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