function maxPoints(points: number[][]): number {
    function helper(cur_line: number[], prev_line_maxes: number[]): number[] {
        let left : number[] = []
        let right : number[] = []
        for (let i = 0; i < prev_line_maxes.length; i++) {
            if (i != 0) left.push(Math.max(cur_line[i] + prev_line_maxes[i], left[i - 1] - 1))
            else left.push(cur_line[i] + prev_line_maxes[i])

            if (i != 0) right.push(Math.max(cur_line[prev_line_maxes.length - 1 - i] + prev_line_maxes[prev_line_maxes.length - 1 - i],
                right[i - 1] - 1))
            else right.push(cur_line[prev_line_maxes.length - 1 - i] + prev_line_maxes[prev_line_maxes.length - 1 - i])
        }
        let res : number[] = []
        for (let i = 0; i < prev_line_maxes.length; i++) {
            res.push(Math.max(left[i], right[right.length - 1 - i]))
        }
        return res
    }
    let prev_line_maxes = Array(points[0].length).fill(0)
    let cur : number[] = []
    for (let i = 0; i < points.length; i++) {
        cur = points[i]
        prev_line_maxes = helper(cur, prev_line_maxes)
    }
    let max = prev_line_maxes[0]
    for (let e of prev_line_maxes) if (e > max) max = e
    return max
};
