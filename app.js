// console.log('loaded js')

// function doSomething(word) {
//   console.log('did something', word);
// }

// let doSomethingElse = function () { console.log('did something else'); }

// let thing
// thing = () => {
//   console.log('What am I doing?');
// }


// function runner(fn, whatever) {
//   console.log('running', fn);
//   fn(whatever)
// }

// // runner(thing)
// // runner(doSomething, 'running')

// let arr = ['sup', 'hello', 'howdy']

// for (let i = 0; i < arr.length; i++) {
//   let greeting = arr[i]
//   runner(doSomething, greeting)
// }

// #region
function timer(seconds) {

  // for (let i = 0; i < seconds; i++) {
  //   console.log(i);
  // }

  // NOTE runs code after set delay
  // setTimeout(function () { console.log('done', seconds) }, seconds * 1000)
  let interval = setInterval(function () { console.log('done', seconds) }, seconds * 1000)
  setTimeout(() => clearInterval(interval), seconds * 10000)
  // clearInterval()
}

// timer(2)
// timer(7)
// timer(12)
// timer(25)
// #endregion



const animals = [
  {
    name: 'koko',
    hunger: 100,
    emoji: '🦍',
    status: '😊'
  },
  {
    name: 'tanya',
    hunger: 100,
    emoji: '🐅',
    status: '😊'
  },
  {
    name: 'george',
    hunger: 100,
    emoji: '🦒',
    status: '😊'
  },
  {
    name: 'ricky',
    hunger: 100,
    emoji: '🐬',
    status: '😊'
  },
  {
    name: 'otto',
    hunger: 100,
    emoji: '🦦',
    status: '😊'
  },
  {
    name: 'andy',
    hunger: 100,
    emoji: '🐍',
    status: '😊'
  },
  {
    name: 'sandy',
    hunger: 100,
    emoji: '🐌',
    status: '😊'
  },
  {
    name: 'teddy',
    hunger: 100,
    emoji: '🦔',
    status: '😊'
  },
  {
    name: 'freddy',
    hunger: 100,
    emoji: '🦩',
    status: '😊'
  },
  {
    name: 'john',
    hunger: 100,
    emoji: '🦣',
    status: '😊'
  }
]

let lastPaycheck = 0
let money = 200


function feedKoko() {
  let animal = animals.find(a => a.name == 'koko')
  animal.hunger += 5
  console.log(animal);
}

function feedAnimal(name) {
  let animal = animals.find(a => a.name == name)
  // NOTE if makes sure this only happens if they aren't dead
  if (animal.status != '💀') {
    animal.hunger += 5
    // NOTE for simple ifs you don't need {} they can run on the same line
    if (animal.hunger >= 100) animal.hunger = 100
    console.log(animal);
    updateAnimals()
  }
}

function hunger() {
  animals.forEach(a => {
    a.hunger -= 3
    if (a.hunger <= 0) a.hunger = 0
  })
  // console.log(animals);
  updateAnimals()
}


function drawMoney(paycheck, direction) {
  let payElm = document.getElementById('paycheck')
  let moneyElm = document.getElementById('money')
  payElm.innerHTML = `<div class="dollar-${direction}">💵${paycheck}</div>`
  moneyElm.innerText = '$' + money
}

function updateAnimals() {
  animals.forEach(a => {
    updateStatus(a.name)
    let animalElm = document.getElementById(a.name)
    // console.log(animalElm);
    // update bar
    let hungerBar = animalElm.querySelector('.progress-bar')
    // console.log(hungerBar);
    hungerBar.style.width = a.hunger + '%'

    // update status
    let statusView = animalElm.querySelector('.status')
    statusView.innerText = `${a.name} | ${a.status}`

    // keel the animal
    if (a.status == '💀') {
      let mrq1 = animalElm.querySelector('.mrq1')
      let mrq2 = animalElm.querySelector('.mrq2')
      let emoji = animalElm.querySelector('.animal')
      emoji.classList.add('dead')
      mrq1.stop()
      mrq2.stop()

    }
  })
}

function updateStatus(name) {
  let animal = animals.find(a => a.name == name)
  if (animal.hunger > 50) {
    animal.status = '😊'
  } else if (animal.hunger > 20) {
    animal.status = '😐'
  } else if (animal.hunger > 0) {
    animal.status = '😖'
  } else {
    animal.status = '💀'
  }
}

function getPaid() {
  let paycheck = 0
  animals.forEach(a => {
    switch (a.status) {
      case '😊':
        paycheck += 10
        break
      case '😐':
        paycheck += 8
        break
      case '😖':
        paycheck += 5
        break
      case '💀':
        paycheck += 0
        break
    }
  })
  console.log('got paid', paycheck);
  money += paycheck
  lastPaycheck = paycheck
  // NOTE target the audio tag and play it
  document.getElementById('ka-ching').play()
  drawMoney(paycheck, 'up')
}

function stopContext() {
  window.event.preventDefault()
}

function rightClick(name) {
  window.event.preventDefault()
  console.log('right click', name);
  let animal = animals.find(a => a.name == name)

  // Super feed!
  // if (money >= 100 && animal.status != '💀') {
  //   animal.hunger = 100
  //   money -= 100
  //   drawMoney()
  // }

  // hire help
  if (money >= 25 && animal.status != '💀') {
    money -= 25
    hireHelp(name)
    drawMoney(25, 'down')
  }
}

function hireHelp(name) {
  console.log('help hired for', name);
  // start help
  let helpInterval = setInterval(() => {
    feedAnimal(name)
  }, 3000)
  // stop help
  setTimeout(() => {
    console.log('help stopped for', name);
    clearInterval(helpInterval)
  }, 30000)
}


setInterval(getPaid, 12000)
setInterval(hunger, 1000)