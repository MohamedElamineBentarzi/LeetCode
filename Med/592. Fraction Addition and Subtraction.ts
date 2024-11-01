function gcd(a: number, b: number): number {
    // Computes the greatest common divisor (GCD) of two numbers using the Euclidean algorithm
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function fractionAddition(expression: string): string {
    // Split the expression by '/' to separate numerators and denominators
    const data = expression.split("/");
    let numerators = [];  // Stores the numerators of each fraction
    let denominators = [];  // Stores the denominators of each fraction
    let isNumerator = false;  // Flag to switch between reading numerators and denominators

    for (let i = 0; i < data.length; i++) {
        if (!isNumerator) {
            // Read the denominator if `isNumerator` is false
            denominators.push(parseInt(data[i], 10));
            isNumerator = !isNumerator;  // Switch to reading a numerator next
        } else {
            // For numerator section
            if (i !== data.length - 1) {
                if (data[i].charAt(0) === '-') {
                    // Handling cases where the fraction includes a '-' in the middle
                    if (data[i].slice(1).includes('-')) {
                        let sub_data = data[i].slice(1).split('-');
                        numerators.push(-1 * parseInt(sub_data[0], 10));
                        denominators.push(-1 * parseInt(sub_data[1], 10));
                    } else {
                        let sub_data = data[i].slice(1).split('+');
                        numerators.push(-1 * parseInt(sub_data[0], 10));
                        denominators.push(parseInt(sub_data[1], 10));
                    }
                } else {
                    // Handle cases where the fraction has a '+' in the middle
                    if (data[i].includes('-')) {
                        let sub_data = data[i].split('-');
                        numerators.push(parseInt(sub_data[0], 10));
                        denominators.push(-1 * parseInt(sub_data[1], 10));
                    } else {
                        let sub_data = data[i].split('+');
                        numerators.push(parseInt(sub_data[0], 10));
                        denominators.push(parseInt(sub_data[1], 10));
                    }
                }
            } else {
                // Final part in data array is the numerator
                numerators.push(parseInt(data[i], 10));
            }
        }
    }

    // Calculate common denominator and sum of adjusted numerators
    let commonDenominator = 0;
    for (let i = 0; i < denominators.length; i += 1) {
        let product = 1;
        for (let j = 0; j < numerators.length; j++) {
            if (j === i) continue;
            product *= numerators[j];
        }
        commonDenominator += denominators[i] * product;
    }

    // Calculate the denominator by multiplying all numerators together
    let denominator = 1;
    for (let j = 0; j < numerators.length; j++) {
        denominator *= numerators[j];
    }

    if (commonDenominator === 0) denominator = 1;  // Handle zero case
    let divisor = gcd(denominator, commonDenominator);  // Reduce by GCD
    denominator /= divisor;
    commonDenominator /= divisor;

    // Construct final result as a string in simplified fraction form
    if (denominator < 0 && commonDenominator < 0) {
        return `${-1 * commonDenominator}/${-1 * denominator}`;
    } else if (denominator < 0) {
        return `-${commonDenominator}/${-1 * denominator}`;
    } else {
        return `${commonDenominator}/${denominator}`;
    }
}
