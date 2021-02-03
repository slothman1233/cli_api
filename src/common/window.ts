let win:any

if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-undef
    win = window
} else if (typeof global !== 'undefined') {
    win = global
} else if (typeof self !== 'undefined'){
    // eslint-disable-next-line no-undef
    win = self
} else {
    win = {}
}

export default win
