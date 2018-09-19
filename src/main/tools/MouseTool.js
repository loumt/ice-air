"use strict";

/**
 * 实时鼠标位置获取
 */
class MouseTool {
    constructor() {
        this.X = 0;
        this.Y = 0;

        this.mouse = require('win-mouse')();
        this.init()
    }

    init() {
        this.mouse.on('move', (x, y) => {
            this.X = x;
            this.Y = y;
        });

        this.mouse.on('right-down', () => {
            // console.log('right-down')
        })

        this.mouse.on('left-down', () => {
            // console.log('left-down')
        })
    }

    getX() {
        return this.X
    }

    getY() {
        return this.Y
    }

    getPosition() {
        return {
            x: this.X,
            y: this.Y
        }
    }

}

module.exports = new MouseTool();

//move, left-down, left-up, left-drag, right-up, right-down and right-drag

// mouse.on('right-down',()=>{
//     console.log('right-down')
// })
// mouse.on('left-down',()=>{
//     console.log('left-down')
// })
// mouse.on('left-drag',()=>{
//     console.log('left-drag')
// })
// mouse.on('right-drag',()=>{
//     console.log('right-drag')
// })
// mouse.on('left-up',()=>{
//     console.log('left-up')
// })
// mouse.on('right-up',()=>{
//     console.log('right-up')
// })
