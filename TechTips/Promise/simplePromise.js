/**
 * 2017.01.11
 */

const STATELIST = {
    pending: 1,
    resolved: 2,
    rejected: 4,
    delegated: 8
}

const KEYWORDS = {
    '2': '_resolve',
    '4': '_reject'
}

let LAST_ERROR
const IS_ERROR = 'IS_ERROR'
const IS_FINISHED = 'IS_FINISHED'
const noop = () => {}

/**
 * [Get MicroTask process.nextTick || setImmediate || setTimeout]
 * @return {[function]} [MicroTask]
 */
const asyncFn = function() {
    if (typeof process === 'object' && process !== null && typeof process.nextTick === 'function') {
        return process.nextTick
    }
    if (typeof(setImmediate) === 'function') {
        return setImmediate
    }
    return setTimeout
}()

/**
 * [tryCallOne description]
 * @param  {Function} fn [description]
 * @param  {[type]}   a  [description]
 * @return {[type]}      [description]
 */
function tryCallOne(fn, a) {
    try {
        return fn(a)
    } catch (err) {
        LAST_ERROR = err
        return IS_ERROR
    }
}

/**
 * [tryCallTwo description]
 * @param  {Function} fn [description]
 * @param  {[type]}   a  [description]
 * @param  {[type]}   b  [description]
 * @return {[type]}      [description]
 */
function tryCallTwo(fn, a, b) {
    try {
        return fn(a, b)
    } catch (err) {
        LAST_ERROR = err
        return IS_ERROR
    }
}

/**
 * [resolve description]
 * @param  {[type]}   ctx [description]
 * @param  {Function} fn  [description]
 * @return {[type]}       [description]
 */
function resolve(ctx, fn) {
    if (fn === noop) {
        return
    }
    const result = tryCallTwo(fn, ctx._resolve.bind(ctx), ctx._reject.bind(ctx))
    result === IS_ERROR && ctx._reject(LAST_ERROR)
}

function tryResolve(ctx, result) {}

/**
 * 在以下时刻：
 * a. 在promise内部状态改变时
 * b. 在新增next／then时
 * c. then／catch返回之后，生成新的promise，将后续的then／catch传递给promise
 * 可能需要去执行this._next里面的回调函数
 */

function _checkState(ctx) {
    if ((ctx._state !== STATELIST.pending) && ctx._nextCount) {
        asyncFn(function() {
            for (let i = 0, len = ctx.next.length; i < len; i++) {
                ctx.next[i]._awake(ctx._state, ctx._result)
            }
            ctx.next = null
            ctx._nextCount = false
        })
    }
}

function _next(self, keyword, fn) {
    while (self._state === STATELIST.delegated) {
        self = self._result
    }
    const nextPromise = new SimplePromise(noop)
    nextPromise._awakeType = keyword
    nextPromise._awakeFunc = fn
    if (self._state !== STATELIST.pending) {
        asyncFn(() => {
            nextPromise._awake(self._state, self._result)
        })
    } else {
        if (!self._nextCount) {
            self.next = [nextPromise]
            self._nextCount = true
        } else {
            self.next.push(nextPromise)
        }
    }
    return nextPromise
}

class SimplePromise {
    constructor(fn) {
        // next是用于储存then／catch的数组
        this.next = null
        this._nextCount = false
        this._result = null
        this._state = STATELIST.pending
        this._awakeFunc = null
        this._awakeType = null
        resolve(this, fn)
    }

    _awake(type, result) {
        if (this._state !== STATELIST.pending) {
            return
        }
        if (this._awakeType === type && typeof this._awakeFunc === 'function') {
            let awakeResult = tryCallOne(this._awakeFunc, result)
            this._awakeFunc = null
            this._awakeType = null
            if (awakeResult === IS_ERROR) {
                return this._reject(LAST_ERROR)
            }
            const res = tryCallOne(this._resolve.bind(this), awakeResult)
            res === IS_ERROR && this._reject(LAST_ERROR)
        } else {
            const err = tryCallOne(this[KEYWORDS[type]].bind(this), result)
            if (err === IS_ERROR) {
                this._reject(LAST_ERROR)
            }
        }
    }

    then(fn, fn1) {
        const result = _next(this, STATELIST.resolved, fn)
        if (typeof fn1 === 'function')
            return _next(result, STATELIST.rejected, fn1)
        return result
    } catch (fn) {
        return _next(this, STATELIST.rejected, fn)
    }

    _resolve(res) {
        if (this._state !== STATELIST.pending)
            return
        if (res === this) {
            throw new TypeError('`promise` and `x` cannot refer to the same object')
        }
        if (res instanceof SimplePromise) {
            res.next = this.next
            resh._nextCount = this._nextCount
            this.next = null
            this._nextCount = null
            this._result = res
            this._state = STATELIST.delegated
            _checkState(res)
            return
        }
        if ((typeof res === 'object' && res !== null) || (typeof res === 'function')) {
            let invoked = false
            try {
                const then = res.then
                if (typeof then === 'function') {
                    then.call(res, function(result) {
                        if (!invoked) {
                            invoked = true
                            this._resolve(result)
                        }
                    }.bind(this), function(err) {
                        if (!invoked) {
                            invoked = true
                            this._reject(err)
                        }
                    }.bind(this))
                    return
                }
            } catch (err) {
                if (!invoked) {
                    this._reject(err)
                }
                return
            }
        }
        this._result = res
        this._state = STATELIST.resolved
        _checkState(this)
    }

    _reject(err) {
        if (this._state !== STATELIST.pending)
            return
        this._result = err
        this._state = STATELIST.rejected
        _checkState(this)
    }
}

SimplePromise.resolve = function(result) {
    if (result instanceof SimplePromise)
        return result;
    return new SimplePromise(function(resolve) {
        resolve(result)
    })
}
SimplePromise.reject = function(err) {
    return new SimplePromise(function(resolve, reject) {
        reject(err)
    })
}

SimplePromise.all = function(promiseList) {
    return new SimplePromise(function(resolve, reject) {
        var pendingLength = promiseList.length
        if (pendingLength === 0)
            return SimplePromise.resolve(promiseList);
        const result = []
        promiseList.forEach((pro, index) => pro.then((res) => {
            result[index] = res
            pendingLength--
            if (pendingLength === 0)
                return resolve(result);
            }
        ).catch(e => {
            if (pendingLength > 0)
                reject(e)
        }))
    })
}

SimplePromise.race = function(promiseList) {
    return new SimplePromise(function(resolve, reject) {
        const promiseLength = promiseList.length
        var state = 0
        if (promiseLength < 1)
            throw new Error('At least one promise!');
        promiseList.forEach((pro, index) => pro.then((res) => {
            if (state === 0)
                resolve(res)
            state = 1
        }).catch(e => {
            if (promiseLength === 0)
                reject(e)
            state = -1
        }))
    })
}

new SimplePromise((resolve) => {
    console.log('a')
    resolve('b')
    console.log('c')
}).then((data) => {
    console.log(data)
})
