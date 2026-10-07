# Interface copy

Words are design material: they exist in an interface to make it easier to understand and use. Bring the same intent to copy as to spacing and colour.

## Voice and tone

- Read the product's existing copy, terminology and any style guide first. The product has one voice; a local edit doesn't invent a new one. Keep a deliberate brand character when it stays clear for the stakes.
- Tone flexes with stakes: warm and light for success, onboarding and empty states; neutral for routine actions and settings; calm and plain for errors and destructive confirmations; serious and explicit for data loss and security.
- Write from the user's side of the screen. Name things by what people control and recognise, not by how the system is built: people manage notifications, not webhook config.
- Address the reader as "you". Prefer a direct status ("Unable to load content") over a "we're having trouble" that blurs responsibility.
- Plain words over clever ones, no idioms that won't translate, and the right device verb: tap on touch, click with a pointer, select when both apply.
- Being specific beats being clever. Copy can make a design feel as templated as its layout.

## Labels and actions

- Buttons start with a verb that names the action: "Save draft", "Delete project". An action keeps its name through the flow, so "Publish" produces a toast that says "Published".
- Confirmation buttons repeat the consequence, so the dialog is answerable without reading its body: "Delete project" and "Cancel", not "Yes" and "No".
- A multi-step flow uses one vocabulary: pick "Continue" or "Next" and keep it.
- Links describe their destination out of context. A bare "Learn more" becomes "Learn more about exports".
- One capitalisation policy per element type; sentence case is the calmer, safer default.
- Toggles describe their on state ("Send read receipts"), never a double negative. Link straight to a referenced setting instead of describing the path to it.
- Placeholders show the expected format and are never the only label.
- Build strings as whole templates with proper pluralisation, never by gluing fragments around a variable.

## States

- For each state, decide in order: the one fact the user needs now, the action available next, any context that changes the decision, and the tone for the moment. Say each idea once. If the heading already explains the state, the intro adds something new or goes.
- Errors say how to fix the problem, next to where it happened: "Choose a password with at least 8 characters", not "Password too short". No blame, no "oops", no exclamation marks. If the same error keeps firing for many users, redesign the interaction.
- Error messages never lead with internal codes and never promise a cause or a fix the system can't know.
- Empty states differ by cause: first use, no results, active filters, missing permission, and failure each need their own copy and next action. A filtered empty state names the query and offers a way out.
- Loading copy names the real operation and sets an honest expectation when the wait matters. Show real progress when you have it; never invent it.
