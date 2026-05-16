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

// APIから画像を事前に取得しておく関数（Dog APIを使用）
// ※待たせずにすぐ開くための工夫です
async function fetchNextImage() {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    nextImageUrl = data.message;
  } catch (error) {
    console.error('画像の取得に失敗しました', error);
    // エラー時はデフォルトの画像パスなどを指定すると安全です
  }
}

// 初期ロード時に1枚目の画像を取得
fetchNextImage();

// カーテンをタップした時の処理
curtainContainer.addEventListener('click', () => {
  // アニメーション中は何もしない（連打防止）
  if (isAnimating) return;
  isAnimating = true;

  // 1. 初回タップ時にBGMを再生（ブラウザの自動再生制限対策）
  if (!isBgmPlaying) {
    bgm.play().catch(e => console.log('BGM再生エラー:', e));
    isBgmPlaying = true;
  }

  // 2. 音を鳴らしてプルプルを止める
  soundOpen.currentTime = 0;
  soundOpen.play();
  curtainContainer.classList.remove('shake');

  // 3. 事前取得した画像をセットしてカーテンを開く
  if (nextImageUrl) {
    animalImg.src = nextImageUrl;
  }
  curtainContainer.classList.add('open');

  // 4. 少し遅れて動物をポヨヨンと出現させる
  setTimeout(() => {
    animalImg.classList.remove('hidden');
    animalImg.classList.add('bounce-in');
    soundPop.currentTime = 0;
    soundPop.play();
  }, 400); // カーテンが少し開いた頃合い

  // 5. 3.5秒後に元に戻す
  setTimeout(() => {
    closeCurtain();
  }, 3500);
});

// カーテンを閉じる処理
function closeCurtain() {
  curtainContainer.classList.remove('open');
  
  // カーテンが完全に閉まりきる時間を待つ
  setTimeout(() => {
    animalImg.classList.add('hidden');
    animalImg.classList.remove('bounce-in');
    curtainContainer.classList.add('shake');
    isAnimating = false;
    
    // 次回のタップのために新しい画像を裏で取得しておく
    fetchNextImage();
  }, 800); // CSSのtransition(0.8s)と合わせる
}