function throttle(fn, threshold) {
    var last
    var timer
    threshold || (threshold=250)
    return function() {
        var context = this
        var args = arguments
        var now = +new Date()

        if (last && now < last + threshold) {
            clearTimeout(timer)
            timer = setTimeout(function() {
                last = now
                fn.apply(context, args)
            }, threshold)
        } else {
            last = now
            fn.apply(context, args)
        }
    }
}
