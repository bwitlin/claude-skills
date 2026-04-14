// tldraw visual: "How Machine Learning Works"
// NOTE: tldraw MCP timed out during execution. This code is saved for reference
// and can be pasted into a tldraw canvas manually.

// Title
editor.createShape({ _type: 'text', shapeId: 'title', x: 180, y: 0, text: 'How Machine Learning Works', color: 'black' });

// Step 1: Data (examples) goes in
editor.createShape({ _type: 'rectangle', shapeId: 'data', x: 0, y: 100, w: 180, h: 70, text: 'Examples (Data)', color: 'blue', fill: 'solid' });

// Step 2: The model (the "learner") -- cloud shape for abstract concept
editor.createShape({ _type: 'cloud', shapeId: 'model', x: 270, y: 80, w: 200, h: 110, text: 'The Model (Learner)', color: 'violet', fill: 'solid' });

// Step 3: The guess/prediction -- diamond for decision point
editor.createShape({ _type: 'diamond', shapeId: 'guess', x: 560, y: 85, w: 160, h: 100, text: 'Guess', color: 'orange', fill: 'solid' });

// Step 4: The right answer
editor.createShape({ _type: 'rectangle', shapeId: 'check', x: 800, y: 100, w: 180, h: 70, text: 'Right Answer', color: 'green', fill: 'solid' });

// Arrows showing the flow
editor.createShape({ _type: 'arrow', shapeId: 'a1', fromId: 'data', toId: 'model', color: 'black', text: 'Feed in' });
editor.createShape({ _type: 'arrow', shapeId: 'a2', fromId: 'model', toId: 'guess', color: 'black', text: 'Makes a' });
editor.createShape({ _type: 'arrow', shapeId: 'a3', fromId: 'guess', toId: 'check', color: 'black', text: 'Compare' });

// The critical feedback loop -- red arrow going back
editor.createShape({ _type: 'arrow', shapeId: 'a4', fromId: 'check', toId: 'model', color: 'red', text: 'Adjust!', bend: -100 });

// Annotation
editor.createShape({ _type: 'text', shapeId: 'note', x: 220, y: 250, text: 'This loop repeats thousands of times. Each round, guesses improve.', color: 'grey' });

editor.selectAll();
editor.zoomToSelection();
