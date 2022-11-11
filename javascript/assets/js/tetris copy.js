const tetrisWrap = document.querySelector(".tetris__wrap");
const playground = tetrisWrap.querySelector(".playground > ul");

// 변수 설정
let rows = 20; // 수를 변경하면 for 안의 반복의 변경
let cols = 12; // 수를 변경하면 for 안의 반복의 변경
let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;

// 블록 정보
const movingItem = {
  type: "Imino",
  directioin: 0, //블록 모양
  top: 0,
  left: 4,
};

// 블록 좌표값
const blocks = {
  Tmino: [
    [
      [2, 1],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [1, 2],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [1, 2],
      [0, 1],
      [2, 1],
      [1, 1],
    ],
    [
      [2, 1],
      [1, 2],
      [1, 0],
      [1, 1],
    ],
  ],
  Imino: [
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ],
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ],
  ],
  Omino: [
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
  ],
  Zmino: [
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
    ],
    [
      [1, 0],
      [0, 1],
      [1, 1],
      [0, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
    ],
    [
      [1, 0],
      [0, 1],
      [1, 1],
      [0, 2],
    ],
  ],
  Smino: [
    [
      [1, 0],
      [2, 0],
      [0, 1],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 2],
    ],
    [
      [1, 0],
      [2, 0],
      [0, 1],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 2],
    ],
  ],
  Jmino: [
    [
      [0, 2],
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 0],
      [1, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
    ],
  ],
  Lmino: [
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [0, 1],
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 0],
      [2, 1],
    ],
  ],
};

// 시작하기 크기 조정 위해 칸에 맞는 수
function init() {
  tempMovingItem = { ...movingItem };

  prependNewLine(); //블록 라인 만들기
  //   renderBlocks(); //블록 출력하기
  generateNewBlock(); //블록 만들기
}

// 블록 만들기
function prependNewLine() {
  for (let i = 0; i < rows; i++) {
    const li = document.createElement("li");
    const ul = document.createElement("ul");
    for (let j = 0; j < cols; j++) {
      const matrix = document.createElement("li");
      ul.prepend(matrix);
    }

    li.prepend(ul);
    playground.prepend(li);
  }
}

// 블록 출력하기
function renderBlocks(moveType = "") {
  //   const ty = tempMovingItem.type;
  //   const di = tempMovingItem.directioin;
  //   const to = tempMovingItem.top;
  //   const le = tempMovingItem.left;

  const { type, directioin, top, left } = tempMovingItem;

  const movingBlocks = document.querySelectorAll(".moving");
  movingBlocks.forEach((moving) => {
    moving.classList.remove(type, "moving");
  });

  //.some() forEach는 반복하면 중간에 안멈추고 계속 반복. some은 그렇지 않음. 반복을 무한히 하지 않고. 리턴으로 마쳐야함.
  blocks[type][directioin].some((block) => {
    const x = block[0] + left; // 2 0 1 1
    const y = block[1] + top; // 1 1 0 1

    const target = playground.childNodes[y]
      ? playground.childNodes[y].childNodes[0].childNodes[x]
      : null;
    const isAvailable = checkEmpty(target);

    if (isAvailable) {
      target.classList.add(type, "moving"); //출력
    } else {
      tempMovingItem = { ...movingItem };

      setTimeout(() => {
        renderBlocks();
        if (moveType === "top") {
          seizeBlock();
        }
      }, 0);

      return true;
    }

    //console.log({ playground });
  });
  movingItem.left = left;
  movingItem.top = top;
  movingItem.directioin = directioin;
}

// 블록 감지하기
function seizeBlock() {
  const movingBlocks = document.querySelectorAll(".moving");
  movingBlocks.forEach((moving) => {
    moving.classList.remove("moving");
    moving.classList.add("seized");
  });

  checkMatch();
}
// 한줄 제거하기
function checkMatch() {
  generateNewBlock();
}

// 새로운 블록 만들기
function generateNewBlock() {
  clearInterval(downInterval);

  downInterval = setInterval(() => {
    moveBlock("top", 1);
  }, duration);

  const blockArray = Object.entries(block);
  const randomIndex = Math.floor(Math.random() * blockArray.length);
  movingItem.type = blockArray[randomIndex][0];
  movingItem.top = 0;
  movingItem.left = 6;
  movingItem.directioin = 0;
  tempMovingItem = { ...movingItem };
  renderBlocks();
}

//빈칸 확인하기
function checkEmpty(target) {
  if (!target || target.classList.contains("seized")) {
    return false;
  }
  return true;
}

// 블록 움직이기
function moveBlock(moveType, amount) {
  tempMovingItem[moveType] += amount;
  renderBlocks(moveType);
}

//모양 바꾸기
function changeDirection() {
  const directioin = tempMovingItem.directioin;
  directioin === 3
    ? (tempMovingItem.directioin = 0)
    : (tempMovingItem.directioin += 1);
  renderBlocks();
}

//빨리 내리기
function dropBlock() {
  clearInterval(downInterval);

  downInterval = setInterval(() => {
    moveBlock("top", 1);
  }, 10);
}

// 이벤트
document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 39:
      moveBlock("left", 1);
      break;
    case 37:
      moveBlock("left", -1);
      break;
    case 40:
      moveBlock("top", 1);
      break;
    case 38:
      changeDirection();
      break;
    case 32:
      dropBlock();
      break;
    default:
      break;
  }
});

init();
