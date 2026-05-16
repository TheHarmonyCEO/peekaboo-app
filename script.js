// 要素の取得
const curtainContainer = document.getElementById('curtain-container');
const animalEmoji = document.getElementById('animal-emoji');
const bgm = document.getElementById('bgm');
const soundOpen = document.getElementById('sound-open');
const soundPop = document.getElementById('sound-pop');

// 状態管理
let isAnimating = false;
let isBgmPlaying = false;
let nextEmoji = '';

// 🌟 1歳半の娘さん専用・特大絵文字リスト
const emojiList = [
  // 動物・生き物
  '🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐻‍❄️','🐨','🐯','🦁','🐮','🐷','🐽','🐸','🐵','🐒','🐧','🐦','🐤','🐣','🐥','🦆','🦅','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🪱','🐛','🦋','🐌','🐞','🐜','🪰','🪲','🐢','🐍','🦎','🦖','🦕','🐙','🦑','🦐','🦞','🦀','🐡','🐠','🐟','🐬','🐳','🐋','🦈','🦭','🐊','🐅','🐆','🦓','🦍','🦧','🐘','🦛','🦏','🐪','🐫','🦒','🦘','🐃','🐂','🐄','🐎','🐖','🐏','🐑','🦙','🐐','🦌','🐕','🐩','🐈','🐓','🦃','🦚','🦜','🦢','🦩','🕊️','🐇','🦝','🦨','🦡','🦫','🦦','🦥','🐁','🐀','🐿️','🦔',
  
  // 食べ物
  '🍏','🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍈','🍒','🍑','🥭','🍍','🥥','🥝','🍅','🍆','🥑','🥦','🥬','🥒','🌽','🥕','🥔','🍠','🥐','🥯','🍞','🥖','🥨','🧀','🥚','🍳','🥞','🧇','🥓','🥩','🍗','🍖','🌭','🍔','🍟','🍕','🥪','🌮','🌯','🥗','🥘','🍝','🍜','🍲','🍛','🍣','🍱','🥟','🍤','🍙','🍚','🍘','🍥','🍢','🍡','🍧','🍨','🍦','🥧','🧁','🍰','🎂','🍮','🍭','🍬','🍫','🍿','🍩','🍪','🌰','🥜','🍯','🥛','🍼','🧃',
  
  // 乗り物
  '🚗','🚕','🚙','🚌','🚎','🏎️','🚓','互','🚑','🚒','🚐','🛻','🚚','🚛','🚜','🛴','🚲','🛵','🏍️','🛺','🚨','🚂','🚆','🚅','🚄','🚈','🚝','🚞','🚋','🚃','🚁','🛩️','✈️','🚀','🛸','🛶','⛵','🚤','🛥️','🛳️','⛴️','🚢',
  
  // 🌟【新規】分かりやすい表情（にこにこ、えーん、ぷんぷん、おねむ など）
  '😀','😃','😄','😊','🥰','😋','😢','😭','😡','😠','😱','😮','😴',

  // 🌟【新規】ぶんぼうぐ・身の回りのもの
  '✂️','📎','✏️','📓','📖',

  // 🌟【新規】お皿・フォークなどの食器
  '🍴','🥄','🍽️','🥣',

  // おばけ・おもちゃ・自然
  '👻','👽','👾','🤖','💩','🎃','🎈','🎏','🎀','🎁','🧸','🪁','🪀','🎨','⚽','⚾','🏀','🎵','🥁','🎷','🎺','🎸','🌞','🌝','⭐','🌟','🌠','☁️','⛄','🔥','🌈','☂️'
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
    animalImg = animalEmoji.classList.remove('bounce-in'); // 安全のためリセット
    curtainContainer.classList.add('shake');
    isAnimating = false;
    
    prepareNextEmoji();
  }, 800);
}