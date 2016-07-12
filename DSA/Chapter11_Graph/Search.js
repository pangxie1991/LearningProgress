import Base from './Graph'



class Graph extends Base {
	constructor(n) {
		super(n);
		this._marked = [];
		for (let i = 0; i < n; i++) {
		    this._marked[i] = false;
		}
	}

	// *
	// Depth-first
	// 从一条路径的起点开始搜索, 直到达到最后一个顶点, 然后回溯, 继续追溯下一条路径. 直到没有路径为止.
	// --------------------------------------------------------------------------------
	dfs(v) {
		this._marked[v] = true;
		if (this._adj[v] !== undefined) {
		    console.log(`Visited vertex: ${v}`);
		}
		for (let w of this._adj[v].values()) {
		    if (!this._marked[w]) {
		        this.dfs(w)
		    }
		}
	}

	// *
	// Breandth-first
	// 从第一个顶点开始, 尝试访问尽可能靠近它的顶点, 本质上是逐层移动.
	// --------------------------------------------------------------------------------

	bfs(s) {
		const queue = [];
		this._marked[s] = true;
		queue.push(s);
		while (queue.length > 0) {
			let v = queue.shift();
			if (this._adj[v] !== undefined) {
			    console.log(`Visited vertex: ${v}`);
			}
			for (let w of this._adj[v]) {
			    if (!this._marked[w]) {
			        this._marked[w] = true;
					queue.push(w);
			    }
			}
		}
	}

	reset() {
		for (let i = 0, l = this._marked.length; i < l; i++) {
		    this._marked[i] = false;
		}
		console.log('Search Reset');
	}
}

export default Graph

/*
const test = new Graph(5);

[[0,1], [0,2], [1,3], [2,4]].map(x => {test.addEdge(...x)});

test.showGraph();

test.dfs(0);

test.reset();

test.bfs(0);
*/
