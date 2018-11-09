document.addEventListener('DOMContentLoaded', function(){

    const bg = chrome.extension.getBackgroundPage()

    Object.keys(bg.bears).forEach(function (url) {
        const div = document.createElement("div")
        div.textContent = `${url} : ${bg.bears[url]}`
        document.body.appendChild(div)
    })

    // document.querySelector('button').addEventListener('click',onClick,false)
    // function onClick() {
    //     chrome.tabs.query({
    //         currentWindow:true,
    //         active:true
    //     }, function(tabs){
    //             console.log("tabs ", tabs)
    //             chrome.tabs.sendMessage(tabs[0].id,'Hi',setCount)
    //     })
    // }
    //
    // function setCount(res) {
    //     const div = document.createElement('div')
    //     div.textContent =`${res.count} Bears`
    //     document.body.appendChild(div)
    // }
},false)




