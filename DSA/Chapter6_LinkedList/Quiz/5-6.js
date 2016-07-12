import {CircularList} from '../CircularList'

const game = function (m, n) {
	const circle = new CircularList(0);
	
	for (let i = 1; i < n; i++) {
	    circle.push(i);
	}
	let curr = circle.head(), temp;
	
	while(circle.getLength() >= m) {
		curr = curr._next;
		curr = curr._next;
		temp = curr.element;
		curr = curr._next;
		circle.remove(temp);
	}

	circle.display();
};


game(3, 40);
