var info = {}
// chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
//     const currentTab = tabs[0]
//     info.url = currentTab.url
   
// })

function show(message="This site is most likely a fake news site") {
    var time = /(..)(:..)/.exec(new Date());     
    var hour = time[1] % 12 || 12;               
    var period = time[1] < 12 ? 'a.m.' : 'p.m.'; 
    new Notification(hour + time[2] + ' ' + period, {
      icon: 'icon.png',
      body: message
    });
  }
//   show()
document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const currentTab = tabs[0]
        info.url = currentTab.url

        if(currentTab.url==="https://www.google.com/"){
            show(`${currentTab.url } is not fake news`)
        }
        // if (currentTab.url === "https://google.com/") {
            show(`${currentTab.url } is not fake news`)
        // }
    })



    var flag = document.getElementById("flag")
    flag.addEventListener("click",function () {
        show(`${info.url} has been flagged as fake news site`)
    })
    var whitelist = document.getElementById("whitelist")
    whitelist.addEventListener("click", function () {
        
    })


},false)




