class Graph {
	constructor(n) {
		this.vertexNum = n;
		this._edges = 0;
		this._adj = [];
		for (let i = 0; i < n; i++) {
		    this._adj[i] = [];
		}
	}

	addEdge(v, w) {
		this._adj[v].push(w);
		this._adj[w].push(v);
		this._edges++;
	}
	
	showGraph() {
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
}

export default Graph

/*
const test = new Graph(5);

[[0,1], [0,2], [1,3], [2,4]].map(x => {test.addEdge(...x)});

test.showGraph();
*/


