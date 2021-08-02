

export default function renderScreen(ctx, GameObjects, gameScreen,id) {
    const gameWidth = parseInt(gameScreen.getAttribute('width'));
    const gameHeight = parseInt(gameScreen.getAttribute('height'));

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, gameWidth, gameHeight);

    for (let player in GameObjects.Players) {
        //current player has diferent color
        for(player in GameObjects.Players){
            if(GameObjects.Players[player] != GameObjects.Players[id]){
            ctx.fillStyle = 'gray'
            ctx.fillRect(GameObjects.Players[player].pos.x, GameObjects.Players[player].pos.y, 1, 1)
            }else{
            ctx.fillStyle = 'blue'
            ctx.fillRect(GameObjects.Players[player].pos.x, GameObjects.Players[player].pos.y, 1, 1)
            }
        }
        
    }

    for (let collectible in GameObjects.Collectibles) {
        ctx.fillStyle = GameObjects.collectiblesColor
        ctx.fillRect(GameObjects.Collectibles[collectible].pos.x, GameObjects.Collectibles[collectible].pos.y, 1, 1)
    }

    for (let danger in GameObjects.Dangers) {
        ctx.fillStyle = GameObjects.DangersColor
        ctx.fillRect(GameObjects.Dangers[danger].pos.x, GameObjects.Dangers[danger].pos.y, 1, 1)
    }

    requestAnimationFrame(() => {
        renderScreen(ctx, GameObjects,gameScreen,id)
    })

}