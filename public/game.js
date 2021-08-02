
export default function createGame() {

    const state = {
        observer: []
    }

    function subscribe(observerFunction) {
        state.observer.push(observerFunction)
    }


    const GameObjects = {
        collectiblesColor: 'green',
        DangersColor: 'red',

        Players:{},
        Collectibles: {

            'col1': {
                pos: {
                    x: 1,
                    y: 6
                }
            },
            'col2': {
                pos: {
                    x: 8,
                    y: 8
                }
            }
        },
        Dangers: {

            'dan1': {
                pos: {
                    x: 8,
                    y: 10
                }
            }
        }
    }



    function notifyAll(source) {
        for (var observerFunction of state.observer) {
            console.log(`<- ${source} -> Notificando `+ state.observer.length+ (state.observer.length>1?" observadores!!":" observador!!"));
            console.log(GameObjects.Players);
            observerFunction(GameObjects);
        }
    }


    function update(GameObjects){
        this.GameObjects = GameObjects;
        notifyAll('update')
    }


    function AddPlayer(Id, color, pos) {
        GameObjects.Players[Id] = {
            color,
            pos
        }
        notifyAll('AddPlayer')
    }

    function removePlayer(Id) {
        delete GameObjects.Players[Id]
        notifyAll('removePlayer')
    }



    function AddCollectibles(Id, pos) {
        GameObjects.Collectibles[Id] = {
            pos
        }
        notifyAll('AddCollectibles')
    }

    function AddDangers(Id, pos) {
        GameObjects.Dangers[Id] = {
            pos
        }
        notifyAll('AddDangers')
    }


    function ColiderDetector({ player }) {
        const players = GameObjects.Players
        const collectibles = GameObjects.Collectibles
        const dangers = GameObjects.Dangers


        for (let collectible in collectibles) {
            if (players[player].pos.x == collectibles[collectible].pos.x && players[player].pos.y == collectibles[collectible].pos.y) {
                //colisão com coletavel faça depois algo que pontue o jogador no futuro
                delete collectibles[collectible];
            }
        }

        for (let danger in dangers) {
            if (players[player].pos.x == dangers[danger].pos.x && players[player].pos.y == dangers[danger].pos.y) {
                //colisão com coletavel faça depois algo que pontue o jogador no futuro
                delete dangers[danger];
            }
        }
        notifyAll('ColiderDetector')
    }

    function MovePlayer(command) {
        const gameWidth = 20;
        const gameHeight = 20;
        const player = GameObjects.Players[command.player];


        switch (command.KeyPressed) {
            case 'ArrowUp':
                if (player.pos.y > 0) {
                    player.pos.y -= 1;
                }
                break;
            case 'ArrowDown':
                if (player.pos.y < gameHeight - 1) {
                    player.pos.y += 1;
                }
                break;
            case 'ArrowLeft':
                if (player.pos.x > 0) {
                    player.pos.x -= 1;
                }
                break;
            case 'ArrowRight':
                if (player.pos.x < gameWidth - 1) {
                    player.pos.x += 1;
                }
                break;
        }
        notifyAll('MovePlayer')
    }

    return {
        MovePlayer,
        AddPlayer,
        AddCollectibles,
        AddDangers,
        ColiderDetector,
        GameObjects,
        subscribe,
        notifyAll,
        update,
        removePlayer
    }
}

