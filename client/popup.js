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

    const flagSite = data =>{
      var config = {
        apiKey: 'AIzaSyDKLEwwB1-gXOZTho9-eiidUfIviLtdsKQ',
        authDomain: 'news-guard.firebaseapp.com',
        databaseURL: 'https://news-guard.firebaseio.com',
        projectId: 'news-guard',
        storageBucket: '',
        messagingSenderId: '83048333417'
      }

      firebase.initializeApp(config)

      const database = firebase.database()
      const flaggedRef = database.ref(`flagged_articles`)



      flaggedRef.set(data)

      flaggedRef.on('value', function(snapshot) {
        console.log(snapshot)
      })
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

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
       currentTab = tabs[0]
    })


    var flag = document.getElementById("flag")
    flag.addEventListener("click",function () {
      const fake = {
        id: uuidv4(),
        url: currentTab.url,
        domain: extractHostname(currentTab.url),
        time: new Date()
      }
        flagSite(fake)
        show(`${currentTab.url} has been flagged as fake news site`)
    })
    var whitelist = document.getElementById("whitelist")
    whitelist.addEventListener("click", function () {
        
    })

  },
  false
);




// var info = {}
// // chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
// //     const currentTab = tabs[0]
// //     info.url = currentTab.url
   
// // })

function show(message="This site is most likely a fake news site") {
    var time = /(..)(:..)/.exec(new Date());     
    var hour = time[1] % 12 || 12;               
    var period = time[1] < 12 ? 'a.m.' : 'p.m.'; 
    new Notification(hour + time[2] + ' ' + period, {
      icon: 'icon.png',
      body: message
    });
  }




