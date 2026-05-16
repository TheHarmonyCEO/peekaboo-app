/* 👇 一番下に追加してください */

/* === ひらがなボタンのスタイル === */
#word-button {
  position: absolute;
  bottom: 12%; /* 画面の下の方に配置 */
  z-index: 20; /* カーテンより手前に表示 */
  background-color: #ffffff;
  color: #ff4757;
  font-size: 8vmin;
  font-weight: bold;
  padding: 15px 40px;
  border: 5px solid #ff4757;
  border-radius: 50px;
  box-shadow: 0 8px 0 #ff4757; /* ぷっくりした立体感 */
  cursor: pointer;
  user-select: none;
}

/* ボタンが押された時の凹むアニメーション */
#word-button:active {
  transform: translateY(8px);
  box-shadow: 0 0 0 #ff4757;
}

/* ボタン出現時のアニメーション（下からフワッと） */
.slide-up {
  animation: slideUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes slideUp {
  0% { transform: translateY(50px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}