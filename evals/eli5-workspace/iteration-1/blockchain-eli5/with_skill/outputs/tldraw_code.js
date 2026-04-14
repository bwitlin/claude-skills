// tldraw visual: "How a Blockchain Works: The Shared Notebook"
// Paste this into a tldraw canvas exec call to render the diagram.

// Title
editor.createShape({ _type: 'text', shapeId: 'title', x: 350, y: 20, text: 'How a Blockchain Works', color: 'black', fontSize: 28, anchor: 'top-center', maxWidth: 800 });

// Row 1: Transaction flow (left to right)
// Step 1: Someone initiates a transaction (ellipse = process/action)
editor.createShape({ _type: 'ellipse', shapeId: 'person', x: 40, y: 120, w: 180, h: 100, color: 'blue', fill: 'tint', text: 'Alice sends\n$5 to Bob' });

// Step 2: Broadcast to the network (cloud = abstract/distributed concept)
editor.createShape({ _type: 'cloud', shapeId: 'announce', x: 280, y: 110, w: 220, h: 120, color: 'violet', fill: 'tint', text: 'Announced\nto everyone' });

// Arrow: transaction -> broadcast
editor.createShape({ _type: 'arrow', shapeId: 'arrow1', fromId: 'person', toId: 'announce', x1: 220, y1: 170, x2: 280, y2: 170, color: 'black' });

// Step 3: Network verifies (diamond = decision/check)
editor.createShape({ _type: 'diamond', shapeId: 'verify', x: 570, y: 100, w: 200, h: 140, color: 'orange', fill: 'tint', text: 'Everyone\nchecks it' });

// Arrow: broadcast -> verify
editor.createShape({ _type: 'arrow', shapeId: 'arrow2', fromId: 'announce', toId: 'verify', x1: 500, y1: 170, x2: 570, y2: 170, color: 'black' });

// Row 2: The chain of blocks (rectangles = concrete data structures)
// Block 1 (old, confirmed)
editor.createShape({ _type: 'rectangle', shapeId: 'block1', x: 40, y: 310, w: 180, h: 120, color: 'green', fill: 'tint', text: 'Block #1\nPrev: 0000\nJan txns' });

// Block 2 (old, confirmed)
editor.createShape({ _type: 'rectangle', shapeId: 'block2', x: 280, y: 310, w: 180, h: 120, color: 'green', fill: 'tint', text: 'Block #2\nPrev: a3f9\nFeb txns' });

// Block 3 (new, just added - highlighted in blue)
editor.createShape({ _type: 'rectangle', shapeId: 'block3', x: 530, y: 310, w: 200, h: 120, color: 'blue', fill: 'tint', text: 'Block #3 NEW\nPrev: b7c2\nAlice to Bob' });

// Arrow: verify -> new block (verification leads to block creation)
editor.createShape({ _type: 'arrow', shapeId: 'arrow3', fromId: 'verify', toId: 'block3', x1: 670, y1: 240, x2: 630, y2: 310, color: 'black' });

// Chain links between blocks (green arrows showing hash linkage)
editor.createShape({ _type: 'arrow', shapeId: 'chain1', fromId: 'block1', toId: 'block2', x1: 220, y1: 370, x2: 280, y2: 370, color: 'green', text: 'linked' });
editor.createShape({ _type: 'arrow', shapeId: 'chain2', fromId: 'block2', toId: 'block3', x1: 460, y1: 370, x2: 530, y2: 370, color: 'green', text: 'linked' });

// Row 3: Why people care (key properties)
editor.createShape({ _type: 'rectangle', shapeId: 'prop1', x: 40, y: 500, w: 200, h: 80, color: 'blue', fill: 'tint', text: 'No middleman\n(no bank needed)' });
editor.createShape({ _type: 'rectangle', shapeId: 'prop2', x: 290, y: 500, w: 200, h: 80, color: 'green', fill: 'tint', text: 'Tamper-proof\n(cant cheat)' });
editor.createShape({ _type: 'rectangle', shapeId: 'prop3', x: 540, y: 500, w: 220, h: 80, color: 'violet', fill: 'tint', text: 'Everyone has\na copy (transparent)' });

// Zoom to fit all shapes
editor.selectAll();
editor.zoomToSelection();
editor.selectNone();
