// 要素の取得
const curtainContainer = document.getElementById('curtain-container');
const animalImg = document.getElementById('animal-img');
const bgm = document.getElementById('bgm');
const soundOpen = document.getElementById('sound-open');
const soundPop = document.getElementById('sound-pop');

// 状態管理
let isAnimating = false;
let isBgmPlaying = false;
let nextImageUrl = '';

// 🌟 1歳半の娘さんが喜びそうなキーワードリスト（英語で指定します）
// ここに好きな単語をどんどん追加・変更できます！
const keywords = [
  'dog', 'cat', 'panda', 'rabbit', 'elephant', // 動物
  'car', 'train', 'bus',                       // 乗り物
  'apple', 'strawberry', 'cake',               // 食べ物
  'flower', 'moon', 'star'                     // 自然
];

// 次の画像を準備する関数（LoremFlickrを使用）
function prepareNextImage() {
  // キーワードリストからランダムに1つ選ぶ
  const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
  
  // キャッシュ（同じ画像が出続けること）を防ぐためのランダムな数字
  const randomNum = new Date().getTime();
  
  // 600x600サイズの画像をキーワード検索で取得するURL
  nextImageUrl = `https://loremflickr.com/600/600/${randomKeyword}?lock=${randomNum}`;

  // カーテンが開いた時にすぐに表示できるよう、裏側で画像を読み込んでおく（Preload）
  const imgPreloader = new Image();
  imgPreloader.src = nextImageUrl;
}

// 初期ロード時に1枚目の画像を準備
prepareNextImage();

// カーテンをタップした時の処理
curtainContainer.addEventListener('click', () => {
  if (isAnimating) return;
  isAnimating = true;

  // BGMの再生
  if (!isBgmPlaying) {
    bgm.play().catch(e => console.log('BGM再生エラー:', e));
    isBgmPlaying = true;
  }

  // 音を鳴らしてプルプルを止める
  soundOpen.currentTime = 0;
  soundOpen.play();
  curtainContainer.classList.remove('shake');

  // 事前準備した画像をセットしてカーテンを開く
  if (nextImageUrl) {
    animalImg.src = nextImageUrl;
  }
  curtainContainer.classList.add('open');

  // 少し遅れてポヨヨンと出現させる
  setTimeout(() => {
    animalImg.classList.remove('hidden');
    animalImg.classList.add('bounce-in');
    soundPop.currentTime = 0;
    soundPop.play();
  }, 400);

  // 3.5秒後に元に戻す
  setTimeout(() => {
    closeCurtain();
  }, 3500);
});

// カーテンを閉じる処理
function closeCurtain() {
  curtainContainer.classList.remove('open');
  
  setTimeout(() => {
    animalImg.classList.add('hidden');
    animalImg.classList.remove('bounce-in');
    curtainContainer.classList.add('shake');
    isAnimating = false;
    
    // カーテンが閉まっている間に、次回の画像を準備しておく
    prepareNextImage();
  }, 800);
}