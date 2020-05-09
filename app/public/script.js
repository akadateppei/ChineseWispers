// // const Peer = require('skyway-js');
// const peer = new Peer({
//     key: '672ecab7-6a69-4ae8-814f-f3a50e089d6c',
//     debug: 3
// });
//
// peer.on('open', () => {
//     document.getElementById('my-id').textContent = peer.id;
// });
//
// let localStream = null;
//
// // カメラ映像取得
// navigator.mediaDevices.getUserMedia({video: true, audio: true})
//     .then(stream => {
//         // 成功時にvideo要素にカメラ映像をセットし、再生
//         const videoElm = document.getElementById('my-video')
//         videoElm.srcObject = stream;
//         videoElm.play();
//         // 着信時に相手にカメラ映像を返せるように、グローバル変数に保存しておく
//         localStream = stream;
//     }).catch(error => {
//     // 失敗時にはエラーログを出力
//     console.error('mediaDevice.getUserMedia() error:', error);
//     return;
// });