# Activity 19 — Test My App

> **🛠️ Stack for this lesson** — Expo SDK 57 / React Native 0.86 · runs in Expo Go on a real phone.
> 📥 Template: [/learn/m1/template/activity-19-test-my-app](/learn/m1/template/activity-19-test-my-app)

A working Todo app you don't write — and a Jest + React Native Testing Library setup that's already configured. Your job is to write the tests: 5 unit tests for `TodoItem`, 6 for `AddForm`, and 5 integration tests that exercise `TodoScreen` end-to-end with a mocked AsyncStorage. Today you stop trusting that "it looked fine on my device" and start letting a test prove it.

**Time:** about 45 minutes for the first five tests, plus 30 for `AddForm` and 45 for the integration tests · **Concept:** Concept 19 — Automated Testing

> This activity needs a laptop, not a phone.

---

## What You'll Build

| # | Outcome | File |
|---|---------|------|
| 1 | Five `TodoItem` tests: it renders its text, calls `onToggle` when the checkbox is pressed, calls `onDelete` when the delete button is pressed, applies a strike-through when completed, and copes with empty text | `__tests__/components/TodoItem.test.js` |
| 2 | Six `AddForm` tests: renders, updates as you type, submits the text, clears after submit, disables the button when empty, and refuses to submit empty text | `__tests__/components/AddForm.test.js` |
| 3 | Five integration tests on `TodoScreen`: add flow, toggle then delete, loading from storage, saving after a change, and a storage error | `__tests__/integration/AddTodo.test.js` |

The app code (`screens/TodoScreen.js`, `components/TodoItem.js`, `components/AddForm.js`) is already complete — read it before writing tests so you know which `testID`s and props are available.

## Run It

```bash
npm install --legacy-peer-deps
npm test            # one-shot run
npm run test:watch  # rerun on save
npx expo start      # optional — see the app you're testing
```

Each test file ships with one placeholder `it('is ready for your tests', …)` so the suite passes before you start. Replace each placeholder with the real tests; the suite should grow to 16 passing.

## Verify

Your activity is done when:

- [ ] `npm test` reports 16 passing and 0 failing when all three files are complete
- [ ] `npm run test:coverage` shows 70% or more statement coverage on `components/` and `screens/`
- [ ] integration tests reset the storage mock in `beforeEach` so their order does not matter
- [ ] no warnings about state updates outside `act`, because async steps use `await waitFor(...)`

The lesson page adds a few write-up checks for your Notes Doc: your predictions and what you found.

## Stretch

Pick one and write what you tried in your Notes Doc:

- **Your theme.** Write the same three kinds of tests for a component from your own project, such as the journal card or the notes form.
- Add a snapshot test for `TodoItem` and break it on purpose to read the diff.
- Mock the storage adapter with `jest.fn()` to test a storage hook.
- Describe, in your Doc, how you would run `npm test` automatically on every push.

## Show It

In a Notes Doc named `Activity 19 write-up`, answer three prompts: **what I built**, **how I know it works** (name your phone and OS), and **one thing I would change**. Add one AI-use line: "I asked the tutor ___. I decided ___ myself." The lesson page has the full prompts and your Explore question.

## 🪞 Reflect on Your Work

Answer in 2-3 sentences each, in your Notes doc. Your tutor reads these as part of grading.

1. **What did you learn that you didn't know before?** Name the most surprising thing — a bug you hit, a syntax quirk, a way the simulator and real device differ.
2. **How did you collaborate with AI?** If you used Claude / ChatGPT / Cursor / Copilot, what part of the work did *you* contribute — the prompt, the verification, the design decision, the bug-fix? If you didn't use AI, what was the hardest thing to figure out alone?
3. **How do you know your code works?** Describe one specific thing you did to confirm — a test you ran, a screenshot you took, a behavior you watched on the device.

> AI is a great collaborator. Owning your thinking, verifying the output, and explaining your design choices is what *learning* looks like in this course.

## Submit

When the Verify checklist is green, submit the link to your Notes doc, then Mark as Complete.

<!-- claude-template-fix: readme-v3 -->
