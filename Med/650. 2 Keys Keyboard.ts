// This function generates an infinite sequence of prime numbers using a generator.
function* primeNumberGenerator(): Generator<number> {
    // Initialize an array with the first two prime numbers: 2 and 3.
    let primes = [2, 3];
    
    // Yield the first prime number, which is 2.
    yield 2;

    // Index to track the current position in the primes array.
    let idx = 1;

    // Helper function to check if a number is prime.
    function is_prime(n: number) {
        // Iterate through the existing primes to check for divisibility.
        for (let i = 0; i < primes.length; i++) {
            // If n is divisible by any prime, it is not prime.
            if (n % primes[i] == 0) return false;
        }
        // If no primes divide n, then n is prime.
        return true;
    }


    while (true) {
        // Yield the next prime number from the list.
        yield primes[idx++];
        
        // Start checking for the next prime number by incrementing the last prime by 2 (to check odd numbers).
        let next = primes[idx - 1] + 2;

        // Continue finding the next prime number until a prime is found.
        while (!is_prime(next)) next += 1;

        // Add the found prime number to the primes array.
        primes.push(next);
    }
}

// This function calculates the minimum steps to reduce n to 1 by summing its prime factors.
function minSteps(n: number): number {
    // Initialize result variable to accumulate the sum of prime factors.
    let res = 0;


    let prime_gen = primeNumberGenerator();


    while (n > 1) {
        let p: number = prime_gen.next()!.value;

        while (n % p == 0) {
            // Add the prime number to the result.
            res += p;
            // Divide n by the prime number to reduce it.
            n = n / p;
        }
    }

    // Return the accumulated sum of prime factors.
    return res;
};
