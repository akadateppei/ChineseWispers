makeBoard = function () {
    //title: コマのタイトル, balance: コマによる収支, move: コマによる移動
    var event = [
        {title: "りゅーまにマックナゲットを一つとられた。ナゲット分お金が減る。", balance: -50, move: 0},
        {title: "化学豚モルモルにピタゴラスイッチを壊された。ピタゴラスイッチにかかった費用が無駄になる。", balance: -100, move: 0},
        {title: "やけたいたたが拡散される。振り出しに戻る。", balance: 0, move: "start"},
        {title: "推薦で大学受かる。ゴール。", balance: 0, move: "goal"},
        {title: "応援団で大失敗。1,2,3...", balance: -123, move: 0},
        {title: "織姫が彼女になる。", balance: 300, move: 0},
        {title: "特に理由なく有井にブロックされる。腹立つ。", balance: -100, move: 0},
        {title: "彩乃のパンツ見えた。嬉しい。", balance: 100, move: 0},
        {title: "四天王にバンドに誘われる。", balance: 300, move: 0},
        {title: "ミカにふーたという彼氏がいた。", balance: -200, move: 0},
        {title: "えせすべに告白するも振られる。", balance: -100, move: 0},
        {title: "えせすべに存在を忘れられる。", balance: -200, move: 0},
        {title: "みーこに告白される", balance: 1, move: 0},
        {title: "ゆーくんにセフレがいたのを知る。", balance: 0, move: 0},
        {title: "パンダの帽子を買った", balance: 50, move: 0},
        {title: "母に送ってもらった", balance: 0, move: 3},
        {title: "創立記念日で午前休！神戸屋でハヤシライス。", balance: 50, move: 0},
        {title: "みんなで内緒でタコパ。", balance: 200, move: 0},
        {title: "南高ライブのトリを飾る", balance: 300, move: 0},
        {title: "アドレスをしみずんずん、おおたんたんにした。", balance: 3, move: 0},
        {title: "もりたしもりたしなんでこけたしw", balance: -50, move: -1},
        {title: "増田遊撃手「りゅううううまああああああああああ」", balance: -50, move: 0}
    ];

    function shuffle(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var r = Math.floor(Math.random() * (i + 1));
            var tmp = array[i];
            array[i] = array[r];
            array[r] = tmp;
        }
    }

    shuffle(event);
    event.unshift({title: "スタート地点", balance: 0, move: 0});
    return event;
}
module.exports = makeBoard();