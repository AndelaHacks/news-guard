document.addEventListener(
  'DOMContentLoaded',
  () => {
    const uuidv4 = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function( c ) {
        let r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
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
      const currentTab = tabs[0]
      console.log(currentTab.url)

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

      const fake = {
        id: uuidv4(),
        url: currentTab.url,
        domain: extractHostname(currentTab.url),
        time: new Date()
      }

      console.log(fake)

      flaggedRef.set(fake)

      flaggedRef.on('value', function(snapshot) {
        console.log(snapshot)
      })
    })
  },
  false
);
