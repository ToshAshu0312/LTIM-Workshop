Create a production-ready standalone Todo application under folder topic 9 using vanilla JavaScript and HTML/CSS 
that runs immediately without npm, build tools, or frameworks. Deploy it as a single 
index.html file that opens in any browser.

TECHNICAL REQUIREMENTS:
- Single index.html file with embedded CSS and JavaScript
- No external dependencies, libraries, or build tools required
- Fully functional without npm install or compilation

APPLICATION STATE & LOGIC:
- Todos array: {id, text, completed}
- Input state: current input value
- Edit state: editingId, editText
- Functions: addTodo, deleteTodo, toggleComplete, startEdit, saveEdit, cancelEdit
- Input validation: prevent empty todos, prevent empty edits

USER INTERFACE REQUIREMENTS:
- Header: Title "My Todo List" with statistics ("X of Y completed")
- Input Section: Text input + Add button
  * Add with Enter key or button click
  * Clear input after adding
- Todo Item Display (when todos exist):
  * Checkbox for complete/incomplete toggle
  * Editable todo text (click Edit to inline edit)
  * Edit mode: inline input with Save/Cancel buttons
  * Delete button
  * Completed todos: strikethrough text, 50% opacity
- Empty State: "No todos yet. Add one to get started!" (when no todos)
- Footer: Three-column display showing total, remaining, done counts

STYLING REQUIREMENTS:
- Modern, professional design with gradient background (purple/blue)
- Centered card container (max-width: 600px)
- Color scheme:
  * Blue (#007bff) - primary, edit buttons
  * Green (#28a745) - add/save actions
  * Red (#dc3545) - delete actions
  * Gray (#6c757d) - cancel buttons
- Header: Gradient blue background with white text
- Hover effects: All buttons lift up on hover with shadow
- Smooth transitions: All interactive elements (0.2-0.3s)
- Completed todos: Strikethrough + reduced opacity
- Edit mode: Inline input with focused blue border
- Responsive design:
  * Desktop: Full flexbox layout
  * Mobile (<600px): Stacked buttons, full-width inputs
- Scrollable list: max-height 500px with overflow-y auto

KEYBOARD SUPPORT:
- Enter in input: Add todo
- Enter in edit mode: Save edit
- Escape in edit mode: Cancel edit

DELIVERABLES:
Return ONLY the complete index.html file with all code embedded, ready to save and 
open in a browser immediately. Production-ready, no placeholder code. ~400 lines total.
