const asyncFunc = function() {
    if (typeof process === 'object' && process !== null && typeof (process.nextTick) === 'function') {
        return process.nextTick
    }
    if (typeof setImmediate === 'function') {
        return setImmediate
    }
    return setTimeout
}()

const PENDING = 'PENDING'

const RESOLVED = 'RESOLVED'

const REJECTED = 'REJECTED'


/**
 * [MiniPromise Constructor]
 * @param {[function]} executor [execute as normal]
 */
function MiniPromise(executor) {
    this.state = PENDING
    this.executedData = undefined
    this.multiPromise2 = []

    // it's not correct
    const resolve = (value) => {
        settlePromise(this, RESOLVED, value)
    }

    const reject = (reason) => {
        settlePromise(this, REJECTED, reason)
    }

    executor(resolve, reject)
}

MiniPromise.prototype.then = function(resolvedCallback, rejectedCallback) {
    let promise2 = new MiniPromise(() => {})

    if (typeof resolvedCallback === 'function') {
        promise2.resolvedCallback = resolvedCallback
    }

    if (typeof rejectedCallback === 'function') {
        promise2.rejectedCallback = rejectedCallback
    }

    if (this.state === PENDING) {
        this.multiPromise2.push(promise2)
    } else if (this.state === RESOLVED) {
        asyncProcessCallback(this, promise2, promise2.resolvedCallback)
    } else if (this.state === REJECTED) {
        asyncProcessCallback(this, promise2, promise2.rejectedCallback)
    }

    return promise2
}

/**
 * [settlePromise description]
 * @param  {[object, MiniPromise]} promise       [description]
 * @param  {[string]} executedState [description]
 * @param  {[type]} executedData  [description]
 * @return {[type]}               [description]
 */
function settlePromise(promise, executedState, executedData) {
    if (promise.state !== PENDING) {
        return
    }

    promise.state = executedState
    promise.executedData = executedData

    if (promise.multiPromise2.length > 0) {
        const callbackType = executedState === RESOLVED ? 'resolvedCallback' : 'rejectedCallback'

        for (promise2 of promise.multiPromise2) {
            asyncProcessCallback(promise, promise2, promise2[callbackType])
        }
    }
}

function asyncProcessCallback(promise, promise2, callback) {
    asyncFunc(() => {
        if (!callback) {
            settlePromise(promise2, promise.state, promise.executedData)
            return
        }

        let x
        try {
            x = callback(promise.executedData)
        } catch (e) {
            settlePromise(promise2, REJECTED, e)
            return
        }

        settleWidthX(promise2, x)
    })
}

function settleWidthX(p, x) {
    if (x === p && x) {
        settlePromise(p, REJECTED, new TypeError('promise_circular_chain'))
        return
    }

    var xthen, type = typeof x
    if (x !== null && (type === 'function' || type === 'function')) {
        try {
            xthen = x.then
        } catch (e) {
            settlePromise(p, REJECTED, e)
            return
        }

        if (typeof xthen === 'function') {
            settleXthen(p, x, xthen)
        } else {
            settlePromise(p, RESOLVED, x)
        }
    } else {
        settlePromise(p, RESOLVED, x)
    }

    return p
}

function settleXThen(p, x, then) {
    try {
        xthen.call(x, function(y) {
            if (!x) {
                return
            }
            x = null
        }, function(r) {
            if (!x) return
            x = null
            settlePromise(p, REJECTED, r)
        })
    } catch (e) {
        if (x) {
            settlePromise(p, REJECTED, e)
            x = null
        }
    }
}

new MiniPromise((resolve) => {
    console.log('a')
    resolve('b')
    console.log('c')
}).then(data => {
    console.log(data)
})
