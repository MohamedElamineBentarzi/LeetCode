function heightChecker(heights: number[]): number {
    let expected = [...heights]
    expected.sort((a,b)=>a-b)
    let res = 0 
    for(let i = 0 ; i < heights.length;i++) 
    {
        if(heights[i] != expected[i])
        {
            res ++ 
        }
    }
    return res

};