// 要素の取得（IDが変わったので注意！）
const curtainContainer = document.getElementById('curtain-container');
const animalEmoji = document.getElementById('animal-emoji'); // ここを変更
const bgm = document.getElementById('bgm');
const soundOpen = document.getElementById('sound-open');
const soundPop = document.getElementById('sound-pop');

// 状態管理
let isAnimating = false;
let isBgmPlaying = false;
let nextEmoji = '';

// 🌟 画像集め不要！最強の絵文字リスト
// パソコンやスマホの絵文字パレットから入力するだけで無限に増やせます！
const emojiList = [
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', // 動物
  '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚁', '✈️', '🚀', // 乗り物
  '🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🍍', '🍅', // 食べ物
  '🌻', '🌞', '🌝', '🌙', '⭐' // 自然
];

function prepareNextEmoji() {
  nextEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];
}

prepareNextEmoji();

curtainContainer.addEventListener('click', () => {
  if (isAnimating) return;
  isAnimating = true;

  if (!isBgmPlaying) {
    bgm.play().catch(e => console.log('BGM再生エラー:', e));
    isBgmPlaying = true;
  }

  soundOpen.currentTime = 0;
  soundOpen.play();
  curtainContainer.classList.remove('shake');

  // 画像(src)ではなく、文字(innerText)として絵文字をセット
  animalEmoji.innerText = nextEmoji;
  curtainContainer.classList.add('open');

  setTimeout(() => {
    animalEmoji.classList.remove('hidden');
    animalEmoji.classList.add('bounce-in');
    soundPop.currentTime = 0;
    soundPop.play();
  }, 400);

  setTimeout(() => {
    closeCurtain();
  }, 3500);
});

function closeCurtain() {
  curtainContainer.classList.remove('open');
  
  setTimeout(() => {
    animalEmoji.classList.add('hidden');
    animalEmoji.classList.remove('bounce-in');
    curtainContainer.classList.add('shake');
    isAnimating = false;
    
    prepareNextEmoji();
  }, 800);
}