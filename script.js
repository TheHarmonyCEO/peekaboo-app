// 要素の取得
const curtainContainer = document.getElementById('curtain-container');
const animalEmoji = document.getElementById('animal-emoji');
const wordButton = document.getElementById('word-button');
const bgm = document.getElementById('bgm');
const soundOpen = document.getElementById('sound-open');
const soundPop = document.getElementById('sound-pop');

// 状態管理
let isAnimating = false;
let isBgmPlaying = false;
let currentItem = null;

// 絵文字とひらがなの辞書リスト
const dictionary = [
  { emoji: '🐶', name: 'いぬ' }, { emoji: '🐱', name: 'ねこ' }, { emoji: '🐭', name: 'ねずみ' },
  { emoji: '🐰', name: 'うさぎ' }, { emoji: '🦊', name: 'きつね' }, { emoji: '🐻', name: 'くま' },
  { emoji: '🐼', name: 'ぱんだ' }, { emoji: '🐯', name: 'とら' }, { emoji: '🦁', name: 'らいおん' },
  { emoji: '🐮', name: 'うし' }, { emoji: '🐷', name: 'ぶた' }, { emoji: '🐸', name: 'かえる' },
  { emoji: '🐵', name: 'さる' }, { emoji: '🐧', name: 'ぺんぎん' }, { emoji: '🐤', name: 'ひよこ' },
  { emoji: '🐘', name: 'ぞう' }, { emoji: '🦒', name: 'きりん' },
  { emoji: '🍎', name: 'りんご' }, { emoji: '🍊', name: 'みかん' }, { emoji: '🍌', name: 'ばなな' },
  { emoji: '🍉', name: 'すいか' }, { emoji: '🍇', name: 'ぶどう' }, { emoji: '🍓', name: 'いちご' },
  { emoji: '🍅', name: 'とまと' }, { emoji: '🍙', name: 'おにぎり' }, { emoji: '🍞', name: 'ぱん' },
  { emoji: '🚗', name: 'くるま' }, { emoji: '🚌', name: 'ばす' }, { emoji: '🚓', name: 'ぱとかー' },
  { emoji: '🚑', name: 'きゅうきゅうしゃ' }, { emoji: '🚒', name: 'しょうぼうしゃ' }, { emoji: '✈️', name: 'ひこうき' },
  { emoji: '🚂', name: 'きしゃ' }, { emoji: '⛵', name: 'ふね' },
  { emoji: '🌻', name: 'ひまわり' }, { emoji: '⭐', name: 'ほし' }, { emoji: '🎈', name: 'ふうせん' },
  { emoji: '✂️', name: 'はさみ' }, { emoji: '🥄', name: 'すぷーん' }
];

function prepareNextItem() {
  currentItem = dictionary[Math.floor(Math.random() * dictionary.length)];
}

prepareNextItem();

// スマホに言葉を喋らせる魔法の関数
function speakWord(text) {
  window.speechSynthesis.cancel(); 
  const uttr = new SpeechSynthesisUtterance(text);
  uttr.lang = 'ja-JP';
  uttr.rate = 1.0;
  uttr.pitch = 1.5;
  window.speechSynthesis.speak(uttr);
}

// ボタンを押した時の処理（喋る ＆ ランダム方向にジャンプ！）
wordButton.addEventListener('click', (e) => {
  speakWord(currentItem.name);
  
  // 🎲 ランダムなジャンプ方向を計算
  const randomX = (Math.random() - 0.5) * 120; 
  const randomY = -(Math.random() * 30 + 40); 

  // CSSの変数に値をセット
  animalEmoji.style.setProperty('--jump-x', `${randomX}px`);
  animalEmoji.style.setProperty('--jump-y', `${randomY}px`);

  // アニメーションを一度リセットして実行
  animalEmoji.classList.remove('joyful-jump');
  void animalEmoji.offsetWidth; 
  animalEmoji.classList.add('joyful-jump');
  
  // ボタン自体のアニメーション
  wordButton.classList.remove('slide-up');
  void wordButton.offsetWidth; 
  wordButton.classList.add('slide-up');
});

curtainContainer.addEventListener('click', () => {
  if (isAnimating) return;
  isAnimating = true;

  if (!isBgmPlaying) {
    bgm.play().catch(e => console.log('BGMなし（無視します）'));
    isBgmPlaying = true;
  }

  soundOpen.currentTime = 0;
  soundOpen.play().catch(e => console.log('開く音なし（無視します）'));
  
  curtainContainer.classList.remove('shake');

  animalEmoji.innerText = currentItem.emoji;
  wordButton.innerText = currentItem.name;
  
  curtainContainer.classList.add('open');

  setTimeout(() => {
    animalEmoji.classList.remove('hidden');
    animalEmoji.classList.add('bounce-in');
    
    wordButton.classList.remove('hidden');
    wordButton.classList.add('slide-up');

    soundPop.currentTime = 0;
    soundPop.play().catch(e => console.log('ポップ音なし（無視します）'));
  }, 400);

  setTimeout(() => {
    closeCurtain();
  }, 5000); 
});

function closeCurtain() {
  curtainContainer.classList.remove('open');
  wordButton.classList.add('hidden');
  wordButton.classList.remove('slide-up');
  
  setTimeout(() => {
    animalEmoji.classList.add('hidden');
    animalEmoji.classList.remove('bounce-in');
    animalEmoji.classList.remove('joyful-jump'); // ジャンプ用クラスもここで綺麗にお片付け
    curtainContainer.classList.add('shake');
    isAnimating = false;
    
    prepareNextItem();
  }, 800);
}