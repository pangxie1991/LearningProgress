import {LinkedList} from './LinkedList'

import {Node} from './Node'

export class DoublyLinkedList extends LinkedList{
	
	insert(element, item) {
		const newNode = new Node(element);
		const curr = this.find(item);
		if (curr) {
			[curr._next, newNode._prev, newNode._next] = [newNode, curr, curr.next];
			return this;
		}
	}

	remove(item) {
		const curr = this.find(item);
		if (curr) {
			if (curr.next) {
				[curr._prev._next, curr._next._prev] = [curr._next, curr._prev];
			} else {
				curr._prev._next = null;
			}
			[curr._next, curr._prev] = [null, null];
			return this;
		}
	}

	dispReverse() {
		let curr = this.findLast();
		while (curr._prev) {
			console.log(curr.element);
			curr = curr._prev;
		}
	}

	append(element) {
		const temp = new Node(element);
		const last = this.findLast();
		[last._next, temp._prev] = [temp, last];
		return this;
	}
	
}
