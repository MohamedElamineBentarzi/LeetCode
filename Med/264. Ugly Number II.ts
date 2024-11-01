class MinHeap {
    private heap: number[];

    constructor() {
        this.heap = []; // Initialize an empty array for the heap
    }

    // Get the index of the parent node
    private getParentIndex(index: number): number {
        return Math.floor((index - 1) / 2);
    }

    // Get the index of the left child node
    private getLeftChildIndex(index: number): number {
        return 2 * index + 1;
    }

    // Get the index of the right child node
    private getRightChildIndex(index: number): number {
        return 2 * index + 2;
    }

    // Swap two elements in the heap
    private swap(index1: number, index2: number): void {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }

    // Heapify the tree upwards (to maintain the min-heap property)
    private heapifyUp(): void {
        let index = this.heap.length - 1;

        while (index > 0) {
            const parentIndex = this.getParentIndex(index);

            // If the current element is less than its parent, swap them
            if (this.heap[index] < this.heap[parentIndex]) {
                this.swap(index, parentIndex);
                index = parentIndex; // Move up to the parent index
            } else {
                break; // The heap property is satisfied
            }
        }
    }

    // Heapify the tree downwards (to maintain the min-heap property)
    private heapifyDown(): void {
        let index = 0;

        while (this.getLeftChildIndex(index) < this.heap.length) {
            let smallerChildIndex = this.getLeftChildIndex(index); // Start with the left child
            const rightChildIndex = this.getRightChildIndex(index);

            // If the right child exists and is smaller than the left child, use it instead
            if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallerChildIndex]) {
                smallerChildIndex = rightChildIndex;
            }

            // If the current element is greater than the smaller child, swap them
            if (this.heap[index] > this.heap[smallerChildIndex]) {
                this.swap(index, smallerChildIndex);
                index = smallerChildIndex; // Move down to the smaller child index
            } else {
                break; // The heap property is satisfied
            }
        }
    }

    // Insert a new value into the heap
    insert(value: number): void {
        this.heap.push(value); // Add the new value to the end of the heap
        this.heapifyUp(); // Maintain the heap property
    }

    // Extract the minimum value from the heap
    extractMin(): number | undefined {
        if (this.heap.length === 0) {
            return undefined; // Return undefined if the heap is empty
        }

        if (this.heap.length === 1) {
            return this.heap.pop(); // If there's only one element, remove and return it
        }

        const root = this.heap[0]; // Store the minimum value (the root of the heap)
        this.heap[0] = this.heap.pop()!; // Replace root with the last element
        this.heapifyDown(); // Restore the heap property

        return root; // Return the minimum value
    }

    // Peek at the minimum value without removing it
    peek(): number | undefined {
        return this.heap.length > 0 ? this.heap[0] : undefined; // Return root if not empty
    }

    // Get the current size of the heap
    size(): number {
        return this.heap.length; // Return the number of elements in the heap
    }
}

function nthUglyNumber(n: number): number {
    if (n == 1) return 1; // The first ugly number is 1

    let ugly: number[] = []; // Array to store ugly numbers
    let queue = new MinHeap(); // Initialize a min-heap to manage the next candidates

    // Insert the first set of ugly numbers into the heap
    for (let num of [1, 2, 3, 5]) {
        queue.insert(num);
    }

    let visited = new Map<number, boolean>(); // Map to track visited numbers
    visited.set(1, true);
    visited.set(2, true);
    visited.set(3, true);
    visited.set(5, true);

    // Continue generating until we have at least n * 2 candidates
    while (visited.size < n * 2) {
        let min = queue.extractMin(); // Extract the minimum (next ugly number)

        // Generate new candidates by multiplying the min with 2, 3, and 5
        ugly.push(min * 2);
        if (!visited.has(min * 2)) queue.insert(min * 2); // Insert if not visited
        visited.set(min * 2, true);

        ugly.push(min * 3);
        if (!visited.has(min * 3)) queue.insert(min * 3);
        visited.set(min * 3, true);

        ugly.push(min * 5);
        if (!visited.has(min * 5)) queue.insert(min * 5);
        visited.set(min * 5, true);
    }

    // Extract keys from visited map to get the unique ugly numbers
    ugly = [...visited.keys()];

    // Sort the ugly numbers in ascending order
    ugly.sort((a, b) => a - b);


    return ugly[n - 1];
}
