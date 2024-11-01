function findComplement(num: number): number {
    let b = 0
    let tump = num
    let xor = 0
    while(tump>= 1)
    {
        xor*=2
        xor+=1
        tump = Math.floor(tump/2)
    }
    return num ^ xor
};