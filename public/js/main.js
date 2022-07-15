import TowerDefenceGame from "./classes/games/TowerDefenceGame.js";

const CANVAS = document.querySelector('canvas')

const DATA = {
    maps: ["map1"],
    enemies: {
        orcKing: {
            imgSrc: "/images/orc.png",
            radius: 50,
            frames: {
                max: 7,
                duration: 10
            },
            speed: 0.3,
            damage: -3,
            lives: 100
        },
        orc: {
            imgSrc: "/images/orc.png",
            radius: 25,
            frames: {
                max: 7,
                duration: 6
            },
            speed: 1,
            damage: -1,
            lives: 10
        }
    },
    waves: {
        map1: [
            {
                groups: [
                    { qty: 5, type: "orc", spacing: 64 }
                ],
                delay: 10000
            },
            {
                groups: [
                    { qty: 15, type: "orc", spacing: 64 }
                ],
                delay: 15000
            },
            {
                groups: [
                    { qty: 1, type: "orcKing", path: 0 }
                ],
                delay: 30000
            },
            {
                groups: [
                    { qty: 1, type: "orcKing", path: 0 },
                    { delay: 2500, qty: 15, type: "orc", spacing: 64 }
                ],
                delay: 60000
            },
            {
                groups: [
                    { qty: 15, type: "orc", spacing: 64 },
                    { qty: 1, type: "orcKing", path: 0 },
                    { delay: 15000, qty: 15, type: "orc", spacing: 64 },
                    { qty: 3, type: "orcKing", path: 0, spacing: 100 }
                ]
            }
        ]
    },
    user: {
        lives: 2000,
        cash: 1500
    }
}

const GAME = new TowerDefenceGame(CANVAS, {
    data: DATA
})

GAME.loadMap(0)