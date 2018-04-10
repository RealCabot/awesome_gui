function getLocalIP(){
    window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;//compatibility for Firefox and chrome
    var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};      
    pc.createDataChannel('');//create a bogus data channel
    pc.createOffer(pc.setLocalDescription.bind(pc), noop);// create offer and set local description
    return new Promise((resolve, reject)=>{
        pc.onicecandidate = function(ice) {
            if (ice && ice.candidate && ice.candidate.candidate) {
             var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
             resolve(myIP)
             pc.onicecandidate = noop;
            }
        };
    })
}

export default getLocalIP;