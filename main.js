(()=>{"use strict";function e(e,t){let s="center";return Number.isInteger((t*t-e)/t)&&(s="left"),Number.isInteger((t*t-e-1)/t)&&(s="right"),0===e&&(s="top-left"),e>0&&e<t&&(s="top"),e===t-1&&(s="top-right"),e===t*t-t&&(s="bottom-left"),e>t*t-t&&(s="bottom"),e===t*t-1&&(s="bottom-right"),s}class t{constructor(){this.boardSize=8,this.container=null,this.boardEl=null,this.cells=[],this.cellClickListeners=[],this.cellEnterListeners=[],this.cellLeaveListeners=[],this.newGameListeners=[],this.saveGameListeners=[],this.loadGameListeners=[]}bindToDOM(e){if(!(e instanceof HTMLElement))throw new Error("container is not HTMLElement");this.container=e}drawUi(t){this.checkBinding(),this.container.innerHTML='\n      <div class="controls">\n        <button data-id="action-restart" class="btn">New Game</button>\n        <button data-id="action-save" class="btn">Save Game</button>\n        <button data-id="action-load" class="btn">Load Game</button>\n      </div>\n      <div class="board-container">\n        <div data-id="board" class="board"></div>\n      </div>\n    ',this.newGameEl=this.container.querySelector("[data-id=action-restart]"),this.saveGameEl=this.container.querySelector("[data-id=action-save]"),this.loadGameEl=this.container.querySelector("[data-id=action-load]"),this.newGameEl.addEventListener("click",(e=>this.onNewGameClick(e))),this.saveGameEl.addEventListener("click",(e=>this.onSaveGameClick(e))),this.loadGameEl.addEventListener("click",(e=>this.onLoadGameClick(e))),this.boardEl=this.container.querySelector("[data-id=board]"),this.boardEl.classList.add(t);for(let t=0;t<this.boardSize**2;t+=1){const s=document.createElement("div");s.classList.add("cell","map-tile",`map-tile-${e(t,this.boardSize)}`),s.addEventListener("mouseenter",(e=>this.onCellEnter(e))),s.addEventListener("mouseleave",(e=>this.onCellLeave(e))),s.addEventListener("click",(e=>this.onCellClick(e))),this.boardEl.appendChild(s)}this.cells=Array.from(this.boardEl.children)}redrawPositions(e){for(const e of this.cells)e.innerHTML="";for(const s of e){const e=this.boardEl.children[s.position],a=document.createElement("div");a.classList.add("character",s.character.type);const i=document.createElement("div");i.classList.add("health-level");const r=document.createElement("div");r.classList.add("health-level-indicator","health-level-indicator-"+((t=s.character.health)<15?"critical":t<50?"normal":"high")),r.style.width=`${s.character.health}%`,i.appendChild(r),a.appendChild(i),e.appendChild(a)}var t}addCellEnterListener(e){this.cellEnterListeners.push(e)}addCellLeaveListener(e){this.cellLeaveListeners.push(e)}addCellClickListener(e){this.cellClickListeners.push(e)}addNewGameListener(e){this.newGameListeners.push(e)}addSaveGameListener(e){this.saveGameListeners.push(e)}addLoadGameListener(e){this.loadGameListeners.push(e)}onCellEnter(e){e.preventDefault();const t=this.cells.indexOf(e.currentTarget);this.cellEnterListeners.forEach((e=>e.call(null,t)))}onCellLeave(e){e.preventDefault();const t=this.cells.indexOf(e.currentTarget);this.cellLeaveListeners.forEach((e=>e.call(null,t)))}onCellClick(e){const t=this.cells.indexOf(e.currentTarget);this.cellClickListeners.forEach((e=>e.call(null,t)))}onNewGameClick(e){e.preventDefault(),this.newGameListeners.forEach((e=>e.call(null)))}onSaveGameClick(e){e.preventDefault(),this.saveGameListeners.forEach((e=>e.call(null)))}onLoadGameClick(e){e.preventDefault(),this.loadGameListeners.forEach((e=>e.call(null)))}static showError(e){alert(e)}static showMessage(e){alert(e)}selectCell(e,t="yellow"){this.deselectCell(e),this.cells[e].classList.add("selected",`selected-${t}`)}deselectCell(e){const t=this.cells[e];t.classList.remove(...Array.from(t.classList).filter((e=>e.startsWith("selected"))))}showCellTooltip(e,t){this.cells[t].title=e}hideCellTooltip(e){this.cells[e].title=""}showDamage(e,t){return new Promise((s=>{const a=this.cells[e],i=document.createElement("span");i.textContent=t,i.classList.add("damage"),a.appendChild(i),i.addEventListener("animationend",(()=>{a.removeChild(i),s()}))}))}setCursor(e){this.boardEl.style.cursor=e}checkBinding(){if(null===this.container)throw new Error("GamePlay not bind to DOM")}}const s={1:"prairie",2:"desert",3:"arctic",4:"mountain"};class a{#e;constructor(){this.#e=new Set}has(e){return this.#e.has(e)}get members(){return this.#e}add(e){if(this.#e.has(e))throw new Error("Ошибка!Такой персонаж уже eсть в команде!");this.#e.add(e)}addAll(e){this.#e=new Set([...this.#e,...e])}delete(e){this.#e.delete(e)}toArray(){return[...this.#e]}[Symbol.iterator](){return this.#e[Symbol.iterator]()}}function i(e,t,s){const a=[],i=function*(e,t){for(;;){const s=Math.floor(Math.random()*e.length),a=Math.floor(Math.random()*t)+1;yield new e[s](a)}}(e,t);for(;a.length<s;)a.push(i.next().value);return a}class r{constructor(e,t="generic"){if(this.level=e,this.attack=0,this.defence=0,this.health=50,this.type=t,"Character"===new.target.name)throw new Error("Нельзя создать объект класса Character")}levelUp(){const e=this.health;this.level+=1,this.health+=80,this.health>100&&(this.health=100),this.attack=Math.max(this.attack,this.attack*((1.8-e)/100)),this.defence=Math.max(this.defence,this.defence*((1.8-e)/100))}}class h extends r{constructor(e){super(e,"bowman"),this.attack=25,this.defence=25,this.distance=2,this.attackRange=2}}class l extends r{constructor(e){super(e,"swordsman"),this.attack=40,this.defence=10,this.distance=4,this.attackRange=1}}class n extends r{constructor(e){super(e,"daemon"),this.attack=10,this.defence=40,this.distance=1,this.attackRange=4}}class o extends r{constructor(e){super(e,"undead"),this.attack=40,this.defence=10,this.distance=4,this.attackRange=1}}class c extends r{constructor(e,t="vampire"){super(e,t),this.attack=25,this.defence=25,this.distance=2,this.attackRange=2}}class d extends r{constructor(e){super(e,"magician"),this.attack=10,this.defence=40,this.distance=1,this.attackRange=4}}class m{constructor(e,t){if(!(e instanceof r))throw new Error("character must be instance of Character or its children");if("number"!=typeof t)throw new Error("position must be a number");this.character=e,this.position=t}}class g{constructor(){this.isUsersTurn=!0,this.level=1,this.allPositions=[],this.points=0,this.statistics=[],this.selected=null}static from(e){return"object"==typeof e?e:null}}const u="auto",S="pointer",C="crosshair",f="not-allowed",p=new t;p.bindToDOM(document.querySelector("#game-container"));const v=new class{constructor(e){this.storage=e}save(e){this.storage.setItem("state",JSON.stringify(e))}load(){try{return JSON.parse(this.storage.getItem("state"))}catch(e){throw new Error("Invalid state")}}}(localStorage),b=new class{constructor(e,t){this.gamePlay=e,this.stateService=t,this.userTeam=new a,this.botTeam=new a,this.botCharacters=[n,o,c],this.userCharacters=[h,l,d],this.gameState=new g}init(){this.gamePlay.drawUi(s[this.gameState.level]),this.userTeam.addAll(i([h,l],1,2)),this.botTeam.addAll(i(this.botCharacters,1,2)),this.addsTheTeamToPosition(this.userTeam,this.getUserStartPositions()),this.addsTheTeamToPosition(this.botTeam,this.getBotStartPositions()),this.gamePlay.redrawPositions(this.gameState.allPositions),this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this)),this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this)),this.gamePlay.addCellClickListener(this.onCellClick.bind(this)),this.gamePlay.addNewGameListener(this.onNewGameClick.bind(this)),this.gamePlay.addSaveGameListener(this.onSaveGameClick.bind(this)),this.gamePlay.addLoadGameListener(this.onLoadGameClick.bind(this))}onCellClick(e){if(5===this.gameState.level||0===this.userTeam.members.size)return;const s=!!this.gameState.selected,a=this.getChar(e),i=a&&this.isBotChar(e);s&&i&&this.isAttack(e)&&this.attack(e,s),s&&this.isMoving(e)&&!a&&this.gameState.isUsersTurn&&this.getUsersTurn(e),!s||this.isMoving(e)||this.isAttack(e)||this.gameState.isUsersTurn&&!this.getChar(e)&&t.showError("Недопустимый ход!"),i&&!this.isAttack(e)&&t.showError("Это не ваш персонаж!"),a&&this.isUserChar(e)&&(this.gamePlay.cells.forEach((e=>e.classList.remove("selected-green"))),this.gamePlay.cells.forEach((e=>e.classList.remove("selected-yellow"))),this.gamePlay.selectCell(e),this.gameState.selected=e)}onCellEnter(e){if(this.getChar(e)&&this.isUserChar(e)&&this.gamePlay.setCursor(S),null!==this.gameState.selected&&!this.getChar(e)&&this.isMoving(e)&&(this.gamePlay.setCursor(S),this.gamePlay.selectCell(e,"green")),this.getChar(e)){const t=this.getChar(e).character,s=`🎖${t.level}⚔${t.attack}🛡${t.defence}❤${t.health}`;this.gamePlay.showCellTooltip(s,e)}null!==this.gameState.selected&&this.getChar(e)&&!this.isUserChar(e)&&this.isAttack(e)&&(this.gamePlay.setCursor(C),this.gamePlay.selectCell(e,"red")),null===this.gameState.selected||this.isAttack(e)||this.isMoving(e)||this.isUserChar(e)||this.gamePlay.setCursor(f)}onCellLeave(e){this.gamePlay.cells.forEach((e=>e.classList.remove("selected-red"))),this.gamePlay.cells.forEach((e=>e.classList.remove("selected-green"))),this.gamePlay.hideCellTooltip(e),this.gamePlay.setCursor(u)}attack(e){if(this.gameState.isUsersTurn){const t=this.getChar(this.gameState.selected).character,s=this.getChar(e).character,a=Math.max(t.attack-s.defence,.1*t.attack);if(!t||!s)return;this.gamePlay.showDamage(e,a).then((()=>{s.health-=a,s.health<=0&&(this.getDeletion(e),this.botTeam.delete(s))})).then((()=>{this.gamePlay.redrawPositions(this.gameState.allPositions)})).then((()=>{this.getGameResult(),this.getBotsResponse()})),this.gameState.isUsersTurn=!1}}getUsersTurn(e){this.getSelectedChar().position=e,this.gamePlay.deselectCell(this.gameState.selected),this.gamePlay.redrawPositions(this.gameState.allPositions),this.gameState.selected=e,this.gameState.isUsersTurn=!1,this.getBotsResponse()}getBotsResponse(){if(this.gameState.isUsersTurn)return;const e=this.gameState.allPositions.filter((e=>e.character instanceof c||e.character instanceof n||e.character instanceof o)),t=this.gameState.allPositions.filter((e=>this.userTeam.has(e.character)));let s=null,a=null;if(0!==e.length&&0!==t.length)if(e.forEach((e=>{const i=this.calcRange(e.position,e.character.attackRange);t.forEach((r=>{for(r of t){i.includes(r.position)&&(s=e,a=r);break}}))})),a){const e=Math.max(s.character.attack-a.character.defence,.1*s.character.attack);this.gamePlay.showDamage(a.position,e).then((()=>{a.character.health-=e,a.character.health<=0&&(this.getDeletion(a.position),this.userTeam.delete(a.character),this.gamePlay.deselectCell(this.gameState.selected),this.gameState.selected=null)})).then((()=>{this.gamePlay.redrawPositions(this.gameState.allPositions),this.gameState.isUsersTurn=!0})).then((()=>{this.getGameResult()}))}else{s=e[Math.floor(Math.random()*e.length)];const t=this.calcRange(s.position,s.character.distance);t.forEach((e=>{this.gameState.allPositions.forEach((s=>{e===s.position&&t.splice(t.indexOf(s.position),1)}))}));const a=this.getRandom(t);s.position=a,this.gamePlay.redrawPositions(this.gameState.allPositions),this.gameState.isUsersTurn=!0}}getGameResult(){0===this.userTeam.members.size&&(this.gameState.statistics.push(this.gameState.points),t.showMessage(`Вы проиграли...Количество набранных очков: ${this.gameState.points}`)),0===this.botTeam.members.size&&4===this.gameState.level&&(this.scoringPoints(),this.gameState.statistics.push(this.gameState.points),t.showMessage(`Поздравляем! Вы победили! Количество набранных очков: ${this.gameState.points}`),this.gameState.level+=1),0===this.botTeam.members.size&&this.gameState.level<=3&&(this.gameState.isUsersTurn=!0,this.scoringPoints(),t.showMessage(`Вы прошли уровень ${this.gameState.level} Количество набранных очков: ${this.gameState.points}`),this.gameState.level+=1,this.gameLevelUp())}gameLevelUp(){this.gameState.allPositions=[],this.userTeam.members.forEach((e=>e.levelUp())),2===this.gameState.level&&(this.userTeam.addAll(i(this.userCharacters,1,1)),this.botTeam.addAll(i(this.botCharacters,2,this.userTeam.members.size))),3===this.gameState.level&&(this.userTeam.addAll(i(this.userCharacters,2,2)),this.botTeam.addAll(i(this.botCharacters,3,this.userTeam.members.size))),4===this.gameState.level&&(this.userTeam.addAll(i(this.userCharacters,3,2)),this.botTeam.addAll(i(this.botCharacters,4,this.userTeam.members.size))),t.showMessage(`Уровень ${this.gameState.level}`),this.gamePlay.drawUi(s[this.gameState.level]),this.addsTheTeamToPosition(this.userTeam,this.getUserStartPositions()),this.addsTheTeamToPosition(this.botTeam,this.getBotStartPositions()),this.gamePlay.redrawPositions(this.gameState.allPositions)}scoringPoints(){this.gameState.points+=this.userTeam.toArray().reduce(((e,t)=>e+t.health),0)}getDeletion(e){const t=this.gameState.allPositions;t.splice(t.indexOf(this.getChar(e)),1)}isMoving(e){if(this.getSelectedChar()){const t=this.getSelectedChar().character.distance;return this.calcRange(this.gameState.selected,t).includes(e)}return!1}isAttack(e){if(this.getSelectedChar()){const t=this.getSelectedChar().character.attackRange;return this.calcRange(this.gameState.selected,t).includes(e)}return!1}getSelectedChar(){return this.gameState.allPositions.find((e=>e.position===this.gameState.selected))}getUserStartPositions(){const e=this.gamePlay.boardSize;this.userPosition=[];for(let t=0,s=1;this.userPosition.length<2*e;t+=e,s+=e)this.userPosition.push(t,s);return this.userPosition}getBotStartPositions(){const e=this.gamePlay.boardSize,t=[];for(let s=e-2,a=e-1;t.length<2*e;s+=e,a+=e)t.push(s,a);return t}getRandom(e){return this.positions=e,this.positions[Math.floor(Math.random()*this.positions.length)]}addsTheTeamToPosition(e,t){const s=[...t];for(const t of e){const e=this.getRandom(s);this.gameState.allPositions.push(new m(t,e)),s.splice(s.indexOf(e),1)}}isUserChar(e){if(this.getChar(e)){const t=this.getChar(e).character;return this.userCharacters.some((e=>t instanceof e))}return!1}isBotChar(e){if(this.getChar(e)){const t=this.getChar(e).character;return this.botCharacters.some((e=>t instanceof e))}return!1}getChar(e){return this.gameState.allPositions.find((t=>t.position===e))}calcRange(e,t){const s=this.gamePlay.boardSize,a=[],i=[],r=[];for(let e=0,t=s-1;i.length<s;e+=s,t+=s)i.push(e),r.push(t);for(let i=1;i<=t;i+=1)a.push(e+s*i),a.push(e-s*i);for(let r=1;r<=t&&!i.includes(e)&&(a.push(e-r),a.push(e-(s*r+r)),a.push(e+(s*r-r)),!i.includes(e-r));r+=1);for(let i=1;i<=t&&!r.includes(e)&&(a.push(e+i),a.push(e-(s*i-i)),a.push(e+(s*i+i)),!r.includes(e+i));i+=1);return a.filter((e=>e>=0&&e<=s**2-1))}onNewGameClick(){this.userTeam=new a,this.botTeam=new a,this.botCharacters=[n,o,c],this.userCharacters=[h,l,d],this.gameState.selected=null,this.gameState.level=1,this.gameState.points=0,this.gameState.allPositions=[],this.gameState.isUsersTurn=!0,this.gamePlay.drawUi(s[this.gameState.level]),this.userTeam.addAll(i([h,l],1,2)),this.botTeam.addAll(i(this.botCharacters,1,2)),this.addsTheTeamToPosition(this.userTeam,this.getUserStartPositions()),this.addsTheTeamToPosition(this.botTeam,this.getBotStartPositions()),this.gamePlay.redrawPositions(this.gameState.allPositions),t.showMessage(`Уровень ${this.gameState.level}`)}onSaveGameClick(){this.stateService.save(g.from(this.gameState)),t.showMessage("Игра сохранена")}onLoadGameClick(){t.showMessage("Игра загружена");const e=this.stateService.loadedState();e||t.showError("Ошибка загрузки"),this.gameState.isUsersTurn=e.isUsersTurn,this.gameState.level=e.level,this.gameState.allPositions=[],this.gameState.points=e.points,this.gameState.statistics=e.statistics,this.gameState.selected=e.selected,this.userTeam=new a,this.botTeam=new a,e.allPositions.forEach((e=>{let t;switch(e.character.type){case"swordsman":t=new l(e.character.level),this.userTeam.add([t]);break;case"bowman":t=new h(e.character.level),this.userTeam.add([t]);break;case"magician":t=new d(e.character.level),this.userTeam.add([t]);break;case"undead":t=new o(e.character.level),this.botTeam.add([t]);break;case"vampire":t=new c(e.character.level),this.botTeam.add([t]);break;case"daemon":t=new n(e.character.level),this.botTeam.add([t])}t.health=e.character.health,this.gameState.allPositions.push(new m(t,e.position))})),this.gamePlay.drawUi(s[this.gameState.level]),this.gamePlay.redrawPositions(this.gameState.allPositions)}}(p,v);b.init()})();