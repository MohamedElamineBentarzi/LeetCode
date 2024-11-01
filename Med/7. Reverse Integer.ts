function reverse(x: number): number {
    let res = 0;             // Variable to store the reversed number
    let negative = false;     // Flag to indicate if the original number is negative


    if (x < 0) {
        negative = true;      
        x *= -1;              // Convert x to positive for easier manipulation
    }

    // Reverse the digits of x
    while (x > 0) {
        res = res * 10 + x % 10;    // Add the last digit of x to res after shifting res left by one digit
        x = Math.floor(x / 10);     // Remove the last digit from x
    }

    // If the original number was negative, make the result negative
    if (negative) {
        res *= -1;
    }

    // Check if the reversed number is within the 32-bit signed integer range
    if (res > 2147483647 || res < -2147483648) return 0;  // Return 0 if it's out of bounds

    return res;    // Return the reversed number
}
