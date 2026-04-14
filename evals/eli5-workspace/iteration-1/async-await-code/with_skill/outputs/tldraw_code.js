// tldraw canvas code for async/await ELI5 visual
// NOTE: The tldraw MCP server was unresponsive during this session (repeated timeouts).
// A Mermaid diagram was used as fallback in output.md instead.
// This code can be executed in a tldraw canvas when the MCP server is available.

// Title
editor.createShape({ _type: 'text', shapeId: 'title', x: 100, y: 20, text: 'async/await: The Coffee Shop', color: 'black', fontSize: 24, anchor: 'top-left', maxWidth: 500, note: '' });

// Step 1: Place your order (call fetch)
editor.createShape({ _type: 'rectangle', shapeId: 's1', x: 100, y: 80, w: 200, h: 60, text: '1. Place order\n(call fetch)', color: 'blue', fill: 'tint', note: '' });

// Step 2: Promise returned (barista says "I'll call your name")
editor.createShape({ _type: 'cloud', shapeId: 's2', x: 85, y: 190, w: 230, h: 70, text: '2. Promise returned\n(I will call your name)', color: 'orange', fill: 'tint', note: '' });

// Step 3: await pauses the function (you wait patiently)
editor.createShape({ _type: 'ellipse', shapeId: 's3', x: 110, y: 310, w: 180, h: 60, text: '3. Wait patiently\n(await pauses)', color: 'yellow', fill: 'tint', note: '' });

// Step 4: Success path - data returned (get your coffee)
editor.createShape({ _type: 'rectangle', shapeId: 's4', x: 100, y: 420, w: 200, h: 60, text: '4. Get your coffee!\n(data returned)', color: 'green', fill: 'tint', note: '' });

// Step 5: Error path - try/catch handles it (machine broke)
editor.createShape({ _type: 'rectangle', shapeId: 's5', x: 100, y: 530, w: 200, h: 50, text: 'Machine broke?\ntry/catch handles it', color: 'red', fill: 'tint', note: '' });

// Arrows connecting the flow
editor.createShape({ _type: 'arrow', shapeId: 'a1', fromId: 's1', toId: 's2', x1: 0, y1: 0, x2: 0, y2: 80, color: 'black', note: '' });
editor.createShape({ _type: 'arrow', shapeId: 'a2', fromId: 's2', toId: 's3', x1: 0, y1: 0, x2: 0, y2: 80, color: 'black', note: '' });
editor.createShape({ _type: 'arrow', shapeId: 'a3', fromId: 's3', toId: 's4', x1: 0, y1: 0, x2: 0, y2: 80, color: 'green', note: '', text: 'Success!' });
editor.createShape({ _type: 'arrow', shapeId: 'a4', fromId: 's3', toId: 's5', x1: 0, y1: 0, x2: 0, y2: 80, color: 'red', note: '', text: 'Error!' });

// Zoom to fit
editor.selectAll();
editor.zoomToSelection();
