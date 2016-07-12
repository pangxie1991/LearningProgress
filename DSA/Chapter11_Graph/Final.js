class Graph {
	constructor(n) {
		this.vertexNum = n;
		this._edges = 0;
		this._adj = [];
		this._vertexList = [];
		this._marked = [];
		this._edgeTo = [];
		for (let i = 0; i < n; i++) {
			this._adj[i] = [];
			this._vertexList[i] = String(i);
			this._marked[i] = false;
		}
	}

	addEdge(v, w) {
		if (this._adj[v].indexOf(w) === -1) {
			this._adj[v].push(w);
			this._adj[w].push(v);
			this._edges++;
		}
	}

	showGraphOrigin() {
		let cl = '';
		for (let i = 0; i < this.vertexNum; i++) {
			cl += `${i}->`;
			for (let j = 0, l = this._adj[i].length; j < l; j++) {
				if (this._adj[i][j] !== undefined) {
					cl += `${this._adj[i][j]} `;
				}
			}
			cl += '\n';
		}
		console.log(cl);
	}

	show() {
		let cl = '';
		for (let i = 0; i < this.vertexNum; i++) {
		    cl += `${this._vertexList[i]} ->`;
			for (let j = 0, l = this._adj[i].length; j < l; j++) {
			    if (this._adj[i][j] !== undefined) {
			        cl += ` ${this._vertexList[this._adj[i][j]]} `
			    }
			}
			cl += '\n';
		}
		console.log(cl);
	}

	searchReset() {
		for (let i = 0; i < this.vertexNum; i++) {
			this._marked[i] = false;
		}
		this._edgeTo = [];
	}

	dfs(v) {
		const stack = [];
		this.searchReset();
		if (this._adj[v].length > 0) {
		    this.dfsHelper(v, stack);
		} else {
			return console.log(`${v} is isolated`);
		}
		return stack;
	}
	
	dfsHelper(v, stack) {
		this._marked[v] = true;
		stack.push(v);
		for (let w of this._adj[v]) {
		    if (!this._marked[w]) {        
		        this.dfsHelper(w, stack);
		    }
		}
	}

	bfs(s) {
		this.searchReset();
		const arr = [];
		const queue = [];
		this._marked[s] = true;
		queue.push(s);
		while (queue.length > 0) {
			let v = queue.shift();
			if (this._adj[v].length > 0) {
			    arr.push(v);
			} else {
				return console.log(`${this._vertexList[v]} is isolated`);
			}
			for (let w of this._adj[v]) {
			    if (!this._marked[w]) {
			        this._edgeTo[w] = v;
					this._marked[w] = true;
					queue.push(w);
			    }
			}
		}
		return arr;
	}

	shortestPath(from, to) {
		if (this._adj[from].length * this._adj[to].length === 0) {
		    console.log('There is no path between these two points, because at least one of them is isolated');
			return false;
		} else {
			this.searchReset();
			this.bfs(from);
			const path = [];
			for (let i = to; i !== from; i = this._edgeTo[i]) {
				if (i !== undefined) {
					path.push(i);
				} else {
					console.log('There is no path between these two points.');
					return false;
				}
			}
			let cl = `${this._vertexList[from]}`;
			for (let i = path.length - 1; i > -1 ; i--) {
				cl += `-${this._vertexList[path[i]]}`;
			}
			console.log(`The shortest path from ${this._vertexList[from]} to ${this._vertexList[to]} is:\n${cl}`);
			return path;
		}
	}

	topSort() {
		const stack = [];
		const visited = [];
		for (let i = 0; i < this.vertexNum; i++) {
		    visited[i] = false;
		}
		for (let i = 0; i < this.vertexNum; i++) {
		    if (visited[i] === false && this._adj[v].length > 0) {
		        this.topSortHelper(i, visited, stack);
		    }
		}
		for (let i = 0, l = stack.length; i < l; i++) {
		    if (stack[i] !== undefined && stack[i] !== false) {
				console.log(this._vertexList[stack[i]]);
			}
		}
	}

	topSortHelper(v, visited, stack) {
		visited[v] = true;
		stack.push(v);
		for (let w of this._adj[v]) {
			if (!visited[w]) {
				this.topSortHelper(w, visited, stack);
			}
		}
	}
}

export default Graph

/*
const test = new Graph(5);

[[0,1], [0,2], [1,3], [2,4]].map(x => {test.addEdge(...x)});

test.show();

test.shortestPath(0, 3);

test.topSort();
*/
